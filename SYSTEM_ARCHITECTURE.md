# نظام Tabibi المتكامل - الهندسة المعمارية

## نظرة عامة على النظام

تم بناء تطبيق Tabibi كنظام متكامل يربط جميع الصفحات والمكونات من خلال:
- **واجهات موحدة** (TRPC) لتبادل البيانات
- **نظام مصادقة** مركزي (AuthContext)
- **إدارة حالة** عبر Zustand/React hooks
- **قاعدة بيانات** Supabase للتخزين الدائم

## البنية الهرمية

```
client/src/
├── pages/
│   ├── Home.tsx (الصفحة الرئيسية)
│   ├── auth/
│   │   ├── PatientLogin.tsx (تسجيل دخول المريض)
│   │   ├── PatientRegister.tsx (تسجيل المريض)
│   │   ├── ProfessionalLogin.tsx (تسجيل دخول الطبيب)
│   │   └── ProfessionalRegister.tsx (تسجيل الطبيب)
│   ├── patient/
│   │   ├── Dashboard.tsx (لوحة تحكم المريض)
│   │   ├── Appointments.tsx (المواعيد)
│   │   ├── SearchDoctors.tsx (البحث عن أطباء)
│   │   ├── Prescriptions.tsx (الوصفات)
│   │   ├── LabResults.tsx (نتائج المختبر)
│   │   ├── BloodPressureDetail.tsx (تفاصيل ضغط الدم)
│   │   └── BloodSugarDetail.tsx (تفاصيل سكر الدم)
│   ├── doctor/
│   │   └── Dashboard.tsx (لوحة تحكم الطبيب)
│   └── NotFound.tsx (صفحة 404)
├── components/
│   ├── DashboardLayout.tsx (إطار عمل اللوحة)
│   ├── BloodPressureChart.tsx (رسم البيانات)
│   ├── BloodSugarChart.tsx (رسم البيانات)
│   ├── AppointmentList.tsx (قائمة المواعيد)
│   ├── DoctorAppointmentList.tsx (مواعيد الطبيب)
│   ├── DoctorProfileCard.tsx (بطاقة الطبيب)
│   └── ... (مكونات أخرى)
├── contexts/
│   ├── AuthContext.tsx (إدارة المصادقة)
│   └── ThemeContext.tsx (إدارة المظهر)
├── hooks/
│   ├── useData.ts (جلب البيانات)
│   └── ... (hooks أخرى)
├── utils/
│   ├── trpc.ts (إعدادات tRPC)
│   ├── dataManager.ts (مدير البيانات)
│   └── ...
├── App.tsx (المكون الرئيسي مع التوجيه)
├── main.tsx (نقطة الدخول)
└── index.css (الأنماط العالمية)

server/
├── routers.ts (جميع tRPC procedures)
├── db.ts (اتصال قاعدة البيانات)
├── _core/
│   ├── trpc.ts (إعدادات tRPC)
│   ├── env.ts (متغيرات البيئة)
│   ├── cookies.ts (إدارة الكوكيز)
│   └── systemRouter.ts (نظام الموجهات)
└── ...

drizzle/
└── schema.ts (تعريف الجداول)
```

## تدفق البيانات

### 1. المصادقة
```
المستخدم يدخل بيانات
    ↓
صفحة PatientLogin / ProfessionalLogin
    ↓
router.auth.sendOTP() أو router.auth.login()
    ↓
قاعدة البيانات
    ↓
AuthContext يحدث الحالة
    ↓
الصفحة تعيد التوجيه إلى Dashboard
```

### 2. جلب بيانات المريض
```
Patient Dashboard يحمل
    ↓
useQuery للـ tRPC:
  - patient.getProfile
  - patient.getAppointments
  - patient.getBloodPressure
  - patient.getBloodSugar
  - patient.getPrescriptions
  - patient.getLabResults
    ↓
Server يجلب من Supabase
    ↓
React Query يحفظ في Cache
    ↓
المكونات تعرض البيانات
```

### 3. البحث عن الأطباء
```
SearchDoctors يدخل معايير البحث
    ↓
search.searchDoctors (specialization, wilaya, name)
    ↓
Server يبحث في Supabase
    ↓
النتائج تعرض في الصفحة
    ↓
المستخدم يختار طبيب
    ↓
حجز موعد
```

## ملفات المفاتيح

### AuthContext.tsx
- يدير حالة المستخدم
- يتابع مصادقة المستخدم
- يوفر hooks: `useAuth()`

### routers.ts (server)
- يحتوي على جميع tRPC procedures
- ينقسم إلى:
  - `auth` - تسجيل الدخول والخروج
  - `patient` - عمليات المريض
  - `doctor` - عمليات الطبيب
  - `search` - البحث

### App.tsx
- يحتوي على توجيه العرض (Routing)
- جميع الصفحات معرفة هنا
- Providers ملفوفة حول التطبيق

### dataManager.ts
- يدير جلب البيانات المركزي
- يحفظ البيانات في الذاكرة المؤقتة
- يقدم interface موحد

## كيفية إضافة ميزة جديدة

### 1. أضف procedure في server/routers.ts
```typescript
export const appRouter = router({
  myFeature: router({
    getItems: publicProcedure.query(async ({ ctx }) => {
      // منطق جلب البيانات
    }),
    createItem: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // منطق الإنشاء
      })
  })
});
```

### 2. استخدم في client
```typescript
const itemsQuery = trpc.myFeature.getItems.useQuery();
const createMutation = trpc.myFeature.createItem.useMutation();

// في الاستخدام
await createMutation.mutateAsync({ name: "test" });
```

### 3. اربط بـ UI
```typescript
// في المكون
{itemsQuery.data?.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

## نقاط التكامل الرئيسية

1. **تسجيل الدخول** ← واجهة موحدة في AuthContext
2. **جلب البيانات** ← tRPC queries و mutations
3. **إدارة الحالة** ← React Query + Context API
4. **التخزين** ← Supabase (PostgreSQL)
5. **التوجيه** ← wouter

## متغيرات البيئة المطلوبة

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# API
VITE_API_URL=http://localhost:3000
```

## الخطوات التالية

1. تثبيت جميع المكتبات: `npm install`
2. إعداد Supabase والبيانات
3. تشغيل السيرفر: `npm run server`
4. تشغيل العميل: `npm run dev`
5. اختبار جميع الصفحات والتدفقات
