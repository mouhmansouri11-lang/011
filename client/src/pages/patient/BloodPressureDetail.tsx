import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";

export default function BloodPressureDetail() {
  const bpQuery = trpc.patient.getBloodPressure.useQuery();

  return (
    <DashboardLayout title="ضغط الدم">
      <div className="space-y-6">
        {bpQuery.isLoading ? (
          <Card className="p-8 text-center">جاري التحميل...</Card>
        ) : bpQuery.data?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">لا توجد قياسات ضغط دم مسجلة</p>
          </Card>
        ) : (
          bpQuery.data?.map((bp: any) => (
            <Card key={bp.id} className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded">
                  <p className="text-sm text-gray-600">الضغط الانقباضي</p>
                  <p className="text-2xl font-bold text-red-600">{bp.systolic} mmHg</p>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600">الضغط الانبساطي</p>
                  <p className="text-2xl font-bold text-blue-600">{bp.diastolic} mmHg</p>
                </div>
                {bp.pulse && (
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-sm text-gray-600">النبض</p>
                    <p className="text-2xl font-bold text-green-600">{bp.pulse} bpm</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                التاريخ: {new Date(bp.recordedAt).toLocaleString('ar-SA')}
              </p>
              {bp.notes && <p className="text-gray-600 mt-2">ملاحظات: {bp.notes}</p>}
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
