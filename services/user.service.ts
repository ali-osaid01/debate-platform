import api from "./middleware";

export const authenticatedUser = async () => {
   try {
      const user = await api.get('/user')
      return {
         success:true,
         response:user
      }
   } catch (error:any) {
         return{
            success:false,
            error: error.response?.data?.message || "Something went wrong",
         }
   }
   
}