import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { F1Result } from  "../../types/tools";

export default function F1Card({ data }: { data: F1Result }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next F1 Race</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.raceName}</p>
        <p>{data.circuit}</p>
        <p>{data.date}</p>
      </CardContent>
    </Card>
  );
}
