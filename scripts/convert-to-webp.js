import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const inputDir = "./src/assets/images";
const outputDir = "./src/assets/images";

async function convertToWebP() {
  try {
    const files = await readdir(inputDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file),
    );

    console.log(`Found ${imageFiles.length} images to convert...`);

    for (const file of imageFiles) {
      const inputPath = join(inputDir, file);
      const outputPath = join(
        outputDir,
        file.replace(/\.(jpg|jpeg|png|gif)$/i, ".webp"),
      );

      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      console.log(
        `✓ Converted: ${file} → ${file.replace(/\.(jpg|jpeg|png|gif)$/i, ".webp")}`,
      );
    }

    console.log(
      `\n✅ Successfully converted ${imageFiles.length} images to WebP!`,
    );
  } catch (error) {
    console.error("Error converting images:", error);
    process.exit(1);
  }
}

convertToWebP();
