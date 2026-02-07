import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getWeather, getF1Matches, getStockPrice } from "@/lib/tools";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-pro"),
    messages,
    tools: {
      getWeather,
      getF1Matches,
      getStockPrice,
    },
  });

  return result.toTextStreamResponse();

}
