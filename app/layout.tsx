import type {Metadata} from "next";
import {Alex_Brush, Montserrat} from "next/font/google";
import "./globals.css";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";

const alexBrush = Alex_Brush({
    weight: ['400'],
    variable: "--font-alexBrush",
    subsets: ["latin"],
});

const montserrat = Montserrat({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
        <html lang="en">
        <body
            className={`${alexBrush.variable} ${montserrat.variable} overflow-x-hidden relative`}
        >
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
