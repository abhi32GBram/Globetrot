"use client"

import { useState, useTransition, useRef, ElementRef } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { updateStream } from "@/actions/stream"



import { toast } from "sonner"

import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from 'next/navigation'
import { Hint } from '../hint'
import Image from 'next/image'
import { Trash } from 'lucide-react'



interface InfoModalProps {
    initialName: string
    initialThumbnail: string | null
}


export const InfoModal = ({ initialName, initialThumbnail }: InfoModalProps) => {

    const router = useRouter()

    const closeRef = useRef<ElementRef<"button">>(null)

    const [isPending, startTransition] = useTransition()

    const [name, setName] = useState(initialName)

    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnail)

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Thumbnail Remove Successfully")
                    setThumbnailUrl("")
                    closeRef?.current?.click()
                })
                .catch(() => toast.error("Something Went Wrong"))
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success("Stream Info Updated")
                    closeRef?.current?.click()
                })
                .catch(() => toast.error("Something Went Wrong "))
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
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
                    <DialogTitle>
                        Edit Stream Info
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input placeholder="Stream Title " onChange={onChange} value={name} disabled={isPending} />
                    </div>
                    <div className='space-y-2'>
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove thumbnail" asChild side="left">
                                        <Button type="button" disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image alt="Thumbnail" src={thumbnailUrl} fill className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: "#FFFFFF"
                                        },
                                        allowedContent: {
                                            color: "#FFFFFF"
                                        }
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                        closeRef?.current?.click();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="primary" type="submit" disabled={false}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Import necessary hooks and components from React and other libraries
// // import { useState, useTransition, useRef } from 'react' 
// // import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // import { Button } from "@/components/ui/button"
// // import { Label } from "@/components/ui/label"
// // import { Input } from "@/components/ui/input"
// // import { updateStream } from "@/actions/stream"
// // import { toast } from "sonner"
// // import { UploadDropzone } from "@/lib/uploadthing"
// // import { useRouter } from 'next/navigation'
// // import { Hint } from '../hint'
// // import Image from 'next/image'
// // import { Trash } from 'lucide-react'

// // // Define the component's props structure
// // interface InfoModalProps {
// //     initialName: string
// //     initialThumbnail: string | null
// // }

// // // Define the InfoModal component with its props
// // export const InfoModal = ({ initialName, initialThumbnail }: InfoModalProps) => {

// //     // Initialize router for navigation purposes
// //     const router = useRouter()

// //     // Reference for close button to programmatically trigger its click
// //     const closeRef = useRef<ElementRef<"button">>(null)

// //     // State management for transition and form inputs
// //     const [isPending, startTransition] = useTransition()
// //     const [name, setName] = useState(initialName)
// //     const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnail)

// //     // Function to handle thumbnail removal
// //     const onRemove = () => {
// //         startTransition(() => {
// //             updateStream({ thumbnailUrl: null })
// //                 .then(() => {
// //                     toast.success("Thumbnail Remove Successfully")
// //                     setThumbnailUrl("")
// //                     closeRef?.current?.click()
// //                 })
// //                 .catch(() => toast.error("Something Went Wrong"))
// //         })
// //     }

// //     // Function to handle form submission
// //     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault()

// //         startTransition(() => {
// //             updateStream({ name: name })
// //                 .then(() => {
// //                     toast.success("Stream Info Updated")
// //                     closeRef?.current?.click()
// //                 })
// //                 .catch(() => toast.error("Something Went Wrong "))
// //         })
// //     }

// //     // Function to handle input change
// //     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         setName(e.target.value)
// //     }

// //     // Render the component
// //     return (
// //         <Dialog>
// //             {/* Trigger button to open the dialog */}
// //             <DialogTrigger asChild>
// //                 <Button variant="link" size="sm" className="ml-auto">
// //                     Edit
// //                 </Button>
// //             </DialogTrigger>
// //             <DialogContent>
// //                 {/* Dialog header with title */}
// //                 <DialogHeader>
// //                     <DialogTitle>
// //                         Edit Stream Info
// //                     </DialogTitle>
// //                 </DialogHeader>
// //                 {/* Form for editing stream information */}
// //                 <form className="space-y-14" onSubmit={onSubmit}>
// //                     {/* Input for stream name */}
// //                     <div className="space-y-2">
// //                         <Label>
// //                             Name
// //                         </Label>
// //                         <Input placeholder="Stream Title " onChange={onChange} value={name} disabled={isPending} />
// //                     </div>
// //                     {/* Section for thumbnail upload or removal */}
// //                     <div className='space-y-2'>
// //                         <Label>
// //                             Thumbnail
// //                         </Label>
// //                         {thumbnailUrl ? (
// //                             // Display thumbnail with removal option if it exists
// //                             <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
// //                                 {/* Remove thumbnail button */}
// //                                 <div className="absolute top-2 right-2 z-[10]">
// //                                     <Hint label="Remove thumbnail" asChild side="left">
// //                                         <Button type="button" disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5">
// //                                             <Trash className="h-4 w-4" />
// //                                         </Button>
// //                                     </Hint>
// //                                 </div>
// //                                 <Image alt="Thumbnail" src={thumbnailUrl} fill className="object-cover" />
// //                             </div>
// //                         ) : (
// //                             // Upload thumbnail section
// //                             <div className="rounded-xl border outline-dashed outline-muted">
// //                                 <UploadDropzone
// //                                     endpoint="thumbnailUploader"
// //                                     appearance={{
// //                                         label: {
// //                                             color: "#FFFFFF"
// //                                         },
// //                                         allowedContent: {
// //                                             color: "#FFFFFF"
// //                                         }
// //                                     }}
// //                                     onClientUploadComplete={(res) => {
// //                                         setThumbnailUrl(res?.[0]?.url);
// //                                         router.refresh();
// //                                         closeRef?.current?.click();
// //                                     }}
// //                                 />
// //                             </div>
// //                         )}
// //                     </div>
// //                     {/* Buttons for saving or canceling changes */}
// //                     <div className="flex justify-between">
// //                         {/* Cancel button */}
// //                         <DialogClose asChild ref={closeRef}>
// //                             <Button type="button" variant="outline">
// //                                 Cancel
// //                             </Button>
// //                         </DialogClose>
// //                         {/* Save button */}
// //                         <Button variant="primary" type="submit" disabled={false}>
// //                             Save
// //                         </Button>
// //                     </div>
// //                 </form>
// //             </DialogContent>
// //         </Dialog>
// //     )
// // }
