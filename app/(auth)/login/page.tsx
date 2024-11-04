import Login from "@/components/Auth/Login";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[70%_30%] bg-[#12141C]">
      <div className="h-full w-full overflow-hidden relative">
        <Image unoptimized src="/assets/images/fondo_home.png" width={0} height={0} alt="Fondo login" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] w-[400px] md:max-w-full md:w-full md:relative md:h-full p-4 rounded-lg flex flex-col gap-5 bg-black/60 md:bg-transparent items-center justify-center">
        <Login />
      </div>
    </div>
  )
}
