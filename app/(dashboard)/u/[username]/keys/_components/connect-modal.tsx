"use client"
// Import necessary components and icons
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

// Define the ConnectModal component
export const ConnectModal = () => {
    return (
        // Main Dialog component for the modal
        <Dialog>
            {/* DialogTrigger wraps a button that triggers the dialog */}
            <DialogTrigger asChild>
                <Button variant="primary">
                    Generate Connection
                </Button>
            </DialogTrigger>

            {/* DialogContent holds the content of the dialog */}
            <DialogContent>
                {/* DialogHeader contains the title of the dialog */}
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection Key
                    </DialogTitle>
                </DialogHeader>

                {/* Select component for choosing ingress type */}
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="RTMP"> RTMP </SelectItem>
                        <SelectItem value="WHIP"> WHIP </SelectItem>
                    </SelectContent>
                </Select>

                {/* Alert component for displaying warning messages */}
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                        Warning !
                    </AlertTitle>
                    <AlertDescription>
                        This Action will Reset the Connection using the current Stream Connection
                    </AlertDescription>
                </Alert>

                {/* Action buttons for closing the dialog or generating the connection */}
                <div className="flex justify-between">
                    <DialogClose>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="primary" onClick={() => { }}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
