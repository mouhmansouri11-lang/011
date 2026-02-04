import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";

export default function BloodSugarDetail() {
  const bsQuery = trpc.patient.getBloodSugar.useQuery();

  return (
    <DashboardLayout title="السكر في الدم">
      <div className="space-y-6">
        {bsQuery.isLoading ? (
          <Card className="p-8 text-center">جاري التحميل...</Card>
        ) : bsQuery.data?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">لا توجد قياسات سكر دم مسجلة</p>
          </Card>
        ) : (
          bsQuery.data?.map((bs: any) => (
            <Card key={bs.id} className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 p-4 rounded">
                  <p className="text-sm text-gray-600">قيمة السكر</p>
                  <p className="text-2xl font-bold text-orange-600">{bs.value} mg/dL</p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-sm text-gray-600">النوع</p>
                  <p className="text-lg font-bold text-purple-600">
                    {bs.type === 'fasting' ? 'صائم' : bs.type === 'after_meal' ? 'بعد الطعام' : 'عشوائي'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                التاريخ: {new Date(bs.recordedAt).toLocaleString('ar-SA')}
              </p>
              {bs.notes && <p className="text-gray-600 mt-2">ملاحظات: {bs.notes}</p>}
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
