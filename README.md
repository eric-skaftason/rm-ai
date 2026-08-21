# RM-AI
Encourages human thinking by removing unnecessary AI from google.com and making outsourcing the thinking process to AI more difficult.

## How to load unpacked extension
1. In Chrome, go to `chrome://extensions`
2. Enable Developer mode via the toggle at the top right
3. Click `Load unpacked`
4. Select the folder containing the extension

## Demo video
Demo video is available in the project location: `/demo/demo.mp4`

## Features
- Remove AI overview from Google search
- Remove "AI mode" buttons from google.com
- Add a 20 second pause before loading an LLM site
- settings menu popup

The pause delay applies to major LLM sites including:
- ChatGPT (`chatgpt.com`)
- Claude (`claude.ai`)
- Google Gemini (`gemini.google.com`)
- Microsoft Copilot (`copilot.microsoft.com`)
- Perplexity (`perplexity.ai`)
- DeepSeek (`chat.deepseek.com`)
- full list can be found in the manifest.json

## Privacy
This extension does not collect or transmit any user data or browsing history; it runs strictly locally.

## Permissions
The extension must have access to google.com as well as the supported LLM sites.  Requires storage permission to save settings and scripting to edit specified pages when necessary.