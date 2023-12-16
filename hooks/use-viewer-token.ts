import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                }
                const name = decodedToken?.name;
                const identity = decodedToken.jti;

                if (identity) {
                    setIdentity(identity);
                }

                if (name) {
                    setName(name);
                }

            } catch {
                toast.error("Something went wrong");
            }
        }

        createToken();
    }, [hostIdentity]);

    return {
        token,
        name,
        identity,
    };
};

//====================================================================

// WELL COMMMENTED CODE TO NOT BREAK THE ACTUAL CODE :

// // // import { toast } from "sonner"; // Importing the 'toast' function for displaying notifications.
// // // import { useEffect, useState } from "react"; // Importing React hooks 'useEffect' and 'useState'.
// // // import { JwtPayload, jwtDecode } from "jwt-decode"; // Importing JWT decoding utilities.

// // // import { createViewerToken } from "@/actions/token"; // Importing a custom function to create a viewer token.

// // // // Define a custom React hook named 'useViewerToken'.
// // // export const useViewerToken = (hostIdentity: string) => {
// // //     // State hooks to store the token, name, and identity.
// // //     const [token, setToken] = useState(""); // State for storing the JWT token.
// // //     const [name, setName] = useState(""); // State for storing the user's name extracted from the token.
// // //     const [identity, setIdentity] = useState(""); // State for storing the user's identity extracted from the token.

// // //     // useEffect hook for performing side effects.
// // //     useEffect(() => {
// // //         // Define an asynchronous function to create and process the viewer token.
// // //         const createToken = async () => {
// // //             try {
// // //                 // Attempt to create a viewer token using the provided host identity.
// // //                 const viewerToken = await createViewerToken(hostIdentity);
// // //                 setToken(viewerToken); // Update the token state with the newly created token.

// // //                 // Decode the JWT token to extract the payload.
// // //                 const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
// // //                     name?: string // Expecting a 'name' field in the payload.
// // //                 };
// // //                 // Extract the 'name' and 'jti' (JWT ID, used as identity) from the decoded token.
// // //                 const name = decodedToken?.name;
// // //                 const identity = decodedToken.jti;

// // //                 // Update the identity state if it's present in the token.
// // //                 if (identity) {
// // //                     setIdentity(identity);
// // //                 }

// // //                 // Update the name state if it's present in the token.
// // //                 if (name) {
// // //                     setName(name);
// // //                 }

// // //             } catch {
// // //                 // Display an error notification if any part of the token process fails.
// // //                 toast.error("Something went wrong");
// // //             }
// // //         }

// // //         // Execute the createToken function.
// // //         createToken();
// // //     }, [hostIdentity]); // Dependency array for useEffect, re-run the hook if 'hostIdentity' changes.

// // //     // Return the token, name, and identity for use in other components.
// // //     return {
// // //         token,
// // //         name,
// // //         identity,
// // //     };
// // // };
