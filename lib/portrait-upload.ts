export async function portraitData(file: File) {
  if (!file.size || file.size > 8 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG or WebP portrait under 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const ratio = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
    canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare the portrait.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const size = Math.max(16, Math.round(canvas.width * 0.045));
    context.font = "600 " + size + "px Arial";
    context.textAlign = "right"; context.textBaseline = "bottom";
    context.fillStyle = "rgba(255,255,255,0.85)";
    const width = context.measureText("DOCVY™").width;
    context.fillRect(canvas.width - width - size, canvas.height - size * 1.8, width + size * 0.6, size * 1.4);
    context.fillStyle = "rgba(26,53,70,0.8)";
    context.fillText("DOCVY™", canvas.width - size * 0.7, canvas.height - size * 0.6);
    const result = canvas.toDataURL("image/webp", 0.85);
    if (!result.startsWith("data:image/webp;base64,") || result.length > 2800000) throw new Error("Choose a smaller portrait and try again.");
    return result;
  } finally { bitmap.close(); }
}
