import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Future from './pages/Future';
import Life from './pages/Life';
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
          <Route path="life" element={<Life />} />
          <Route path="blog/gemini-report" element={<GeminiReport />} />
          <Route path="blog/superlinear" element={<Superlinear />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
