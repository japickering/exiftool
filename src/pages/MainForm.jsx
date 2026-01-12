import { useState } from "react";
import { readMetadata, writeMetadata } from "@/libs/utils";

const fileExtension = "image filename must include .jpg or .png extension";

export default function MainForm() {
  const [src, setSrc] = useState("");
  const [prompt, setPrompt] = useState("");
  const [log, setLog] = useState("");

  const readFile = async (event) => {
    event.preventDefault();
    if (src.includes(".jpg") || src.includes(".png")) {
      try {
        const res = await readMetadata(src);
        setLog(res);
      } catch (error) {
        setLog(error.message);
      }
    } else {
      setLog(fileExtension);
    }
  };

  const writeFile = async (event) => {
    event.preventDefault();
    if (src.includes(".jpg") || src.includes(".png")) {
      try {
        const res = await writeMetadata(src, prompt);
        setLog(res);
      } catch (error) {
        setLog(error.message);
      } finally {
        const res = await readMetadata(src);
        setLog(res);
      }
    } else {
      setLog(fileExtension);
    }
  };

  return (
    <form>
      <section>
        <label htmlFor="src">Input image source</label>
        <input
          type="text"
          id="src"
          placeholder="path/to/image.jpg"
          value={src}
          onChange={(event) => setSrc(event.target.value)}
        />
        <button onClick={readFile}>Read Metadata</button>
      </section>
      <section>
        <label htmlFor="prompt">Edit image description</label>
        <input
          type="text"
          id="prompt"
          placeholder="Enter description"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button onClick={writeFile}>Save Metadata</button>
      </section>
      <div>
        <label htmlFor="log">Metadata</label>
        <textarea name="log" id="log" rows={10} value={log} readOnly />
      </div>
    </form>
  );
}
