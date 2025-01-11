import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from "@mui/system";
import theme from "@/app/theme";


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Réference Bijoux",
  description: "Application de ref de bijoux",
};

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en">
    <body className={roboto.variable}>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
