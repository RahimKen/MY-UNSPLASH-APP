import NavBar from '../components/NavBar'
import ImageForm from '../components/ImageForm'
import { useState , useEffect} from 'react'
import DeleteImage from '../components/DeleteImage'
import ImageDetails from '../components/ImageDetails'
import { useImagesContext } from '../hooks/useImagesContext'
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {
  const [formOn , setFormOn] = useState(false)
  const [deleteOn , setDeleteOn] = useState(false)
  const [img , setImg] = useState('')
  const {Images , dispatch} = useImagesContext()
  const {user} = useAuthContext()



  useEffect(() => {
    const AbortConst = new AbortController();
    
    const fetchImages = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/image/get`,{ signal : AbortConst.signal ,
        headers : {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_IMAGES', payload: json})
      }
    }
    if(user){
      fetchImages()
    }

    return () => AbortConst.abort()
    
  }, [dispatch , user])
  
  return (
    <div className='bg-light-gray h-[100vh] '>
      <NavBar setFormOn={setFormOn}/>
      <div className='container  sm:p-10 p-6 mx-auto  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 pt-6 md:pt-16 '>
       {Images !== undefined ? Images!==null ? Images.length!==0 ? Images.map((image) => (
                                <ImageDetails key={image._id} setDeleteOn={setDeleteOn} image={image} setImg={setImg} /> )) 
                                : <p className='font-semibold'>There is no images to show !</p>  
                                : <p className='font-semibold'>Loading ...</p> 
                                : <p className='font-semibold'>Loading ...</p> 
                            }
      </div>
      {formOn && <ImageForm setFormOn={setFormOn}/>}
      {deleteOn && <DeleteImage setDeleteOn={setDeleteOn} img={img} />}
    </div>
  )
}

export default Home