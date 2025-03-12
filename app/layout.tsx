import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavContextProvider from "@/app/context/NavContext";
import React from "react";

const montserrat = Montserrat({
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Music app",
    description: "Fun LP music app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NavContextProvider>
            <html lang="en">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                (function() {
                  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDarkScheme) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                })();
              `,
                    }}
                />
            </head>
            <body
                className={`${montserrat.variable} overflow-x-hidden relative`}
            >
            <Header />
            {children}
            <Footer />
            </body>
            </html>
        </NavContextProvider>
    );
}
