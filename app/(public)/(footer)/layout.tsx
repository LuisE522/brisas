import Footer from "@/components/Home/Footer";
import NavTransparent from "@/components/Home/NavTransparent";
import ScrollBoton from "@/components/ScrollBoton/ScrollBoton";

export default function FooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollBoton />
      {<div className="w-full absolute top-0 z-50">
        <NavTransparent />
      </div>}
      {children}
      <Footer />
    </>
  );
}
