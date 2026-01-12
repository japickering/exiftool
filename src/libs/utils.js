export async function readMetadata(imagePath) {
  const res = await fetch("/api/read-data", {
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

export async function writeMetadata(imagePath, prompt) {
  const res = await fetch("/api/write-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imagePath, prompt }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to wrote metadata");
  }

  const data = await res.json();
  return data.content;
}
