import './SearchBox.css'
import { CiSearch } from "react-icons/ci";
import { motion } from 'framer-motion';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import { getNavigationLinks } from './getNavigationLinks';
import { useTranslation } from 'react-i18next';
import { useActions } from '../../store/useActions';
const SearchBox = () => {
    const { setMenu } =useActions();
    const [searchWord, setSearchWord] = useState(''); 
    const navigate = useNavigate(); 
    const {t,i18n}=useTranslation()
  const lang = i18n.language === 'ar' ? 'ar' : 'en';

   

const handleSubmit = (e) => {
    e.preventDefault();

    const keyword = searchWord.trim().toLowerCase();

    if (!keyword) return;

    const links = getNavigationLinks();

    for (const item of links) {
        if (
            item.path &&
            (
                item.title.toLowerCase().includes(keyword) ||
                item.keywords?.some(k =>
                    k.toLowerCase().includes(keyword)
                )
            )
        ) {
            navigate(item.path);
            setMenu()
            toast.success(t("search_found"));
            return;
        }

        if (item.links) {
            const found = item.links.find(link =>
                link.name.toLowerCase().includes(keyword) ||
                link.keywords?.some(k =>
                    k.toLowerCase().includes(keyword)
                )
            );

            if (found) {
                navigate(found.path);
                setMenu()
                toast.success(t("search_found"));
                return;
            }
        }
    }

    toast.error(t("search_not_found"));
};

    return (
        <motion.div  
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            className="search-box" 
        >
            <div className="serach-form">
                <div onClick={setMenu} className="closebtn">
                    <span></span>
                    <span></span>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search  Pages..."
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)} 
                    />
                    <button className={`${lang==='ar'? 'right-[70%]':'left-[70%]'}`}  type="submit"><CiSearch /></button>
                </form>
            </div> 
        </motion.div>
    );
};

export default SearchBox;