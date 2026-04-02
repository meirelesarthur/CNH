import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { Car, Plus, X, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";

const mockVeiculos = [
  { id: "1", modelo: "Chevrolet Onix 1.0", ano: "2024", placa: "ABC-1D23", cor: "Branco", vencimentoSeguro: "15/08/2026", status: "ativo", tipo: "Veículo" },
  { id: "2", modelo: "Hyundai HB20 1.0", ano: "2023", placa: "DEF-4G56", cor: "Prata", vencimentoSeguro: "20/04/2026", status: "manutenção", tipo: "Veículo" },
  { id: "3", modelo: "Honda CG 160", ano: "2024", placa: "MTO-9R12", cor: "Preto", vencimentoSeguro: "12/10/2026", status: "ativo", tipo: "Moto" },
];

export function InstrutorVeiculos() {
  const c = useColors();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Veículos</h1>
          <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Seus veículos cadastrados</p>
        </div>
        <motion.button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 13, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.95 }}>
          <Plus size={16} /> <span className="hidden sm:inline">Novo</span>
        </motion.button>
      </div>

      <div className="space-y-3">
        {mockVeiculos.map((v) => (
          <motion.div key={v.id} className="rounded-2xl p-4" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.99 }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.accentSoft }}>
                  <Car size={20} style={{ color: c.accent }} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{v.modelo}</p>
                  <p style={{ fontSize: 12, color: c.textMuted }}>{v.tipo} • {v.ano} • {v.cor}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{
                fontSize: 11, fontWeight: 500,
                backgroundColor: v.status === "ativo" ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)",
                color: v.status === "ativo" ? "#22c55e" : "#f59e0b",
              }}>
                {v.status === "ativo" ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}{v.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Placa</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{v.placa}</p>
              </div>
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Seguro até</p>
                <p className="flex items-center gap-1" style={{ fontSize: 14, fontWeight: 600, color: c.text }}><Calendar size={12} style={{ color: c.accent }} />{v.vencimentoSeguro}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 lg:w-full lg:max-w-md rounded-t-3xl lg:rounded-2xl"
              style={{ backgroundColor: c.bgCard, paddingBottom: "env(safe-area-inset-bottom, 20px)", maxHeight: "85vh", overflowY: "auto" }}
            >
              <div className="lg:hidden flex justify-center py-3">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: c.textGhost }} />
              </div>
              <div className="px-5 pb-5 lg:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Novo Veículo</h2>
                  <motion.button onClick={() => setShowModal(false)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Tipo</label>
                    <select className="w-full px-4 py-3 rounded-xl focus:outline-none" style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }}>
                      <option>Veículo</option>
                      <option>Moto</option>
                    </select>
                  </div>
                  {[{ label: "Modelo", placeholder: "Ex: Chevrolet Onix 1.0 ou Honda CG" }, { label: "Ano", placeholder: "2024" }, { label: "Placa", placeholder: "ABC-1D23" }, { label: "Cor", placeholder: "Branco" }].map((f) => (
                    <div key={f.label}>
                      <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>{f.label}</label>
                      <input placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }} />
                    </div>
                  ))}
                  <motion.button type="submit" className="w-full py-3.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 15, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.98 }}>Cadastrar Veículo</motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
