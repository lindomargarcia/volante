import "./App.css";
import ServiceOrderPage from "@/pages/ServiceOrder/ServiceOrder";
import { Toaster } from "./components/ui/sonner";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { ROUTER_PATHS } from "./data/routes/routes";
import { Car, FileAdditionOne, Home, SettingTwo, Tool, User } from "@icon-park/react";

const MENU_LINKS = [
  {
    path: ROUTER_PATHS.HOME,
    element: <div>home</div>,
    label: 'Início',
    icon: <Home size={21}/>
  },
  {
    path: ROUTER_PATHS.SERVICE_ORDER,
    element: <ServiceOrderPage/>,
    label: 'Novo',
    icon: <FileAdditionOne size={21}/>
  },
  {
    path: ROUTER_PATHS.VEHICLE,
    element: <h1>Veículos</h1>,
    label: 'Veículos',
    icon: <Car size={21}/>
  },
  {
    path: ROUTER_PATHS.CUSTOMER,
    element: <h1>Clientes</h1>,
    label: 'Clientes',
    icon: <User size={21}/>
  },
  {
    path: ROUTER_PATHS.CATALOG,
    element: <h1>Catálogo</h1>,
    label: 'Catálogo',
    icon: <Tool size={21}/>
  },
  {
    path: ROUTER_PATHS.CONFIG,
    element: <h1>Configurações</h1>,
    label: 'Config',
    icon: <SettingTwo size={21}/>
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <div className="flex-1 flex bg-slate-200">
        <Menu links={MENU_LINKS}/>
        <div className="rounded-lg ml-0 m-4 flex-1 bg-white">
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
