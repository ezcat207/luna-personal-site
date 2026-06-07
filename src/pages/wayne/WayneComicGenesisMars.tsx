import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import GenesisMars from '../blog/GenesisMars';

export default function WayneComicGenesisMars() {
  return (
    <>
      <SEOHead
        title="Genesis on Mars: Crimson Dawn — Wayne's Comics"
        description="A sci-fi short story: when Earth collapses, Wayne and Luna crash-land on Mars with one eye, broken mechs, and the last seed of human civilization."
        ogImage="/images/comics/genesis-mars/cover.png"
      />
      <div>
        <Link
          to="/wayne/comics"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Comics
        </Link>
        <GenesisMars />
      </div>
    </>
  );
}
