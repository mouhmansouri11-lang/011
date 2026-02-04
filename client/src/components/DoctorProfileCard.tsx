import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Star } from "lucide-react";

interface DoctorProfile {
  id: number;
  name: string;
  specialization?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
  wilaya?: string;
  address?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
}

export function DoctorProfileCard({ data }: { data?: DoctorProfile }) {
  if (!data) {
    return <Card className="p-6">جاري تحميل البيانات...</Card>;
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            {data.specialization && (
              <p className="text-gray-600">{data.specialization}</p>
            )}
          </div>
          {data.isVerified && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              معتمد
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {data.yearsOfExperience && (
            <div>
              <p className="text-sm text-gray-600">سنوات الخبرة</p>
              <p className="font-semibold">{data.yearsOfExperience} سنة</p>
            </div>
          )}
          {data.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{data.rating}</span>
              <span className="text-sm text-gray-600">({data.reviewCount})</span>
            </div>
          )}
        </div>

        {data.address && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-1 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">{data.wilaya}</p>
              <p className="font-medium">{data.address}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
