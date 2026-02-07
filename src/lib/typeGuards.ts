import { WeatherResult, F1Result, StockResult } from "@/types/tools";

export function isWeatherResult(data: unknown): data is WeatherResult {
  return (
    typeof data === "object" &&
    data !== null &&
    "location" in data &&
    "temp" in data &&
    "condition" in data
  );
}

export function isF1Result(data: unknown): data is F1Result {
  return (
    typeof data === "object" &&
    data !== null &&
    "raceName" in data &&
    "circuit" in data &&
    "date" in data
  );
}

export function isStockResult(data: unknown): data is StockResult {
  return (
    typeof data === "object" &&
    data !== null &&
    "symbol" in data &&
    "price" in data
  );
}
