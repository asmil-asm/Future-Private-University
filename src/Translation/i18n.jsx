import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./ar.json";
import en from "./en.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const updateDocumentDirection = (lng) => {
  const direction = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = direction;
  document.documentElement.lang = lng;
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

updateDocumentDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
  updateDocumentDirection(lng);
});

export default i18n;