// import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
export const dynamic = "force-dynamic";

import { ConvexClientProvider } from '@/components/convexClientProvider';
import { JotaiProvider } from '@/components/jotaiProvider';
import { ModalProvider } from '@/components/modelProvider';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/themeProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <ConvexAuthNextjsServerProvider> */}
          <ConvexClientProvider>
            <JotaiProvider>
              <Toaster theme="light" richColors closeButton />
              <ModalProvider />
              <NuqsAdapter>{children}</NuqsAdapter>
            </JotaiProvider>
          </ConvexClientProvider>
          {/* </ConvexAuthNextjsServerProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}



// // import { ClerkProvider } from '@clerk/nextjs';
// import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
// import { Inter } from 'next/font/google';
// import { PropsWithChildren } from 'react';

// import { ConvexClientProvider } from '@/components/convexClientProvider';
// import { JotaiProvider } from '@/components/jotaiProvider';
// import { ModalProvider } from '@/components/modelProvider';
// import { Toaster } from '@/components/ui/sonner';
// import { NuqsAdapter } from 'nuqs/adapters/next/app';
// import AuthRedirect from '@/components/authRedirect';
// import { ThemeProvider } from '@/components/themeProvider'; // ✅ added

// import './globals.css';
// // import { CallProvider } from '@/components/call-provider';

// const inter = Inter({
//   subsets: ['latin'],
// });

// const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         {/* <ClerkProvider> */}
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem> {/* ✅ ThemeProvider wraps all */}
//           <ConvexAuthNextjsServerProvider>
//             <ConvexClientProvider>
//               <JotaiProvider>
//                 <AuthRedirect>
//                   <Toaster theme="light" richColors closeButton />
//                   <ModalProvider />
//                   <NuqsAdapter>{children}</NuqsAdapter>
//                 </AuthRedirect>
//               </JotaiProvider>
//             </ConvexClientProvider>
//           </ConvexAuthNextjsServerProvider>
//         </ThemeProvider>
//         {/* </ClerkProvider> */}
//       </body>
//     </html>
//   );
// };

// export default RootLayout;
