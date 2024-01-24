import "./App.css";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex">
      <Avatar className="mr-3">
          <AvatarImage src="https://github.com/thailonlucas.png" alt="@shadcn" />
          <AvatarFallback>TL</AvatarFallback>
      </Avatar>
      <Button>Olá mundo!</Button>
    </div>
  );
}

export default App;
