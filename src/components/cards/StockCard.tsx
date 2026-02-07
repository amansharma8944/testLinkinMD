import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockResult } from  "../../types/tools";

export default function StockCard({ data }: { data: StockResult }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.symbol} Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <p>💰 ${data.price}</p>
      </CardContent>
    </Card>
  );
}
