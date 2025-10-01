import { Section } from "@/app/card/helper/canvas";
import { BlendMode, Jimp, ResizeStrategy } from "jimp";
import { X } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// import CardBg from "../../card/img/content/card-bg.png";
// import Cow from "../../card/img/content/cow.png";
const CowImagePath = path.join(process.cwd(), "public", "card", "cow.png");
const CardBgImagePath = path.join(
  process.cwd(),
  "public",
  "card",
  "card-bg.png"
);

const CowDitherImagePath = path.join(
  process.cwd(),
  "public",
  "card",
  "cow-dither.png"
);

const width = 658;
const height = 1004;

const sections: Section[] = [
  {
    x: 0,
    y: 0,
    w: width - 87 * 2,
    h: height - 157 * 2,
  },
  {
    x: 0,
    y: height - 157 * 2 - 2,
    w: width - 87 * 2,
    h: 157 * 2 + 2,
  },
  {
    x: width - 87 * 2,
    y: 0,
    w: 87 * 2,
    h: height - 157 * 2,
  },
  {
    x: width - 87 * 2,
    y: height - 157 * 2,
    w: 87 * 2,
    h: 157 * 2,
  },
];

const drawFrontFace = async () => {
  const CowImage = await Jimp.read(CowImagePath);
  const CardBgImage = await Jimp.read(CardBgImagePath);

  const image = new Jimp({
    width,
    height,
  });

  image.composite(
    CardBgImage.resize({
      w: width,
      h: height,
      mode: ResizeStrategy.NEAREST_NEIGHBOR,
    })
  );

  image.composite(
    CowImage.resize({
      w: sections[0].w * 1.2,
      h: (height / width) * sections[0].w * 1.2,
      mode: ResizeStrategy.NEAREST_NEIGHBOR,
    }),
    (-sections[0].w * 1.2) / 2 + sections[0].w * 0.5,
    160
  );

  image.composite(
    CardBgImage.crop({
      x: sections[1].x,
      y: sections[1].y,
      w: sections[1].w,
      h: sections[1].h,
    }),
    sections[1].x,
    sections[1].y
  );

  const buffer = await image.getBuffer("image/png");

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate",
    },
  });
};

const drawMask = async () => {
  const image = new Jimp({
    width,
    height,
  });

  const section1 = new Jimp({
    width: sections[0].w,
    height: sections[0].h,
  });

  const cowImage = await Jimp.read(CowImagePath);

  cowImage.resize({
    w: sections[0].w * 1.2,
    h: (height / width) * sections[0].w * 1.2,
    mode: ResizeStrategy.NEAREST_NEIGHBOR,
  });
  const cowX = (-sections[0].w * 1.2) / 2 + sections[0].w * 0.5;
  const cowY = 160;

  cowImage.scan((_x, _y, idx) => {
    if (cowImage.bitmap.data[idx + 3] > 0) {
      cowImage.bitmap.data[idx + 0] = 0;
      cowImage.bitmap.data[idx + 1] = 0;
      cowImage.bitmap.data[idx + 2] = 0;
      cowImage.bitmap.data[idx + 2] = 0;
    } else {
      cowImage.bitmap.data[idx + 0] = 255;
      cowImage.bitmap.data[idx + 1] = 255;
      cowImage.bitmap.data[idx + 2] = 255;
      cowImage.bitmap.data[idx + 2] = 255;
    }
  });

  const cowDither = (await Jimp.read(CowDitherImagePath))
    .crop({
      x: 330,
      y: 80,
      w: sections[0].w / 2,
      h: sections[0].h / 2,
    })
    .resize({
      w: sections[0].w,
    });

  section1.composite(cowDither, 0, 0);
  section1.mask({
    src: cowImage,
    x: cowX,
    y: cowY,
  });

  image.composite(section1, sections[0].x, sections[0].y);

  // section 2
  const section2 = (await Jimp.read(CowDitherImagePath))
    .crop({
      x: 200,
      y: 200,
      w: sections[1].w / 2,
      h: sections[1].h / 2,
    })
    .resize({
      w: sections[1].w,
    });

  image.composite(section2, sections[1].x, sections[1].y);

  // section 3
  const section3 = (await Jimp.read(CowDitherImagePath))
    .crop({
      x: 420,
      y: 100,
      w: sections[2].w / 2,
      h: sections[2].h / 2,
    })
    .resize({
      w: sections[2].w,
    });

  image.composite(section3, sections[2].x, sections[2].y);

  // section 4
  const section4 = (await Jimp.read(CardBgImagePath)).crop({
    x: sections[3].x,
    y: sections[3].y,
    w: sections[3].w,
    h: sections[3].h,
  });

  section4.scan(0, 0, sections[3].w, sections[3].h, (_x, _y, idx) => {
    const r = section4.bitmap.data[idx + 0];
    const g = section4.bitmap.data[idx + 1];
    const b = section4.bitmap.data[idx + 2];
    if (r === 0x19 && g === 0x23 && b === 0x19) {
      section4.bitmap.data[idx + 3] = 0;
    } else {
      section4.bitmap.data[idx + 3] = 255;
    }

    section4.bitmap.data[idx + 0] = 0;
    section4.bitmap.data[idx + 1] = 0;
    section4.bitmap.data[idx + 2] = 0;
  });

  // section border
  const section2BorderY = new Jimp({
    width: image.width,
    height: 2,
    color: 0x000000ff,
  });

  const section2BorderX = new Jimp({
    width: 2,
    height: image.height,
    color: 0x000000ff,
  });

  image.composite(section2BorderY, 0, 0);
  image.composite(section2BorderY, 0, image.height - 2);

  image.composite(section2BorderX, 0, 0);
  image.composite(section2BorderX, image.width - 2, 0);

  image.composite(section4, sections[3].x, sections[3].y);

  const buffer = await image.getBuffer("image/png");

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate",
    },
  });
};

