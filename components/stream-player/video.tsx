"use client";

import { ConnectionState, Track } from "livekit-client";
import { useConnectionState, usePagination, useRemoteParticipant, useTracks } from "@livekit/components-react"
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
};

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity)

    let content

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />
    } else if (!participant || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />
    } else {
        content = <LiveVideo participant={participant} />
    }


    return (
        <div className="aspect-video border-b group relative ">
            {content}
        </div>
    );
};

//====================================================================
// WELL COMMMENTED CODE TO NOT BREAK THE ACTUAL CODE :
//====================================================================


// // "use client"; // Indicates client-side JavaScript, typically used in Next.js for clarity.

// // // Importing necessary dependencies.
// // import { ConnectionState, Track } from "livekit-client"; // Imports for LiveKit video streaming.
// // // Importing various hooks from '@livekit/components-react' for managing LiveKit connections and tracks.
// // import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";

// // // Importing custom components for different video states.
// // import { OfflineVideo } from "./offline-video"; // Component to display when the participant is offline.
// // import { LoadingVideo } from "./loading-video"; // Component to display when the video is loading.
// // import { LiveVideo } from "./live-video"; // Component to display the live video stream.

// // // Interface for props expected by the Video component.
// // interface VideoProps {
// //     hostName: string; // Host's name.
// //     hostIdentity: string; // Host's unique identity.
// // };

// // // Definition of the Video component with destructured props.
// // export const Video = ({ hostName, hostIdentity }: VideoProps) => {
// //     // Hook to get the current connection state of the LiveKit room.
// //     const connectionState = useConnectionState();
// //     // Hook to get the remote participant based on the host's identity.
// //     const participant = useRemoteParticipant(hostIdentity);
// //     // Hook to get the tracks of the remote participant, filtered by identity.
// //     const tracks = useTracks([
// //         Track.Source.Camera,
// //         Track.Source.Microphone,
// //     ]).filter((track) => track.participant.identity === hostIdentity);

// //     let content; // Variable to hold the component to be rendered based on the state.

// //     // Determine which component to render based on the state of the participant and connection.
// //     if (!participant && connectionState === ConnectionState.Connected) {
// //         // If there's no participant but the connection is established, show the offline video component.
// //         content = <OfflineVideo username={hostName} />
// //     } else if (!participant || tracks.length === 0) {
// //         // If the participant is not present or there are no tracks, show the loading video component.
// //         content = <LoadingVideo label={connectionState} />
// //     } else {
// //         // If the participant is present and there are tracks, show the live video component.
// //         content = <LiveVideo participant={participant} />
// //     }

// //     // Return the JSX for rendering.
// //     return (
// //         // A div with styling to maintain aspect ratio and border, containing the relevant content.
// //         <div className="aspect-video border-b group relative ">
// //             {content}
// //         </div>
// //     );
// // };
