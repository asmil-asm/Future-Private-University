import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import SearchBox from '../../components/SearchBox/SearchBox'
import NewsTicker from '../../components/News Tricker/NewsTricker'
import { Toaster } from 'react-hot-toast'
import { useActions } from '../../store/useActions'
import { Suspense } from 'react'
import UniversityChatbot from '../../components/UniversityChatbot/UniversityChatbot'
import Loading from '../../components/Loading/Loading'

const WebsiteLayout = () => {
    const {menu}=useActions()

    

    return (
        <div className="web-page flex flex-col min-h-screen">
               <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
            <Header />
            <Navbar />
            
            <main className="flex-grow">
                <ScrollRestoration/>
                <UniversityChatbot/>
                <Suspense fallback={<Loading/>}>
                    <Outlet />
                    </Suspense>
            </main>

            <NewsTicker />
            <Footer />

            {menu && <SearchBox />}
        </div>
    )
}

export default WebsiteLayout;