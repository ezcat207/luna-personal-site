import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Future from './pages/Future';
import Life from './pages/Life';
import Mind from './pages/Mind';

import GeminiReport from './pages/blog/GeminiReport';
import Superlinear from './pages/blog/Superlinear';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="future" element={<Future />} />
          <Route path="mind" element={<Mind />} />
          <Route path="blog" element={<Life />} />
          <Route path="blog/superlinear" element={<Superlinear />} />
          <Route path="blog/gemini-report" element={<GeminiReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
