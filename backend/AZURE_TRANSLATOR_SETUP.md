# Azure Translator Setup Guide

This guide will help you set up Azure Translator for automatic translation of project content to Sinhala and Tamil.

## Prerequisites

- Azure account (free tier available)
- Azure subscription

## Steps

### 1. Create Azure Translator Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource**
3. Search for **Translator** (or "Translator Text")
4. Click **Create**

### 2. Configure the Resource

- **Subscription**: Select your subscription
- **Resource Group**: Create new or use existing
- **Region**: Choose closest to you (e.g., `eastus`, `westeurope`, `southeastasia`)
- **Name**: Give it a unique name (e.g., `gis-project-translator`)
- **Pricing tier**:
  - **Free (F0)**: 2M characters/month free (recommended for development)
  - **Standard (S1)**: Pay-as-you-go for production

### 3. Get Your Credentials

After deployment:

1. Go to your Translator resource
2. Click **Keys and Endpoint** in the left sidebar
3. Copy:
   - **KEY 1** or **KEY 2** (either works)
   - **Location/Region** (e.g., `eastus`)
   - **Endpoint** (usually `https://api.cognitive.microsofttranslator.com`)

### 4. Update Your `.env` File

```env
# Translation
TRANSLATION_PROVIDER=azure
AZURE_TRANSLATOR_KEY=your-key-here
AZURE_TRANSLATOR_REGION=your-region-here
# Optional: defaults to global endpoint
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
```

### 5. Test Your Setup

1. Start your server:

   ```bash
   npm run dev
   ```

2. Use Postman to create a project:

   ```json
   POST /api/projects
   {
     "title": "Test Project",
     "description": "This is a test description",
     "imageUrl": "https://example.com/image.jpg"
   }
   ```

3. Check the different language versions:
   - `GET /api/projects?lang=en` → English (original)
   - `GET /api/projects?lang=si` → Sinhala (translated)
   - `GET /api/projects?lang=ta` → Tamil (translated)

## Language Codes

- `en` → English (source language)
- `si` → Sinhala
- `ta` → Tamil

## Pricing

### Free Tier (F0)

- 2 million characters per month
- Good for development and small projects
- No credit card required for Azure free account

### Standard Tier (S1)

- $10 per million characters
- Suitable for production with high volume

## Troubleshooting

### Error: "Access Denied" or "401 Unauthorized"

- Verify your `AZURE_TRANSLATOR_KEY` is correct
- Check that the key hasn't expired
- Ensure you're using KEY 1 or KEY 2 (not a different credential)

### Error: "Invalid Region"

- Make sure `AZURE_TRANSLATOR_REGION` matches your resource location
- Use lowercase region names (e.g., `eastus` not `East US`)

### Translation Not Working

- Check `TRANSLATION_PROVIDER=azure` (not `none`)
- Verify all three env variables are set
- Restart your server after updating `.env`

### Rate Limit Errors

- Free tier: 2M characters/month limit
- Consider upgrading to Standard tier
- Or implement caching for frequently translated content

## Testing Without Azure (Development)

If you're not ready to set up Azure yet:

```env
TRANSLATION_PROVIDER=none
```

This will store the English text in all three collections without translation, so you can continue development.

## Additional Resources

- [Azure Translator Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/)
- [Azure Translator API Reference](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-reference)
- [Supported Languages](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/language-support)
- [Pricing Calculator](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/translator/)

## Security Best Practices

- ✅ Never commit your `.env` file to Git
- ✅ Use different keys for development and production
- ✅ Rotate keys periodically
- ✅ Monitor usage in Azure Portal to avoid unexpected charges
- ✅ Set up spending limits in Azure if needed
