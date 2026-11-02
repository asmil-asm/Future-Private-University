# Future Private University – Interactive University Portal

منصة جامعية حديثة ومتعددة اللغات، مبنية بـ **React 19** و**Vite**، تهدف إلى تقديم تجربة رقمية شاملة للطلاب وأعضاء هيئة التدريس والزوار. يعرض المشروع بنية أمامية قابلة للتوسع مع توجيه متقدم، لوحات تحكم ديناميكية، دعم كامل للغتين العربية والإنجليزية، واستهلاك **RESTful API** لجلب البيانات، مع إدارة ديناميكية لوسوم `<head>` لتحسين الـ SEO.

[🔗 Live Demo](https://asmil-asm.github.io/University-website) · [🐛 Report Bug](https://github.com/asmil-asm/University-website/issues) · [✨ Request Feature]
🔗 **Live Demo (Render):** [https://future-private-university.onrender.com/]

(https://github.com/asmil-asm/University-website/issues)

<!-- استبدل الرابط أعلاه بصورة حقيقية للمشروع، مثل ./public/preview.png أو رابط خارجي -->

---

## 📌 جدول المحتويات

- [🎯 المشكلة](#-المشكلة-the-problem)
- [✨ الميزات الرئيسية](#-الميزات-الرئيسية-key-features)
- [🛠️ التقنيات المستخدمة](#️-التقنيات-المستخدمة-tech-stack)
- [🔌 واجهات RESTful API المستخدمة](#-واجهات-restful-api-المستخدمة-rest-api-endpoints)
- [📂 هيكل المشروع](#-هيكل-المشروع-project-structure)
- [🚀 التشغيل المحلي](#-التشغيل-المحلي-run-locally)
- [⚙️ متغيرات البيئة](#️-متغيرات-البيئة-environment-variables)
- [📜 السكربتات المتاحة](#-السكربتات-المتاحة-available-scripts)
- [🌍 النشر](#-النشر-deployment)
  - [النشر على Render](#النشر-على-render)
- [🗺️ خارطة الطريق](#️-خارطة-الطريق-roadmap)
- [🤝 المساهمة](#-المساهمة-contributing)
- [📄 الترخيص](#-الترخيص-license)
- [📬 التواصل](#-التواصل-contact)

---

## 🎯 المشكلة (The Problem)

المواقع الجامعية التقليدية غالبًا ما تكون ثابتة، أحادية اللغة، وتفتقر إلى التفاعل وتحسين محركات البحث. هذا المشروع يحل هذه المشكلة من خلال واجهة أمامية ديناميكية وسريعة تدعم اللغتين العربية والإنجليزية، وتستهلك بياناتها من **RESTful API** لعرض المعلومات بشكل فوري (الكليات، الأقسام، أعضاء هيئة التدريس، الأخبار، إلخ)، مع إدارة ديناميكية لعناوين الصفحات ووسوم الـ Meta عبر `React Helmet` لتحسين الـ SEO وتجربة المشاركة على وسائل التواصل.

---

## ✨ الميزات الرئيسية (Key Features)

- **دعم كامل للغتين (i18n):** تبديل سلس بين العربية والإنجليزية مع حفظ تفضيل المستخدم عبر `Zustand persist`.
- **استهلاك RESTful API:** تكامل كامل مع واجهات برمجية نمط REST (GET / POST / PUT / DELETE) لجلب وإدارة بيانات الجامعة بشكل ديناميكي.
- **إدارة ديناميكية لوسوم `<head>`:** استخدام `React Helmet` لتحديث عنوان الصفحة والوصف ووسوم المشاركة (Open Graph) لكل صفحة على حدة، مما يحسّن الـ SEO وتجربة المشاركة.
- **تقسيم الحزم (Code Splitting):** تحميل الصفحات بشكل كسول (Lazy Loading) عبر `React.lazy` و`Suspense` لتحسين الأداء الأولي.
- **إدارة حالة قوية:** استخدام `Zustand` لإدارة الحالة العامة مثل القوائم، النوافذ المنبثقة، واللغة.
- **جلب بيانات فعال:** استخدام `TanStack Query` و`Axios` لجلب البيانات من الـ API وتخزينها مؤقتًا (Caching) مع إعادة المحاولة التلقائية.
- **تصميم متجاوب:** مبني باستخدام `TailwindCSS` لضمان تجربة ممتازة على جميع الأجهزة.
- **مكونات تفاعلية:** سلايدرات (`Swiper`) ونظام محادثة (`react-chatbot-kit`).
- **حركات وانتقالات:** استخدام `Framer Motion` لإثراء تجربة المستخدم.
- **هيكلة واضحة وقابلة للتوسع:** تقسيم منطقي للمجلدات يسهل الصيانة وإضافة الميزات.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| الفئة | التقنيات |
| :--- | :--- |
| **الإطار الأساسي** | React 19, Vite |
| **التوجيه (Routing)** | React Router DOM v7 |
| **إدارة الحالة** | Zustand |
| **جلب البيانات (API)** | TanStack Query, Axios |
| **نمط الـ API** | RESTful API |
| **التصميم** | TailwindCSS, CSS Modules |
| **الحركات** | Framer Motion |
| **السلايدرات** | Swiper |
| **المحادثة الآلية** | react-chatbot-kit |
| **تعدد اللغات** | i18next, react-i18next |
| **SEO & Meta Tags** | React Helmet |

> ملاحظة: إذا كنت تستخدم `react-helmet-async` بدلًا من `react-helmet` لتوافق أفضل مع React 19، فاستبدل الاسم في الجدول إلى **React Helmet Async**.

---

## 🔌 واجهات RESTful API المستخدمة (REST API Endpoints)

يعتمد المشروع على **RESTful API** لجلب البيانات، مع استخدام `Axios` كعميل HTTP و`TanStack Query` لإدارة التخزين المؤقت وإعادة الجلب. فيما يلي أمثلة توضيحية لنمط الـ Endpoints المستخدمة (استبدلها بالعناوين الفعلية لمشروعك):

| الميثود | Endpoint | الوصف |
| :--- | :--- | :--- |
| `GET` | `/colleges` | جلب قائمة الكليات |
| `GET` | `/colleges/:id` | جلب تفاصيل كلية محددة |
| `GET` | `/departments` | جلب قائمة الأقسام |
| `GET` | `/departments/:id` | جلب تفاصيل قسم محدد |
| `GET` | `/faculty` | جلب قائمة أعضاء هيئة التدريس |
| `GET` | `/faculty/:id` | جلب تفاصيل عضو هيئة تدريس |
| `GET` | `/news` | جلب الأخبار |
| `GET` | `/events` | جلب الفعاليات |
| `POST` | `/contact` | إرسال نموذج تواصل |
| `POST` | `/admissions` | تقديم طلب قبول |

### مثال على استهلاك الـ API

```javascript
// src/services/collegesService.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// GET /colleges
export const getColleges = async () => {
  const { data } = await api.get('/colleges');
  return data;
};

// GET /colleges/:id
export const getCollegeById = async (id) => {
  const { data } = await api.get(`/colleges/${id}`);
  return data;
};

// POST /contact
export const sendContactMessage = async (payload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};
```

---

## 📂 هيكل المشروع (Project Structure)

```text
University-website/
├── public/
│   └── preview.png
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── locales/
│   ├── layouts/
│   ├── utils/
│   └── assets/
├── .env.example
├── index.html
├── package.json
├── vite.config.js
├── render.yaml          # اختياري: تعريف النشر على Render
└── README.md
```

---

## 🚀 التشغيل المحلي (Run Locally)

### 1. استنساخ المستودع

```bash
git clone https://github.com/asmil-asm/Future-Private-University.git
cd Future-Private-University
```

### 2. تثبيت الحزم

```bash
npm install
```

### 3. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env` وعدّل القيم:

```bash
cp .env.example .env
```

### 4. تشغيل خادم التطوير

```bash
npm run dev
```

سيعمل التطبيق على:

```text
http://localhost:5173
```

### 5. بناء نسخة الإنتاج (اختياري)

```bash
npm run build
npm run preview
```

---

## ⚙️ متغيرات البيئة (Environment Variables)

| المتغير | الوصف | مطلوب |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | عنوان URL الأساسي لواجهة الـ RESTful API | ✅ |
| `VITE_APP_TITLE` | عنوان التطبيق الافتراضي (اختياري) | ❌ |

> **مهم:** في Vite، لا تُعرَض للمتصفح إلا المتغيرات التي تبدأ بـ `VITE_`. لا تضع مفاتيح سرية أو كلمات مرور في متغيرات `VITE_` لأنها تُحزَّم داخل ملفات JavaScript النهائية وتكون مرئية للمستخدمين.

---

## 📜 السكربتات المتاحة (Available Scripts)

| الأمر | الوصف |
| :--- | :--- |
| `npm run dev` | تشغيل خادم التطوير مع HMR |
| `npm run build` | بناء نسخة الإنتاج إلى مجلد `dist/` |
| `npm run preview` | معاينة نسخة الإنتاج محليًا |
| `npm run lint` | فحص الكود باستخدام ESLint |

---

## 🌍 النشر (Deployment)

### النشر على Render

المشروع واجهة أمامية (SPA) مبنية بـ **Vite**، لذا يُنشر على Render كـ **Static Site**. يدعم Render المواقع الثابتة عبر CDN عالمي مع TLS تلقائي وضغط Brotli وHTTP/2، ويعيد النشر تلقائيًا عند كل دفعة إلى الفرع المحدد[reference:0].

#### الطريقة الأولى: النشر عبر لوحة تحكم Render (موصى بها)

1. **إنشاء حساب على Render**  
   انتقل إلى [dashboard.render.com](https://dashboard.render.com) وسجّل الدخول (يُفضّل باستخدام GitHub).

2. **إنشاء Static Site جديد**  
   - اضغط **New +** ← **Static Site**.
   - اربط حساب GitHub واختر مستودع `asmil-asm/Future-Private-University`.
   - اختر الفرع المطلوب (مثل `main`).

3. **إعدادات البناء**  
   استخدم القيم التالية لمشروع Vite:

   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`

   > هذه هي القيم الموصى بها لمشاريع Vite على Render[reference:1]. إذا لم يكن لديك `package-lock.json`، استخدم `npm install && npm run build` بدلًا من `npm ci`.

4. **إضافة متغيرات البيئة**  
   في قسم **Environment Variables**، أضف:

   ```env
   VITE_API_BASE_URL=https://your-api.onrender.com/api
   VITE_APP_TITLE=Future Private University
   ```

   > استبدل `VITE_API_BASE_URL` بعنوان URL الفعلي للواجهة الخلفية. لا تضع أسرارًا حقيقية في متغيرات تبدأ بـ `VITE_` لأنها تُضمَّن في حزمة JavaScript النهائية[reference:2].

5. **إضافة قاعدة إعادة الكتابة (SPA Rewrite)**  
   المشروع يستخدم React Router للتوجيه من جانب العميل. أضف القاعدة التالية حتى تعمل الروابط المباشرة مثل `/colleges` أو `/faculty/1`:

   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`

   Render يطبق إعادة الكتابة عندما لا يوجد ملف فعلي في المسار المطلوب، مما يسمح لـ React Router بالتعامل مع المسار[reference:3].

6. **النشر**  
   اضغط **Create Static Site**. سيبدأ Render عملية البناء والنشر، وبعد الانتهاء سيكون التطبيق متاحًا على رابط `*.onrender.com`.

7. **تحديث رابط الواجهة الخلفية**  
   تأكد من أن `VITE_API_BASE_URL` يشير إلى الواجهة الخلفية المنشورة، وأن إعدادات CORS في الواجهة الخلفية تسمح بالنطاق الجديد (`https://your-app.onrender.com`).

---

#### الطريقة الثانية: استخدام `render.yaml` (Infrastructure as Code)

لجعل النشر قابلًا للتكرار، أضف ملف `render.yaml` في جذر المستودع. هذا الملف يعرّف الخدمة والمتغيرات وقواعد التوجيه بشكل تعريفي[reference:4].

```yaml
services:
  - type: web
    name: future-private-university
    runtime: static
    branch: main
    buildCommand: npm ci && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: VITE_API_BASE_URL
        sync: false
      - key: VITE_APP_TITLE
        sync: false
```

ثم من لوحة تحكم Render:

1. اضغط **New +** ← **Blueprint**.
2. اربط المستودع واختر ملف `render.yaml`.
3. أدخل قيم متغيرات البيئة عند الطلب.
4. سيقوم Render بإنشاء الموقع الثابت وإعداداته تلقائيًا.

> إعداد `sync: false` يعني أن Render لن يقرأ القيمة من المستودع، بل سيطلبها منك أثناء الإعداد. لا تضع قيمًا سرية حقيقية داخل `render.yaml` أو المستودع.

---

#### نشر الواجهة الخلفية (API) على Render

إذا كانت الواجهة الخلفية (RESTful API) مشروعًا منفصلًا (مثل Django أو Express)، فانشرها على Render كـ **Web Service** وليس Static Site. بعد الحصول على رابطها العام، استخدمه في `VITE_API_BASE_URL` للواجهة الأمامية.

---

#### ملاحظات مهمة حول النشر على Render

- **إعادة الكتابة إلزامية:** بدون قاعدة `/* → /index.html`، ستؤدي إعادة تحميل صفحة داخلية (مثل `/colleges`) إلى خطأ `404` على Render.
- **الفرع والنشر التلقائي:** أي دفعة إلى الفرع المحدد في Render ستؤدي إلى إعادة بناء ونشر تلقائي.
- **البيئة والمتغيرات:** اضبط متغيرات البيئة مباشرة في لوحة تحكم Render، ولا ترفع ملف `.env` إلى المستودع.
- **CORS:** بعد نشر الواجهة الأمامية، تأكد من إضافة نطاقها إلى إعدادات CORS في الواجهة الخلفية.

---

## 🗺️ خارطة الطريق (Roadmap)

- [ ] إضافة اختبارات آلية (Unit + Integration).
- [ ] تحسين إمكانية الوصول (Accessibility).
- [ ] إضافة لوحة تحكم للمسؤول (Admin Dashboard).
- [ ] دعم لغات إضافية.
- [ ] تحسين الأداء وزيادة تغطية الـ SEO.
- [ ] إضافة وضع داكن (Dark Mode).

---

## 🤝 المساهمة (Contributing)

المساهمات مرحّب بها! يرجى اتباع الخطوات التالية:

1. عمل Fork للمستودع.
2. إنشاء فرع جديد: `git checkout -b feature/your-feature`.
3. تنفيذ التعديلات مع الالتزام بمعايير الكود.
4. فتح Pull Request مع وصف واضح للتغييرات.

---

## 📄 الترخيص (License)

هذا المشروع مرخّص تحت رخصة **MIT**. راجع ملف [LICENSE](./LICENSE) للتفاصيل.

---

## 📬 التواصل (Contact)

- **GitHub:** [asmil-asm](https://github.com/asmil-asm)
- **المستودع:** [Future-Private-University](https://github.com/asmil-asm/Future-Private-University)

---

<div align="center">

صُنع بـ ❤️ باستخدام React وVite

</div>
