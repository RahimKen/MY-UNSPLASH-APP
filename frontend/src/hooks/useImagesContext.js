import { useContext } from 'react'
import {ImagesContext} from '../Context/ImagesContext'

export const useImagesContext = () => {
    const context = useContext(ImagesContext)

    if (context === undefined) {
        throw Error ('useImagesContext must be used inside an ImagesContextProvider')
    }

    return context
}