const drawFoil = async () => {
  const image = new Jimp({
    width,
    height,
  });

  const section1 = new Jimp({
    width: sections[0].w,
    height: sections[0].h,
  });

  const cowImage = await Jimp.read(CowImagePath);

  cowImage.resize({
    w: sections[0].w * 1.2,
    h: (height / width) * sections[0].w * 1.2,
    mode: ResizeStrategy.NEAREST_NEIGHBOR,
  });
  const cowX = (-sections[0].w * 1.2) / 2 + sections[0].w * 0.5;
  const cowY = 160;

  cowImage.scan((_x, _y, idx) => {
    if (cowImage.bitmap.data[idx + 3] > 0) {
      cowImage.bitmap.data[idx + 0] = 0;
      cowImage.bitmap.data[idx + 1] = 0;
      cowImage.bitmap.data[idx + 2] = 0;
      cowImage.bitmap.data[idx + 2] = 0;
    } else {
      cowImage.bitmap.data[idx + 0] = 255;
      cowImage.bitmap.data[idx + 1] = 255;
      cowImage.bitmap.data[idx + 2] = 255;
      cowImage.bitmap.data[idx + 2] = 255;
    }
  });

  const cowDither = (await Jimp.read(CowDitherImagePath))
    .crop({
      x: 330,
      y: 80,
      w: sections[0].w / 2,
      h: sections[0].h / 2,
    })
    .resize({
      w: sections[0].w,
    });

  section1.composite(cowDither, 0, 0);
  section1.mask({
    src: cowImage,
    x: cowX,
    y: cowY,
  });

  image.composite(section1, sections[0].x, sections[0].y);

  // section 2
  const section2 = (await Jimp.read(CowDitherImagePath))
    .crop({
      x: 200,
      y: 200,
      w: sections[1].w / 2,
      h: sections[1].h / 2,
    })
    .resize({
      w: sections[1].w,
    });

  image.composite(section2, sections[1].x, sections[1].y);

  // section 3
  const section3 = (await Jimp.read(CowDitherImagePath))
    .crop({
      x: 420,
      y: 100,
      w: sections[2].w / 2,
      h: sections[2].h / 2,
    })
    .resize({
      w: sections[2].w,
    });

  image.composite(section3, sections[2].x, sections[2].y);

  // section 4
  const section4 = (await Jimp.read(CardBgImagePath)).crop({
    x: sections[3].x,
    y: sections[3].y,
    w: sections[3].w,
    h: sections[3].h,
  });

  section4.scan(0, 0, sections[3].w, sections[3].h, (_x, _y, idx) => {
    const r = section4.bitmap.data[idx + 0];
    const g = section4.bitmap.data[idx + 1];
    const b = section4.bitmap.data[idx + 2];
    if (r === 0x19 && g === 0x23 && b === 0x19) {
      section4.bitmap.data[idx + 3] = 0;
    } else {
      section4.bitmap.data[idx + 3] = 255;
    }

    section4.bitmap.data[idx + 0] = 0;
    section4.bitmap.data[idx + 1] = 0;
    section4.bitmap.data[idx + 2] = 0;
  });

  // section border
  const section2BorderY = new Jimp({
    width: image.width,
    height: 2,
    color: 0x000000ff,
  });

  const section2BorderX = new Jimp({
    width: 2,
    height: image.height,
    color: 0x000000ff,
  });

  image.composite(section2BorderY, 0, 0);
  image.composite(section2BorderY, 0, image.height - 2);

  image.composite(section2BorderX, 0, 0);
  image.composite(section2BorderX, image.width - 2, 0);

  image.composite(section4, sections[3].x, sections[3].y);

  image.invert();
  image.greyscale();
  image.scan((_x, _y, idx) => {
    if (image.bitmap.data[idx + 3] <= 125) {
      image.bitmap.data[idx + 0] = 0;
      image.bitmap.data[idx + 1] = 0;
      image.bitmap.data[idx + 2] = 0;
      image.bitmap.data[idx + 3] = 255;
    }
  });

  const buffer = await image.getBuffer("image/png");

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate",
    },
  });
};

export async function GET(request: NextRequest) {
  console.log("request!");

  const searchParams = request.nextUrl.searchParams;
  const isMask = searchParams.get("mask") !== null;
  const isFoil = searchParams.get("foil") !== null;
  console.log(isMask, isFoil);

  if (isMask) {
    return await drawMask();
  }

  if (isFoil) {
    return await drawFoil();
  }

  return await drawFrontFace();
}
