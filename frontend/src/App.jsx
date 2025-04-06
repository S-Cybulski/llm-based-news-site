import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";


function App() {

  return (
      <Box minH="100vh">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
  );
    
}

export default App;
