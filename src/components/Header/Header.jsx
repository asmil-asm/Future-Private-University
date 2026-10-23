
import Topheader from './Topheader'
import './Header.css'
import Bottomheader from './Bottomheader'
import { useLocation } from 'react-router-dom'
const Header=()=>{
  const {pathname}=useLocation()
 return (
    pathname === '/' && (
      <header>
        <Topheader />
        <Bottomheader />
      </header>
    )
  )
}
export default Header 