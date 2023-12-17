"use client";

import { MessageSquare, Users } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
    const {
        variant, onChangeVariant
    } = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT
    const Icon = isChat ? Users : MessageSquare

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
        onChangeVariant(newVariant)
    };

    const label = isChat ? "Community" : "Go Back to Chat";

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    );
};

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Importing icon components and other components from various libraries.
// // import { MessageSquare, Users } from "lucide-react";
// // import { Hint } from "@/components/hint";
// // import { Button } from "@/components/ui/button";
// // import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

// // // Exporting the VariantToggle functional component.
// // export const VariantToggle = () => {
// //     // Using the custom hook useChatSidebar to access the current variant and the onChangeVariant function.
// //     const { variant, onChangeVariant } = useChatSidebar((state) => state);

// //     // Determining if the current chat variant is CHAT.
// //     const isChat = variant === ChatVariant.CHAT
// //     // Choosing an icon based on whether the current variant is CHAT or COMMUNITY.
// //     const Icon = isChat ? Users : MessageSquare

// //     // Function to handle the toggle action.
// //     const onToggle = () => {
// //         // Determining the new variant based on the current one and triggering the change.
// //         const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
// //         onChangeVariant(newVariant)
// //     };

// //     // Setting the label for the hint based on the current variant.
// //     const label = isChat ? "Community" : "Go Back to Chat";

// //     // Rendering the toggle button with a hint and an icon.
// //     return (
// //         // Hint component that displays additional information on hover.
// //         <Hint label={label} side="left" asChild>
// //             <Button
// //                 onClick={onToggle}
// //                 variant="ghost"
// //                 className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
// //             >
// //                 {/* Displaying the chosen icon */}
// //                 <Icon className="h-4 w-4" />
// //             </Button>
// //         </Hint>
// //     );
// // };
