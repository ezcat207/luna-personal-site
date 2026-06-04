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
import WayneInsights from './pages/wayne/WayneInsights';
import WayneInsight from './pages/wayne/WayneInsight';
import WayneTools from './pages/wayne/WayneTools';
import WayneToolGapGain from './pages/wayne/WayneToolGapGain';
import WayneToolMustHave from './pages/wayne/WayneToolMustHave';
import WayneCourses from './pages/wayne/WayneCourses';
import WayneCourseCtf from './pages/wayne/WayneCourseCtf';
import WayneCourseLeadership from './pages/wayne/WayneCourseLeadership';
import WayneCourseLeadershipEn from './pages/wayne/WayneCourseLeadershipEn';
import WayneCourseAiVisuals from './pages/wayne/WayneCourseAiVisuals';
import WayneCourseGeo from './pages/wayne/WayneCourseGeo';
import WayneCourseSeo from './pages/wayne/WayneCourseSeo';
import WayneCourseSeoModule from './pages/wayne/WayneCourseSeoModule';
import WayneCourseSeoDeep from './pages/wayne/WayneCourseSeoDeep';
import WayneCourseSeoDeepChapter from './pages/wayne/WayneCourseSeoDeepChapter';
import WayneComics from './pages/wayne/WayneComics';
import WayneComicGrandCanyon from './pages/wayne/WayneComicGrandCanyon';
import WayneComicGenesisMars from './pages/wayne/WayneComicGenesisMars';
import WayneComicTeamshares from './pages/wayne/WayneComicTeamshares';
import WayneComicEasyRice from './pages/wayne/WayneComicEasyRice';
import WayneComicAbridge from './pages/wayne/WayneComicAbridge';
import WayneComicIAmGrounded from './pages/wayne/WayneComicIAmGrounded';
import WayneComicAmpd from './pages/wayne/WayneComicAmpd';
import WayneComicLuxwall from './pages/wayne/WayneComicLuxwall';
import WayneComicLimex from './pages/wayne/WayneComicLimex';
import WayneComicBremmiller from './pages/wayne/WayneComicBremmiller';
import WayneComicNutrix from './pages/wayne/WayneComicNutrix';
import WayneComicRecyCap from './pages/wayne/WayneComicRecyCap';
import WayneComicPharmExpress from './pages/wayne/WayneComicPharmExpress';
import WayneComicAmazonCarbonCredit from './pages/wayne/WayneComicAmazonCarbonCredit';
import WayneComicVRBuilding from './pages/wayne/WayneComicVRBuilding';
import WayneComicKindDesigns from './pages/wayne/WayneComicKindDesigns';
import WayneComicPaperBattery from './pages/wayne/WayneComicPaperBattery';
import WayneComicRiskHusk from './pages/wayne/WayneComicRiskHusk';

