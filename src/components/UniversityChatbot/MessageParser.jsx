import React from 'react';

const MessageParser = ({ children, actions }) => {
const parse = (message) => {
const lowerCaseMessage = message.trim().toLowerCase();


// التسجيل والقبول
if (
  lowerCaseMessage.includes('تسجيل') ||
  lowerCaseMessage.includes('قبول') ||
  lowerCaseMessage.includes('التقديم') ||
  lowerCaseMessage.includes('admission') ||
  lowerCaseMessage.includes('register')
) {
  actions.handleAdmission();
}

// الرسوم
else if (
  lowerCaseMessage.includes('مصاريف') ||
  lowerCaseMessage.includes('رسوم') ||
  lowerCaseMessage.includes('تكلفة') ||
  lowerCaseMessage.includes('fees') ||
  lowerCaseMessage.includes('cost')
) {
  actions.handleFees();
}

// كلية الصيدلة
else if (
  lowerCaseMessage.includes('صيدلة') ||
  lowerCaseMessage.includes('pharmacy')
) {
  actions.handlePharmacyCollege();
}

// هندسة المعلوماتية
else if (
  lowerCaseMessage.includes('معلوماتية') ||
  lowerCaseMessage.includes('برمجة') ||
  lowerCaseMessage.includes('software') ||
  lowerCaseMessage.includes('it')
) {
  actions.handleInformationEngineering();
}

// الهندسة المدنية
else if (
  lowerCaseMessage.includes('مدني') ||
  lowerCaseMessage.includes('civil')
) {
  actions.handleCivilEngineering();
}

// إدارة الأعمال
else if (
  lowerCaseMessage.includes('إدارة') ||
  lowerCaseMessage.includes('اعمال') ||
  lowerCaseMessage.includes('business')
) {
  actions.handleBusinessAdministration();
}

// الهندسة المعمارية
else if (
  lowerCaseMessage.includes('عمارة') ||
  lowerCaseMessage.includes('معمارية') ||
  lowerCaseMessage.includes('architecture')
) {
  actions.handleArchitecturalEngineering();
}

// الكليات
else if (
  lowerCaseMessage.includes('كلية') ||
  lowerCaseMessage.includes('كليات') ||
  lowerCaseMessage.includes('faculties') ||
  lowerCaseMessage.includes('college')
) {
  actions.handleFaculties();
}

else {
  actions.handleUnknown();
}


};

return ( <div>
{React.Children.map(children, (child) => {
return React.cloneElement(child, {
parse,
actions,
});
})} </div>
);
};

export default MessageParser;
