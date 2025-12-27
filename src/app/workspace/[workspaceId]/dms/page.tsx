"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, MessageSquareText } from "lucide-react";
import Image from "next/image";

const DMsPage = () => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 shadow-sm rounded-lg m-4">
            <div className="flex flex-col items-center justify-center gap-y-4 px-4 text-center">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquareText className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Direct Messages
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Select a conversation from the sidebar to start chatting or connect with your team members.
                </p>
            </div>
        </div>
    );
};

export default DMsPage;
