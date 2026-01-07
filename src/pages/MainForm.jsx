import { useState } from "react";

async function readMetadata(imagePath) {
  const res = await fetch("/api/exif-read", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imagePath }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to read metadata");
  }

  const data = await res.json();
  return data.content;
}

export default function MainForm() {
  const [src, setSrc] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (src.includes(".jpg") || src.includes(".png")) {
      try {
        const res = await readMetadata(src);
        setOutput(res);
      } catch (error) {
        setOutput(error.message);
      }
    } else {
      setOutput("no valid file extension");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="src">Image URL</label>
        <input
          type="text"
          id="src"
          placeholder="Image URL"
          value={src}
          onChange={(event) => setSrc(event.target.value)}
        />
        <label htmlFor="output">Metadata</label>
        <textarea name="output" id="output" rows={10} value={output} readOnly />
      </div>
      <button type="submit" className="primary">
        Submit Image
      </button>
    </form>
  );
}
