// "use client"
// // Import necessary components and icons
// import { Button } from "@/components/ui/button";
// import { AlertTriangle } from "lucide-react";

// import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

// import { createIngress } from "@/actions/ingress";
// import { IngressInput } from "livekit-server-sdk";

// import { useState, useTransition, useRef, ElementRef } from "react";
// import { toast } from "sonner";

// const RTMP = String(IngressInput.RTMP_INPUT)
// const WHIP = String(IngressInput.WHIP_INPUT)

// type IngressType = typeof RTMP | typeof WHIP

// // Define the ConnectModal component
// export const ConnectModal = () => {

//     const closeRef = useRef<ElementRef<"button">>(null)

//     const [isPending, startTransition] = useTransition()
//     const [ingressType, setingressType] = useState<IngressType>(RTMP)

//     const onSubmit = () => {
//         startTransition(() => {
//             createIngress(parseInt(ingressType))
//                 .then(() => {
//                     toast.success("Ingress Created")
//                     closeRef?.current?.click()
//                 })
//                 .catch(() => toast.error("Something Went Wrong"))
//         })
//     }

//     return (
//         // Main Dialog component for the modal
//         <Dialog>
//             {/* DialogTrigger wraps a button that triggers the dialog */}
//             <DialogTrigger asChild>
//                 <Button variant="primary">
//                     Generate Connection
//                 </Button>
//             </DialogTrigger>

//             {/* DialogContent holds the content of the dialog */}
//             <DialogContent>
//                 {/* DialogHeader contains the title of the dialog */}
//                 <DialogHeader>
//                     <DialogTitle>
//                         Generate Connection Key
//                     </DialogTitle>
//                 </DialogHeader>

//                 {/* Select component for choosing ingress type */}
//                 <Select value={ingressType} onValueChange={(value) => setingressType(value)} disabled={isPending}>
//                     <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Ingress Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value={RTMP}> RTMP </SelectItem>
//                         <SelectItem value={WHIP}> WHIP </SelectItem>
//                     </SelectContent>
//                 </Select>

//                 {/* Alert component for displaying warning messages */}
//                 <Alert>
//                     <AlertTriangle className="h-4 w-4" />
//                     <AlertTitle>
//                         Warning !
//                     </AlertTitle>
//                     <AlertDescription>
//                         This Action will Reset the Connection using the current Stream Connection
//                     </AlertDescription>
//                 </Alert>

//                 {/* Action buttons for closing the dialog or generating the connection */}
//                 <div className="flex justify-between">
//                     <DialogClose ref={closeRef} asChild>
//                         <Button variant="ghost" >
//                             Cancel
//                         </Button>
//                     </DialogClose>
//                     <Button variant="primary" onClick={onSubmit} disabled={isPending} >
//                         Generate
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }
"use client"

// Import UI components and icons from the project's designated libraries
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

// Import server SDK and action creators for ingress management
import { createIngress } from "@/actions/ingress";
import { IngressInput } from "livekit-server-sdk";

// Import React hooks for state and DOM reference management
import { useState, useTransition, useRef, ElementRef } from "react";
// Import toast notification utility
import { toast } from "sonner";

// Define ingress types as constants for better readability and maintainability
const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

// Define the ConnectModal component, responsible for handling the ingress creation UI
export const ConnectModal = () => {

    // Reference for closing the modal programmatically
    const closeRef = useRef<ElementRef<"button">>(null)

    // State and transition hooks for managing ingress type and loading state
    const [isPending, startTransition] = useTransition()
    const [ingressType, setingressType] = useState<IngressType>(RTMP)

    // Function to handle the submission of the ingress creation form
    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress Created")
                    // Close the modal on successful creation
                    closeRef?.current?.click()
                })
                .catch(() => toast.error("Something Went Wrong"))
        })
    }

    return (
        // Render the main Dialog component for the modal
        <Dialog>
            {/* DialogTrigger to open the dialog */}
            <DialogTrigger asChild>
                <Button variant="primary">
                    Generate Connection
                </Button>
            </DialogTrigger>

            {/* DialogContent for displaying the main content */}
            <DialogContent>
                {/* DialogHeader for the modal title */}
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection Key
                    </DialogTitle>
                </DialogHeader>

                {/* Select component for ingress type selection */}
                <Select value={ingressType} onValueChange={(value) => setingressType(value)} disabled={isPending}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}> RTMP </SelectItem>
                        <SelectItem value={WHIP}> WHIP </SelectItem>
                    </SelectContent>
                </Select>

                {/* Alert component for warnings */}
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                        Warning !
                    </AlertTitle>
                    <AlertDescription>
                        This Action will Reset the Connection using the current Stream Connection
                    </AlertDescription>
                </Alert>

                {/* Action buttons for modal management */}
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost" >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="primary" onClick={onSubmit} disabled={isPending} >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
