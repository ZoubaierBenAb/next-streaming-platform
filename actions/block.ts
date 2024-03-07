'use server'

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";


export const onBlock = async (id: string) => {
try {
    const blockedUser = await blockUser(id)
    revalidatePath('/')
    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.userName}`)
    }



return blockedUser
} catch (error) {
    console.log(error)
}
  
}

export const onUnblock = async (id: string) => {

    const unblockedUser = await unblockUser(id)
    revalidatePath('/')
    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.userName}`)
    }



return unblockedUser
}