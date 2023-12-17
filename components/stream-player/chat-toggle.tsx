"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse,
    } = useChatSidebar((state) => state);

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    };

    const label = collapsed ? "Expand Chat" : "Collapse Chat";

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

// // // Importing icon components from 'lucide-react'.
// // import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

// // // Importing the Hint component and Button component from specified paths.
// // import { Hint } from "@/components/hint";
// // import { Button } from "@/components/ui/button";
// // // Importing the useChatSidebar hook from the store.
// // import { useChatSidebar } from "@/store/use-chat-sidebar";

// // // Exporting the ChatToggle functional component.
// // export const ChatToggle = () => {
// //     // Destructuring the required properties and functions from useChatSidebar hook.
// //     const {
// //         collapsed,
// //         onExpand,
// //         onCollapse,
// //     } = useChatSidebar((state) => state);

// //     // Determining which icon to use based on the collapsed state.
// //     const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

// //     // Function to handle the toggle action.
// //     const onToggle = () => {
// //         // Expanding or collapsing the sidebar based on its current state.
// //         if (collapsed) {
// //             onExpand();
// //         } else {
// //             onCollapse();
// //         }
// //     };

// //     // Label text changes based on the collapsed state.
// //     const label = collapsed ? "Expand Chat" : "Collapse Chat";

// //     // Rendering the toggle button with an icon.
// //     return (
// //         // Hint component providing additional information on hover.
// //         <Hint label={label} side="left" asChild>
// //             <Button
// //                 onClick={onToggle}
// //                 variant="ghost"
// //                 className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
// //             >
// //                 <Icon className="h-4 w-4" />
// //             </Button>
// //         </Hint>
// //     );
// // };
