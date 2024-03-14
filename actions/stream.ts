'use server'

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { getStramByUserId } from "@/lib/stream-service"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"



export const updateStream = async(values : Partial<Stream>)=>{
try {
    const self = await getSelf()

    if (!self){
        throw new Error ('not authorized')
    }

    const selfStream = await getStramByUserId(self.id)

    if (!selfStream){
        throw new Error ('Stream not found')
    }
    const validData = {
        name : values.name,
        thumbnailUrl : values.thumbnailUrl,
        isChatEnabled : values.isChatEnabled,
        isChatDelayed : values.isChatDelayed,
        isChatFollowersOnly : values.isChatFollowersOnly
    }

    const stream = await db.stream.update({
        where : {
            id : selfStream.id
        },
        data : {
            ...validData
        },
        
    })
    revalidatePath(`/u/${self.userName}/chat`)
    revalidatePath(`/u/${self.userName}`)
    revalidatePath(`/${self.userName}`)

    return stream
    
} catch (error) {
    throw new Error ('Internal server error')
}





}