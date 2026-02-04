import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BloodPressureRecord {
  id: number;
  systolic: number;
  diastolic: number;
  createdAt: string;
}

export function BloodPressureChart({ data = [] }: { data?: BloodPressureRecord[] }) {
  const chartData = data.map(record => ({
    date: new Date(record.createdAt).toLocaleDateString("ar-DZ"),
    systolic: record.systolic,
    diastolic: record.diastolic,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">ضغط الدم</h3>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="الانقباضي" />
            <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="الانبساطي" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-8">لا توجد بيانات متوفرة</p>
      )}
    </Card>
  );
}
