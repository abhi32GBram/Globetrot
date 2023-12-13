import { create } from 'zustand'; // Importing the create function from zustand for state management.

interface SidebarStore {
    collapsed: boolean; // State property indicating whether the sidebar is collapsed.
    onExpand: () => void; // Method to set the sidebar to its expanded state.
    onCollapse: () => void; // Method to set the sidebar to its collapsed state.
}

export const useSidebar = create<SidebarStore>((set) => ({
    // Using the create function from zustand to create the custom hook.
    collapsed: false, // Initial state of the sidebar, set to not collapsed (expanded).
    onExpand: () => set(() => ({ collapsed: false })),
    // Method definition for expanding the sidebar. It updates the 'collapsed' state to false.
    onCollapse: () => set(() => ({ collapsed: true }))
    // Method definition for collapsing the sidebar. It updates the 'collapsed' state to true.
}))
