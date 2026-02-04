import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BloodSugarRecord {
  id: number;
  value: number;
  type: string;
  createdAt: string;
}

export function BloodSugarChart({ data = [] }: { data?: BloodSugarRecord[] }) {
  const chartData = data.map(record => ({
    date: new Date(record.createdAt).toLocaleDateString("ar-DZ"),
    value: record.value,
    type: record.type,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">سكر الدم</h3>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#f97316" name="سكر الدم" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-8">لا توجد بيانات متوفرة</p>
      )}
    </Card>
  );
}
