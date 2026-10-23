import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
botName: "مساعد الجامعة الآلي",

initialMessages: [
createChatBotMessage(
`مرحباً بك في بوابة الجامعة 🎓

يمكنك السؤال عن:

• التسجيل والقبول
• الكليات
• هندسة المعلوماتية
• الصيدلة
• الهندسة المعمارية
• الهندسة المدنية
• إدارة الأعمال
• الرسوم والمصاريف

Welcome to the University Portal 🎓

You can ask about:

• Admission
• Faculties
• Information Engineering
• Pharmacy
• Architecture
• Civil Engineering
• Business Administration
• Fees`
),
],

customStyles: {
botMessageBox: {
backgroundColor: '#003366',
},
chatButton: {
backgroundColor: '#003366',
},
},
};

export default config;
