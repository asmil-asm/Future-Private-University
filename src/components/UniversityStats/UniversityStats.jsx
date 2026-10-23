import { useState, useEffect, useRef } from "react";
import { FaUserGraduate, FaBook, FaClipboardList } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import "./UniversityStats.css";

const ScrollCounter = ({ to, duration = 2000, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(0);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * to));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [to, duration, startCount]);

  return <span>{count.toLocaleString()}</span>;
};

const UniversityStats = () => {
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

useEffect(() => {

  const element = sectionRef.current;

  const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {
      setSectionInView(true);
    }
  });

  if (element) observer.observe(element);

  return () => observer.disconnect();
}, []);

  const stats = [
    { label: t("stats_students"), value: 4000, icon: FaUserGraduate },
    { label: t("stats_books"), value: 500, icon: FaBook },
    { label: t("stats_majors"), value: 25, icon: FaClipboardList },
  ];

  return (
    <div className="stats-section" ref={sectionRef}>
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div className="stats-card" key={index}>
            <div className="stats-icon">
              <Icon size={40} />
            </div>
            <h2 className="stats-number">
              <ScrollCounter to={item.value} startCount={sectionInView} />
            </h2>
            <p className="stats-label">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UniversityStats;