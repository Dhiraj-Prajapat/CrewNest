"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import NewLoader from './Loader';

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const profile = useQuery(api.profiles.getProfileByUserId);
  const user = useQuery(api.users.current);

  const isLoading = user === undefined || profile === undefined;

  useEffect(() => {
    // If loading, do nothing
    if (isLoading) return;

    // If user is logged in BUT has no profile, and is NOT already on the setup page
    if (user && profile === null && pathname !== '/complete-profile') {
      router.push('/complete-profile');
    }
  }, [user, profile, isLoading, router, pathname]);

  // Optionally show a global loader while initial auth check happens
  // to prevent content flash. But for now, we just pass children to render app.
  // If you want to block app render until auth is known, you can return Loader here.

  return <>{children}</>;
}