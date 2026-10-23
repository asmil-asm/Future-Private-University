# Future Private University – Interactive University Portal

منصة جامعية حديثة ومتعددة اللغات، مبنية بـ **React 19** و**Vite**، تهدف إلى تقديم تجربة رقمية شاملة للطلاب وأعضاء هيئة التدريس والزوار. يعرض المشروع بنية أمامية قابلة للتوسع مع توجيه متقدم، لوحات تحكم ديناميكية، دعم كامل للغتين العربية والإنجليزية، واستهلاك **RESTful API** لجلب البيانات، مع إدارة ديناميكية لوسوم `<head>` لتحسين الـ SEO.

[🔗 Live Demo](https://asmil-asm.github.io/University-website) · [🐛 Report Bug](https://github.com/asmil-asm/University-website/issues) · [✨ Request Feature](https://github.com/asmil-asm/University-website/issues)

![Project Preview](./public/preview.png)
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
