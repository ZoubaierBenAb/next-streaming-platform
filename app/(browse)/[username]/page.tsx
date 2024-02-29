import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { userAgent } from "next/server";

interface UserPageProps {
    params : {
        username : string;
    }
}



const UserPage = async({params}:UserPageProps)=>{

    const user = await getUserByUsername(params.username)

    if (!user){
        notFound()
    }
    const isFollowing = await isFollowingUser(user.id)
return (
<div className="flex flex-col gap-y-4">
<p>username: {user.userName}</p>
<p>is Following : {`${isFollowing}`}</p>
</div>
)
}


export default UserPage