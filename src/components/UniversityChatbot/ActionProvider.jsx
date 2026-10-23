import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

const detectLanguage = (prevUtterance) => {
const text = prevUtterance?.message || "";
return /[a-zA-Z]/.test(text);
};

const addMessage = (text) => {
const message = createChatBotMessage(text);


setState((prev) => ({
  ...prev,
  messages: [...prev.messages, message],
}));


};

// التسجيل
const handleAdmission = () => {
setState((prev) => {
const isEnglish = detectLanguage(
prev.messages[prev.messages.length - 1]
);


  const text = isEnglish
    ? "To register at the university, you must submit your high school certificate and ID copy to the Admission Department."
    : "للتسجيل في الجامعة يجب تقديم الشهادة الثانوية وصورة الهوية إلى قسم القبول والتسجيل.";

  const message = createChatBotMessage(text);

  return {
    ...prev,
    messages: [...prev.messages, message],
  };
});


};

// الكليات
const handleFaculties = () => {
addMessage(
`الكليات المتوفرة في الجامعة:

• هندسة المعلوماتية
• الصيدلة
• الهندسة المعمارية
• الهندسة المدنية
• إدارة الأعمال`
);
};

// هندسة المعلوماتية
const handleInformationEngineering = () => {
addMessage(
"هندسة المعلوماتية تشمل البرمجة، تطوير البرمجيات، الذكاء الاصطناعي، الشبكات وقواعد البيانات."
);
};

// الصيدلة
const handlePharmacyCollege = () => {
addMessage(
"كلية الصيدلة تركز على العلوم الصيدلانية، الكيمياء الدوائية، والصيدلة السريرية."
);
};

// الهندسة المدنية
const handleCivilEngineering = () => {
addMessage(
"الهندسة المدنية تهتم بتصميم وتنفيذ الطرق والجسور والأبنية والمنشآت الهندسية."
);
};

// إدارة الأعمال
const handleBusinessAdministration = () => {
addMessage(
"إدارة الأعمال تشمل التسويق، المحاسبة، الإدارة المالية، الموارد البشرية وريادة الأعمال."
);
};

// الهندسة المعمارية
const handleArchitecturalEngineering = () => {
addMessage(
"الهندسة المعمارية تهتم بتصميم المباني والتخطيط العمراني والجوانب الجمالية والإنشائية."
);
};

// الرسوم
const handleFees = () => {
addMessage(
"تختلف الرسوم حسب الكلية والتخصص. يرجى مراجعة قسم الشؤون المالية لمعرفة الرسوم المحدثة."
);
};

// غير معروف
const handleUnknown = () => {
addMessage(
"عذراً، لم أفهم طلبك. جرّب كتابة: تسجيل، كليات، صيدلة، معلوماتية، عمارة، مدني، إدارة أعمال، مصاريف."
);
};

return ( <div>
{React.Children.map(children, (child) => {
return React.cloneElement(child, {
actions: {
handleAdmission,
handleFaculties,
handleFees,
handleUnknown,
handleInformationEngineering,
handlePharmacyCollege,
handleCivilEngineering,
handleBusinessAdministration,
handleArchitecturalEngineering,
},
});
})} </div>
);
};

export default ActionProvider;
