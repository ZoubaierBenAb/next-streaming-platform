import { db } from "./db";
import { getSelf } from "./auth-service";



export const isBlockedByUser = async (id: string) => {

    const self = await getSelf()


    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    })

    if (!otherUser) {
        throw new Error('User not found')
    }

    if (otherUser.id === self.id) {
        return false
    }

    const existedBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
        // findUnique uses the indexex created so it is faster than findFirst which it will through the records untill if matches
    })
    return !!existedBlock

}
export const blockUser = async (id: string) => {

    const self = await getSelf()

    if (self.id === id) {
        throw new Error('you connot block yourself')
    }

    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    })
    if (!otherUser) {
        throw new Error('User not found')
    }

    const existedBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if (existedBlock) {
        throw new Error('You connot block yourself')
    }

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true
        }
    })
    return block
}


export const unblockUser = async (id : string)=>{

const self = await getSelf()

if (self.id===id){
    throw new Error ('You connot unblock yourself')

}


const otherUser = await db.user.findUnique({
    where : {
        id 
    }
})
if (!otherUser){
    throw new Error ('User not found')
}

const existingBlock = await db.block.findUnique({
    where:{
        blockerId_blockedId  : {
            blockerId : self.id,
            blockedId : otherUser.id
        }
    }
})

if (!existingBlock){
    throw new Error ('not Blocked')
}

const unblock = await db.block.delete({
    where : {
        id : existingBlock.id
    },
    include : {
        blocked : true
    }
})
return unblock;
}