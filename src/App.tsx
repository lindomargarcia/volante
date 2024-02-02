import "./App.css";
import ServiceOrderPage from "@/features/ServiceOrder/ServiceOrder";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <ServiceOrderPage/>
      <Toaster position="top-right" richColors/>
    </>
  );
}

export default App;
