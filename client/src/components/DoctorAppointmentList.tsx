import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Clock } from "lucide-react";

interface DoctorAppointment {
  id: number;
  patientName?: string;
  patientPhone?: string;
  date: string;
  time: string;
  reason?: string;
  status?: string;
  clinicAddress?: string;
}

export function DoctorAppointmentList({ data = [] }: { data?: DoctorAppointment[] }) {
  if (data.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500 mb-4">لا توجد مواعيد</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map(apt => (
        <Card key={apt.id} className="p-4 hover:shadow-md transition">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold mb-2">{apt.patientName || "مريض"}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(apt.date).toLocaleDateString("ar-DZ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{apt.time}</span>
                </div>
                {apt.patientPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">{apt.patientPhone}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                {apt.status === "completed" ? "مكتمل" : apt.status === "pending" ? "قيد الانتظار" : "مؤكد"}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
