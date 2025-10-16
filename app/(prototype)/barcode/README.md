# Barcode Scanner with Quagga2

This directory contains a camera-based barcode scanner implementation using Quagga2 for the Fantasy Herd Next.js application.

## Features

- **Camera Access**: Uses device camera (prefers back/environment-facing camera)
- **Real-time Scanning**: Advanced barcode detection using Quagga2 library
- **Multiple Formats**: Supports Code 128, EAN, UPC, Code 39, Codabar, and more
- **Visual Feedback**: Shows scanning overlay with viewfinder and status indicators
- **Scan History**: Displays recently scanned barcodes with timestamps
- **Error Handling**: Graceful handling of camera permission errors and device compatibility

## Technology Stack

- **Quagga2**: Advanced barcode detection library (`@ericblade/quagga2`)
- **WebRTC**: Camera stream access
- **Next.js 15**: React framework with App Router
- **TypeScript**: Full type safety with custom type definitions

## Components

### `AdvancedBarcodeScanner`

The main barcode scanner component powered by Quagga2:

- **Multi-format Detection**: Supports various barcode formats
- **Live Stream Processing**: Real-time barcode detection from camera feed
- **Automatic Recognition**: No manual scanning required - detects automatically
- **Error Handling**: Comprehensive error states and permission management

### Supported Barcode Formats

- Code 128
- EAN (13 & 8)
- UPC (A & E)
- Code 39
- Code 39 VIN
- Codabar
- Interleaved 2 of 5 (I2of5)

### `BarcodeScanner` (Basic)

A simpler version of the barcode scanner with basic functionality.

## Hooks

### `useCameraPermission`

A custom hook that manages camera permissions:

- Checks current permission state
- Requests camera access
- Handles permission errors
- Provides loading states

## Usage

```tsx
import BarcodeScanner from "./components/advanced-barcode-scanner";

const handleScan = (barcode: string) => {
  console.log("Scanned barcode:", barcode);
};

const handleError = (error: string) => {
  console.error("Scanner error:", error);
};

<BarcodeScanner onScan={handleScan} onError={handleError} />;
```

## Configuration

The scanner is configured to optimize for:

- Environment-facing camera (back camera on mobile)
- Medium patch size for better performance
- Half-sampling for faster processing
- Multiple reader types for broader compatibility

## Browser Compatibility

The scanner requires:

- WebRTC support (`getUserMedia`)
- Modern browser with camera access capabilities
- HTTPS (required for camera access in production)

## Installation

```bash
npm install @ericblade/quagga2
```

## Type Definitions

Custom TypeScript definitions are provided in `/types/quagga2.d.ts` for full type safety.

## Performance Optimization

- **Patch Size**: Configured to 'medium' for balanced speed/accuracy
- **Half Sampling**: Enabled to reduce processing load
- **Automatic Stop**: Scanner stops after successful detection to conserve resources

## Security Notes

- Camera access requires HTTPS in production
- Always handle camera permission gracefully
- Consider user privacy and data handling policies
- Self-signed certificates are used for development (experimental feature)
