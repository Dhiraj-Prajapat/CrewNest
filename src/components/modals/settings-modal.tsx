"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Video,
  Mic,
  Info,
  Building2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const tabs = [
    { id: "general", label: "General", icon: Palette },
    { id: "audio-video", label: "Audio & Video", icon: Video },
    { id: "meetings", label: "Meetings", icon: Mic },
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "about", label: "About", icon: Info },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">
                Customize how CrewNest looks on your device.
              </p>
            </div>
            <div className="space-y-3">
              {["light", "dark", "system"].map((mode) => (
                <div
                  key={mode}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 p-2 flex items-center gap-2 transition-all hover:bg-accent",
                    theme === mode
                      ? "border-primary bg-accent"
                      : "border-muted"
                  )}
                  onClick={() => setTheme(mode)}
                >
                  <div className="rounded-md border bg-background p-2">
                    {mode === "light" && <Sun className="h-6 w-6" />}
                    {mode === "dark" && <Moon className="h-6 w-6" />}
                    {mode === "system" && <Monitor className="h-6 w-6" />}
                  </div>
                  <span className="text-sm font-medium capitalize">{mode}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "organization":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-medium">Organization Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your workspace details.</p>
            </div>
            <div className="flex h-40 w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center animate-pulse">
              <Building2 className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                Organization management coming soon!
              </p>
            </div>
          </div>
        )
      case "audio-video":
      case "meetings":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-medium">
                {activeTab === "audio-video" ? "Audio & Video" : "Meetings"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your call settings and preferences.
              </p>
            </div>
            <div className="flex h-40 w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center animate-pulse">
              {activeTab === "audio-video" ? (
                <Video className="h-10 w-10 text-muted-foreground/50 mb-3" />
              ) : (
                <Mic className="h-10 w-10 text-muted-foreground/50 mb-3" />
              )}
              <p className="text-sm text-muted-foreground">
                Integration with audio/video services coming soon!
              </p>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-medium">About CrewNest</h3>
              <p className="text-sm text-muted-foreground">
                Version 1.0.0
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <p className="leading-7">
                CrewNest is designed to bring your team together.
                Built with love using Next.js, Convex, and Tailwind CSS.
              </p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-[80vh] max-h-[700px] p-0 overflow-hidden flex flex-col md:flex-row gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        {/* Sidebar */}
        <div className="w-full md:w-48 bg-muted/30 border-r p-4 flex flex-col gap-2">
          <div className="px-4 py-2 font-semibold text-lg mb-2">Settings</div>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-3",
                activeTab === tab.id && "bg-white dark:bg-zinc-800 shadow-sm"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-6 overflow-y-auto bg-background">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
