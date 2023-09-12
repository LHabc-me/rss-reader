import Navigation from "./components/Navigation";
import { ThemeProvider } from "./utils/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
