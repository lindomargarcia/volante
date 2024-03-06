import "./App.css";
import ServiceOrderPage from "@/pages/ServiceOrder/ServiceOrder";
import { Toaster } from "./components/ui/sonner";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { ROUTER_PATHS } from "./data/routes/routes";
import { Car, FilePlus, Hammer, Home, Settings2, User } from "lucide-react";

const MENU_LINKS = [
  {
    path: ROUTER_PATHS.HOME,
    element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-center py-[33%]">home</h1>,
    label: 'Início',
    icon: <Home size={23}/>
  },
  {
    path: ROUTER_PATHS.SERVICE_ORDER,
    element: <ServiceOrderPage/>,
    label: 'Novo',
    icon: <FilePlus size={23}/>
  },
  {
    path: ROUTER_PATHS.VEHICLE,
    element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-center py-[33%]">Veículos</h1>,
    label: 'Veículos',
    icon: <Car size={23}/>
  },
  {
    path: ROUTER_PATHS.CUSTOMER,
    element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-center py-[33%]">Clientes</h1>,
    label: 'Clientes',
    icon: <User size={23}/>
  },
  {
    path: ROUTER_PATHS.CATALOG,
    element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-center py-[33%]">Catálogo</h1>,
    label: 'Catálogo',
    icon: <Hammer size={23}/>
  },
  {
    path: ROUTER_PATHS.CONFIG,
    element: <h1 className="h-full w-full align-text-middle text-zinc-400 text-center py-[33%]">Ajustes</h1>,
    label: 'Ajustes',
    icon: <Settings2 size={23}/>
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <div className="flex-1 flex bg-zinc-50">
        <Menu links={MENU_LINKS}/>
        <div className="rounded-2xl ml-0 border border-zinc-300 m-2 flex-1">
          <Outlet/>
        </div>
      </div>,
    errorElement: <h1>404 not found page <Link to={"/"}>Voltar</Link></h1>,
    children: MENU_LINKS
  },
])

function App() {
  return (
    <div className="bg-slate-50 flex-1 flex">
      <RouterProvider router={router}/>
      <Toaster position="top-right" richColors closeButton/>
    </div>
  );
}

export default App;
