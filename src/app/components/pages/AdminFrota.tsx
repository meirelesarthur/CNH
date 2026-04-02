import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { Plus, Search, Trash2, Edit2, Car, Settings, CheckCircle2 } from "lucide-react";
import { DataTable } from "../DataTable";

export function AdminFrota() {
  const c = useColors();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const mockFrota = [
    { id: "101", modelo: "Chevrolet Onix 1.0", tipo: "Veículo", ano: "2024", cor: "Prata", placa: "ABC-5X12", valorHora: 150 },
    { id: "102", modelo: "Hyundai HB20 1.0", tipo: "Veículo", ano: "2023", cor: "Branco", placa: "DEF-2Y98", valorHora: 165 },
    { id: "103", modelo: "Honda CG 160", tipo: "Moto", ano: "2024", cor: "Vermelho", placa: "MTO-3Z45", valorHora: 110 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Frota Exclusiva</h1>
          <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Veículos da Autoescola disponíveis para locação de exames</p>
        </div>
        <motion.button
          onClick={() => setShowAdd(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white cursor-pointer font-semibold shadow-md"
          style={{ backgroundColor: c.accent }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} /> Novo Veículo
        </motion.button>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}>
        <Search size={18} style={{ color: c.textFaint }} />
        <input 
          placeholder="Buscar veículo..." 
          className="flex-1 bg-transparent focus:outline-none" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ fontSize: 14, color: c.text }} 
        />
      </div>

      <DataTable 
        data={mockFrota}
        searchKey="modelo"
        columns={[
          { key: "icon", label: "", render: () => <Car size={20} style={{ color: c.accent }} /> },
          { key: "modelo", label: "Modelo", render: (v) => (
              <div>
                <p style={{ fontWeight: 600, color: c.text, fontSize: 14 }}>{v.modelo}</p>
                <p style={{ fontSize: 11, color: c.textFaint }}>{v.tipo}</p>
              </div>
          )},
          { key: "placa", label: "Identificação", render: (v) => (
             <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{v.placa}</p>
                <p style={{ fontSize: 11, color: c.textMuted }}>{v.cor} • {v.ano}</p>
             </div>
          )},
          { key: "valorHora", label: "Locação/Hora", render: (v) => <span style={{ fontWeight: 700, color: c.accent }}>R${v.valorHora}</span> },
          { key: "status", label: "Status", render: () => (
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: 11, fontWeight: 600 }}>
                <CheckCircle2 size={12} /> Ativo
             </span>
          )},
          { key: "actions", label: "Ações", render: () => (
             <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-black/5 cursor-pointer" style={{ color: c.textFaint }}><Edit2 size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-red-50 cursor-pointer" style={{ color: c.danger }}><Trash2 size={16} /></button>
             </div>
          )}
        ]}
      />

      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setShowAdd(false)} />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.9 }} 
               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-2xl p-6"
               style={{ backgroundColor: c.bgCard }}
            >
               <div className="flex items-center justify-between mb-6">
                 <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Cadastrar na Frota</h2>
                 <button onClick={() => setShowAdd(false)} style={{ color: c.textFaint }}><Plus size={24} className="rotate-45" /></button>
               </div>
               
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                        <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Modelo</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border focus:outline-none" style={{ backgroundColor: c.textGhost, borderColor: c.border }} placeholder="Onix, Polo..." />
                     </div>
                     <div>
                        <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Placa</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border focus:outline-none" style={{ backgroundColor: c.textGhost, borderColor: c.border }} placeholder="ABC-1234" />
                     </div>
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Tipo de Veículo</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border focus:outline-none appearance-none" style={{ backgroundColor: c.textGhost, borderColor: c.border }}>
                       <option>Veículo</option>
                       <option>Moto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Valor Hora (R$)</label>
                    <input type="number" className="w-full px-4 py-2.5 rounded-xl border focus:outline-none" style={{ backgroundColor: c.textGhost, borderColor: c.border }} placeholder="150" />
                  </div>
               </div>

               <div className="mt-8 flex gap-3">
                  <button className="flex-1 py-3 rounded-xl border font-bold" style={{ borderColor: c.border, color: c.textMuted }} onClick={() => setShowAdd(false)}>Cancelar</button>
                  <button className="flex-1 py-3 rounded-xl text-white font-bold" style={{ backgroundColor: c.accent }} onClick={() => setShowAdd(false)}>Salvar Veículo</button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
