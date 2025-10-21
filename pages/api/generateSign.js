import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { sessionId, amount, currency } = req.body;

  const merchantId = "354420"; // Twój merchantId
  const posId = "354420"; // czasem wymagane
  const crc = "dd8322d9ded19b5a"; // wpisz swój CRC z panelu P24

  // P24 chce string w formacie: sessionId|merchantId|amount|currency|crc
  const stringToSign = `${sessionId}|${merchantId}|${posId}|${amount}|${currency}|${crc}`;

  const hash = crypto.createHash("sha384").update(stringToSign).digest("hex");

  return res.status(200).json({ sign: hash });
}
