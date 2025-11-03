const fetch = require("node-fetch");

const PROVIDER = (process.env.TRANSLATION_PROVIDER || "none").toLowerCase();
const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION;
const AZURE_ENDPOINT =
  process.env.AZURE_TRANSLATOR_ENDPOINT ||
  "https://api.cognitive.microsofttranslator.com";

async function azureTranslate(text, target) {
  const url = `${AZURE_ENDPOINT}/translate?api-version=3.0&from=en&to=${target}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": AZURE_KEY,
      "Ocp-Apim-Subscription-Region": AZURE_REGION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ text }]),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Azure Translator API error: ${res.status} ${errorText}`);
  }

  const json = await res.json();
  const translated = json?.[0]?.translations?.[0]?.text;
  return translated || text;
}

async function translateText(text, targetLang) {
  if (!text) return text;

  if (PROVIDER === "azure" && AZURE_KEY && AZURE_REGION) {
    return azureTranslate(text, targetLang);
  }

  // No provider configured: return original text as fallback
  return text;
}

module.exports = { translateText };
