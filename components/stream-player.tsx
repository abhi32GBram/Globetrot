"use client"

import { useViewerToken } from '@/hooks/use-viewer-token'
import { Stream, User } from '@prisma/client'
import React from 'react'

interface StreamPlayerProps {
    user: User & { stream: Stream | null }
    stream: Stream
    isFollowing: boolean
}
export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {

    const { token, name, identity } = useViewerToken(user.id)

    if (!token || !name || !identity)
        return (
            <div>
                Cannot Watch the Stream
            </div>
        )

    return (
        <div>
            Allowed to Watch the Stream
        </div>
    )
}
