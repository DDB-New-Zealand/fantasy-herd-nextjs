import { useEffect, useRef, useState } from "react";

import { MotionValue } from "motion";
import {
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";

// --- 1. GLSL Shaders ---
const VERTEX_SHADER_SOURCE = `
// Basic vertex shader to draw a simple quad and pass texture coordinates
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
    // Set position (simple quad from -1 to 1)
    gl_Position = vec4(a_position, 0, 1);
    // Pass texture coordinates to the fragment shader
    v_texCoord = a_texCoord;
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;
uniform sampler2D u_image;
varying vec2 v_texCoord;
uniform float u_exposure;
uniform float u_contrast;
uniform float u_saturation;
uniform float u_temp;
uniform float u_tint;
uniform float u_alpha; // 0.0 to 1.0

vec4 applyFilters(vec4 color) {
    // 1. Exposure (Brightness)
    color.rgb *= u_exposure;

    // 2. Contrast
    color.rgb = ((color.rgb - 0.5) * u_contrast) + 0.5;

    // 3. Saturation
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(luminance);
    color.rgb = mix(grayscale, color.rgb, u_saturation);

    // 3. Temperature & Tint (Color Balance)
    
    // Adjusts Red and Blue channels based on Temperature and Tint
    vec3 temp_strength = 1.0 + u_temp * vec3(0.25, 0.0, -0.25);
    color.rgb *= temp_strength;

    vec3 tint_strength = 1.0 + u_tint * vec3(1.0, 0.0, 0.0);
    color.rgb *= tint_strength;

    return color;
}

void main() {
    // vec4 color = texture2D(u_image, vec2(v_texCoord.x, 1.0 - v_texCoord.y)); 
    vec4 color = texture2D(u_image, vec2(v_texCoord.x, 1.0 - v_texCoord.y)); 

    if (color.a < u_alpha) {
        color.rgba = vec4(0.0, 0.0, 0.0, 0.0);

        gl_FragColor = color;
    }
    else {
        color.rgb *= color.a;
    
        color = applyFilters(color);

        gl_FragColor = color;
    }
}
`;

// --- 2. Main Rendering Function ---
export function initWebGL(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const gl = canvas.getContext("webgl");
  if (!gl) {
    console.error("WebGL not supported.");
    return;
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  // ----------------------------------------------------
  // SETUP SHADERS AND PROGRAM
  // ----------------------------------------------------
  const program = createProgram(
    gl,
    VERTEX_SHADER_SOURCE,
    FRAGMENT_SHADER_SOURCE
  );

  if (!program) throw new Error("Could not create a program");

  // biome-ignore-start lint/correctness/useHookAtTopLevel: reason
  gl.useProgram(program);
  // biome-ignore-end lint/correctness/useHookAtTopLevel: reason

  // Set canvas dimensions
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // ----------------------------------------------------
  // SETUP GEOMETRY (A full-screen quad)
  // ----------------------------------------------------
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Vertices for a rectangle covering the whole screen (-1 to 1 clip space)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1,
      -1,
      -1,
      1,
      1,
      -1, // Triangle 1
      1,
      -1,
      -1,
      1,
      1,
      1, // Triangle 2
    ]),
    gl.STATIC_DRAW
  );

  const positionLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  // Texture coordinates (0 to 1)
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const texCoordLoc = gl.getAttribLocation(program, "a_texCoord");
  gl.enableVertexAttribArray(texCoordLoc);
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

  // ----------------------------------------------------
  // SETUP TEXTURE
  // ----------------------------------------------------
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  const uImageLoc = gl.getUniformLocation(program, "u_image");
  gl.uniform1i(uImageLoc, 0); // Use texture unit 0

  // ----------------------------------------------------
  // RENDER FUNCTION (This is what you call to apply filters)
  // ----------------------------------------------------

  // Store uniform locations for later use
  const uniforms = {
    exposure: gl.getUniformLocation(program, "u_exposure"),
    contrast: gl.getUniformLocation(program, "u_contrast"),
    saturation: gl.getUniformLocation(program, "u_saturation"),
    temp: gl.getUniformLocation(program, "u_temp"),
    tint: gl.getUniformLocation(program, "u_tint"),
    alpha: gl.getUniformLocation(program, "u_alpha"),
  };

  /**
   * @param {number} exposure - 0.0 (black) to 2.0+ (bright)
   * @param {number} contrast - 0.0 (gray) to 2.0+ (high contrast)
   * @param {number} saturation - 0.0 (grayscale) to 2.0+ (high saturation)
   */
  function render(
    exposure: number,
    contrast: number,
    saturation: number,
    temp: number,
    tint: number,
    alpha: number
  ) {
    if (!gl) throw new Error("Could not find gl");

    // Pass parameters to the shader (uniforms)
    gl.uniform1f(uniforms.exposure, exposure);
    gl.uniform1f(uniforms.contrast, contrast);
    gl.uniform1f(uniforms.saturation, saturation);
    gl.uniform1f(uniforms.temp, temp);
    gl.uniform1f(uniforms.tint, tint);
    gl.uniform1f(uniforms.alpha, alpha);

    // Draw the quad
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // Initial draw with default values
  render(1.0, 1.0, 1.0, 0.0, 0.0, 1.0);

  return render; // Return the function you'll use to update the image
}

