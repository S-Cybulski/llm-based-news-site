import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage"
import Navbar from "./components/Navbar";


function App() {

  return (
      <Box minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/entertainment" element={<HomePage />} />
          <Route path="/general" element={<HomePage />} />
          <Route path="/health" element={<HomePage />} />
          <Route path="/science" element={<HomePage />} />
          <Route path="/sports" element={<HomePage />} />
          <Route path="/technology" element={<HomePage />} />
        </Routes>
      </Box>
  );
    
}

export default App;
