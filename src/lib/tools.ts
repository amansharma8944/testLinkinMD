import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => {
    return {
      location,
      temp: 30,
      condition: "Sunny",
    };
  },
});

export const getF1Matches = tool({
  description: "Get upcoming F1 races",
  inputSchema: z.object({}),
  execute: async () => {
    return [
      { race: "Bahrain GP", date: "2026-03-01" },
      { race: "Saudi GP", date: "2026-03-08" },
    ];
  },
});

export const getStockPrice = tool({
  description: "Get stock price for a symbol",
  inputSchema: z.object({
    symbol: z.string(),
  }),
  execute: async ({ symbol }) => {
    return {
      symbol,
      price: 172.4,
    };
  },
});
