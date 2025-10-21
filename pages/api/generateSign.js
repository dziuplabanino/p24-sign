import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { sessionId, amount, currency, env } = req.body;

  const merchantId = "354420"; // stała wartość
  const crc = "dd8322d9ded19b5a"; // <- zmień na swój CRC z p24
  const data = {
    sessionId,
    merchantId,
    amount,
    currency,
    crc,
  };

  // Utwórz string do podpisania
  const composeString = JSON.stringify(data, Object.keys(data).sort());

  // Wybierz algorytm (SHA384 lub SHA512)
  const hash = crypto.createHash("sha384").update(composeString).digest("hex");

  return res.status(200).json({ sign: hash });
}
