import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { sessionId, amount, currency, merchantId, crc } = req.body;

  if (!sessionId || !amount || !currency || !merchantId || !crc) {
    return res.status(400).json({ error: "Missing required field" });
  }

  // UWAGA: poprawny sposób liczenia SIGN wg P24:
  const data = {
    sessionId,
    merchantId: Number(merchantId),
    amount: Number(amount),
    currency,
    crc
  };

  const sign = crypto
    .createHash("sha384")
    .update(JSON.stringify(data, Object.keys(data)))
    .digest("hex");

  return res.status(200).json({ sign });
}
