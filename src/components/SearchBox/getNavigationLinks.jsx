import { t } from "i18next";

export const getNavigationLinks = () => [
    {
        title: t("nav_home"),
        path: "/",
        keywords: [
            "الرئيسية",
            "الصفحة الرئيسية",
            "الرئيسية",
            "home",
            "main",
            "index",
        ],
    },

    {
        title: t("nav_university"),
        links: [
            {
                name: t("nav_about_university"),
                path: "/university/about",
                keywords: [
                    "عن الجامعة",
                    "الجامعة",
                    "نبذة",
                    "التعريف", "حول",
                    "about",
                    "about university",
                    "university",
                ],
            },
            {
                name: t("nav_vision_mission"),
                path: "/university/vision",
                keywords: [
                    "الرؤية",
                    "الرسالة",
                    "الرؤية والرسالة",
                    "vision",
                    "mission",
                ],
            },
          
        ],
    },

    {
        title: t("nav_academics"),
        links: [
            {
                name: t("nav_colleges"),
                path: "/academics/colleges",
                keywords: [
                    "الكليات",
                    "كلية",
                    "college",
                    "colleges",
                    "faculty",
                ],
            },
            {
                name: t("nav_departments"),
                path: "/academics/departments",
                keywords: [
                    "الأقسام",
                    "قسم",
                    "departments",
                    "department",
                ],
            },
            {
                name: t("nav_programs"),
                path: "/academics/programs",
                keywords: [
                    "البرامج",
                    "برنامج",
                    "التخصصات",
                    "programs",
                    "program",
                    "majors",
                ],
            },
            {
                name: t("nav_staff"),
                path: "/academics/staff",
                keywords: [
                    "الهيئة التدريسية",
                    "المدرسين",
                    "الدكاترة",
                    "الأساتذة",
                    "staff",
                    "faculty",
                    "teachers",
                    "professors",
                ],
            },
        ],
    },

    {
        title: t("nav_news"),
        links: [
            {
                name: t("nav_advertisements"),
                path: "/news/advertisements",
                keywords: [
                    "الإعلانات",
                    "الإعلان",
                    "announcement",
                    "announcements",
                ],
            },
            {
                name: t("nav_events"),
                path: "/news/events",
                keywords: [
                    "الفعاليات",
                    "الأحداث",
                    "الأنشطة","أخبار",
                    "events",
                    "event",
                    "activities",
                ],
            },
            {
                name: t("nav_articles"),
                path: "/news/articles",
                keywords: [
                    "المقالات",
                    "مقالات","مدونات",
                    "article",
                    "articles",
                    "blog",
                ],
            },
        ],
    },

    {
        title: t("nav_careers"),
        links: [
            {
                name: t("nav_job_posting"),
                path: "/careers/job-posting",
                keywords: [
                    "الوظائف",
                    "التوظيف",
                    "فرص العمل",
                    "job",
                    "jobs",
                    "career",
                    "careers",
                    "employment",
                ],
            },
        ],
    },

    {
        title: t("nav_admission"),
        links: [
            {
                name: t("nav_students-services"),
                path: "/admission/students",
                keywords: [
                    "الطلاب",
                    "الخدمات الطلابية","خدمات أكاديمية",
                    "student",
                    "students",
                    "student services",
                ],
            },
            {
                name: t("nav_application_info"),
                path: "/application",
                keywords: [
                    "التقديم",
                    "طلب الالتحاق",
                    "التسجيل",
                    "application",
                    "apply",
                    "admission",
                ],
            },
        ],
    },

    {
        title: t("nav_services"),
        links: [
            {
                name: t("nav_services_list"),
                path: "/services/services",
                keywords: [
                    "الخدمات",
                    "خدمات",
                    "services",
                    "service",
                ],
            },
            {
                name: t("nav_library"),
                path: "/services/library",
                keywords: [
                    "المكتبة",
                    "الكتب",
                    "المراجع",
                    "library",
                    "books",
                    "references",
                ],
            },
        ],
    },
];

