import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'

interface UserPageProps {
    params: {
        username: string
    }

}
const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username)
    if (!user) {
        notFound()
    }
    const isFollowing = await isFollowingUser(user.id)
    return (
        <div>
            User: {user.username}
            <br />
            User Id : {user.id}
            <br />
            isFollowing : {`${isFollowing}`}
            <br />
            <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
    )
}

export default UserPage