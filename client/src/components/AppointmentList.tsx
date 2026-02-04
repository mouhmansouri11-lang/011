import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User } from "lucide-react";

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorName?: string;
  clinicName?: string;
  reason?: string;
  status?: string;
}

export function AppointmentList({ data = [], onBook }: { data?: Appointment[]; onBook?: () => void }) {
  if (data.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500 mb-4">لا توجد مواعيد حالية</p>
        <Button onClick={onBook}>حجز موعد جديد</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map(apt => (
        <Card key={apt.id} className="p-4 flex items-start justify-between hover:shadow-md transition">
          <div className="flex-1">
            <h4 className="font-semibold mb-2">{apt.doctorName || apt.clinicName}</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(apt.date).toLocaleDateString("ar-DZ")}</span>
              </div>
              {apt.reason && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{apt.reason}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {apt.status || "مجدول"}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
