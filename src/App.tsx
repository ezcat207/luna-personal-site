import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Future from './pages/Future';
import Life from './pages/Life';
import Mind from './pages/Mind';

import GeminiReport from './pages/blog/GeminiReport';
import Superlinear from './pages/blog/Superlinear';
import MarsBunnyWiki from './pages/blog/MarsBunnyWiki';
import GenesisMars from './pages/blog/GenesisMars';
import StrategicRadar from './pages/blog/StrategicRadar';
import DadBirthday from './pages/blog/DadBirthday';
import FandomTriviaV1 from './pages/blog/FandomTriviaV1';
import FandomTriviaV2 from './pages/blog/FandomTriviaV2';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="future" element={<Future />} />
          <Route path="mind" element={<Mind />} />
          <Route path="blog" element={<Life />} />
          <Route path="blog/superlinear" element={<Superlinear />} />
          <Route path="blog/strategic-radar" element={<StrategicRadar />} />
          <Route path="blog/dad-birthday" element={<DadBirthday />} />
          <Route path="blog/gemini-report" element={<GeminiReport />} />
          <Route path="blog/mars-bunny-wiki" element={<MarsBunnyWiki />} />
          <Route path="blog/genesis-mars" element={<GenesisMars />} />
          <Route path="blog/fandomtrivia-v1" element={<FandomTriviaV1 />} />
          <Route path="blog/fandomtrivia-v2" element={<FandomTriviaV2 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
