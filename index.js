const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

app.post("/generateSign", (req, res) => {
  const { sessionId, amount, currency, env } = req.body;

  if (!sessionId || !amount || !currency) {
    return res.status(400).json({ error: "Missing field" });
  }

  // Wybór CRC i merchantId w zależności od środowiska
  const merchantId = env === "prod" ? "PROD_MERCHANT_ID" : "354420";
  const crc = env === "prod" ? "PROD_CRC" : "dd8322d9ded19b5a";

  const data = sessionId + merchantId + amount + currency + crc;
  const sign = crypto.createHash("sha384").update(data).digest("hex");

  res.json({ sign });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
