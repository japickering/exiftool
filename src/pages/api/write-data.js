import { exiftool } from "exiftool-vendored";

export default async function handler(req, res) {
  const { imagePath, prompt } = req.body || {};

  if (!imagePath || typeof imagePath !== "string") {
    return res.status(400).json({ error: "Missing imagePath" });
  }
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    await exiftool.write(imagePath, {
      Description: prompt,
      Author: "EXIF Tool",
    });
    const content = `Metadata written to ${imagePath}`;

    return res.status(200).json({ content });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Failed to write metadata" });
  }
}
