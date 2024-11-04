import { UserProvider } from "@/context/SessionProvider";
import { getUserDataServer } from "@/lib/getUserDataServer";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Panel/Sidebar";

async function PanelLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const data = await getUserDataServer();

    if (!data) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen w-full bg-[#010514e2]">  {/* #140107 */}
            <UserProvider initialUserData={data}>
                <div className="w-full h-full flex flex-row relative text-white">
                    <Sidebar />
                    <div className={`md:ml-[250px] p-4 w-full`}>
                        {children}
                    </div>
                </div>
            </UserProvider>
        </div>
    )
}

export default PanelLayout;
