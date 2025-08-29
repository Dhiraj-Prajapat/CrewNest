import { ClerkProvider } from '@clerk/nextjs';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { ConvexClientProvider } from '@/components/convex-client-provider';
import { JotaiProvider } from '@/components/jotai-provider';
import { ModalProvider } from '@/components/model-provider';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import AuthRedirect from '@/components/authRedirect';
import { ThemeProvider } from '@/components/theme-provider'; // ✅ added

import './globals.css';
import { CallProvider } from '@/components/call-provider';

const inter = Inter({
  subsets: ['latin'],
});

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem> {/* ✅ ThemeProvider wraps all */}
            <ConvexAuthNextjsServerProvider>
              <ConvexClientProvider>
                <JotaiProvider>
                  <AuthRedirect>
                    <CallProvider />
                    <Toaster theme="light" richColors closeButton />
                    <ModalProvider />
                    <NuqsAdapter>{children}</NuqsAdapter>
                  </AuthRedirect>
                </JotaiProvider>
              </ConvexClientProvider>
            </ConvexAuthNextjsServerProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
