import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import {
  Search, MapPin, Clock, Car, Star,
  CheckCircle2, ChevronLeft, Navigation
} from "lucide-react";

interface RotaDisponivel {
  id: string;
  instrutor: string;
  instrutorAvatar: string;
  avaliacao: number;
  rota: string;
  descricao: string;
  veiculo: string;
  categoria: string;
  duracao: string;
  distancia: string;
  valor: number;
  pontos: string[];
  horarios: { hora: string; disponivel: boolean }[];
}

const mockRotas: RotaDisponivel[] = [
  {
    id: "1", instrutor: "Roberto Silva", instrutorAvatar: "RS", avaliacao: 4.8,
    rota: "Rota Centro", descricao: "Circuito pelo centro com semáforos e rotatórias",
    veiculo: "Onix 2024", categoria: "B",
    duracao: "50 min", distancia: "12 km", valor: 120,
    pontos: ["Av. Paulista", "R. Augusta", "Pça República"],
    horarios: [
      { hora: "08:00", disponivel: true }, { hora: "10:00", disponivel: true },
      { hora: "14:00", disponivel: false }, { hora: "16:00", disponivel: true },
    ],
  },
  {
    id: "2", instrutor: "Maria Santos", instrutorAvatar: "MS", avaliacao: 4.9,
    rota: "Rota Detran", descricao: "Simulação do trajeto oficial do exame prático",
    veiculo: "HB20 2023", categoria: "A/B",
    duracao: "30 min", distancia: "5 km", valor: 180,
    pontos: ["Detran", "Av. do Estado", "Retorno"],
    horarios: [
      { hora: "09:00", disponivel: true }, { hora: "11:00", disponivel: true },
      { hora: "15:00", disponivel: true },
    ],
  },
  {
    id: "3", instrutor: "Roberto Silva", instrutorAvatar: "RS", avaliacao: 4.8,
    rota: "Rota Zona Norte", descricao: "Percurso residencial com ladeiras e ruas estreitas",
    veiculo: "Onix 2024", categoria: "B",
    duracao: "45 min", distancia: "10 km", valor: 110,
    pontos: ["Av. Casa Verde", "R. Voluntários", "Mandaqui"],
    horarios: [
      { hora: "08:00", disponivel: true }, { hora: "10:00", disponivel: false },
      { hora: "14:00", disponivel: true },
    ],
  },
  {
    id: "4", instrutor: "Fernanda Alves", instrutorAvatar: "FA", avaliacao: 4.7,
    rota: "Rota Zona Norte", descricao: "Percurso com foco em direção defensiva",
    veiculo: "Mobi 2023", categoria: "B",
    duracao: "45 min", distancia: "10 km", valor: 100,
    pontos: ["Av. Casa Verde", "R. Voluntários", "Mandaqui"],
    horarios: [
      { hora: "08:00", disponivel: true }, { hora: "10:00", disponivel: true },
      { hora: "14:00", disponivel: true },
    ],
  },
  {
    id: "5", instrutor: "Carlos Dias", instrutorAvatar: "CD", avaliacao: 4.5,
    rota: "Rota Centro Histórico", descricao: "Circuito pelo centro histórico de Campinas",
    veiculo: "Kwid 2024", categoria: "B",
    duracao: "40 min", distancia: "8 km", valor: 95,
    pontos: ["Largo do Rosário", "Av. Francisco Glicério", "Barão de Jaguara"],
    horarios: [
      { hora: "08:00", disponivel: true }, { hora: "10:00", disponivel: true },
      { hora: "14:00", disponivel: true }, { hora: "16:00", disponivel: true },
    ],
  },
  {
    id: "6", instrutor: "Paulo Rocha", instrutorAvatar: "PR", avaliacao: 4.6,
    rota: "Rota Copacabana", descricao: "Percurso costeiro com estacionamento em via",
    veiculo: "Argo 2024", categoria: "A/B",
    duracao: "50 min", distancia: "14 km", valor: 140,
    pontos: ["Av. Atlântica", "R. Barata Ribeiro", "Túnel Novo"],
    horarios: [
      { hora: "09:00", disponivel: true }, { hora: "11:00", disponivel: true },
      { hora: "15:00", disponivel: false },
    ],
  },
];

