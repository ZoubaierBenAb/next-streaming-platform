import { db } from "./db";

import { getSelf } from "./auth-service";


export const getStramByUserId = async(userId : string)=>{

const stream = await db.stream.findUnique({
     where : {userId}
})

if (!stream){
    throw new Error ('Stream not found')
}

return stream

}