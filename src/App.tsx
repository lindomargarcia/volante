import "./App.css";
import ServiceOrder from "@/features/ServiceOrder";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <ServiceOrder/>
      <Toaster position="top-right" richColors/>
    </>
  );
}

export default App;
