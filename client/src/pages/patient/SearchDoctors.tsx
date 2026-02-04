import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";
import { Loader2, Star, Phone, MapPin } from "lucide-react";

export default function SearchDoctors() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [wilaya, setWilaya] = useState("");

  const searchMutation = trpc.search.searchDoctors.useMutation();
  const [doctors, setDoctors] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await searchMutation.mutateAsync({
        name: query || undefined,
        specialization: specialization || undefined,
        wilaya: wilaya || undefined,
      });
      setDoctors(results);
      console.log("[v0] Search results:", results);
    } catch (error) {
      console.error("[v0] Search error:", error);
    }
  };

  const specializations = [
    "أخصائي القلب",
    "أخصائي الأعصاب",
    "أخصائي الجهاز الهضمي",
    "أخصائي الجراحة",
    "أخصائي العيون",
    "طبيب أسنان",
    "أخصائي الجلدية",
  ];

  const wilayas = [
    "الجزائر",
    "قسنطينة",
    "الإسكندرية",
    "وهران",
    "تيارت",
    "سطيف",
    "أم البواقي",
  ];

  return (
    <DashboardLayout title="البحث عن الأطباء">
      <div className="space-y-6">
        {/* Search Form */}
        <Card className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم الطبيب</label>
                <Input
                  placeholder="ابحث عن الطبيب..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">التخصص</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">جميع التخصصات</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الولاية</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                >
                  <option value="">جميع الولايات</option>
                  {wilayas.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={searchMutation.isPending}
            >
              {searchMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري البحث...
                </>
              ) : (
                "ابحث"
              )}
            </Button>
          </form>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {doctors.length === 0 && !searchMutation.isPending && (
            <Card className="p-8 text-center">
              <p className="text-gray-600">لم يتم العثور على نتائج. حاول تغيير معايير البحث.</p>
            </Card>
          )}

          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {doctor.userId ? `دكتور - ${doctor.specialization}` : doctor.professionalType}
                  </h3>

                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.wilaya} - {doctor.commune}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{doctor.phone}</span>
                    </div>
                    {doctor.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{doctor.rating.toFixed(1)} ({doctor.reviewCount} تقييم)</span>
                      </div>
                    )}
                  </div>

                  {doctor.bio && (
                    <p className="text-sm text-gray-700 mb-4">{doctor.bio}</p>
                  )}
                </div>

                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    {doctor.consultationFee ? `${doctor.consultationFee} دج` : "مجاني"}
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    احجز موعد
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
