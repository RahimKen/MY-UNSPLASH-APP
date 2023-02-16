import logo from '../assets/my_unsplash_logo.svg'
import { useLogout } from "../hooks/useLogout"



const NavBar = ({setFormOn}) => {

  const {logout} = useLogout()

  const handleAddAphoto = () => {
    setFormOn(true)
  }

  const handleLogout = (e) => {
     logout()
  }

  return (
    <div className='container mx-auto justify-between p-4 flex flex-row flex-wrap'>
      <div className='flex'>
        <div>
          <img src={logo} className=" w-22 h-22" alt="logo" />
        </div>
      </div>
      <div className='flex p-0'>
        <button onClick={handleLogout} className='bg-green font-semibold font-md sm:px-4  sm:py-2 px-2 py-1 rounded-lg shadow-md mr-1  text-white sm:text-md text-sm hover:opacity-80 duration-300'>Log out</button>
        <button onClick={handleAddAphoto} className='bg-green font-semibold font-md sm:px-4 sm:py-2  px-2 py-1 rounded-lg shadow-md  text-white sm:text-md text-sm hover:opacity-80 duration-300'>Add a photo</button>
      </div>
    </div>
  )
}

export default NavBar
