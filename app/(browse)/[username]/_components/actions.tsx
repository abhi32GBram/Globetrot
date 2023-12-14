"use client";

import { toast } from "sonner";
import { useTransition } from "react";


import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
};

// Component function for follow/unfollow actions
export const Actions = ({
    isFollowing,
    userId,
}: ActionsProps) => {

      // Track transition state for button interaction
    const [isPending, startTransition] = useTransition();

      // Function to handle follow action
    const handleFollow = () => {
        // Start transition and trigger follow action with user ID
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    // Function to handle unfollow action
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    // Function to handle button click based on following state
    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return (
        <>
            <Button
                disabled={isPending}
                onClick={onClick}
                variant="primary"
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>

        </>
    );
};
