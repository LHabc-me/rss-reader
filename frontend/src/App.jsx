import Navigation from "./components/Navigation";
import { AppProvider } from "./utils/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { View } from "react-native";

function App() {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </AppProvider>
  );
}

export default App;
