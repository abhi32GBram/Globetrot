"use client" // Indicates that this script should run on the client side in a Next.js application.

import React from 'react' // Importing React to use JSX and other React features.
import { useEffect } from 'react' // Importing useEffect hook from React for side effects.

import { useMediaQuery } from 'usehooks-ts' // Importing the useMediaQuery hook from usehooks-ts for responsive design.

import { cn } from '@/lib/utils' // Importing a utility function for conditional class naming.
import { useSidebar } from '@/store/use-sidebar' // Importing a custom hook for managing sidebar state.

interface ContainerProps { // Defining the props for the Container component.
    children: React.ReactNode // Expecting children elements to be passed as props.
}

export const Container = ({ children }: ContainerProps) => { // Functional component definition with destructuring of props.

    const matches = useMediaQuery("(max-width: 1024px)") // Using useMediaQuery to check for a max-width of 1024px.
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state) // Destructuring sidebar state and actions from the useSidebar hook.

    useEffect(() => { // React useEffect hook for handling side effects.
        if (matches) { // If the media query matches (i.e., screen width is less than 1024px).
            onCollapse() // Call onCollapse to update the sidebar state to collapsed.
        } else {
            onExpand() // If the screen width is greater, call onExpand to expand the sidebar.
        }
    }, [matches, onCollapse, onExpand]) // Dependency array for useEffect, re-run the effect if these values change.

    return (
        <div className={cn( // JSX for the component, using a div as the container.
            "flex-1", // Applying flex-grow: 1; to take up the available space.
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60" // Conditional class application using the cn utility. Adjusting margin-left based on the sidebar state.
        )}>
            {children} 
        </div>
    )
}
