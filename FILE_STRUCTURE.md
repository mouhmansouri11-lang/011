# 📑 دليل الملفات والمجلدات

## هيكل المشروع:

```
tabibi-project/
├── client/                          # العميل (React)
│   ├── src/
│   │   ├── pages/                  # جميع الصفحات
│   │   │   ├── Home.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── auth/               # صفحات المصادقة
│   │   │   │   ├── PatientLogin.tsx
│   │   │   │   ├── PatientRegister.tsx
│   │   │   │   ├── ProfessionalLogin.tsx
│   │   │   │   └── ProfessionalRegister.tsx
│   │   │   ├── patient/            # صفحات المريض
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── SearchDoctors.tsx
│   │   │   │   ├── Appointments.tsx
│   │   │   │   ├── Prescriptions.tsx
│   │   │   │   ├── LabResults.tsx
│   │   │   │   ├── BloodPressureDetail.tsx
│   │   │   │   └── BloodSugarDetail.tsx
│   │   │   └── doctor/            # صفحات الطبيب
│   │   │       └── Dashboard.tsx
│   │   ├── components/             # المكونات المشتركة
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── BloodPressureChart.tsx
│   │   │   ├── BloodSugarChart.tsx
│   │   │   ├── AppointmentList.tsx
│   │   │   ├── DoctorAppointmentList.tsx
│   │   │   ├── DoctorProfileCard.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── DashboardLayoutSkeleton.tsx
│   │   │   └── ui/               # مكونات Radix/Tailwind
│   │   ├── contexts/              # Context API
│   │   │   ├── AuthContext.tsx    # المصادقة
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useData.ts        # جلب البيانات من API
│   │   │   └── useToast.ts
│   │   ├── utils/                 # أدوات مساعدة
│   │   │   ├── trpc.ts           # إعدادات tRPC
│   │   │   └── dataManager.ts    # إدارة البيانات
│   │   ├── App.tsx               # التوجيه الرئيسي
│   │   ├── main.tsx              # نقطة الدخول
│   │   └── index.css
│   ├── index.html                # الملف الرئيسي
│   └── vite.config.ts            # إعدادات Vite
│
├── server/                        # السيرفر (Express + tRPC)
│   ├── _core/
│   │   ├── index.ts              # نقطة دخول السيرفر
│   │   ├── context.ts            # إنشاء Context
│   │   ├── env.ts                # متغيرات البيئة
│   │   ├── oauth.ts              # OAuth routes
│   │   └── vite.ts              # إعدادات Vite للسيرفر
│   ├── routers.ts                # API procedures (296 سطر)
│   └── db.ts                     # اتصال قاعدة البيانات
│
├── drizzle/                      # ORM
│   ├── schema.ts                # تعريف الجداول
│   └── migrations/              # ملفات الهجرة
│
├── shared/                       # كود مشترك
│   └── schema.ts               # Zod schemas
│
├── package.json                 # المكتبات والإصدارات
├── tsconfig.json               # إعدادات TypeScript
├── vite.config.ts              # إعدادات Vite الرئيسية
└── .env                        # متغيرات البيئة

```

## الملفات الموثقة:

### 📚 الوثائق الرئيسية:
1. **README_AR.md** - نظرة عامة كاملة بالعربية
2. **STARTUP_GUIDE.md** - دليل البدء السريع
3. **SYSTEM_ARCHITECTURE.md** - هندسة النظام المفصلة
4. **INTEGRATION_GUIDE.md** - دليل إضافة ميزات جديدة
5. **TESTING_GUIDE.md** - خطة الاختبار الشاملة
6. **COMPLETION_SUMMARY.md** - ملخص الإنجازات

## الملفات الحرجة:

### للسيرفر:
- `server/_core/index.ts` ← تشغيل السيرفر هنا
- `server/routers.ts` ← جميع API procedures
- `server/db.ts` ← اتصال قاعدة البيانات

### للعميل:
- `client/src/main.tsx` ← تشغيل التطبيق هنا
- `client/src/App.tsx` ← التوجيه الرئيسي
- `client/src/contexts/AuthContext.tsx` ← المصادقة

### التكوين:
- `vite.config.ts` ← إعدادات البناء
- `tsconfig.json` ← إعدادات TypeScript
- `package.json` ← المكتبات والأوامر

## أوامر مهمة:

```bash
npm run dev          # ← ابدأ من هنا!
npm run build        # بناء للإنتاج
npm run start        # تشغيل الإنتاج
npm run check        # التحقق من الأخطاء
npm run db:push      # هجرة قاعدة البيانات
```

## خريطة البيانات:

### من المريض:
```
Home.tsx 
  ↓ (تسجيل)
PatientLogin.tsx ← AuthContext
  ↓ (يدخل)
PatientDashboard.tsx ← useData (tRPC)
  ├─ BloodPressure
  ├─ BloodSugar
  ├─ Appointments
  └─ Prescriptions
```

### من الطبيب:
```
ProfessionalLogin.tsx ← AuthContext
  ↓ (يدخل)
DoctorDashboard.tsx ← useData (tRPC)
  ├─ Appointments list
  ├─ Patient management
  └─ Profile
```

## التدفق الرئيسي:

1. **المستخدم** يفتح التطبيق
2. **App.tsx** يتحقق من المسار
3. **AuthContext** يتحقق من حالة تسجيل الدخول
4. **useData** يجلب البيانات من السيرفر
5. **tRPC** يتصل بـ routers.ts
6. **routers.ts** يستعلم من Supabase
7. **البيانات** تُعرض على الشاشة

---

**الملفات جاهزة للاستخدام الفوري!**
