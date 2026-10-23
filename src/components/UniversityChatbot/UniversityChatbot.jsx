import { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { useTranslation } from 'react-i18next';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const UniversityChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const styles = {
    container: `fixed bottom-5 ${isAr ? 'right-5' : 'left-5'} z-[1000]`,
    toggleButton: "bg-[var(--color-hover-text)] text-white border-none rounded-full w-14 h-14 text-2xl cursor-pointer shadow-lg flex items-center justify-center transition-all active:scale-95",
    chatWrapper: "mt-2.5 w-[350px] rounded-xl overflow-hidden shadow-2xl"
  };

  return (
    <div className={styles.container} dir={isAr ? 'rtl' : 'ltr'}>
      {/* زر دائري عائم لفتح وإغلاق الشات */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className={styles.chatWrapper}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default UniversityChatbot;