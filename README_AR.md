# تطبيق Tabibi - شبكة حجز طبية متكاملة للجزائر

## نظرة عامة
Tabibi هو تطبيق ويب متكامل يربط المرضى مع المتخصصين الطبيين في الجزائر. يتيح للمريض البحث عن الأطباء وحجز المواعيد وتتبع بياناته الصحية بسهولة.

## البدء السريع

### 1. التثبيت
```bash
npm install
# أو
pnpm install
```

### 2. إعداد متغيرات البيئة
تأكد من وجود ملف `.env` يحتوي على:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
DATABASE_URL=your_database_url
```

### 3. تشغيل التطبيق

**في بيئة التطوير:**
```bash
npm run dev
```
سيبدأ السيرفر والعميل معاً على `http://localhost:3000`

**بناء للإنتاج:**
```bash
npm run build
npm run start
```

## المميزات الرئيسية

### للمريض:
- ✅ تسجيل حساب آمن
- ✅ لوحة تحكم شاملة
- ✅ البحث عن الأطباء حسب التخصص والموقع
- ✅ حجز المواعيد الطبية
- ✅ تتبع البيانات الصحية (ضغط الدم، السكر في الدم)
- ✅ عرض الوصفات الطبية والفحوصات

### للطبيب/المتخصص:
- ✅ لوحة تحكم إدارية
- ✅ إدارة المواعيد
- ✅ رؤية بيانات المريض
- ✅ إضافة الوصفات والفحوصات

## البنية الهندسية

```
┌─────────────────────┐
│     React Client    │ (Client-side routing + UI)
├─────────────────────┤
│   tRPC + React Query│ (Data fetching & caching)
├─────────────────────┤
│  Express Server     │ (tRPC endpoints)
├─────────────────────┤
│  Drizzle ORM        │ (Database queries)
├─────────────────────┤
│  Supabase/PostSQL   │ (Database)
└─────────────────────┘
```

## الملفات الرئيسية

### السيرفر:
- `server/_core/index.ts` - نقطة دخول السيرفر
- `server/routers.ts` - API procedures (296 سطر)
- `server/db.ts` - اتصال قاعدة البيانات
- `server/_core/env.ts` - متغيرات البيئة

### العميل:
- `client/src/App.tsx` - التوجيه الرئيسي
- `client/src/contexts/AuthContext.tsx` - إدارة المصادقة
- `client/src/pages/` - صفحات التطبيق
- `client/src/components/` - المكونات المشتركة
- `client/src/utils/trpc.ts` - إعدادات tRPC

## الصفحات الرئيسية

### المريض:
- `/` - الصفحة الرئيسية
- `/auth/patient/login` - تسجيل الدخول
- `/auth/patient/register` - إنشاء حساب
- `/patient/dashboard` - لوحة التحكم
- `/patient/search` - البحث عن الأطباء
- `/patient/appointments` - المواعيد
- `/patient/prescriptions` - الوصفات

### الطبيب:
- `/auth/professional/login` - تسجيل الدخول
- `/auth/professional/register` - إنشاء حساب
- `/doctor/dashboard` - لوحة التحكم

## التقنيات المستخدمة

- **React 19** - واجهة المستخدم
- **TypeScript** - السلامة من حيث الأنواع
- **tRPC** - اتصالات آمنة من حيث الأنواع
- **Supabase/PostgreSQL** - قاعدة البيانات
- **Drizzle ORM** - الاستعلامات الآمنة
- **Tailwind CSS** - التصميم
- **Wouter** - التوجيه

## اختبار التطبيق

راجع `TESTING_GUIDE.md` للحصول على خطوات الاختبار الشاملة.

## وثائق إضافية

- `SYSTEM_ARCHITECTURE.md` - شرح هندسة النظام بالتفصيل
- `INTEGRATION_GUIDE.md` - دليل دمج الميزات الجديدة
- `TESTING_GUIDE.md` - خطوات الاختبار

## الدعم

إذا واجهت أي مشاكل:
1. تأكد من أن جميع المتغيرات البيئية صحيحة
2. تحقق من اتصالك بـ Supabase
3. جرب `npm run check` للتحقق من أخطاء TypeScript
4. اطلع على السجلات في `.manus-logs/`

---

**تم بناء هذا التطبيق بواسطة v0 AI Assistant**
