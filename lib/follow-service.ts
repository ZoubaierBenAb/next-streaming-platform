import { db } from "./db";
import { getSelf } from "./auth-service";


export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error('user not found')
        }

        if (otherUser.id === self.id) {
            return true
        }


        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow



    } catch (error) {
        return false
    }


}

export const followUser = async (id: string) => {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: { id }
    })
    if (!otherUser) {
        throw new Error('user not found')
    }
    if (otherUser.id === self.id) {
        throw new Error('connot follow yourself')
    }
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })


    if (existingFollow) {
        throw new Error('Already follow')
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if (existingBlock) {
        throw new Error('you cant follow a blocked user')
    }
    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true
        }
    })
    return follow;
}

export const unfollowUser = async (id: string) => {
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
        throw new Error('Connot unfollow yourself')
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })
    if (!existingFollow) {
        throw new Error('You are not following the user')
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true
        }
    })
    return follow;
}

export const getFollowedUsers = async () => {


    try {
        const self = await getSelf()
        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id // to ensure the user that you are following is blocking you 
                        }
                    }
                }
            },
            include: {
                following: {
                    include : {
                        stream : true
                    }
                }

            }

        }) //  the function retrieves the list of followers expect the followers that are blocking the user 
        return followedUsers
    } catch (error) {
        []
    }
}