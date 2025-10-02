import { Anthropic } from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of items that a user has and suggests a halloween costume idea they could be with some or all of those items. You don't need to use every item they mention in your recipe. The costume can include additional items they didn't mention, but try not to include too many extra items. Format your response in markdown to make it easier to render to a web page.
`;

const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

const anthropic = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
});

export async function getCostumeRecommendation(itemsArr) {
    try {
        const itemsStr = itemsArr.join(", ")
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have ${itemsStr}. Please give me a costume you'd recommend I can be for the upcoming Halloween!` },
            ],
        });
        return msg.content[0].text
    } catch (error) {
        console.error("Error fetching recommendation:", error.message || error);
        throw new Error("Failed to fetch recommendation. Please try again later.");
    }
}
