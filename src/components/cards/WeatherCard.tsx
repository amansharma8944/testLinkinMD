import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherResult } from "../../types/tools";

export default function WeatherCard({ data }: { data: WeatherResult }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather – {data.location}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>🌡 {data.temp} °C</p>
        <p>☁ {data.condition}</p>
      </CardContent>
    </Card>
  );
}
