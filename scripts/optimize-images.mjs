import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return fullPath;
    })
  );
  return files.flat();
}

async function convertPngToWebp(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath);
  await unlink(pngPath);
  console.log(`Converted: ${path.relative(process.cwd(), pngPath)} -> ${path.relative(process.cwd(), webpPath)}`);
}

async function main() {
  const exists = await stat(publicDir).then(() => true).catch(() => false);
  if (!exists) {
    console.error('Public directory not found.');
    process.exit(1);
  }

  const files = await walk(publicDir);
  const pngFiles = files.filter((file) => /\.png$/i.test(file));

  if (pngFiles.length === 0) {
    console.log('No PNG files found in /public.');
    return;
  }

  const failures = [];

  for (const pngFile of pngFiles) {
    try {
      await convertPngToWebp(pngFile);
    } catch (error) {
      failures.push({
        file: path.relative(process.cwd(), pngFile),
        reason: error instanceof Error ? error.message : String(error),
      });
      console.warn(`Skipped: ${path.relative(process.cwd(), pngFile)} (${error instanceof Error ? error.message : String(error)})`);
    }
  }

  if (failures.length > 0) {
    console.warn("\nSome files could not be converted:");
    failures.forEach((failure) => {
      console.warn(`- ${failure.file}: ${failure.reason}`);
    });
  }
}

main().catch((error) => {
  console.error('Image optimization failed:', error);
  process.exit(1);
});
