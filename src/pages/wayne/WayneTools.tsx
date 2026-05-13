import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../../components/SEOHead';
import { TrendingUp, CheckSquare, ArrowRight } from 'lucide-react';

const tools = [
  {
    id: 'gap-gain',
    icon: TrendingUp,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    tag: 'Mindset',
    tagColor: 'bg-emerald-50 text-emerald-600',
    title: 'Gap & Gain Reflector',
    subtitle: 'From The Gap and The Gain by Dan Sullivan',
    description:
      'Most people measure success by how far they are from their goal — the Gap. This tool flips the lens: it surfaces how far you\'ve already come from your starting point — the Gain. Reframe your progress before you assess what\'s left.',
    path: '/wayne/tools/gap-gain',
    cta: 'Reflect on your gains',
  },
  {
    id: 'must-have',
    icon: CheckSquare,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    tag: 'Clarity',
    tagColor: 'bg-violet-50 text-violet-600',
    title: 'Must Have / Want Have Sorter',
    subtitle: 'Based on priority-clarification frameworks',
    description:
      "You're not avoiding things you don't want — you're avoiding things you don't want enough. This tool forces a binary sort on your list: what's a genuine Must Have versus what's actually a Want Have. The gap between the two is where you find clarity.",
    path: '/wayne/tools/must-have',
    cta: 'Sort your priorities',
  },
];

export default function WayneTools() {
  return (
    <>
      <SEOHead
        title="Tools — Wayne's Mindset Toolkit"
        description="Interactive thinking tools for parents and coaches: Gap & Gain Reflector and Must Have / Want Have Sorter."
      />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider mb-2">Thinking Tools</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Mindset Toolkit</h1>
            <p className="text-lg text-slate-500 max-w-2xl">
              Two interactive tools drawn from frameworks I use with Luna and myself. Each takes under five minutes and changes how you look at a problem.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={tool.path} className="block group">
                  <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-indigo-300 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                        <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tool.tagColor}`}>
                            {tool.tag}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">{tool.title}</h2>
                        <p className="text-sm text-slate-400 italic mb-4">{tool.subtitle}</p>
                        <p className="text-slate-600 leading-relaxed mb-6">{tool.description}</p>
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                          {tool.cta}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-sm mt-12">
            More tools coming as we discover what actually shifts thinking.
          </p>
        </div>
      </div>
    </>
  );
}
