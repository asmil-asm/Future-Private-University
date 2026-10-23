import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CommenQuetions.css";
import { useTranslation } from "react-i18next";

export default function CommenQuestions() {
  const [showAnsware, setShowAnsware] = useState({});
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const Questions = [
    { id: 1, question: t("faq_q1"), answare: t("faq_a1") },
    { id: 2, question: t("faq_q2"), answare: t("faq_a2") },
    { id: 3, question: t("faq_q3"), answare: t("faq_a3") },
    { id: 4, question: t("faq_q4"), answare: t("faq_a4") },
    { id: 5, question: t("faq_q5"), answare: t("faq_a5") },
  ];

  const answareShow = (index) => {
    setShowAnsware((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="common-question" aria-labelledby="faq-main-heading">
      <motion.h2
        id="faq-main-heading"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {t("common_questions")}
      </motion.h2>

      <motion.div
        initial={{ x: isRtl ? 50 : -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="quetion-info"
      >
        {Questions.map((item, index) => {
          const isOpen = !!showAnsware[index];

          return (
            <motion.div
              layout
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              className="quetion-box"
              key={item.id}
            >
              <button
                className="question"
                onClick={() => answareShow(index)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "inherit",
                  font: "inherit",
                  color: "inherit",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="icon-container"
                >
                  <IoMdAdd />
                </motion.div>

                <div>{item.question}</div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                      opacity: {
                        duration: 0.2,
                      },
                      y: {
                        duration: 0.25,
                      },
                    }}
                    className="quetion answare"
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ margin: 0, padding: "inherit" }}>
                      {item.answare}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}