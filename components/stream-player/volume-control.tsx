import { Volume1, Volume2, VolumeX } from "lucide-react"
import { Hint } from "@/components/hint"

import { Slider } from "@/components/ui/slider"

interface VolumeControlProps {
    onToggle: () => void
    onChange: (value: number) => void
    value: number
}

import React from 'react'

export const VolumeControl = ({ onToggle, onChange, value }: VolumeControlProps) => {

    const isMuted = value === 0
    const isAboveHalf = value > 50

    let Icon = Volume1
    if (isMuted) {
        Icon = VolumeX
    } else if (isAboveHalf) {
        Icon = Volume2
    }

    const label = isMuted ? "Unmute" : "Mute"

    const handleChange = (value: number[]) => {
        onChange(value[0])
    }
    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
                    <Icon className="h-6 w-6" />
                </button>
            </Hint>
            <Slider className="w-[8rem] cursor-pointer" onValueChange={handleChange} value={[value]} max={100} step={1} />
        </div>
    )
}
//====================================================================
// WELL COMMMENTED CODE TO NOT BREAK THE ACTUAL CODE :


// // // Importing volume-related icons from 'lucide-react'.
// // import { Volume1, Volume2, VolumeX } from "lucide-react"

// // // Importing the 'Hint' component, likely used for tooltips or similar functionality.
// // import { Hint } from "@/components/hint"

// // // Importing a 'Slider' component, presumably a UI component for volume control.
// // import { Slider } from "@/components/ui/slider"

// // // Interface declaration for props expected by the VolumeControl component.
// // interface VolumeControlProps {
// //     onToggle: () => void // A function to be called when toggling the mute state.
// //     onChange: (value: number) => void // A function to handle changes in volume.
// //     value: number // Current volume value.
// // }

// // // Importing React for JSX syntax and React features.
// // import React from 'react'

// // // Definition of the VolumeControl component with destructured props.
// // export const VolumeControl = ({ onToggle, onChange, value }: VolumeControlProps) => {
// //     // Determining if the volume is muted (value is 0) or above half (value > 50).
// //     const isMuted = value === 0
// //     const isAboveHalf = value > 50

// //     // Defaulting the icon to Volume1.
// //     let Icon = Volume1
// //     // Change the icon to VolumeX if muted, or to Volume2 if the volume is above half.
// //     if (isMuted) {
// //         Icon = VolumeX
// //     } else if (isAboveHalf) {
// //         Icon = Volume2
// //     }

// //     // Label text for the hint, changes based on mute state.
// //     const label = isMuted ? "Unmute" : "Mute"

// //     // Function to handle changes in the slider component.
// //     const handleChange = (value: number[]) => {
// //         onChange(value[0]) // Call the onChange prop with the new value.
// //     }

// //     // Return statement for the JSX to be rendered.
// //     return (
// //         // A div with flex layout to align items and set gap.
// //         <div className="flex items-center gap-2">
// //             {/* Hint component wrapped around a button for the tooltip functionality. */}
// //             <Hint label={label} asChild>
// //                 {/* Button element that triggers the onToggle function when clicked. */}
// //                 <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
// //                     {/* Rendering the appropriate Icon based on the volume state. */}
// //                     <Icon className="h-6 w-6" />
// //                 </button>
// //             </Hint>
// //             {/* Slider component for adjusting volume. */}
// //             <Slider 
// //                 className="w-[8rem] cursor-pointer" 
// //                 onValueChange={handleChange} 
// //                 value={[value]} 
// //                 max={100} 
// //                 step={1} 
// //             />
// //         </div>
// //     )
// // }
