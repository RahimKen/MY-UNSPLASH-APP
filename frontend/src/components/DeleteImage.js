import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useImagesContext } from "../hooks/useImagesContext"


const DeleteImage = ({setDeleteOn , img}) => {

  const [password , setPassword] = useState('')
  const [pending , setPending] = useState(false)
  const [error , setError] = useState(null)
  const {user} = useAuthContext()
  const {dispatch} = useImagesContext()

  const handleCancel = () => {
    setDeleteOn(false)
    setPending(false)
    setPassword('')
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
    const timmy = setTimeout(()=>{AbortConst.abort()
      setPending(false)
      setError("Your connection is too slow please try again !")} , 5000)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/image/delete/${img}`, { signal : AbortConst.signal ,
      method : 'DELETE',
      body : JSON.stringify({password}),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user.token}`
      }
    })
    clearTimeout(timmy)
    const json = await res.json()

    if(!res.ok){
      setPending(false)
      setError(json.error)
    }
    else{
      setPassword('')
      setPending(false)
      setError(null)
      dispatch({type : "DELETE_IMAGE" , payload : json})
      setDeleteOn(false)
    }
 }

 
  return (
    <div className="bg-white shadow-xl z-30 absolute p-6 flex flex-col content-around top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-5/6 sm:w-[450px] rounded-md">
       <h3 className="text-2xl font-medium mb-6">Are you sure ?</h3>
       <form onSubmit={handleSubmit}>
        <p className="mb-2">password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="w-full border-[1px] border-solid rounded-md p-1.5 border-black bg-white "/>
        {error ? <p className="text-md p-2 text-rose-700 bg-rose-300 border-solid border-rose-700 rounded-md border-2">{error}</p> : null}
        <div className="flex justify-end mt-10 ">
          <button onClick={handleCancel} disabled={pending} className="mr-4 text-gray-500">Cancel</button>
          <button  type="submit" className={`bg-red ${pending ? "opacity-70" : ""} font-semibold sm:px-4  sm:py-2 px-3 py-1.5 rounded-lg shadow-md md:mr-2 mr-1 text-white text-sm md:text-md hover:opacity-80 duration-300`} >Delete</button>
        </div>
       </form>
    </div>
  )
}

export default DeleteImage
