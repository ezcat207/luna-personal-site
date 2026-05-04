import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import { getWayneWeekByNumber, wayneWeeks } from '../../data/wayneWeeks';
import { WaynePlanSEO } from '../../components/SEOHead';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const Section = ({ label, children, delay = 0 }: { label: string; children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35 }}
    className="bg-white border border-slate-200 rounded-xl p-6"
  >
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</h3>
    <p className="text-slate-700 leading-relaxed text-[15px]">{children}</p>
  </motion.div>
);

const WaynePlan = () => {
  const { weekNum } = useParams<{ weekNum: string }>();
  const { t } = useTranslation();
  const week = getWayneWeekByNumber(Number(weekNum));
  const allWeeks = [...wayneWeeks].reverse();
  const currentIdx = allWeeks.findIndex(w => w.week === Number(weekNum));
  const prevWeek = allWeeks[currentIdx + 1];
  const nextWeek = allWeeks[currentIdx - 1];

  if (!week) {
    return (
      <div className="text-center py-32">
        <p className="text-slate-500 text-lg mb-4">This week doesn't exist yet.</p>
        <Link to="/wayne/plans" className="text-indigo-600 font-medium hover:text-indigo-800">
          ← Back to all plans
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <WaynePlanSEO week={week.week} title={week.title} summary={week.summary} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-slate-400">
        <Link to="/wayne" className="hover:text-slate-600">Wayne</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/wayne/plans" className="hover:text-slate-600">Plans</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600">Week {week.week}</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 bg-indigo-600 text-white text-sm font-bold rounded-md">
            Week {week.week}
          </span>
          <span className="text-sm text-slate-400">{week.date} · Published Wednesday</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">{week.title}</h1>
        <p className="text-slate-500 leading-relaxed">{week.summary}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {week.tools.map(tool => (
            <span key={tool} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      <Section label={t('wayne.sections.what_we_taught')} delay={0.08}>{week.whatWeTaught}</Section>
      <Section label={t('wayne.sections.why_this_topic')} delay={0.12}>{week.whyThisTopic}</Section>
      <Section label={t('wayne.sections.luna_reaction')} delay={0.16}>{week.lunaReaction}</Section>

      {/* Parent lesson - highlighted */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-6"
      >
        <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">
          {t('wayne.sections.parent_lesson')}
        </h3>
        <p className="text-indigo-900 leading-relaxed text-[15px] italic">"{week.parentLesson}"</p>
      </motion.div>

      <Section label={t('wayne.sections.next_week')} delay={0.24}>{week.nextWeekPreview}</Section>

      {/* Resources */}
      {week.resources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.35 }}
          className="bg-white border border-slate-200 rounded-xl p-6"
        >
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            {t('wayne.sections.resources')}
          </h3>
          <ul className="space-y-3">
            {week.resources.map((r, i) => (
              <li key={i}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 group-hover:text-indigo-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 transition-colors">
                      {r.label}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{r.url}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Navigation between weeks */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {prevWeek && (
            <Link to={`/wayne/plan/${prevWeek.week}`} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Week {prevWeek.week}</span>
            </Link>
          )}
        </div>
        <a
          href={`${lunaSubdomain}/luna/${week.week}`}
          className="text-sm text-pink-500 hover:text-pink-700 font-medium transition-colors"
        >
          Luna's results for Week {week.week} →
        </a>
        <div>
          {nextWeek && (
            <Link to={`/wayne/plan/${nextWeek.week}`} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-700 transition-colors">
              <span>Week {nextWeek.week}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaynePlan;
