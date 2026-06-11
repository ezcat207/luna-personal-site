import { Outlet } from 'react-router-dom';

export default function LogLayout() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #fef9c3 100%)' }}
    >
      <div className="max-w-lg mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}
