"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { updateUser } from "@/actions/user";

interface BioModalProps {
    initialValue: string | null;
};

export const BioModal = ({
    initialValue,
}: BioModalProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue || "");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success("Bio Upadated Successfully");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something Went Wrong"));
        });
    }

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your Bio</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="User bio"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
};

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Import necessary hooks, components, and functions
// // import { toast } from "sonner"; // Import toast for notifications
// // import { useState, useTransition, useRef } from "react"; // Import React hooks

// // import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog components
// // import { Button } from "@/components/ui/button"; // Import Button component
// // import { Textarea } from "@/components/ui/textarea"; // Import Textarea component

// // import { updateUser } from "@/actions/user"; // Import function to update user

// // // Define the props structure for the BioModal component
// // interface BioModalProps {
// //     initialValue: string | null; // Initial value for the bio
// // };

// // // Define the BioModal functional component
// // export const BioModal = ({
// //     initialValue,
// // }: BioModalProps) => {
// //     // useRef hook to reference the close button
// //     const closeRef = useRef<ElementRef<"button">>(null);

// //     // useState and useTransition hooks for state management and transitions
// //     const [isPending, startTransition] = useTransition();
// //     const [value, setValue] = useState(initialValue || ""); // Initialize bio value

// //     // Function to handle form submission
// //     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault(); // Prevent default form submission behavior

// //         startTransition(() => {
// //             updateUser({ bio: value }) // Call updateUser to update the bio
// //                 .then(() => {
// //                     toast.success("Bio Updated Successfully"); // Show success toast notification
// //                     closeRef.current?.click(); // Programmatically click the close button
// //                 })
// //                 .catch(() => toast.error("Something Went Wrong")); // Show error toast on failure
// //         });
// //     }

// //     // Render the BioModal component
// //     return (
// //         <Dialog>
// //             {/* Button to trigger the dialog */}
// //             <DialogTrigger asChild>
// //                 <Button variant="link" size="sm" className="ml-auto">
// //                     Edit
// //                 </Button>
// //             </DialogTrigger>

// //             {/* Dialog content */}
// //             <DialogContent>
// //                 <DialogHeader>
// //                     <DialogTitle>Edit your Bio</DialogTitle> {/* Title of the dialog */}
// //                 </DialogHeader>

// //                 {/* Form for editing the bio */}
// //                 <form onSubmit={onSubmit} className="space-y-4">
// //                     <Textarea
// //                         placeholder="User bio" // Textarea for bio input
// //                         onChange={(e) => setValue(e.target.value)} // Update value on change
// //                         value={value}
// //                         disabled={isPending} // Disable during pending state
// //                         className="resize-none"
// //                     />
// //                     {/* Buttons for saving or canceling */}
// //                     <div className="flex justify-between">
// //                         <DialogClose ref={closeRef} asChild>
// //                             <Button type="button" variant="ghost">
// //                                 Cancel
// //                             </Button>
// //                         </DialogClose>
// //                         <Button disabled={isPending} type="submit" variant="primary">
// //                             Save
// //                         </Button>
// //                     </div>
// //                 </form>
// //             </DialogContent>
// //         </Dialog>
// //     );
// // };