// Luna section
import LunaHome from './pages/luna/LunaHome';
import LunaEntry from './pages/luna/LunaEntry';
import LunaComicDisneyland from './pages/luna/LunaComicDisneyland';
import LunaComicUniversalLuxe from './pages/luna/LunaComicUniversalLuxe';
import LunaComicDesert from './pages/luna/LunaComicDesert';
import LunaComicLasVegas from './pages/luna/LunaComicLasVegas';
import LunaComicChina from './pages/luna/LunaComicChina';
import LunaComicChinaAdventure from './pages/luna/LunaComicChinaAdventure';
import LunaComicNyc from './pages/luna/LunaComicNyc';
import LunaComicSeattle from './pages/luna/LunaComicSeattle';
import LunaComicParis from './pages/luna/LunaComicParis';
import LunaComicTeamshares from './pages/luna/LunaComicTeamshares';
import LunaComicEasyRice from './pages/luna/LunaComicEasyRice';
import LunaComicAmpd from './pages/luna/LunaComicAmpd';
import LunaComicAbridge from './pages/luna/LunaComicAbridge';
import LunaComicIAmGrounded from './pages/luna/LunaComicIAmGrounded';
import LunaComics from './pages/luna/LunaComics';

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
import AIQuests from './pages/blog/AIQuests';
import BuildingAgents from './pages/blog/BuildingAgents';
import GeminiCanvas from './pages/blog/GeminiCanvas';
import NotebookLM from './pages/blog/NotebookLM';
import SuperlinearStart from './pages/blog/SuperlinearStart';
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
          <Route path="wayne/insights" element={<WayneInsights />} />
          <Route path="wayne/insights/:id" element={<WayneInsight />} />
          <Route path="wayne/courses" element={<WayneCourses />} />
          <Route path="wayne/courses/ctf" element={<WayneCourseCtf />} />
          <Route path="wayne/courses/ai-leadership" element={<WayneCourseLeadershipEn />} />
          <Route path="wayne/courses/ai-leadership/zh" element={<WayneCourseLeadership />} />
          <Route path="wayne/courses/ai-visuals" element={<WayneCourseAiVisuals />} />
          <Route path="wayne/courses/geo" element={<WayneCourseGeo />} />
          <Route path="wayne/courses/seo" element={<WayneCourseSeo />} />
          <Route path="wayne/courses/seo/:moduleNum" element={<WayneCourseSeoModule />} />
          <Route path="wayne/courses/seo-deep" element={<WayneCourseSeoDeep />} />
          <Route path="wayne/courses/seo-deep/:moduleNum/:chapterNum" element={<WayneCourseSeoDeepChapter />} />
          <Route path="wayne/comics" element={<WayneComics />} />
          <Route path="wayne/comics/grand-canyon" element={<WayneComicGrandCanyon />} />
          <Route path="wayne/comics/genesis-mars" element={<WayneComicGenesisMars />} />
          <Route path="wayne/comics/teamshares" element={<WayneComicTeamshares />} />
          <Route path="wayne/comics/easy-rice" element={<WayneComicEasyRice />} />
          <Route path="wayne/comics/abridge" element={<WayneComicAbridge />} />
          <Route path="wayne/comics/i-am-grounded" element={<WayneComicIAmGrounded />} />
           <Route path="wayne/comics/ampd" element={<WayneComicAmpd />} />
          <Route path="wayne/comics/luxwall" element={<WayneComicLuxwall />} />
          <Route path="wayne/comics/limex" element={<WayneComicLimex />} />
          <Route path="wayne/comics/bremmiller" element={<WayneComicBremmiller />} />
          <Route path="wayne/comics/nutrix" element={<WayneComicNutrix />} />
          <Route path="wayne/comics/recycap" element={<WayneComicRecyCap />} />
          <Route path="wayne/comics/pharmexpress" element={<WayneComicPharmExpress />} />
          <Route path="wayne/comics/amazon-carbon-credit" element={<WayneComicAmazonCarbonCredit />} />
          <Route path="wayne/comics/vr-building" element={<WayneComicVRBuilding />} />
          <Route path="wayne/comics/kind-designs" element={<WayneComicKindDesigns />} />
          <Route path="wayne/comics/paper-battery" element={<WayneComicPaperBattery />} />
          <Route path="wayne/comics/risk-husk" element={<WayneComicRiskHusk />} />
          <Route path="wayne/tools" element={<WayneTools />} />
          <Route path="wayne/tools/gap-gain" element={<WayneToolGapGain />} />
          <Route path="wayne/tools/must-have" element={<WayneToolMustHave />} />
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
          <Route path="luna/comics" element={<LunaComics />} />
          <Route path="luna/comics/disneyland" element={<LunaComicDisneyland />} />
          <Route path="luna/comics/universal-luxe" element={<LunaComicUniversalLuxe />} />
          <Route path="luna/comics/desert" element={<LunaComicDesert />} />
          <Route path="luna/comics/las-vegas" element={<LunaComicLasVegas />} />
          <Route path="luna/comics/china" element={<LunaComicChina />} />
          <Route path="luna/comics/china-adventure" element={<LunaComicChinaAdventure />} />
          <Route path="luna/comics/nyc" element={<LunaComicNyc />} />
          <Route path="luna/comics/seattle" element={<LunaComicSeattle />} />
          <Route path="luna/comics/paris" element={<LunaComicParis />} />
          <Route path="luna/comics/teamshares" element={<LunaComicTeamshares />} />
          <Route path="luna/comics/easy-rice" element={<LunaComicEasyRice />} />
          <Route path="luna/comics/ampd" element={<LunaComicAmpd />} />
          <Route path="luna/comics/abridge" element={<LunaComicAbridge />} />
          <Route path="luna/comics/i-am-grounded" element={<LunaComicIAmGrounded />} />
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
          <Route path="blog/ai-quests" element={<AIQuests />} />
          <Route path="blog/building-agents" element={<BuildingAgents />} />
          <Route path="blog/gemini-canvas" element={<GeminiCanvas />} />
          <Route path="blog/notebooklm" element={<NotebookLM />} />
          <Route path="blog/superlinear-start" element={<SuperlinearStart />} />
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
        <Route path="luna/comics" element={<LunaComics />} />
        <Route path="luna/comics/disneyland" element={<LunaComicDisneyland />} />
        <Route path="luna/comics/universal-luxe" element={<LunaComicUniversalLuxe />} />
        <Route path="luna/comics/desert" element={<LunaComicDesert />} />
        <Route path="luna/comics/las-vegas" element={<LunaComicLasVegas />} />
        <Route path="luna/comics/china" element={<LunaComicChina />} />
        <Route path="luna/comics/china-adventure" element={<LunaComicChinaAdventure />} />
        <Route path="luna/comics/nyc" element={<LunaComicNyc />} />
        <Route path="luna/comics/seattle" element={<LunaComicSeattle />} />
        <Route path="luna/comics/paris" element={<LunaComicParis />} />
        <Route path="luna/comics/teamshares" element={<LunaComicTeamshares />} />
        <Route path="luna/comics/easy-rice" element={<LunaComicEasyRice />} />
        <Route path="luna/comics/ampd" element={<LunaComicAmpd />} />
        <Route path="luna/comics/abridge" element={<LunaComicAbridge />} />
        <Route path="luna/comics/i-am-grounded" element={<LunaComicIAmGrounded />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="blog/superlinear" element={<Superlinear />} />
        <Route path="blog/strategic-radar" element={<StrategicRadar />} />
        <Route path="blog/dad-birthday" element={<DadBirthday />} />
        <Route path="blog/gemini-report" element={<GeminiReport />} />
        <Route path="blog/mars-bunny-wiki" element={<MarsBunnyWiki />} />
        <Route path="blog/genesis-mars" element={<GenesisMars />} />
        <Route path="blog/fandomtrivia-v1" element={<FandomTriviaV1 />} />
        <Route path="blog/fandomtrivia-v2" element={<FandomTriviaV2 />} />
        <Route path="blog/ai-quests" element={<AIQuests />} />
        <Route path="blog/building-agents" element={<BuildingAgents />} />
        <Route path="blog/gemini-canvas" element={<GeminiCanvas />} />
        <Route path="blog/notebooklm" element={<NotebookLM />} />
        <Route path="blog/superlinear-start" element={<SuperlinearStart />} />
      </Route>
      <Route path="/" element={<WayneLayout />}>
        <Route path="wayne" element={<WayneHome />} />
        <Route path="wayne/plans" element={<WaynePlans />} />
        <Route path="wayne/plan/:weekNum" element={<WaynePlan />} />
        <Route path="wayne/roadmap" element={<WayneRoadmap />} />
        <Route path="wayne/insights" element={<WayneInsights />} />
        <Route path="wayne/insights/:id" element={<WayneInsight />} />
        <Route path="wayne/courses" element={<WayneCourses />} />
        <Route path="wayne/courses/ctf" element={<WayneCourseCtf />} />
        <Route path="wayne/courses/ai-leadership" element={<WayneCourseLeadershipEn />} />
        <Route path="wayne/courses/ai-leadership/zh" element={<WayneCourseLeadership />} />
        <Route path="wayne/courses/ai-visuals" element={<WayneCourseAiVisuals />} />
        <Route path="wayne/courses/geo" element={<WayneCourseGeo />} />
        <Route path="wayne/courses/seo" element={<WayneCourseSeo />} />
        <Route path="wayne/courses/seo/:moduleNum" element={<WayneCourseSeoModule />} />
        <Route path="wayne/comics" element={<WayneComics />} />
        <Route path="wayne/comics/grand-canyon" element={<WayneComicGrandCanyon />} />
        <Route path="wayne/comics/genesis-mars" element={<WayneComicGenesisMars />} />
        <Route path="wayne/comics/teamshares" element={<WayneComicTeamshares />} />
        <Route path="wayne/comics/easy-rice" element={<WayneComicEasyRice />} />
        <Route path="wayne/comics/abridge" element={<WayneComicAbridge />} />
        <Route path="wayne/comics/i-am-grounded" element={<WayneComicIAmGrounded />} />
        <Route path="wayne/comics/ampd" element={<WayneComicAmpd />} />
        <Route path="wayne/comics/luxwall" element={<WayneComicLuxwall />} />
        <Route path="wayne/comics/limex" element={<WayneComicLimex />} />
        <Route path="wayne/comics/bremmiller" element={<WayneComicBremmiller />} />
        <Route path="wayne/comics/nutrix" element={<WayneComicNutrix />} />
        <Route path="wayne/comics/recycap" element={<WayneComicRecyCap />} />
        <Route path="wayne/comics/pharmexpress" element={<WayneComicPharmExpress />} />
        <Route path="wayne/comics/amazon-carbon-credit" element={<WayneComicAmazonCarbonCredit />} />
        <Route path="wayne/comics/vr-building" element={<WayneComicVRBuilding />} />
        <Route path="wayne/comics/kind-designs" element={<WayneComicKindDesigns />} />
        <Route path="wayne/comics/paper-battery" element={<WayneComicPaperBattery />} />
        <Route path="wayne/comics/risk-husk" element={<WayneComicRiskHusk />} />
        <Route path="wayne/tools" element={<WayneTools />} />
        <Route path="wayne/tools/gap-gain" element={<WayneToolGapGain />} />
        <Route path="wayne/tools/must-have" element={<WayneToolMustHave />} />
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
