"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaUsers, FaUserEdit, FaBars, FaTimes } from "react-icons/fa";
import { RiDiscountPercentFill, RiAdminFill } from "react-icons/ri";
import { GrWorkshop } from "react-icons/gr";
import { FaRegNewspaper, FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { MdEventAvailable, MdAdminPanelSettings } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/SessionProvider";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";

const Sidebar = () => {
  const { userData: data, updateUserData } = useUser();

  const roles = data?.data.usuarios_roles;

  /* console.log(roles); */

  const isAdmin = roles?.some((rol: any) => rol.rol.nombre === "Administrador");

  /* console.log(isAdmin); */

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Controla la visibilidad del sidebar
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/admin/usuarios" ||
      pathname === "/admin/roles" ||
      pathname === "/admin/permisos"
    ) {
      setIsAdminOpen(true);
    } else {
      setIsAdminOpen(false);
    }
  }, [pathname]);

  // Función para cerrar el Sidebar
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      // 768px es el breakpoint para md en Tailwind
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleLinkClick();
  }, []);

  return (
    <div className="relative">
      {/* Overlay para pantallas pequeñas */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out overflow-y-auto bg-[#12141C] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[250px] w-64 z-50`}
      >
        <div className="h-full w-full flex flex-col gap-5">
          <div className="min-h-[70px] w-full flex justify-center items-center border-b-2 border-white/20">
            Brisas del titicaca
          </div>
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-3 p-5">
              <Link
                href={"/admin"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname === "/admin" && "bg-white/10 "
                }`}
              >
                <FaHome /> Home
              </Link>
              <Link
                href={"/admin/evento"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname.includes("/admin/evento") && "bg-white/10 "
                }`}
              >
                <MdEventAvailable /> Eventos
              </Link>
              <Link
                href={"/admin/promociones"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname === "/admin/promociones" && "bg-white/10 "
                }`}
              >
                <RiDiscountPercentFill /> Promociones
              </Link>
              <Link
                href={"/admin/talleres"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname === "/admin/talleres" && "bg-white/10 "
                }`}
              >
                <GrWorkshop /> Talleres
              </Link>
              <Link
                href={"/admin/platos"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname === "/admin/noticias" && "bg-white/10 "
                }`}
              >
                <IoFastFoodSharp /> Platos
              </Link>
              <Link
                href={"/admin/danzas"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname.includes("/admin/danzas") && "bg-white/10 "
                }`}
              >
                <MdOutlineSportsMartialArts /> Danzas
              </Link>
              <Link
                href={"/admin/fundadores"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                  pathname.includes("/admin/fundadores") && "bg-white/10 "
                }`}
              >
                <FaUsers /> Fundadores
              </Link>
              {roles?.some(
                (rol: any) => rol.rol.nombre === "Administrador"
              ) && (
                <div>
                  <button
                    onClick={() => setIsAdminOpen(!isAdminOpen)}
                    className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                      pathname === "/admin/usuarios" ||
                      pathname === "/admin/roles" ||
                      pathname === "/admin/permisos"
                        ? "bg-white/10 "
                        : ""
                    }`}
                  >
                    <RiAdminFill /> Admin{" "}
                    {isAdminOpen ? <FaAngleRight /> : <FaAngleDown />}
                  </button>
                  {isAdminOpen && (
                    <div className="pl-5 mt-2 flex flex-col gap-2 transition-all duration-300">
                      <Link
                        href={"/admin/usuarios"}
                        onClick={handleLinkClick}
                        className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                          pathname === "/admin/usuarios" && "bg-white/10 "
                        }`}
                      >
                        <FaUsers /> Usuarios
                      </Link>
                      <Link
                        href={"/admin/roles"}
                        onClick={handleLinkClick}
                        className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700 ${
                          pathname === "/admin/roles" && "bg-white/10 "
                        }`}
                      >
                        <MdAdminPanelSettings /> Roles
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 p-5">
              <Link
                href={"/admin/perfil"}
                onClick={handleLinkClick}
                className={`w-full px-3 py-2 flex flex-row gap-2 items-center rounded-lg transition-all duration-700`}
              >
                <FaUserEdit /> Perfil
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para mostrar/ocultar el Sidebar en pantallas pequeñas */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-2 bg-black text-white rounded-full shadow-md"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default Sidebar;
