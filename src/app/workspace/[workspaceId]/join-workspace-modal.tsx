"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface JoinWorkspaceModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const JoinWorkspaceModal = ({
    open,
    setOpen,
}: JoinWorkspaceModalProps) => {
    const router = useRouter();
    const joinByCode = useMutation(api.workspaces.joinByCode);
    const [isPending, setIsPending] = useState(false);

    const handleComplete = (value: string) => {
        setIsPending(true);
        joinByCode({ joinCode: value })
            .then((id) => {
                setOpen(false);
                toast.success("Joined workspace successfully.");
                router.push(`/workspace/${id}`);
            })
            .catch((error) => {
                toast.error("Failed to join workspace. Invalid code or already member.");
                console.error(error);
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a Workspace</DialogTitle>
                    <DialogDescription>
                        Enter the 6-character code to join an existing workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-4 items-center justify-center py-4">
                    <VerificationInput
                        onComplete={handleComplete}
                        length={6}
                        classNames={{
                            container: cn(
                                "flex gap-x-2",
                                isPending && "opacity-50 cursor-not-allowed"
                            ),
                            character:
                                "uppercase h-12 w-10 rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
                            characterInactive: "bg-muted",
                            characterSelected: "bg-white text-primary border-primary",
                            characterFilled: "bg-white text-black",
                        }}
                        autoFocus
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
