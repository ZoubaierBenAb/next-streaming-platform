"use server"

import { v4 } from "uuid"
import { getSelf } from "@/lib/auth-service"
import { getUserById } from "@/lib/user-service"
import { AccessToken } from "livekit-server-sdk"
import { isBlockedByUser } from "@/lib/block-service"


export const createViewerToken = async (id: string) => {

    let self
    try {
        self = await getSelf()
    } catch (error) {
        const id = v4()
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        self = { id, username }
    }

    const host = await getUserById(id)
    if (!host) {
        throw new Error('User not found')
    }

    const isBlocked = await isBlockedByUser(host.id)

    if (isBlocked) {
        throw new Error('You are blocked by the host')
    }

    const isHost = self.id === host.id

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.userName
        }

    )
    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    })

    return Promise.resolve(token.toJwt())
}