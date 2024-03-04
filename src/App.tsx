import "./App.css";
import ServiceOrderPage from "@/features/ServiceOrder/ServiceOrder";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="bg-slate-50 flex-1 flex">
      <ServiceOrderPage/>
      <Toaster position="top-right" richColors closeButton/>
    </div>
  );
}

export default App;
