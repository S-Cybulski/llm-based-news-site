import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import HealthPage from "./pages/HealthPage";
import Navbar from "./components/Navbar";
import PoliticsPage from "./pages/PoliticsNews";
import SciencePage from "./pages/SciencePage";
import SportsPage from "./pages/SportsPage";
import TechnologyPage from "./pages/TechnologyPage";
import WorldNewsPage from "./pages/WorldNewsPage";
import TestPage from "./pages/TestPage";


function App() {

  return (
      <Box minH="100vh">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/entertainment" element={<EntertainmentPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/politics" element={<PoliticsPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/world-news" element={<WorldNewsPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Box>
  );
    
}

export default App;
