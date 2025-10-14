declare module "@ericblade/quagga2" {
  interface QuaggaConfig {
    inputStream?: {
      name?: string;
      type?: string;
      target?: HTMLElement | null;
      constraints?: {
        width?: number;
        height?: number;
        facingMode?: string;
      };
    };
    decoder?: {
      readers?: string[];
    };
    locate?: boolean;
    locator?: {
      patchSize?: string;
      halfSample?: boolean;
    };
  }

  interface QuaggaResult {
    codeResult: {
      code: string;
      format: string;
    };
  }

  interface Quagga {
    init(config: QuaggaConfig, callback: (err?: Error) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (result: QuaggaResult) => void): void;
    offDetected(callback: (result: QuaggaResult) => void): void;
  }

  const Quagga: Quagga;
  export default Quagga;
}
