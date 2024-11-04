import Footer from "@/components/Home/Footer";
import CursorEffect from "@/components/Mouse/CursorEffect";
import { LanguageProvider } from "@/context/LanguageProvider";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LanguageProvider>
                {children}
                {/* <CursorEffect /> */}
                {/* <Footer /> */}
            </LanguageProvider>
        </>
    );
}
