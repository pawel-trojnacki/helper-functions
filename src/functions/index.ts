export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ę/g, "e")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ł/g, "l")
    .replace(/ż/g, "z")
    .replace(/ź/g, "z")
    .replace(/ć/g, "c")
    .replace(/ń/g, "n");
}

export function parseEmailProducts (message: string) {
  const lines = message.split("\n").map(line => line.trim()).filter(line => line !== "");
  const available: string[] = [];
  const unavailable: string[] = [];

  lines.forEach(line => {
    const match = line.match(/^(.+?)\s*[-–—]/);
    console.log(match);
    if (!match) return;
    const beforeDash = match[1].trim();

    const codeMatch = beforeDash.match(/[A-Z]+\s*\d*\.?\d*/i);
    if (!codeMatch) return;

    const productCode = codeMatch[0].trim();
    const normalizedLine = normalizeText(line);

    if (/sa na stanie/i.test(normalizedLine)) {
      available.push(productCode);
    } else {
      unavailable.push(productCode);
    }
  });

  return { available, unavailable };
}
