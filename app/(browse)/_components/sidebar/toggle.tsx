"use client" // Indicates that this script should run on the client side in a Next.js application.

import React from 'react' // Importing React to use JSX and other React features.

import { Button } from '@/components/ui/button' // Importing a custom Button component from the project's UI components.
import { useSidebar } from '@/store/use-sidebar' // Importing a custom hook for managing sidebar state.
import { ArrowLeftFromLine, ArrowRightFromLineIcon } from 'lucide-react' // Importing icons from the lucide-react library.
import { Hint } from '@/components/hint' // Importing a custom Hint component for displaying tooltips.

const Toggle = () => { // Declaring the Toggle functional component.

    const { collapsed, onExpand, onCollapse } = useSidebar((state) => state) // Destructuring sidebar state and actions from the useSidebar hook.
    const label = collapsed ? "Expand" : "Collapse" // Setting the label dynamically based on the collapsed state.

    return (
        <>
            {collapsed && ( // Conditional rendering: this block renders when the sidebar is collapsed.
                <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
                    {/* Container for the expand button, hidden on smaller screens and visible on larger screens */}
                    <Hint label={label} side="right" asChild>
                        {/* Hint component wrapping the button, displaying a tooltip */}
                        <Button variant="ghost" className='h-auto p-2' onClick={onExpand}>
                            {/* Button for expanding the sidebar */}
                            <ArrowRightFromLineIcon className='h-4 w-4' />
                            {/* Icon indicating the action to expand */}
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && ( // Conditional rendering: this block renders when the sidebar is not collapsed.
                <div className='p-3 pl-6 mb-3 flex items-center w-full '>
                    {/* Container for the collapse button and additional content */}
                    <p className='font-semibold text-primary'>
                        For You
                        {/* Text indicating the current section or state */}
                    </p>
                    <Hint label={label} side="right" asChild>
                        {/* Hint component wrapping the button, displaying a tooltip */}
                        <Button className='h-auto p-2 ml-auto' variant="ghost" onClick={onCollapse}>
                            {/* Button for collapsing the sidebar */}
                            <ArrowLeftFromLine className='h-4 w-4' />
                            {/* Icon indicating the action to collapse */}
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export default Toggle // Exporting the Toggle component as the default export of this module.
