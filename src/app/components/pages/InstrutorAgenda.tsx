import { useState } from "react";
import { motion } from "motion/react";
import { useColors } from "../ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const events: Record<string, { aluno: string; hora: string; rota: string }[]> = {
  "2026-03-17": [
    { aluno: "Ana Costa", hora: "08:00", rota: "Rota Centro" },
    { aluno: "Pedro Lima", hora: "10:00", rota: "Rota Zona Norte" },
    { aluno: "Lucas Ramos", hora: "14:00", rota: "Rota Centro" },
  ],
  "2026-03-18": [
    { aluno: "Mariana Lopes", hora: "09:00", rota: "Rota Detran" },
    { aluno: "João Mendes", hora: "15:00", rota: "Rota Centro" },
  ],
  "2026-03-20": [
    { aluno: "Carla Souza", hora: "08:00", rota: "Rota Zona Norte" },
  ],
};

export function InstrutorAgenda() {
  const c = useColors();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 17));
  const [selectedDate, setSelectedDate] = useState("2026-03-17");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const dateKey = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const selectedEvents = events[selectedDate] || [];

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Agenda</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Visualize seus horários</p>
      </div>

      {/* Calendar - compact on mobile */}
      <motion.div className="rounded-2xl p-4 lg:p-5" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize: 15, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>{months[month]} {year}</h3>
          <div className="flex gap-1.5">
            <motion.button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 rounded-lg cursor-pointer" style={{ color: c.textMuted, backgroundColor: c.textGhost }} whileTap={{ scale: 0.9 }}><ChevronLeft size={18} /></motion.button>
            <motion.button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 rounded-lg cursor-pointer" style={{ color: c.textMuted, backgroundColor: c.textGhost }} whileTap={{ scale: 0.9 }}><ChevronRight size={18} /></motion.button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {daysOfWeek.map((d, i) => <div key={`${d}-${i}`} className="text-center py-1.5" style={{ fontSize: 11, fontWeight: 600, color: c.textFaint }}>{d}</div>)}
          {days.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const key = dateKey(day);
            const hasEvents = !!events[key];
            const isSelected = key === selectedDate;
            const isToday = key === "2026-03-17";
            return (
              <motion.button
                key={key}
                onClick={() => setSelectedDate(key)}
                className="relative aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer"
                style={{
                  backgroundColor: isSelected ? c.accent : "transparent",
                  color: isSelected ? "#fff" : isToday ? c.accent : c.text,
                  fontWeight: isToday || isSelected ? 700 : 400,
                  fontSize: 13,
                }}
                whileTap={{ scale: 0.9 }}
              >
                {day}
                {hasEvents && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: c.accent }} />}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Day events */}
      <div>
        <h3 className="mb-3" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>
          {selectedDate.split("-").reverse().join("/")}
        </h3>
        {selectedEvents.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
            <p style={{ fontSize: 13, color: c.textFaint }}>Nenhuma aula agendada.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {selectedEvents.map((ev, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="min-w-12 text-center">
                  <p style={{ fontSize: 17, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif" }}>{ev.hora}</p>
                </div>
                <div className="h-8 w-px rounded-full" style={{ backgroundColor: c.accentBorder }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{ev.aluno}</p>
                  <p style={{ fontSize: 12, color: c.textMuted }}>{ev.rota}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
