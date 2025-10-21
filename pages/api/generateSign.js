import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  // Bierzemy wszystkie potrzebne pola z body
  const { sessionId, amount, currency, merchantId, posId, crc } = req.body;

  if (!sessionId || !amount || !currency || !merchantId || !posId || !crc) {
    return res.status(400).json({ error: "Missing required field" });
  }

  // Tworzymy string do podpisu w dokładnie takiej kolejności
  const stringToSign = `${sessionId}|${merchantId}|${posId}|${amount}|${currency}|${crc}`;

  // Generujemy hash SHA384
  const hash = crypto.createHash("sha384").update(stringToSign).digest("hex");

  return res.status(200).json({ sign: hash });
}
