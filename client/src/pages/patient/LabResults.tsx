import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";

export default function LabResults() {
  const labResultsQuery = trpc.patient.getLabResults.useQuery();

  return (
    <DashboardLayout title="نتائج المختبر">
      <div className="space-y-6">
        {labResultsQuery.isLoading ? (
          <Card className="p-8 text-center">جاري التحميل...</Card>
        ) : labResultsQuery.data?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">لا توجد نتائج مختبر</p>
          </Card>
        ) : (
          labResultsQuery.data?.map((lab: any) => (
            <Card key={lab.id} className="p-6">
              <h3 className="font-bold mb-2">{lab.testName}</h3>
              <p className="text-gray-600">
                تاريخ الطلب: {new Date(lab.orderedDate).toLocaleDateString('ar-SA')}
              </p>
              {lab.resultDate && (
                <p className="text-gray-600">
                  تاريخ النتيجة: {new Date(lab.resultDate).toLocaleDateString('ar-SA')}
                </p>
              )}
              {lab.results && (
                <div className="mt-3">
                  <p className="font-medium mb-2">النتائج:</p>
                  {Array.isArray(lab.results) && lab.results.map((result: any, i: number) => (
                    <p key={i} className="text-sm text-gray-600">
                      {result.name}: {result.value} {result.unit} ({result.status})
                    </p>
                  ))}
                </div>
              )}
              {lab.notes && <p className="text-gray-600 mt-2">ملاحظات: {lab.notes}</p>}
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
