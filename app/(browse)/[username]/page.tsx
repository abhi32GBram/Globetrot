import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'


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
    const isBlocked = await isBlockedByUser(user.id)

    // If the user manually tries to lookup the user they got blocked by...then 404 them 
    // if(isBlocked){
    //     notFound()
    // }

    return (
        <div>
            User: {user.username}
            <br />
            User Id : {user.id}
            <br />
            isFollowing : {`${isFollowing}`}
            <br />
            <p>
                is Blocked by this user : {`${isBlocked}`}
            </p>
            <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
    )
}

export default UserPage