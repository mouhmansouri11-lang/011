# 📝 دليل إضافة ميزات جديدة

## نموذج بسيط: إضافة ميزة "الرسائل بين المريض والطبيب"

### 1️⃣ إضافة الجدول (Database)

في `drizzle/schema.ts`:
```typescript
import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: varchar("sender_id", { length: 255 }).notNull(),
  receiverId: varchar("receiver_id", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### 2️⃣ إضافة API procedures

في `server/routers.ts` - أضف في `appRouter`:
```typescript
messages: router({
  // إرسال رسالة
  send: publicProcedure
    .input(z.object({
      receiverId: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Not authenticated");
      
      const db = await getDb();
      const message = await db.insert(messages).values({
        senderId: ctx.user.id,
        receiverId: input.receiverId,
        content: input.content,
      });
      return message;
    }),

  // الحصول على الرسائل
  getMessages: publicProcedure
    .query(async ({ ctx }) => {
      if (!ctx.user) throw new Error("Not authenticated");
      
      const db = await getDb();
      const userMessages = await db
        .select()
        .from(messages)
        .where(
          or(
            eq(messages.senderId, ctx.user.id),
            eq(messages.receiverId, ctx.user.id)
          )
        );
      return userMessages;
    }),
}),
```

### 3️⃣ إنشاء hook للجلب

في `client/src/hooks/useMessages.ts`:
```typescript
import { trpc } from "@/utils/trpc";

export function useMessages() {
  const { data: messages, isLoading } = trpc.messages.getMessages.useQuery();
  const sendMutation = trpc.messages.send.useMutation();

  const sendMessage = async (receiverId: string, content: string) => {
    try {
      await sendMutation.mutateAsync({ receiverId, content });
      // تحديث البيانات
    } catch (error) {
      console.error("[v0] Error sending message:", error);
    }
  };

  return { messages, isLoading, sendMessage };
}
```

### 4️⃣ إنشاء صفحة

في `client/src/pages/Messages.tsx`:
```typescript
import { useMessages } from "@/hooks/useMessages";
import DashboardLayout from "@/components/DashboardLayout";

export default function Messages() {
  const { messages, sendMessage } = useMessages();

  const handleSend = async (receiverId: string, content: string) => {
    await sendMessage(receiverId, content);
  };

  return (
    <DashboardLayout title="الرسائل">
      <div className="space-y-4">
        {messages?.map((msg) => (
          <div key={msg.id} className="p-4 border rounded-lg">
            <p>{msg.content}</p>
            <small>{new Date(msg.createdAt).toLocaleDateString('ar')}</small>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
```

### 5️⃣ إضافة المسار

في `client/src/App.tsx`:
```typescript
import Messages from "./pages/Messages";

// في Router component:
<Route path={"/messages"} component={Messages} />
```

## 📋 قائمة تفقد لأي ميزة جديدة:

- ✅ إضافة الجدول في `drizzle/schema.ts`
- ✅ إضافة API procedure في `server/routers.ts`
- ✅ إنشاء hook في `client/src/hooks/`
- ✅ إنشاء صفحة أو مكون في `client/src/pages/` أو `components/`
- ✅ إضافة المسار في `App.tsx`
- ✅ تحديث القائمة في `DashboardLayout.tsx`

## 🔄 دورة حياة الطلب (Request Lifecycle):

```
1. المستخدم يضغط زر
   ↓
2. مكون يستدعي mutation
   ↓
3. tRPC يرسل الطلب إلى السيرفر
   ↓
4. server/routers.ts يعالج الطلب
   ↓
5. Drizzle ORM يقوم بالاستعلام
   ↓
6. Supabase ترجع النتيجة
   ↓
7. tRPC يرسل النتيجة إلى العميل
   ↓
8. React يحدث الواجهة
```

## 🐛 استكشاف الأخطاء:

### المشكلة: API لا يعمل
```typescript
// أضف سجلات تصحيح:
console.log("[v0] Input:", input);
try {
  // الكود هنا
} catch (error) {
  console.error("[v0] Error:", error.message);
  throw error;
}
```

### المشكلة: البيانات لا تتحدث
```typescript
// تأكد من تحديث الـ query:
const { data, refetch } = trpc.myQuery.useQuery();

// بعد mutation:
await refetch();
```

### المشكلة: Type errors
```typescript
// تأكد من تعريفات Zod:
z.object({
  id: z.string().min(1),
  email: z.string().email(),
})
```

## 📚 أمثلة من المشروع الموجود:

### البحث عن الأطباء:
- Mutation: `search.searchDoctors` في `server/routers.ts`
- Hook: يمكن إنشاء `useSearchDoctors` 
- Page: `client/src/pages/patient/SearchDoctors.tsx`

### الحصول على المواعيد:
- Query: `patient.getAppointments` في `server/routers.ts`
- Hook: يمكن إنشاء `useAppointments`
- Component: `client/src/components/AppointmentList.tsx`

## ✨ أفضل الممارسات:

1. **استخدم Types:** دائماً عرّف أنواع المدخلات والمخرجات
2. **تعامل مع الأخطاء:** استخدم try-catch وأرسل رسائل واضحة
3. **أضف سجلات:** استخدم `console.log("[v0]")` للتصحيح
4. **اختبر في الكونسول:** افتح DevTools وتحقق من Network
5. **استخدم Skeleton Loading:** عرّض محمل أثناء الانتظار

---

**الآن أنت جاهز لإضافة أي ميزة جديدة! 🚀**
