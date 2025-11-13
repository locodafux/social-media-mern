import AppProvider from "./Context/AppContext";
import AppContent from "./AppContent";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
