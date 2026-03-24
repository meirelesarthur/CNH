import { useColors } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import { StatCard } from "../StatCard";
import { DollarSign, Calendar, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { MapPin, Plus, Car, Route } from "lucide-react";

const todaySchedule = [
  { id: "1", aluno: "Ana Costa", hora: "08:00", rota: "Rota Centro", status: "concluída" },
  { id: "2", aluno: "Pedro Lima", hora: "10:00", rota: "Rota Zona Norte", status: "em andamento" },
  { id: "3", aluno: "Lucas Ramos", hora: "14:00", rota: "Rota Centro", status: "agendada" },
  { id: "4", aluno: "Mariana Lopes", hora: "16:00", rota: "Rota Detran", status: "agendada" },
];

const statusMap: Record<string, { bg: string; color: string }> = {
  "concluída": { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
  "em andamento": { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  "agendada": { bg: "rgba(6,182,212,0.12)", color: "#06b6d4" },
};

export function InstrutorDashboard() {
  const c = useColors();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div>
        <p style={{ fontSize: 13, color: c.textMuted }}>Olá, {user?.name?.split(" ")[0]} 👋</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif", marginTop: 2 }}>Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Ganhos/Mês" value="R$ 4.6k" change="+15%" positive icon={DollarSign} />
        <StatCard title="Aulas" value="39" change="+5" positive icon={Calendar} />
        <StatCard title="Avaliação" value="4.8" icon={Star} />
        <StatCard title="Alunos" value="12" change="+3" positive icon={Users} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          onClick={() => navigate("/instrutor/rotas")}
          className="rounded-2xl p-4 text-left cursor-pointer flex items-center gap-3"
          style={{ backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.accent }}>
            <Route size={20} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Criar Rota</p>
            <p style={{ fontSize: 11, color: c.textMuted }}>Nova rota de aula</p>
          </div>
        </motion.button>
        <motion.button
          onClick={() => navigate("/instrutor/veiculos")}
          className="rounded-2xl p-4 text-left cursor-pointer flex items-center gap-3"
          style={{ backgroundColor: c.textGhost, border: `1px solid ${c.border}` }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.textGhost }}>
            <Car size={20} style={{ color: c.textMuted }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Veículos</p>
            <p style={{ fontSize: 11, color: c.textMuted }}>Gerenciar frota</p>
          </div>
        </motion.button>
      </div>

      {/* Today */}
      <motion.div className="rounded-2xl" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="px-4 pt-4 pb-2 lg:px-5 lg:pt-5">
          <h3 style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>Agenda de Hoje</h3>
        </div>
        <div>
          {todaySchedule.map((item, i) => {
            const s = statusMap[item.status];
            return (
              <motion.div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3.5 lg:px-5"
                style={{ borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}
                whileTap={{ backgroundColor: c.bgCardHover }}
              >
                <div className="text-center min-w-10">
                  <p style={{ fontSize: 15, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif" }}>{item.hora}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{item.aluno}</p>
                  <p style={{ fontSize: 12, color: c.textMuted }}>{item.rota}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg flex-shrink-0" style={{ fontSize: 11, fontWeight: 500, backgroundColor: s.bg, color: s.color }}>
                  {item.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}