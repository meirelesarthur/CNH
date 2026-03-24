import { useState } from "react";
import { useNavigate } from "react-router";
import { useColors } from "../ThemeContext";
import { Star, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const minhasAulas = [
  { id: "7", instrutor: "Roberto Silva", rota: "Rota Centro", data: "25/03", hora: "14:00", avaliacao: null, valor: "R$ 120", status: "upcoming" },
  { id: "8", instrutor: "Maria Santos", rota: "Rota Detran", data: "28/03", hora: "09:00", avaliacao: null, valor: "R$ 180", status: "upcoming" },
  { id: "1", instrutor: "Roberto Silva", rota: "Rota Centro", data: "17/03", hora: "08:00", avaliacao: 5, valor: "R$ 120", status: "completed" },
  { id: "2", instrutor: "Roberto Silva", rota: "Rota Zona Norte", data: "14/03", hora: "10:00", avaliacao: 4, valor: "R$ 120", status: "completed" },
  { id: "3", instrutor: "Maria Santos", rota: "Rota Detran", data: "12/03", hora: "14:00", avaliacao: 5, valor: "R$ 180", status: "completed" },
  { id: "4", instrutor: "Roberto Silva", rota: "Rota Centro", data: "10/03", hora: "08:00", avaliacao: 5, valor: "R$ 120", status: "completed" },
  { id: "5", instrutor: "Maria Santos", rota: "Rota Centro", data: "07/03", hora: "09:00", avaliacao: 4, valor: "R$ 120", status: "completed" },
  { id: "6", instrutor: "Fernanda Alves", rota: "Rota Zona Norte", data: "05/03", hora: "14:00", avaliacao: 5, valor: "R$ 120", status: "completed" },
];

export function CondutorHistorico() {
  const c = useColors();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");

  const filteredAulas = minhasAulas.filter(a => a.status === tab);

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Minhas Aulas</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Acompanhe suas aulas agendadas e concluídas</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Total", value: "R$ 780" },
          { label: "Aulas", value: "6" },
          { label: "Média", value: "4.7 ★" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
            <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif", marginTop: 2 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex p-1 rounded-xl" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
        <button
          onClick={() => setTab("upcoming")}
          className="flex-1 py-2 text-sm font-medium rounded-lg transition-colors relative"
          style={{ color: tab === "upcoming" ? c.text : c.textMuted }}
        >
          {tab === "upcoming" && (
            <motion.div layoutId="tab-bg" className="absolute inset-0 rounded-lg" style={{ backgroundColor: c.accentSoft }} />
          )}
          <span className="relative z-10">Próximas</span>
        </button>
        <button
          onClick={() => setTab("completed")}
          className="flex-1 py-2 text-sm font-medium rounded-lg transition-colors relative"
          style={{ color: tab === "completed" ? c.text : c.textMuted }}
        >
          {tab === "completed" && (
            <motion.div layoutId="tab-bg" className="absolute inset-0 rounded-lg" style={{ backgroundColor: c.accentSoft }} />
          )}
          <span className="relative z-10">Concluídas</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filteredAulas.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(`/condutor/historico/${item.id}`)}
              className="w-full rounded-2xl p-4 text-left cursor-pointer"
              style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{item.instrutor}</p>
                      <p style={{ fontSize: 12, color: c.textMuted }}>{item.rota}</p>
                    </div>
                    <span className="flex items-center gap-1 flex-shrink-0" style={{ fontSize: 13, fontWeight: 600, color: item.status === "upcoming" ? c.textMuted : c.accent }}>
                      {item.status === "upcoming" ? <Clock size={13} /> : <CheckCircle2 size={13} />}
                      {item.valor}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 12, color: c.textFaint }}>{item.data} às {item.hora}</span>
                    {item.status === "completed" && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} size={12} style={{ color: idx < (item.avaliacao || 0) ? "#f59e0b" : c.textGhost, fill: idx < (item.avaliacao || 0) ? "#f59e0b" : "transparent" }} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: c.textFaint, flexShrink: 0 }} />
              </div>
            </motion.button>
          ))}
          {filteredAulas.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 text-center"
            >
              <p style={{ color: c.textMuted, fontSize: 14 }}>Nenhuma aula encontrada.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
