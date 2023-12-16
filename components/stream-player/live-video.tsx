"use client"

import { Participant, Track } from "livekit-client"
import { useTracks } from "@livekit/components-react"
import { useRef, useState, useEffect } from "react"

import { FullscreenControl } from "./fullscreen-control"

import { useEventListener } from "usehooks-ts"
import { VolumeControl } from "./volume-control"

interface LiveVideoProps {
    participant: Participant
}
export const LiveVideo = ({ participant }: LiveVideoProps) => {

    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [isFullscreen, setisFullscreen] = useState(false)
    const [volume, setVolume] = useState(0)

    const onValueChange = (value: number) => {
        setVolume(+value)

        if (videoRef?.current) {
            videoRef.current.muted = value === 0
            videoRef.current.volume = +value * 0.01
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0
        setVolume(isMuted ? 50 : 0)

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted
            videoRef.current.volume = isMuted ? 0.5 : 0
        }
    }

    useEffect(() => {
        onValueChange(0)
    }, [])
    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen()

        } else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen()

        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement !== null
        setisFullscreen(isCurrentlyFullScreen)

    }
    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef)
    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef?.current)
            }
        })
    return (
        <div className="relative h-full flex " ref={wrapperRef}>
            <video width="100%" ref={videoRef} />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute  bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4 ">
                    <VolumeControl onChange={onValueChange} value={volume} onToggle={toggleMute} />
                    <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
                </div>
            </div>
        </div>
    )
}


//====================================================================
// WELL COMMMENTED CODE TO NOT BREAK THE ACTUAL CODE :
//====================================================================

// // "use client" // Indicates client-side JavaScript, typically used in Next.js for clarity.

// // // Importing necessary dependencies.
// // import { Participant, Track } from "livekit-client"; // Imports for LiveKit video streaming.
// // import { useTracks } from "@livekit/components-react"; // Hook for managing LiveKit tracks.
// // import { useRef, useState, useEffect } from "react"; // React hooks for state and references.

// // // Importing custom components.
// // import { FullscreenControl } from "./fullscreen-control"; // A component for controlling fullscreen mode.
// // import { useEventListener } from "usehooks-ts"; // Hook for handling event listeners.
// // import { VolumeControl } from "./volume-control"; // A component for controlling volume.

// // // Interface for props expected by the LiveVideo component.
// // interface LiveVideoProps {
// //     participant: Participant; // Participant object from LiveKit.
// // }
// // export const LiveVideo = ({ participant }: LiveVideoProps) => {
// //     // Refs for the video and its wrapper for DOM manipulation.
// //     const videoRef = useRef<HTMLVideoElement>(null);
// //     const wrapperRef = useRef<HTMLDivElement>(null);

// //     // State hooks for fullscreen mode and volume control.
// //     const [isFullscreen, setisFullscreen] = useState(false);
// //     const [volume, setVolume] = useState(0);

// //     // Handler for volume changes.
// //     const onValueChange = (value: number) => {
// //         setVolume(+value); // Update volume state.

// //         // Apply volume settings to the video element.
// //         if (videoRef?.current) {
// //             videoRef.current.muted = value === 0; // Mute if volume is 0.
// //             videoRef.current.volume = +value * 0.01; // Adjust volume level.
// //         }
// //     }

// //     // Handler for toggling mute state.
// //     const toggleMute = () => {
// //         const isMuted = volume === 0;
// //         setVolume(isMuted ? 50 : 0); // Set volume to 50 if currently muted, else mute.

// //         // Apply mute settings to the video element.
// //         if (videoRef?.current) {
// //             videoRef.current.muted = !isMuted;
// //             videoRef.current.volume = isMuted ? 0.5 : 0;
// //         }
// //     }

// //     // Effect hook to initialize the volume on component mount.
// //     useEffect(() => {
// //         onValueChange(0); // Set initial volume to 0 (muted).
// //     }, []);

// //     // Handler for toggling fullscreen mode.
// //     const toggleFullscreen = () => {
// //         if (isFullscreen) {
// //             document.exitFullscreen(); // Exit fullscreen mode.
// //         } else if (wrapperRef?.current) {
// //             wrapperRef.current.requestFullscreen(); // Request fullscreen mode.
// //         }
// //     }

// //     // Handler for fullscreen change events.
// //     const handleFullscreenChange = () => {
// //         const isCurrentlyFullScreen = document.fullscreenElement !== null;
// //         setisFullscreen(isCurrentlyFullScreen); // Update fullscreen state.
// //     }

// //     // Event listener hook for fullscreen change events.
// //     useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

// //     // LiveKit tracks handling.
// //     useTracks([Track.Source.Camera, Track.Source.Microphone])
// //         .filter((track) => track.participant.identity === participant.identity)
// //         .forEach((track) => {
// //             // Attach the track to the video element.
// //             if (videoRef.current) {
// //                 track.publication.track?.attach(videoRef?.current);
// //             }
// //         });

// //     // Render the LiveVideo component.
// //     return (
// //         <div className="relative h-full flex " ref={wrapperRef}>
// //             <video width="100%" ref={videoRef} />
// //             <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
// //                 <div className="absolute  bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4 ">
// //                     {/* Volume control component */}
// //                     <VolumeControl onChange={onValueChange} value={volume} onToggle={toggleMute} />
// //                     {/* Fullscreen control component */}
// //                     <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }
