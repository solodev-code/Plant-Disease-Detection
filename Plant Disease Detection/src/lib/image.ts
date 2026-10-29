import sharp from "sharp";

// Maximum dimension for the stored/analyzed image
const MAX_DIMENSION = 768;
const JPEG_QUALITY = 78;

/**
 * Resize and compress an uploaded image to keep base64 storage manageable.
 * Accepts a Buffer of any common image format and returns a JPEG data URL.
 */
export async function processImage(buffer: Buffer, contentType?: string): Promise<string> {
  let image = sharp(buffer, { failOn: "none" });
  image = image.resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true });
  image = image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  const out = await image.toBuffer();
  return `data:image/jpeg;base64,${out.toString("base64")}`;
}

/**
 * Convert a base64 data URL string back to its underlying Buffer.
 */
export function dataUrlToBuffer(dataUrl: string): Buffer {
  const match = /^data:[^;]+;base64,(.*)$/s.exec(dataUrl);
  if (!match) throw new Error("Invalid data URL");
  return Buffer.from(match[1], "base64");
}

export const ACCEPTED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
];
