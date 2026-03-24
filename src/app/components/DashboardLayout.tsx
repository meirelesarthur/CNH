import { Outlet, Navigate, useNavigate, useLocation } from "react-router";
import { useAuth, type UserRole } from "./AuthContext";
import { useColors } from "./ThemeContext";
import { SigaBemLogo } from "./SigaBemLogo";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  LayoutDashboard, Users, DollarSign, Settings, Calendar, History,
  LogOut, ChevronRight, Shield, UserCheck, GraduationCap,
  Car, MapPin, Bell, Plus
} from "lucide-react";

interface NavItem { label: string; icon: React.ElementType; path: string; }

const navByRole: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Início", icon: LayoutDashboard, path: "/admin" },
    { label: "Instrutores", icon: UserCheck, path: "/admin/instrutores" },
    { label: "Alunos", icon: GraduationCap, path: "/admin/alunos" },
    { label: "Financeiro", icon: DollarSign, path: "/admin/financeiro" },
  ],
  instrutor: [
    { label: "Início", icon: LayoutDashboard, path: "/instrutor" },
    { label: "Agenda", icon: Calendar, path: "/instrutor/agenda" },
    { label: "Financeiro", icon: DollarSign, path: "/instrutor/financeiro" },
    { label: "Veículos", icon: Car, path: "/instrutor/veiculos" },
    { label: "Rotas", icon: MapPin, path: "/instrutor/rotas" },
  ],
  condutor: [
    { label: "Início", icon: LayoutDashboard, path: "/condutor" },
    { label: "Agendar", icon: Plus, path: "/condutor/agendar" },
    { label: "Minhas Aulas", icon: History, path: "/condutor/historico" },
  ],
};

const roleLabels: Record<UserRole, string> = { admin: "Administração", instrutor: "Instrutor", condutor: "Condutor" };
const roleIcons: Record<UserRole, React.ElementType> = { admin: Shield, instrutor: UserCheck, condutor: GraduationCap };

