const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function main(fullName) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullName,
    config: {
      systemInstruction: `Generate the blog description in clean Markdown format.
Use headings, bold text, and bullet points properly.
Do not use emojis inside bold text.
Ensure correct spacing between paragraphs.
Return only valid Markdown.
`,
    },
  });
  return response.text;
}

module.exports = main;
