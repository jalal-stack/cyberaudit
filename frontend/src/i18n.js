import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
    resources: {
      ru: { translation: {
        "nav": { "scanner": "Сканер безопасности", "history": "Результаты" },
        "scanner": {
          "title": "Сканер безопасности веб-сайтов",
          "input_label": "Название сайта для сканирования",
          "start_button": "▶ Начать сканирование"
        },
        "types": {
          "ssl": "SSL/HTTPS анализ",
          "ports": "Сканирование портов",
          "headers": "HTTP заголовки безопасности",
          "cms": "CMS и уязвимости",
          "leaks": "Проверка утечек данных",
          "ddos": "DDoS защита"
        }
      }},
      uz: { translation: {
        "nav": { "scanner": "Xavfsizlik skaneri", "history": "Natijalar" },
        "scanner": {
          "title": "Veb-saytlar xavfsizligi skaneri",
          "input_label": "Skanerlash uchun sayt nomi",
          "start_button": "▶ Skanerlashni boshlash"
        },
        "types": {
          "ssl": "SSL/HTTPS tahlili",
          "ports": "Portlarni skanerlash",
          "headers": "HTTP xavfsizlik sarlavhalari",
          "cms": "CMS va zaifliklar",
          "leaks": "Ma'lumotlarning oshkorlanishini tekshirish",
          "ddos": "DDoS himoyasi"
        }
      }}
    }
  });
export default i18n;