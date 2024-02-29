'use server'

import { followUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"

export const onFollow = async (id : string)=>{



    try {
    const followedUser = await followUser(id)

    revalidatePath('/')

    if (followedUser){
        revalidatePath(`/${followedUser.following.userName}`)
    }
    return followedUser;
    } catch (error) {
        throw new Error ('internal server error')
    }
}