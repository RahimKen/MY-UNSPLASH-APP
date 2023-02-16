import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useImagesContext } from "../hooks/useImagesContext"

const ImageForm = ({setFormOn}) => {
   const [label , setLabel] = useState('')
   const [url , setUrl] = useState('')
   const [pending , setPending] = useState(false)
   const [error , setError] = useState(null)
   const {user} = useAuthContext()
   const {dispatch} = useImagesContext()

   const handleCancel = () => {
    setError(null)
    setPending(false)
    setFormOn(false)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const AbortConst = new AbortController();
      setPending(true)
      setError(null)

      if(!user){
        setError('You Must Be Logged In')
        setPending(false)
        return
      }
      const image = {label , url}
      const timmy = setTimeout(()=>{AbortConst.abort()
                                    setPending(false)
                                    setError("Your connection is too slow please try again !")} , 5000)
      const res = await fetch(`${process.env.REACT_APP_API_URL}/image/post` , { signal : AbortConst.signal ,
        method : 'POST',
        body : JSON.stringify(image),
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${user.token}`
        }
      })
      clearTimeout(timmy)
      const json = await res.json()
      
      if(!res.ok){
        setError(json.error)
        setPending(false)
      }
      else{
        setLabel('')
        setUrl('')
        setPending(false)
        setError(null)
        dispatch({type : "CREATE_IMAGE" , payload : json})
        setFormOn(false)
      }
   }
  return (
   
    <div className="bg-white shadow-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30  p-6 flex flex-col content-around  w-5/6 sm:w-[450px] rounded-md">
       <h3 className="text-2xl font-medium mb-6">Add a new photo</h3>
       <form onSubmit={handleSubmit}>
        <p className="mb-2">Label</p>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Image Label" className="border-[1px] w-full border-solid rounded-md p-1.5 mb-4 border-black bg-white "/>
        <p className="mb-2">Photo URL</p>
        <input type="text" value={(url)} onChange={(e) => setUrl(e.target.value)} placeholder="https://images.unsplash.com/..... " className="w-full border-[1px] border-solid rounded-md p-1.5  border-black bg-white"/>
        {error ? <p className="mt-2 text-md p-2 text-rose-700 bg-rose-300 border-solid border-rose-700 rounded-md border-2">{error}</p> : null}
        <div className="flex justify-end mt-10 ">
          <button disabled={pending} onClick={handleCancel} className="mr-4 text-gray-500">Cancel</button>
          <button type="submit" className={`bg-green  ${pending ? "opacity-70" : ""} font-semibold sm:px-4  sm:py-2 px-3 py-1.5 rounded-lg shadow-md md:mr-2 mr-1 text-white text-sm md:text-md hover:opacity-80 duration-300`}>Submit</button>
        </div>
       </form>
    </div>
  
  )
}

export default ImageForm