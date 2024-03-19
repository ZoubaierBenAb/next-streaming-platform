import { useState, useEffect } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { createViewerToken } from "@/actions/token";


export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [identity, setIdentity] = useState('')

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity)

                setToken(viewerToken)

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                }

                const name = decodedToken?.name
                const identity = decodedToken?.jti

                if (name) {
                    setName(name)
                }
                if (identity) {
                    setIdentity(identity)
                }

            } catch (error) {
                toast.error('something went wrong')
            }
        }
        createToken()
    }, [hostIdentity])

    return {
        token,
        name,
        identity
    }
}