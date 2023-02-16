import { useAuthContext } from "./useAuthContext"
import {useImagesContext} from './useImagesContext'

export const useLogout = () => {
    const {dispatch : dispatchAuth} = useAuthContext()
    const {dispatch : dispatchImages} = useImagesContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatchAuth({type : 'LOGOUT'})
        dispatchImages({type : 'SET_IMAGES' , payload : null})
    }

    return {logout}
}