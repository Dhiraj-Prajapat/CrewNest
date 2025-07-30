"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

import { Loader } from "lucide-react";
import { useEffect, useState, type PropsWithChildren } from "react";

import type { Id } from "@/../convex/_generated/dataModel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Profile } from "@/features/members/components/profile";
import { Thread } from "@/features/messages/components/thread";
import { usePanel } from "@/hooks/use-panel";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { Card, CardContent } from "@/components/ui/card";

//below 2 lines are fix the hydration error when i am importing below component.
import dynamic from "next/dynamic";
const TourGuide = dynamic(() => import("@/components/TourGuide"), { ssr: false });

const WorkspaceIdLayout = ({ children }: Readonly<PropsWithChildren>) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();
  const showPanel = !!parentMessageId || !!profileMemberId;

  // Convex data
  const dbUser = useQuery(api.users.current); // 👈 Get current user
  const markTourSeen = useMutation(api.users.markTourSeen); // 👈 Mutation to mark tour seen

  const [startTour, setStartTour] = useState(false);
  const [showTourCard, setShowTourCard] = useState(false);

  // 👇 Tour card show only if user hasn't seen tour
  useEffect(() => {
    if (dbUser && dbUser.hasSeenTour === false) {
      setShowTourCard(true);
      // setStartTour(true);
    }
  }, [dbUser]);

  const handleTourFinish = () => {
    setStartTour(false);
    setShowTourCard(false);
    if (dbUser) markTourSeen({ userId: dbUser._id });
  };

  return (
    <div>
       {showTourCard && (
        <Card className="fixed top-[50%] left-[50%] translate-[-50%] w-72 z-50 border bg-purple-400 shadow-md text-white">
          <CardContent className="flex flex-col gap-3 pt-4">
            <h2 className="text-lg font-semibold text-center">Welcome to CrewNest</h2>
            <p className="text-center text-sm">Let&apos;s give you a quick walkthrough</p>
            <button
              className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded-md cursor-pointer"
              onClick={() => {
                setStartTour(true);
                setShowTourCard(false);
              }}
            >
              Start Guide
            </button>
          </CardContent>
        </Card>
      )}
      <TourGuide run={startTour} onFinish={handleTourFinish} />

      <div id="app-welcome" className="h-full">
          <Toolbar />
        <div className="flex h-[calc(100vh_-_40px)]">
          <Sidebar />
          <ResizablePanelGroup
            direction="horizontal"
            autoSaveId="slack-clone-workspace-layout"
          >
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <div id="tour-workspace-sidebar" className="h-full">
                <WorkspaceSidebar />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={10} minSize={10}>
              <div id="tour-content-area" className="h-full">
                {children}
              </div>
            </ResizablePanel>
            {showPanel && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={25} defaultSize={30} maxSize={32}>
                  <div id="">
                    {parentMessageId ? (
                      <Thread
                        messageId={parentMessageId as Id<"messages">}
                        onClose={onClose}
                      />
                    ) : profileMemberId ? (
                      <Profile
                        memberId={profileMemberId as Id<"members">}
                        onClose={onClose}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;