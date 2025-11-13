import AppProvider from "./Context/AppContext";
import AppContent from "./AppContent";
import "flowbite";
import "flowbite-react";
import "flowbite/dist/flowbite.css";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
