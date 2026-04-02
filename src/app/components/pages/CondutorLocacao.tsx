import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { Car, Clock, Calendar, CheckCircle2, AlertCircle, ChevronRight, X } from "lucide-react";

interface VeiculoLocacao {
  id: string;
  modelo: string;
  tipo: "Veículo" | "Moto";
  ano: string;
  cor: string;
  placa: string;
  foto: string;
  valorHora: number;
  disponivel: boolean;
}

const mockVeiculosFrota: VeiculoLocacao[] = [
  { id: "101", modelo: "Chevrolet Onix 1.0 (Frota)", tipo: "Veículo", ano: "2024", cor: "Prata", placa: "ABC-5X12", foto: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400", valorHora: 150, disponivel: true },
  { id: "102", modelo: "Hyundai HB20 1.0 (Frota)", tipo: "Veículo", ano: "2023", cor: "Branco", placa: "DEF-2Y98", foto: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400", valorHora: 165, disponivel: true },
  { id: "103", modelo: "Honda CG 160 (Frota)", tipo: "Moto", ano: "2024", cor: "Vermelho", placa: "MTO-3Z45", foto: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400", valorHora: 110, disponivel: true },
  { id: "104", modelo: "Volkswagen Polo (Frota)", tipo: "Veículo", ano: "2024", cor: "Cinza", placa: "POL-0A87", foto: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=400", valorHora: 170, disponivel: false },
];

export function CondutorLocacao() {
  const c = useColors();
  const [selectedVeiculo, setSelectedVeiculo] = useState<VeiculoLocacao | null>(null);
  const [selectedHora, setSelectedHora] = useState<string>("");
  const [selectedData, setSelectedData] = useState<string>("");
  const [booked, setBooked] = useState(false);

  const resetLocacao = () => {
    setSelectedVeiculo(null);
    setSelectedHora("");
    setSelectedData("");
    setBooked(false);
  };

  const handleBook = () => {
    if (!selectedVeiculo || !selectedData || !selectedHora) return;
    setBooked(true);
    setTimeout(() => {
        resetLocacao();
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Locação para Exame</h1>
          <p style={{ fontSize: 13, color: c.textMuted, marginTop: 1 }}>Reserve um veículo oficial da autoescola para seu exame prático</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {booked ? (
          <motion.div key="sucesso" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-2xl p-10 text-center" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(34,197,94,0.1)" }}>
              <CheckCircle2 size={48} style={{ color: "#22c55e" }} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Locação Confirmada!</h2>
            <p style={{ fontSize: 15, color: c.textMuted, marginTop: 12, maxWidth: 360, marginInline: "auto" }}>
              Sua locação do <strong>{selectedVeiculo?.modelo}</strong> foi agendada para <strong>{selectedData} às {selectedHora}</strong>.
            </p>
            <p style={{ fontSize: 13, color: c.accent, fontWeight: 600, marginTop: 24 }}>Redirecionando...</p>
          </motion.div>
        ) : selectedVeiculo ? (
            <motion.div key="detalhes" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
                <div className="space-y-4">
                  <motion.button onClick={() => setSelectedVeiculo(null)} className="flex items-center gap-1.5 cursor-pointer text-sm font-medium" style={{ color: c.textMuted }} whileTap={{ scale: 0.95 }}>
                    <X size={16} /> Cancelar Seleção
                  </motion.button>
                  
                  <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
                    <img src={selectedVeiculo.foto} alt={selectedVeiculo.modelo} className="w-full h-48 object-cover" />
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedVeiculo.modelo}</h2>
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: c.accentSoft, color: c.accent }}>{selectedVeiculo.tipo}</span>
                        </div>
                        <p style={{ fontSize: 13, color: c.textMuted }}>{selectedVeiculo.ano} • {selectedVeiculo.cor} • Placa: {selectedVeiculo.placa}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                          <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Valor da Hora</p>
                          <p style={{ fontSize: 18, fontWeight: 800, color: c.accent, fontFamily: "'Sora', sans-serif" }}>R${selectedVeiculo.valorHora}</p>
                        </div>
                        <div className="p-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(34,197,94,0.05)" }}>
                          <div className="text-center">
                            <span className="block" style={{ fontSize: 10, color: "#22c55e", fontWeight: 700 }}>TAXA ÚNICA</span>
                            <span style={{ fontSize: 11, color: c.textMuted }}>S/ Taxa Admin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-1">
                   <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Configurar Locação</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 8, display: "block" }}><Calendar size={13} className="inline mr-1" /> Data do Exame</label>
                          <input type="date" value={selectedData} onChange={(e) => setSelectedData(e.target.value)} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }} />
                        </div>

                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 8, display: "block" }}><Clock size={13} className="inline mr-1" /> Horário (Apenas 1 hora p/ o exame)</label>
                          <select value={selectedHora} onChange={(e) => setSelectedHora(e.target.value)} className="w-full px-4 py-3 rounded-xl focus:outline-none appearance-none" style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }}>
                            <option value="">Selecione um horário</option>
                            {["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(h => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 space-y-3">
                         <div className="flex items-center justify-between text-sm">
                            <span style={{ color: c.textMuted }}>Total Locação</span>
                            <span style={{ fontWeight: 700, color: c.text }}>R${selectedVeiculo.valorHora},00</span>
                         </div>
                         <motion.button
                            onClick={handleBook}
                            disabled={!selectedData || !selectedHora}
                            className="w-full py-4 rounded-xl text-white cursor-pointer font-bold shadow-lg"
                            style={{ 
                                backgroundColor: (!selectedData || !selectedHora) ? c.textFaint : c.accent,
                                opacity: (!selectedData || !selectedHora) ? 0.6 : 1
                            }}
                            whileTap={{ scale: 0.98 }}
                         >
                            Confirmar Locação
                         </motion.button>
                         <p style={{ fontSize: 11, color: c.textFaint, textAlign: "center" }}>* O veículo estará no Detran aguardando por você no horário agendado.</p>
                      </div>
                   </div>
                </div>
            </motion.div>
        ) : (
          <motion.div key="lista" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {mockVeiculosFrota.map((v) => (
              <motion.div
                key={v.id}
                className="rounded-2xl overflow-hidden cursor-pointer relative group flex flex-col"
                style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}`, opacity: v.disponivel ? 1 : 0.6 }}
                onClick={() => v.disponivel && setSelectedVeiculo(v)}
                whileHover={v.disponivel ? { y: -5, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15)" } : {}}
                whileTap={v.disponivel ? { scale: 0.98 } : {}}
              >
                {!v.disponivel && (
                     <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded bg-red-100 text-red-600 text-[10px] font-bold flex items-center gap-1">
                        <AlertCircle size={10} /> INDISPONÍVEL
                     </div>
                )}
                <div className="relative h-44 overflow-hidden">
                   <img src={v.foto} alt={v.modelo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white text-lg font-bold leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{v.modelo}</p>
                      <p className="text-white/80 text-xs font-medium">Autoescola Siga Bem</p>
                   </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p style={{ fontSize: 12, color: c.textMuted }}>{v.ano} • {v.cor}</p>
                        <p style={{ fontSize: 11, fontWeight: 700, color: c.textFaint }}>{v.placa}</p>
                      </div>
                      <div className="text-right">
                         <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase" }}>Diária (1h)</p>
                         <p style={{ fontSize: 18, fontWeight: 800, color: c.accent, fontFamily: "'Sora', sans-serif" }}>R${v.valorHora}</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-center p-2 rounded-xl" style={{ backgroundColor: v.disponivel ? c.accentSoft : c.textGhost }}>
                      <span className="flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 600, color: v.disponivel ? c.accent : c.textMuted }}>
                         {v.disponivel ? "Selecionar Veículo" : "Ocupado"} 
                         {v.disponivel && <ChevronRight size={14} />}
                      </span>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