// --- 3. Helper Functions (Standard WebGL Boilerplate) ---

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) throw new Error("Could not create shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  if (!vertexShader) throw new Error("Could not create vertexShader");

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!fragmentShader) throw new Error("Could not create fragmentShader");

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(program)
    );
    return null;
  }
  return program;
}

export const useFilterValues = () => {
  const exposure = useMotionValue(1);
  const contrast = useMotionValue(1);
  const saturation = useMotionValue(1);
  const temp = useMotionValue(0);
  const tint = useMotionValue(0);

  const [filterValues, setFilterValues] = useState({
    exposure: 1,
    contrast: 1,
    saturation: 1,
    temp: 0,
    tint: 0,
  });

  useMotionValueEvent(exposure, "change", () => {
    setFilterValues({
      exposure: exposure.get(),
      contrast: contrast.get(),
      saturation: saturation.get(),
      temp: temp.get(),
      tint: tint.get(),
    });
  });
  useMotionValueEvent(contrast, "change", () => {
    setFilterValues({
      exposure: exposure.get(),
      contrast: contrast.get(),
      saturation: saturation.get(),
      temp: temp.get(),
      tint: tint.get(),
    });
  });
  useMotionValueEvent(saturation, "change", () => {
    setFilterValues({
      exposure: exposure.get(),
      contrast: contrast.get(),
      saturation: saturation.get(),
      temp: temp.get(),
      tint: tint.get(),
    });
  });
  useMotionValueEvent(temp, "change", () => {
    setFilterValues({
      exposure: exposure.get(),
      contrast: contrast.get(),
      saturation: saturation.get(),
      temp: temp.get(),
      tint: tint.get(),
    });
  });
  useMotionValueEvent(tint, "change", () => {
    setFilterValues({
      exposure: exposure.get(),
      contrast: contrast.get(),
      saturation: saturation.get(),
      temp: temp.get(),
      tint: tint.get(),
    });
  });

  return {
    filterValues,
    exposure,
    contrast,
    saturation,
    temp,
    tint,
  };
};

export const useFilteredImage = (
  src: string,
  width: number,
  height: number,
  filterValues: {
    exposure: MotionValue<number>;
    contrast: MotionValue<number>;
    saturation: MotionValue<number>;
    temp: MotionValue<number>;
    tint: MotionValue<number>;
  }
) => {
  const { exposure, contrast, saturation, temp, tint } = filterValues;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef =
    useRef<
      (
        exposure: number,
        contrast: number,
        saturation: number,
        temp: number,
        tint: number,
        alpha: number
      ) => void
    >(null);
  const invalidatedRef = useRef(true);

  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) return;

    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;

    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.src = src;

    image.onload = () => {
      if (!canvas) return;

      console.log("init Webgl ", canvas, image);

      const render = initWebGL(canvas, image);

      if (render) {
        renderRef.current = render;
        render(
          exposure.get(),
          contrast.get(),
          saturation.get(),
          temp.get(),
          tint.get(),
          0.9 // alpha threshold
        );
      }

      setDataUrl(canvas.toDataURL());
    };
  }, [src, width, height, exposure, contrast, saturation, temp, tint]);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (invalidatedRef.current) {
      renderRef.current?.(
        exposure.get(),
        contrast.get(),
        saturation.get(),
        temp.get(),
        tint.get(),
        0.5 // alpha threshold
      );

      setDataUrl(canvas.toDataURL());

      invalidatedRef.current = false;
    }
  });

  const invalidate = () => {
    invalidatedRef.current = true;
  };

  useMotionValueEvent(exposure, "change", invalidate);
  useMotionValueEvent(contrast, "change", invalidate);
  useMotionValueEvent(saturation, "change", invalidate);
  useMotionValueEvent(temp, "change", invalidate);
  useMotionValueEvent(tint, "change", invalidate);

  return dataUrl;
};
