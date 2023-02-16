import { useState } from "react"

const ImageDetails = ({image , setDeleteOn , setImg}) => {
  const [active , setActive] = useState(false)

  return (
    <div onClick={()=>setActive((prev)=>!prev)} className="relative mb-6  sm:mb-10 overflow-hidden h-[275px]">
      <img src={image.url} alt={image.label} className="cursor-pointer w-full h-full rounded-3xl "/>
      <div className={`absolute overlay hover:block transition overflow-hidden left-0 top-0 right-0 ${active ? "bottom-0 h-[100%]" : "bottom-[100%] h-0"} ?  z-5 bg-[rgba(0,0,0,0.5)] w-full rounded-3xl`}>
          <button href='#top' onClick={(e)=>{setDeleteOn(true)  
                                setImg(image._id)
                                window.scroll({
                                  top: 0,
                                  left: 0,
                                  behavior: 'smooth'
                                });}} className="text-red absolute border-solid border-2 border-red px-2.5 py-1 rounded-3xl top-3 right-3 hover:opacity-80 duration-300">Delete</button>
          <h2 className="text-white absolute left-3 bottom-6 font-medium text-md">{image.label}</h2>
      </div>
    </div>
  )
}

export default ImageDetails