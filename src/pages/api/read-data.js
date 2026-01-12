import { exiftool } from "exiftool-vendored";

export default async function handler(req, res) {
  const { imagePath } = req.body || {};

  if (!imagePath || typeof imagePath !== "string") {
    return res.status(400).json({ error: "Missing imagePath" });
  }

  try {
    const tags = await exiftool.read(imagePath);
    let content = `Description: ${tags.Description || ""}`.trim();
    content += "\n" + `Author: Your AI Generator App`;
    content +=
      "\n" + `Size: ${tags.ImageWidth || "?"}x${tags.ImageHeight || "?"}`;

    // shut down the child process when done
    await exiftool.end();

    return res.status(200).json({ content });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Failed to read metadata" });
  }
}
