import { Box } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";


function App() {

  return (
      <Box minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
  );
    
}

export default App;
