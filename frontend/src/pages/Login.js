import {Link} from "react-router-dom"
import { useState } from "react"
import {useLogin} from "../hooks/useLogin"


const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {login , error , loading} = useLogin()

    const handleSubmit = async (e) => {
      e.preventDefault()
      await login(email , password)
      if(!error){
        setEmail('')
        setPassword('')
      }
    }
  return (
    <div className="width-full h-[100vh]  bg-light-gray flex justify-items-center">
      <div className="flex absolute flex-col w-5/6 sm:w-[420px] mx-auto space-y-6 py-4 px-6 shadow-md bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
         <h2 className="text-2xl font-bold text-center">Log In</h2>
         <form className="flex flex-col mx-auto space-y-2 w-full">
           <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border-light-gray border-2 border-solid p-2 w-full"/>
           <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password" className="border-light-gray border-2 border-solid p-2 w-full"/>
           <button disabled={loading} onClick={handleSubmit} className="disabled:opacity-50 mx-auto bg-green px-6 py-2 text-white font-semibold hover:opacity-80 duration-300">Log In</button>
         </form>
         <span className="w-5/6 mx-auto bg-light-gray h-[1.5px]"></span>
         <p className="text-center">Don't Have An Account ? <Link  className="text-blue-600 underline" to='../signup'>Sign Up</Link></p>
         {error ? <p className="text-md p-2 text-rose-700 bg-rose-300 border-solid border-rose-700 rounded-md border-2">{error}</p> : null}
      </div>
    </div>
  )
}

export default Login