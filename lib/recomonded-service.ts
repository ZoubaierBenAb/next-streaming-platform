import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecomonded = async()=>{

const user = await db.user.findMany({
    orderBy :{
        createdAt : 'desc'
    }  
})
return user ;

}