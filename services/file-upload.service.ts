import api from "./middleware";

export const upload = async (file: File):Promise<any> => {
    try {
        const formData = new FormData();
        formData.append("media", file);
        const response = await api.post('/media', formData);
        return{
            response:response.data.urls[0],
            status:'success'
        }
    } catch (error) {
        console.log("FILE UPLOAD FAILED",error)
        return{
            response:"File Upload Failed",
            status:'failed'
        }
    }
}