export function CondutorAgendar() {
  const c = useColors();

  // Search
  const [busca, setBusca] = useState("");

  // Booking flow
  const [selectedRota, setSelectedRota] = useState<RotaDisponivel | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  // Filter results by route name or instructor name
  const results = useMemo(() => {
    if (!busca.trim()) return mockRotas;
    const term = busca.toLowerCase();
    return mockRotas.filter(r =>
      r.rota.toLowerCase().includes(term) ||
      r.instrutor.toLowerCase().includes(term)
    );
  }, [busca]);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedRota(null);
      setSelectedHorario(null);
    }, 3000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Agendar Aula</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Escolha uma rota e agende sua aula</p>
      </div>

      {/* ─── Search bar ─── */}
      {!selectedRota && !booked && (
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: c.textFaint }} />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por rota ou instrutor..."
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl focus:outline-none"
            style={{ fontSize: 15, backgroundColor: c.bgCard, color: c.text, border: `1px solid ${c.border}` }}
          />
        </div>
      )}

      {/* ─── Results ─── */}
      <AnimatePresence mode="wait">
        {booked ? (
          <motion.div key="booked" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-2xl p-8 text-center" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
              <CheckCircle2 size={56} style={{ color: c.success, margin: "0 auto 16px" }} />
            </motion.div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Aula Agendada!</h2>
            <p style={{ fontSize: 14, color: c.textMuted, marginTop: 8 }}>
              Sua aula com {selectedRota?.instrutor} na {selectedRota?.rota} foi confirmada às {selectedHorario}.
            </p>
          </motion.div>
        ) : selectedRota ? (
          /* ─── Route detail + booking ─── */
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <motion.button onClick={() => { setSelectedRota(null); setSelectedHorario(null); }} className="flex items-center gap-1 cursor-pointer" style={{ fontSize: 13, color: c.textMuted }} whileTap={{ scale: 0.95 }}>
              <ChevronLeft size={16} /> Voltar
            </motion.button>

            <motion.div className="rounded-2xl p-4" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
              {/* Instructor */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 15, fontWeight: 700 }}>
                  {selectedRota.instrutorAvatar}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 16, fontWeight: 600, color: c.text }}>{selectedRota.instrutor}</p>
                  <span className="flex items-center gap-1" style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600 }}>
                    <Star size={14} fill="#f59e0b" />{selectedRota.avaliacao}
                  </span>
                </div>
                <div className="text-right">
                  <p style={{ fontSize: 22, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif" }}>
                    R$ {selectedRota.valor.toFixed(0)}
                  </p>
                  <p style={{ fontSize: 11, color: c.textMuted }}>por aula</p>
                </div>
              </div>

              {/* Route info */}
              <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: c.textGhost }}>
                <h3 className="flex items-center gap-1.5 mb-1" style={{ fontSize: 15, fontWeight: 600, color: c.text }}>
                  <MapPin size={15} style={{ color: c.accent }} /> {selectedRota.rota}
                </h3>
                <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.5 }}>{selectedRota.descricao}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2.5 rounded-xl text-center" style={{ backgroundColor: c.textGhost }}>
                  <Clock size={14} className="mx-auto mb-0.5" style={{ color: c.accent }} />
                  <p style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{selectedRota.duracao}</p>
                </div>
                <div className="p-2.5 rounded-xl text-center" style={{ backgroundColor: c.textGhost }}>
                  <Navigation size={14} className="mx-auto mb-0.5" style={{ color: c.accent }} />
                  <p style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{selectedRota.distancia}</p>
                </div>
                <div className="p-2.5 rounded-xl text-center" style={{ backgroundColor: c.textGhost }}>
                  <Car size={14} className="mx-auto mb-0.5" style={{ color: c.accent }} />
                  <p style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{selectedRota.veiculo}</p>
                </div>
              </div>

              {/* Route points */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedRota.pontos.map((p, i) => (
                  <span key={p} className="flex items-center gap-1 px-2 py-0.5 rounded-md" style={{ fontSize: 11, backgroundColor: c.textGhost, color: c.textMuted }}>
                    <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, fontSize: 8, fontWeight: 700, color: c.accent }}>{i + 1}</span>
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Select time */}
            <div>
              <h3 className="mb-2.5" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                Horários disponíveis
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {selectedRota.horarios.map(h => (
                  <motion.button
                    key={h.hora}
                    onClick={() => h.disponivel && setSelectedHorario(h.hora)}
                    className="rounded-xl py-3.5 text-center cursor-pointer"
                    style={{
                      backgroundColor: selectedHorario === h.hora ? c.accentSoft : c.bgCard,
                      border: `2px solid ${selectedHorario === h.hora ? c.accent : h.disponivel ? c.border : "rgba(0,0,0,0)"}`,
                      color: !h.disponivel ? c.textFaint : selectedHorario === h.hora ? c.accent : c.text,
                      opacity: h.disponivel ? 1 : 0.4,
                      pointerEvents: h.disponivel ? "auto" : "none",
                    }}
                    whileTap={h.disponivel ? { scale: 0.95 } : {}}
                  >
                    <Clock size={16} className="mx-auto mb-0.5" style={{ opacity: 0.6 }} />
                    <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{h.hora}</span>
                    {!h.disponivel && <p style={{ fontSize: 10, marginTop: 2 }}>Indisponível</p>}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Confirm */}
            {selectedHorario && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-4" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif", marginBottom: 10 }}>Resumo</h3>
                <div className="space-y-1.5 mb-4" style={{ fontSize: 13, color: c.textMuted }}>
                  <p>Instrutor: <strong style={{ color: c.text }}>{selectedRota.instrutor}</strong></p>
                  <p>Rota: <strong style={{ color: c.text }}>{selectedRota.rota}</strong></p>
                  <p>Horário: <strong style={{ color: c.text }}>{selectedHorario}</strong></p>
                  <p>Veículo: <strong style={{ color: c.text }}>{selectedRota.veiculo} • Cat. {selectedRota.categoria}</strong></p>
                  <div className="h-px my-2" style={{ backgroundColor: c.border }} />
                  <p className="flex items-center justify-between" style={{ fontSize: 15 }}>
                    <span>Valor:</span>
                    <strong style={{ color: c.accent, fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
                      R$ {selectedRota.valor.toFixed(2).replace(".", ",")}
                    </strong>
                  </p>
                </div>
                <motion.button onClick={handleBook} className="w-full py-3.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 15, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.98 }}>
                  Confirmar Agendamento
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* ─── Routes list ─── */
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <p style={{ fontSize: 13, color: c.textMuted }}>
              {results.length} rota{results.length !== 1 ? "s" : ""} disponíve{results.length !== 1 ? "is" : "l"}
            </p>

            {results.length === 0 ? (
              <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
                <Search size={40} style={{ color: c.textGhost, margin: "0 auto 12px" }} />
                <p style={{ fontSize: 15, fontWeight: 500, color: c.text }}>Nenhuma rota encontrada</p>
                <p style={{ fontSize: 13, color: c.textMuted, marginTop: 4 }}>Tente buscar por outro nome.</p>
              </div>
            ) : (
              results.map((r, i) => {
                const horariosDisp = r.horarios.filter(h => h.disponivel).length;
                return (
                  <motion.button
                    key={r.id}
                    onClick={() => setSelectedRota(r)}
                    className="w-full rounded-2xl overflow-hidden text-left cursor-pointer"
                    style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Instructor hero section */}
                    <div className="flex items-center gap-3.5 p-4 pb-3">
                      <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 16, fontWeight: 700, fontFamily: "'Sora', sans-serif", width: 52, height: 52 }}>
                        {r.instrutorAvatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: 17, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{r.instrutor}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-0.5" style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600 }}>
                            <Star size={13} fill="#f59e0b" />{r.avaliacao}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md" style={{ fontSize: 10, fontWeight: 600, backgroundColor: c.accentSoft, color: c.accent }}>Cat. {r.categoria}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p style={{ fontSize: 20, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif" }}>
                          R$ {r.valor.toFixed(0)}
                        </p>
                        <p style={{ fontSize: 10, color: c.textFaint }}>por aula</p>
                      </div>
                    </div>

                    {/* Route info */}
                    <div className="px-4 pb-3">
                      <div className="rounded-xl p-2.5" style={{ backgroundColor: "#e8eef5" }}>
                        <p className="flex items-center gap-1.5 mb-1" style={{ fontSize: 14, fontWeight: 600, color: c.text }}>
                          <MapPin size={13} style={{ color: c.accent }} /> {r.rota}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1" style={{ fontSize: 11, color: c.textFaint }}><Clock size={10} />{r.duracao}</span>
                          <span className="flex items-center gap-1" style={{ fontSize: 11, color: c.textFaint }}><Navigation size={10} />{r.distancia}</span>
                          <span className="flex items-center gap-1" style={{ fontSize: 11, color: c.textFaint }}><Car size={10} />{r.veiculo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: `1px solid ${c.border}` }}>
                      <span className="flex items-center gap-1" style={{ fontSize: 12, color: c.textMuted }}>
                        <MapPin size={11} /> {r.pontos.length} parada{r.pontos.length !== 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg flex-shrink-0" style={{ fontSize: 11, fontWeight: 500, backgroundColor: c.accentSoft, color: c.accent }}>
                        <Clock size={10} />{horariosDisp} horário{horariosDisp !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}