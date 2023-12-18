import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    };
};

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUsername(params.username);

    if (!user || !user.stream) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    );
}

export default UserPage;

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Import necessary functions and libraries
// // import { notFound } from "next/navigation"; // Function to handle 'not found' navigation in Next.js
// // import { getUserByUsername } from "@/lib/user-service"; // Function to retrieve user data by username
// // import { isFollowingUser } from "@/lib/follow-service"; // Function to check if the current user is following another user
// // import { isBlockedByUser } from "@/lib/block-service"; // Function to check if the current user is blocked by another user
// // import { StreamPlayer } from "@/components/stream-player"; // Component to play user's stream

// // // Define the props structure for UserPage component
// // interface UserPageProps {
// //     params: {
// //         username: string; // Expect a username parameter
// //     };
// // };

// // // Define the UserPage component as an asynchronous function
// // const UserPage = async ({
// //     params
// // }: UserPageProps) => {
// //     // Retrieve user data based on the username from the URL parameter
// //     const user = await getUserByUsername(params.username);

// //     // Check if the user or their stream does not exist
// //     if (!user || !user.stream) {
// //         notFound(); // Navigate to the 'not found' page if the user or stream is absent
// //     }

// //     // Check if the current user is following the user whose page is being accessed
// //     const isFollowing = await isFollowingUser(user.id);

// //     // Check if the current user is blocked by the user whose page is being accessed
// //     const isBlocked = await isBlockedByUser(user.id);

// //     // If the current user is blocked, navigate to the 'not found' page
// //     if (isBlocked) {
// //         notFound();
// //     }

// //     // Render the StreamPlayer component with the user and stream data
// //     // and the following status
// //     return (
// //         <StreamPlayer
// //             user={user}
// //             stream={user.stream}
// //             isFollowing={isFollowing}
// //         />
// //     );
// // }

// // // Export the UserPage component as the default export of this module
// // export default UserPage;
