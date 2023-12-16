"use client"
import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";

interface FullscreenControlProps {
    isFullscreen: boolean
    onToggle: () => void
}

import React from 'react'

export const FullscreenControl = ({ isFullscreen, onToggle }: FullscreenControlProps) => {
    const Icon = isFullscreen ? Minimize : Maximize
    const label = isFullscreen ? "Exit Fullscreen" : "Fullscreen"
    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
                    <Icon className="h-5 w-5" />
                </button>
            </Hint>
        </div>
    )
}

//=====================================================
// COMMENTED CODE TO PREVENT ACTUAL CODE BREAKAGE 

// // "use client" // Indicates client-side JavaScript, typically used in Next.js for clarity.

// // // Importing specific icon components from 'lucide-react'.
// // import { Maximize, Minimize } from "lucide-react";
// // // Importing a custom 'Hint' component, presumably for tooltips or similar functionality.
// // import { Hint } from "@/components/hint";

// // // Interface declaration for props expected by the FullscreenControl component.
// // interface FullscreenControlProps {
// //     isFullscreen: boolean // A boolean to indicate if the current state is fullscreen.
// //     onToggle: () => void // A function to be called when toggling fullscreen mode.
// // }

// // // Importing React, necessary for using JSX syntax and React features.
// // import React from 'react'

// // // Definition of the FullscreenControl component with destructured props.
// // export const FullscreenControl = ({ isFullscreen, onToggle }: FullscreenControlProps) => {
// //     // Conditional assignment for the icon: Minimize if fullscreen, otherwise Maximize.
// //     const Icon = isFullscreen ? Minimize : Maximize;
// //     // Conditional label text depending on the fullscreen state.
// //     const label = isFullscreen ? "Exit Fullscreen" : "Fullscreen";
    
// //     // Return statement for the JSX to be rendered by this component.
// //     return (
// //         // A div element with flexbox styling to center its contents.
// //         <div className="flex items-center justify-center gap-4">
// //             {/* Hint component wrapped around a button, used for showing the label as a tooltip. */}
// //             <Hint label={label} asChild>
// //                 {/* Button element that triggers the onToggle function when clicked. */}
// //                 <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
// //                     {/* Rendering the Icon component, which is either Maximize or Minimize. */}
// //                     <Icon className="h-5 w-5" />
// //                 </button>
// //             </Hint>
// //         </div>
// //     )
// // }
