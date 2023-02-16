import {Link} from "react-router-dom"
import { useState } from "react"
import {useSignup} from "../hooks/useSignup"


const Signup = () => {
    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {signup , error , loading} = useSignup()

    const handleClick = async (e) => {
      e.preventDefault()
      await signup(username ,email , password)
    }

  return (
    <div className="width-full h-[100vh]  bg-light-gray flex justify-items-center">
    <div className="flex flex-col absolute w-5/6 sm:w-[420px] mx-auto space-y-6 py-4 px-6 left-1/2 top-1/2
     shadow-md bg-white -translate-x-1/2 -translate-y-1/2">
       <h2 className="text-2xl font-bold text-center">Sign Up</h2>
       <form className="flex flex-col mx-auto space-y-2 w-full">
         <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username}  placeholder='username' className="border-light-gray border-2 border-solid p-2 w-[100%]"/>
         <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border-light-gray border-2 border-solid p-2 w-full"/>
         <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="password" className="border-light-gray border-2 border-solid p-2 w-full"/>
       </form>
       <button disabled={loading} onClick={handleClick} className="disabled:opacity-50 mx-auto bg-green px-6 py-2 text-white font-semibold hover:opacity-80 duration-300">Sign Up</button>
       {error ? <p className="text-md p-2 text-rose-700 bg-rose-300 border-solid border-rose-700 rounded-md border-2">{error}</p> : null}
       <span className="w-5/6 mx-auto bg-light-gray h-[1.5px]"></span>
       <p className="text-center">Already Have An Account ? <Link className="text-blue-600 underline" to='../login'>Login</Link></p>
    </div>
    </div>
  )
}

export default Signup