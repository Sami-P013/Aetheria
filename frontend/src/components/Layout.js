import { useAuth } from '../contexts/AuthContext';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  Sparkles, 
  LayoutDashboard, 
  Brain, 
  Telescope, 
  Hexagon, 
  Music, 
  Zap, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Brain, label: 'Cosmic Oracle', path: '/oracle' },
    { icon: Music, label: 'Meditation', path: '/meditation' },
    { icon: Telescope, label: 'Galactic Heritage', path: '/galactic' },
    { icon: Hexagon, label: 'Sacred Geometry', path: '/geometry' },
    { icon: Zap, label: 'DNA Activation', path: '/dna' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-slate-900/80 backdrop-blur-md border border-white/10"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 backdrop-blur-md bg-slate-900/80 border-r border-white/10 z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              Aetheria
            </span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white'
                      : 'hover:bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="mb-4">
            <p className="text-sm text-white/60">Signed in as</p>
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-purple-400 capitalize mt-1">
              {user?.subscription_tier} tier
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen relative z-10">
        <div className="p-6 lg:p-8">
          {children || <Outlet />}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
