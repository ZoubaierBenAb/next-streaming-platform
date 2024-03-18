import { db } from "./db";


export const getUserByUsername = async (username : string)=>{

const user = db.user.findUnique({
    where : {
        userName : username
    },
    include : {
        stream : true
    }
})
return user
}



export const getUserById = async(id : string)=>{

    const user = await db.user.findUnique({
        where : {
            id
        }
    })
    return user

}