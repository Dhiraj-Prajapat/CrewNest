"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  Calendar,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import NewLoader from "@/components/Loader";

export default function ProfilePage() {
  const user = useQuery(api.users.current);
  const profile = useQuery(api.profiles.getProfileByUserId);

  // Loading state
  if (user === undefined || profile === undefined) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <NewLoader />
      </div>
    );
  }

  // Not logged in state
  if (user === null) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Session Expired or Not Logged In
        </h2>
        <Link
          href="/join"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header / Back Button */}
        <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Workspace
            </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-primary-light to-primary dark:from-primary dark:to-black"></div>
            
            <div className="relative px-6 pb-8">
                {/* Avatar */}
                <div className="absolute -top-16 left-6 sm:left-10">
                    <div className="w-32 h-32 rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-4xl font-bold text-primary">
                            {profile?.name?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="pt-20 sm:pt-4 sm:pl-48">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {profile?.name || user.name}
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                        {profile?.company || "Member"}
                    </p>
                </div>

                {/* Divider */}
                <div className="mt-8 border-t border-gray-100 dark:border-gray-700"></div>

                {/* Details Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Email */}
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium break-all">{user.email}</p>
                        </div>
                    </div>

                    {/* Contact */}
                     <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">
                                {profile?.contact || "Not provided"}
                            </p>
                        </div>
                    </div>

                    {/* Age */}
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">
                                {profile?.age || "Not provided"}
                            </p>
                        </div>
                    </div>

                    {/* Organization / Profession */}
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                            <Building className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">
                                {profile?.company || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6">
                    <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <MessageCircle className="w-5 h-5 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">About</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {profile?.bio || "No bio available yet."}
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
