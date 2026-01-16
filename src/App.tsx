import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Future from './pages/Future';
import Life from './pages/Life';

import SuperlinearStart from './pages/blog/SuperlinearStart';
import GeminiCanvas from './pages/blog/GeminiCanvas';
import NotebookLM from './pages/blog/NotebookLM';
import AIQuests from './pages/blog/AIQuests';
import BuildingAgents from './pages/blog/BuildingAgents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="future" element={<Future />} />
          <Route path="blog" element={<Life />} />
          <Route path="blog/superlinear-start" element={<SuperlinearStart />} />
          <Route path="blog/gemini-canvas" element={<GeminiCanvas />} />
          <Route path="blog/notebooklm" element={<NotebookLM />} />
          <Route path="blog/ai-quests" element={<AIQuests />} />
          <Route path="blog/building-agents" element={<BuildingAgents />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
