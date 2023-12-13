import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// Importing Tooltip components for creating a tooltip.

interface HintProps {
    label: string; // Text to be displayed inside the tooltip.
    children: React.ReactNode; // Child elements around which the tooltip will be displayed.
    asChild?: boolean; // Optional prop to indicate if the trigger should use the child element directly.
    side?: "top" | "bottom" | "left" | "right"; // Optional prop to set the side where the tooltip appears.
    align?: "start" | "center" | "end"; // Optional prop to align the tooltip content.
}

import React from 'react'; 

export const Hint = ({ label, children, asChild, side, align }: HintProps) => {
    // Functional component definition with destructuring of props.
    return (
        <TooltipProvider>
            {/* Wrapper component that provides context for tooltips. */}
            <Tooltip delayDuration={0}>
                {/* Tooltip component with no delay in showing the tooltip. */}
                <TooltipTrigger asChild={asChild}>
                    {/* The component that triggers the tooltip. If 'asChild' is true, it uses the child component directly as the trigger. */}
                    {children}
                    {/* Rendering the children elements. */}
                </TooltipTrigger>
                <TooltipContent className="text-black bg-white" side={side} align={align}>
                    {/* The content of the tooltip, with customizable side and alignment. */}
                    <p className="font-semibold">
                        {label}
                        {/* Displaying the label text inside the tooltip. */}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
