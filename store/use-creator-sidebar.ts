import { create } from 'zustand'; // Importing the create function from zustand for state management.

interface CreatorSidebarStore {
    collapsed: boolean; // State property indicating whether the CreatorSidebar is collapsed.
    onExpand: () => void; // Method to set the CreatorSidebar to its expanded state.
    onCollapse: () => void; // Method to set the CreatorSidebar to its collapsed state.
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
    // Using the create function from zustand to create the custom hook.
    collapsed: false, // Initial state of the CreatorSidebar, set to not collapsed (expanded).
    onExpand: () => set(() => ({ collapsed: false })),
    // Method definition for expanding the CreatorSidebar. It updates the 'collapsed' state to false.
    onCollapse: () => set(() => ({ collapsed: true }))
    // Method definition for collapsing the CreatorSidebar. It updates the 'collapsed' state to true.
}))
