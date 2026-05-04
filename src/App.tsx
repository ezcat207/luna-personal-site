import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePersona } from './hooks/usePersona';
import Layout from './layouts/Layout';
import WayneLayout from './layouts/WayneLayout';

// Hub
import HubHome from './pages/HubHome';

// Wayne section
import WayneHome from './pages/wayne/WayneHome';
import WaynePlans from './pages/wayne/WaynePlans';
import WaynePlan from './pages/wayne/WaynePlan';
import WayneRoadmap from './pages/wayne/WayneRoadmap';

// Luna section
import LunaHome from './pages/luna/LunaHome';
import LunaEntry from './pages/luna/LunaEntry';

// Legacy pages
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
import Roadmap from './pages/Roadmap';

function AppRoutes() {
  const persona = usePersona();

  if (persona === 'wayne') {
    return (
      <Routes>
        <Route path="/" element={<WayneLayout />}>
          <Route index element={<WayneHome />} />
          <Route path="wayne" element={<WayneHome />} />
          <Route path="wayne/plans" element={<WaynePlans />} />
          <Route path="wayne/plan/:weekNum" element={<WaynePlan />} />
          <Route path="wayne/roadmap" element={<WayneRoadmap />} />
        </Route>
      </Routes>
    );
  }

  if (persona === 'luna') {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LunaHome />} />
          <Route path="luna" element={<LunaHome />} />
          <Route path="luna/:weekNum" element={<LunaEntry />} />
          {/* Legacy paths — keep alive */}
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="future" element={<Future />} />
          <Route path="mind" element={<Mind />} />
          <Route path="blog" element={<Life />} />
          <Route path="roadmap" element={<Roadmap />} />
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
    );
  }

  // Hub (bunnyuniverse.com) — includes all routes for localhost dev
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HubHome />} />
        {/* Dev convenience: reach all sections from hub */}
        <Route path="luna" element={<LunaHome />} />
        <Route path="luna/:weekNum" element={<LunaEntry />} />
        <Route path="roadmap" element={<Roadmap />} />
      </Route>
      <Route path="/" element={<WayneLayout />}>
        <Route path="wayne" element={<WayneHome />} />
        <Route path="wayne/plans" element={<WaynePlans />} />
        <Route path="wayne/plan/:weekNum" element={<WaynePlan />} />
        <Route path="wayne/roadmap" element={<WayneRoadmap />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
