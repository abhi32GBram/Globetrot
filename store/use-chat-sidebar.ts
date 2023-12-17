import { create } from "zustand";

export enum ChatVariant {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY"
};

interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVariant.CHAT,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Importing the 'create' function from the 'zustand' library, which is used for state management.
// // import { create } from "zustand";

// // // Defining an enum 'ChatVariant' with two values, 'CHAT' and 'COMMUNITY'.
// // export enum ChatVariant {
// //     CHAT = "CHAT",
// //     COMMUNITY = "COMMUNITY"
// // };

// // // Declaring the structure of the ChatSidebarStore interface.
// // interface ChatSidebarStore {
// //     collapsed: boolean; // A boolean to track if the sidebar is collapsed or not.
// //     variant: ChatVariant; // A variable of type ChatVariant to track the current variant.
// //     onExpand: () => void; // A function that will handle the sidebar expansion.
// //     onCollapse: () => void; // A function that will handle the sidebar collapsing.
// //     onChangeVariant: (variant: ChatVariant) => void; // A function to change the variant.
// // };

// // // Creating a custom hook 'useChatSidebar' using the 'create' function from zustand.
// // export const useChatSidebar = create<ChatSidebarStore>((set) => ({
// //     collapsed: false, // Initializing 'collapsed' state to false (sidebar is not collapsed initially).
// //     variant: ChatVariant.CHAT, // Setting the initial 'variant' to 'CHAT'.
// //     onExpand: () => set(() => ({ collapsed: false })), // Defining 'onExpand' to set 'collapsed' to false.
// //     onCollapse: () => set(() => ({ collapsed: true })), // Defining 'onCollapse' to set 'collapsed' to true.
// //     onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })), // Defining 'onChangeVariant' to set the 'variant'.
// // }));
