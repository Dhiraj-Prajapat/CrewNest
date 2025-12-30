"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Loader, LogOut, Settings, User } from "lucide-react";

import { useCurrentUser } from "../api/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import SettingsModal from "@/components/modals/settingsModal";
// import { SettingsModal } from "@/components/modals/settings-modal";

export const UserButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (isLoading)
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  if (!data) return null;


  const { image, name, email } = data;
  const avatarFallback = name?.charAt(0).toUpperCase();

  // Add this state inside your component

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative outline-none">
          <Avatar className="size-10 rounded-full m-2 border hover:opacity-80 transition">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" side="right" className="w-56 p-1">
          <DropdownMenuLabel className="flex flex-col gap-1 px-2">
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 size-4" />
            View Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              // router.replace("/auth");
              window.location.href = "/auth";
            }}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="mr-2 size-4 " />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
