import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecomonded = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    } catch (error) {
        userId = null
    }

    let users = []

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [{
                    NOT: {
                        id: userId
                    },
                }, {
                    NOT: {
                        followedBy: {
                            some: {
                                followerId: userId // ( some operator : at least one element satistfies the condition)
                            }
                        }
                    },
                    
                },{
                    NOT : {
                        blocking : {
                            some : {
                                blockedId : userId
                            }
                        }
                    },
                    
                },{
                    NOT : {
                        blocked: {
                            some : {
                                blockerId : userId
                            }
                        }
                    }
                }]
            },
            include : {
                stream : true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }) // this function returns an array of the users except the current user and who he's following 
    } 
    else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
    return users;
}