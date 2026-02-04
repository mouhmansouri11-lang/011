# محرك نظام تطبيق طبيبي المتكامل

## نظرة عامة
تم إنشاء محرك متكامل يربط جميع صفحات التطبيق معاً عبر Supabase. النظام يوفر:

### المميزات الرئيسية:

1. **نظام المصادقة الموحد**
   - تسجيل دخول المرضى عبر OTP
   - تسجيل دخول المتخصصين عبر البريد الإلكتروني
   - إدارة الجلسات والمستخدمين

2. **لوحات التحكم**
   - لوحة تحكم المريض: عرض المواعيد والوصفات والفحوصات والسجلات الصحية
   - لوحة تحكم الطبيب: إدارة المواعيد والمرضى والتقييمات

3. **الصفحات المتصلة**
   - الصفحة الرئيسية
   - تسجيل الدخول والتسجيل
   - البحث عن الأطباء
   - المواعيد والوصفات والنتائج

## البنية المعمارية

```
client/
├── src/
│   ├── App.tsx (التطبيق الرئيسي مع التوجيه)
│   ├── main.tsx (نقطة الدخول مع tRPC)
│   ├── index.css (الأنماط العام)
│   ├── contexts/
│   │   └── AuthContext.tsx (إدارة المصادقة والمستخدم)
│   ├── hooks/
│   │   └── useData.ts (hooks لجلب البيانات)
│   ├── utils/
│   │   ├── trpc.ts (إعداد tRPC)
│   │   └── dataManager.ts (إدارة البيانات العام)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── auth/
│   │   │   ├── PatientLogin.tsx
│   │   │   ├── PatientRegister.tsx
│   │   │   ├── ProfessionalLogin.tsx
│   │   │   └── ProfessionalRegister.tsx
│   │   ├── patient/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Appointments.tsx
│   │   │   ├── SearchDoctors.tsx
│   │   │   ├── Prescriptions.tsx
│   │   │   ├── LabResults.tsx
│   │   │   ├── BloodPressureDetail.tsx
│   │   │   └── BloodSugarDetail.tsx
│   │   └── doctor/
│   │       └── Dashboard.tsx
│   └── components/
│       └── DashboardLayout.tsx (تخطيط لوحة التحكم)

server/
├── routers.ts (جميع إجراءات tRPC)
├── db.ts (تفاعلات قاعدة البيانات)
└── _core/
    ├── env.ts (الإعدادات والمتغيرات البيئية)
    └── ...

drizzle/
├── schema.ts (تصميم قاعدة البيانات)
└── ...
```

## تدفق البيانات

### تسجيل الدخول:
```
PatientLogin.tsx
  → trpc.auth.sendOTP + verifyOTP
  → AuthContext (تحديث المستخدم)
  → البيانات تُحفظ في Supabase
```

### جلب البيانات:
```
PatientDashboard.tsx
  → useQuery (trpc.patient.getProfile, etc.)
  → Server API (routers.ts)
  → Database Query (db.ts)
  → Supabase
  → تحديث UI
```

### إدارة الحالة:
- **AuthContext**: إدارة مستخدم ومصادقة
- **DataManager**: إدارة البيانات الموحدة
- **tRPC Queries**: جلب البيانات من السيرفر

## كيفية الاستخدام

### بدء التطبيق:
```bash
npm install
npm run dev
```

### الاتصال بـ Supabase:
1. اضبط متغيرات البيئة:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. شغّل الترحيل:
   ```bash
   npm run db:push
   ```

### إضافة ميزة جديدة:

1. **أضف الخادم endpoint (server/routers.ts)**:
```typescript
newFeature: router({
  getItem: publicProcedure.query(async ({ ctx }) => {
    // منطق الاستعلام
  }),
})
```

2. **استخدمها في العميل**:
```typescript
const { data } = trpc.newFeature.getItem.useQuery();
```

## قائمة المهام المتبقية:

- [ ] تكامل الوصفات الطبية الكاملة
- [ ] نظام الحجز المتقدم
- [ ] التقييمات والمراجعات
- [ ] البحث المتقدم عن الأطباء
- [ ] إشعارات ورسائل
- [ ] التقارير والإحصائيات
- [ ] تصدير السجلات الطبية
- [ ] التكامل مع خدمات الدفع

## النقاط المهمة:

1. ✅ جميع الصفحات متصلة معاً
2. ✅ المصادقة موحدة عبر AuthContext
3. ✅ البيانات تُجلب من Supabase عبر tRPC
4. ✅ لا توجد نسخ متعددة من نفس البيانات
5. ✅ النظام قابل للتوسع

## الدعم والمساعدة:

- جميع الملفات توثق الغرض من إنشاؤها
- استخدم `console.log("[v0] ...")` للتصحيح
- تحقق من الملفات الموجودة قبل إنشاء ملفات جديدة
