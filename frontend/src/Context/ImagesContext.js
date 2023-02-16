import { createContext, useReducer } from "react";

export const ImagesContext = createContext()

const ImagesReducer = (state ,action) => {
   switch (action.type) {
    case 'SET_IMAGES':
        return {Images : action.payload}
    case 'DELETE_IMAGE':
        return { Images : state.Images.filter((image) => image._id !== action.payload._id)}
    case 'CREATE_IMAGE':
        return {Images : [action.payload , ...state.Images]}
    default:
        break;
   }
}
/*[
    {
        "label" : "aerxdctfrxdctfbcd",
        "url" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiyplkhYh9Vx3__DN27A5HmOgVRukKYLjSA&usqp=CAU"
    },
    {
        "label" : "dfdcfvgdctfvghj",
        "url" : "https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29weXJpZ2h0JTIwZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80"
    },
    {
        "label" : "heexrdcfgvewsxrdcftdfghjrtyufghcvbzewexrcyvguvgvllo",
        "url" : "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
    },
    {
        "label" : "hxrdcfvghbxetfvygbi",
        "url" : "https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg"
    },
    {
        "label" : "azertyuiosdfghxcvdfgh",
        "url" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW8P3T0263IoxZLgBK5i0UeCrBNofUwLdV-g&usqp=CAU"    },
    {
        "label" : "hihserdtfgycfvgfghii",
        "url" : "https://swampview.com/wp-content/uploads/2019/06/royalty-free-no-copyright-vlog-music.png"
    },
    {
        "label" : "hellxedrctfyvgoooo",
        "url" : "https://cdn.pixabay.com/photo/2019/10/13/22/39/sky-4547342__480.jpg"
    },
    {
        "label" : "dicvguhfvghngding",
        "url" : "https://i1.sndcdn.com/artworks-000583111214-0qe6sl-t500x500.jpg"
    },
    {
        "label" : "bandcfvgcfghvhhbjg",
        "url" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHr2p2HWSYxOJ4S0MiM7vdKrKHY0Lg0B0U8Q&usqp=CAU"
    }
   ]*/ 
export const ImagesContextProvider = ({children}) => {
   const [state , dispatch] = useReducer(ImagesReducer , {Images : []})

   return (
    <ImagesContext.Provider value = {{...state , dispatch}}>
        {children}
    </ImagesContext.Provider>
   )
}
