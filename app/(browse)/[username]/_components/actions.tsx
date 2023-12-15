"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock, onUnblock } from "@/actions/block";


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

    const handleBlock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`gottach ${data.blocked.username}`))
                .catch(() => toast.error("Something Went Wrong"))
        })

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
            <br />
            <Button onClick={handleBlock} disabled={isPending}>
                UB please
            </Button>

        </>
    );
};
