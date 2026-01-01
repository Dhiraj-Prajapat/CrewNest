'use client';

import AuthRedirect from '@/components/authRedirect';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthRedirect>{children}</AuthRedirect>;
}