/* ─── Mobile Bottom Tab ─── */
function BottomTabs({ items, c, isActive, onNav }: { items: NavItem[]; c: any; isActive: (p: string) => boolean; onNav: (p: string) => void }) {
  const tabItems = items.length > 5 ? [...items.slice(0, 4), items[items.length - 1]] : items;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around"
      style={{
        backgroundColor: c.sidebar,
        borderTop: `1px solid ${c.border}`,
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        paddingTop: 6,
      }}
    >
      {tabItems.map((item) => {
        const active = isActive(item.path);
        return (
          <motion.button
            key={item.path}
            onClick={() => onNav(item.path)}
            className="flex flex-col items-center gap-0.5 py-1.5 px-3 cursor-pointer relative"
            style={{ color: active ? c.accent : c.textFaint, minWidth: 56 }}
            whileTap={{ scale: 0.9 }}
          >
            {active && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -top-[7px] w-5 h-[3px] rounded-full"
                style={{ backgroundColor: c.accent }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon size={22} strokeWidth={active ? 2.2 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, letterSpacing: "0.01em" }}>{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}

/* ─── Mobile Header ─── */
function MobileHeader({ c, user, onProfileOpen, onNav }: { c: any; user: any; onProfileOpen: () => void; onNav: (p: string) => void }) {
  return (
    <header
      className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        backgroundColor: c.sidebar,
        borderBottom: `1px solid ${c.border}`,
        height: 56,
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <SigaBemLogo height={28} />
      <div className="flex items-center gap-2">
        <motion.button className="relative p-2 cursor-pointer rounded-full" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}>
          <Bell size={20} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: c.accent }} />
        </motion.button>
        <motion.button onClick={() => onNav(`/${user.role}/configuracoes`)} className="relative p-2 cursor-pointer rounded-full" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}>
          <Settings size={20} />
        </motion.button>
        <motion.button
          onClick={onProfileOpen}
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 12, fontWeight: 700 }}
          whileTap={{ scale: 0.9 }}
        >
          {user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
        </motion.button>
      </div>
    </header>
  );
}

/* ─── Mobile Profile Sheet ─── */
function ProfileSheet({ c, user, role, onLogout, onClose }: any) {
  const RoleIcon = roleIcons[role as UserRole];
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60]"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-3xl"
        style={{ backgroundColor: c.bgCard, maxHeight: "70vh", paddingBottom: "env(safe-area-inset-bottom, 20px)" }}
      >
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: c.textGhost }} />
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
              {user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p style={{ fontSize: 17, fontWeight: 600, color: c.text }}>{user.name}</p>
              <p style={{ fontSize: 13, color: c.textMuted }}>{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5" style={{ backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}>
            <RoleIcon size={14} style={{ color: c.accent }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: c.accent, fontFamily: "'Sora', sans-serif" }}>
              {roleLabels[role as UserRole]}
            </span>
          </div>

          <motion.button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer"
            style={{ backgroundColor: "rgba(239,68,68,0.08)", color: c.danger }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={20} />
            <span style={{ fontSize: 15, fontWeight: 500 }}>Sair da conta</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ─── Desktop Sidebar ─── */
function DesktopSidebar({ items, c, user, role, isActive, onNav, onLogout }: any) {
  const RoleIcon = roleIcons[role as UserRole];
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-40" style={{ backgroundColor: c.sidebar, borderRight: `1px solid ${c.border}` }}>
      <div className="p-5 flex items-center gap-3" style={{ borderBottom: `1px solid ${c.border}` }}>
        <SigaBemLogo height={32} />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}>
          <RoleIcon size={14} style={{ color: c.accent }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: c.accent, letterSpacing: "0.05em", fontFamily: "'Sora', sans-serif" }}>
            {roleLabels[role as UserRole].toUpperCase()}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {items.map((item: NavItem) => {
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.path}
              onClick={() => onNav(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
              style={{
                backgroundColor: active ? c.sidebarActive : "rgba(0,0,0,0)",
                color: active ? c.accent : c.textMuted,
                border: active ? `1px solid ${c.accentBorder}` : "1px solid rgba(0,0,0,0)",
              }}
              whileHover={{ backgroundColor: active ? c.sidebarActive : c.sidebarHover }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon size={18} />
              <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 400 }}>{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto" />}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-3" style={{ borderTop: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ backgroundColor: c.textGhost }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 12, fontWeight: 700 }}>
            {user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate" style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{user.name}</p>
            <p className="truncate" style={{ fontSize: 11, color: c.textMuted }}>{user.email}</p>
          </div>
          <motion.button onClick={() => onNav(`/${user.role}/configuracoes`)} className="cursor-pointer p-1.5 rounded-lg" style={{ color: c.textFaint }} whileHover={{ color: c.accent, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Settings size={16} />
          </motion.button>
          <motion.button onClick={onLogout} className="cursor-pointer p-1.5 rounded-lg" style={{ color: c.textFaint }} whileHover={{ color: c.danger, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <LogOut size={16} />
          </motion.button>
        </div>
      </div>
    </aside>
  );
}

/* ─── Main Layout ─── */
export function DashboardLayout({ requiredRole }: { requiredRole: UserRole }) {
  const { user, logout } = useAuth();
  const c = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== requiredRole) return <Navigate to={`/${user.role}`} replace />;

  const items = navByRole[user.role];

  const isActive = (path: string) => {
    if (path === `/${user.role}`) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => navigate(path);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: c.bg, fontFamily: "'Inter', sans-serif" }}>
      <DesktopSidebar
        items={items} c={c} user={user} role={user.role}
        isActive={isActive} onNav={handleNav} onLogout={handleLogout}
      />
      <MobileHeader c={c} user={user} onProfileOpen={() => setProfileOpen(true)} onNav={handleNav} />
      <BottomTabs items={items} c={c} isActive={isActive} onNav={handleNav} />

      <AnimatePresence>
        {profileOpen && (
          <ProfileSheet
            c={c} user={user} role={user.role}
            onLogout={handleLogout}
            onClose={() => setProfileOpen(false)}
          />
        )}
      </AnimatePresence>

      <main className="lg:ml-64 pt-[56px] pb-[76px] lg:pt-0 lg:pb-0 min-h-screen">
        <div className="p-4 lg:p-8 min-h-screen" style={{ backgroundColor: "#E7EDF4" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}