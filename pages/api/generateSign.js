import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { sessionId, amount, currency, merchantId, posId, crc } = req.body;

  if (!sessionId || !amount || !currency || !merchantId || !posId || !crc) {
    return res.status(400).json({ error: "Missing required field" });
  }

  // Tworzymy string do podpisu
  const stringToSign = `${sessionId}|${merchantId}|${posId}|${amount}|${currency}|${crc}`;

  // Generujemy hash SHA384
  const hash = crypto.createHash("sha384").update(stringToSign).digest("hex");

  // Zwracamy dodatkowe dane do debugowania
  return res.status(200).json({
    sign: hash,
    stringToSign,
    sessionId,
    amount,
    currency,
    merchantId,
    posId,
    crc
  });
}
