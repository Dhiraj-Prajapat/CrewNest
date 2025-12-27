"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageSquare,
  Bell,
  ArrowRight,
  Zap,
  LayoutDashboard
} from "lucide-react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const notificationCount = useQuery(api.notifications.count, { workspaceId });

  // Fetch tasks to count pending assigned
  const tasks = useQuery(api.tasks.get, { workspaceId });
  const pendingTasksCount = useMemo(() => {
    if (!tasks || !member) return 0;
    return tasks.filter(t => t.assignedTo === member.userId && !t.completed).length;
  }, [tasks, member]);

  if (memberLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8">
      <motion.div
        className="max-w-5xl mx-auto space-y-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Hero Section */}
        <motion.div variants={item} className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, {member?.user?.name?.split(' ')[0] || "CrewMember"}!
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
              className="inline-block ml-2 origin-bottom-right"
            >
              👋
            </motion.span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Here's what's happening in your workspace today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => router.push(`/workspace/${workspaceId}/tasks`)}
            className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <CheckCircle className="size-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{pendingTasksCount}</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Pending Tasks</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Assigned to you</p>
          </div>

          <div className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-400">
                <Bell className="size-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{notificationCount || 0}</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">Notifications</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Unread updates</p>
          </div>

          <div
            onClick={() => router.push(`/workspace/${workspaceId}/dms`)}
            className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <MessageSquare className="size-6" />
              </div>
              <ArrowRight className="size-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Direct Messages</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check your inbox</p>
          </div>

          <div className=" bg-gradient-to-br from-green-700 to-green-900 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="size-5" />
              <span className="font-semibold text-sm uppercase tracking-wider opacity-90">Pro Tip</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Use <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">Cmd+K</kbd> to quickly search for channels and members anytime.
            </p>
          </div>
        </motion.div>

        {/* Updates Feed */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LayoutDashboard className="size-5" />
            Latest Updates
          </h2>

          <div className="grid gap-4">
            {[
              { tag: "New", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", title: "Notification System Live", desc: "Stay updated with real-time alerts for tasks and DMs. Check the top bar!" },
              { tag: "Update", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", title: "Task Board Improvements", desc: "You can now scroll smoothly, assign users by name, and delete your own tasks." },
              { tag: "Feature", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400", title: "Professional Dark Mode", desc: "Switched to a sleek Slate-based dark theme for better readability." },
            ].map((update, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className={`self-start px-2 py-1 rounded text-xs font-medium ${update.color}`}>
                  {update.tag}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{update.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{update.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkspaceIdPage;
