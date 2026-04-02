import { useColors } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import { StatCard } from "../StatCard";
import { Calendar, Clock, Star, BookOpen } from "lucide-react";
import { motion } from "motion/react";

const nextClasses = [
  { id: "1", instrutor: "Roberto Silva", fotos: "https://i.pravatar.cc/150?u=1", data: "18/03", hora: "10:00", rota: "Rota Centro", veiculo: "Onix 2024", tipoVeiculo: "Veículo" },
  { id: "2", instrutor: "Maria Santos", fotos: "https://i.pravatar.cc/150?u=2", data: "20/03", hora: "14:00", rota: "Rota Detran", veiculo: "HB20 2023", tipoVeiculo: "Veículo" },
];

const recentClasses = [
  { id: "1", instrutor: "Roberto Silva", fotos: "https://i.pravatar.cc/150?u=1", data: "17/03", rota: "Rota Centro", avaliacao: 5 },
  { id: "2", instrutor: "Roberto Silva", fotos: "https://i.pravatar.cc/150?u=1", data: "14/03", rota: "Rota Zona Norte", avaliacao: 4 },
  { id: "3", instrutor: "Carlos Dias", fotos: "https://i.pravatar.cc/150?u=3", data: "12/03", rota: "Rota Zona Leste", avaliacao: 5 },
];

export function CondutorDashboard() {
  const c = useColors();
  const { user } = useAuth();

  return (
    <div className="space-y-5">
      <div>
        <p style={{ fontSize: 13, color: c.textMuted }}>Olá, {user?.name?.split(" ")[0]} 👋</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif", marginTop: 2 }}>Meu Painel</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Aulas" value="12" icon={BookOpen} />
        <StatCard title="Próxima" value="18/03" icon={Calendar} />
        <StatCard title="Prática" value="10h" change="+2h" positive icon={Clock} />
      </div>

      {/* Next classes */}
      <div>
        <h3 className="mb-3" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>Próximas Aulas</h3>
        <div className="space-y-2.5">
          {nextClasses.map((a) => (
            <motion.div key={a.id} className="flex items-center gap-3 p-4 rounded-2xl" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} whileTap={{ scale: 0.98 }}>
              <div className="min-w-12 text-center">
                <p style={{ fontSize: 11, color: c.textMuted }}>{a.data}</p>
                <p style={{ fontSize: 17, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif" }}>{a.hora}</p>
              </div>
              <div className="h-8 w-px rounded-full" style={{ backgroundColor: c.accentBorder }} />
              <img src={a.fotos} alt={a.instrutor} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="truncate" style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{a.instrutor}</p>
                <p className="truncate" style={{ fontSize: 12, color: c.textMuted }}>{a.rota} • {a.veiculo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent classes */}
      <div>
        <h3 className="mb-3" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>Aulas Recentes</h3>
        <div className="space-y-2.5">
          {recentClasses.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
              <div className="flex items-center gap-3">
                <img src={a.fotos} alt={a.instrutor} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{a.instrutor}</p>
                  <p style={{ fontSize: 12, color: c.textMuted }}>{a.data} • {a.rota}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} style={{ color: i < a.avaliacao ? "#f59e0b" : c.textGhost, fill: i < a.avaliacao ? "#f59e0b" : "transparent" }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
