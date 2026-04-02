import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { Plus, Search, Trash2, Edit2, Car, Settings, CheckCircle2, Upload, Camera, Image as ImageIcon, X, Calendar, UserCheck } from "lucide-react";
import { DataTable } from "../DataTable";

export function AdminFrota() {
  const c = useColors();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVeiculo, setSelectedVeiculo] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mockFrota = [
    { id: "101", modelo: "Chevrolet Onix 1.0 (Frota)", tipo: "Veículo", ano: "2024", cor: "Prata", placa: "ABC-5X12", foto: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400", valorHora: 150, disponivel: true,
      historicoLocacoes: [
          { id: "l1", condutor: "Ana Costa", data: "17/03/2026", hora: "08:00", valor: 150 },
          { id: "l2", condutor: "Carlos Eduardo", data: "15/03/2026", hora: "14:00", valor: 150 }
      ]
    },
    { id: "102", modelo: "Hyundai HB20 1.0 (Frota)", tipo: "Veículo", ano: "2023", cor: "Branco", placa: "DEF-2Y98", foto: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400", valorHora: 165, disponivel: true, historicoLocacoes: [] },
    { id: "103", modelo: "Honda CG 160 (Frota)", tipo: "Moto", ano: "2024", cor: "Vermelho", placa: "MTO-3Z45", foto: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400", valorHora: 110, disponivel: true, historicoLocacoes: [] },
    { id: "104", modelo: "Volkswagen Polo (Frota)", tipo: "Veículo", ano: "2024", cor: "Cinza", placa: "POL-0A87", foto: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=400", valorHora: 170, disponivel: false, historicoLocacoes: [] },
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
          { key: "status", label: "Status", render: (v) => (
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{ backgroundColor: v.disponivel ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: v.disponivel ? "#22c55e" : "#ef4444", fontSize: 11, fontWeight: 600 }}>
                <CheckCircle2 size={12} /> {v.disponivel ? "Disponível" : "Ocupado"}
             </span>
          )},
          { key: "actions", label: "Ações", render: (v) => (
             <div className="flex items-center gap-2">
                <button onClick={() => setSelectedVeiculo(v)} className="px-3 py-1.5 rounded-lg font-semibold text-xs cursor-pointer hover:opacity-80" style={{ backgroundColor: c.textGhost, color: c.text }}>
                    Detalhes
                </button>
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
                             <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  <div>
                    <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Foto do Veículo</label>
                    <div 
                      className="relative h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 overflow-hidden transition-colors"
                      style={{ 
                        backgroundColor: c.textGhost, 
                        borderColor: selectedImage ? c.accent : c.border 
                      }}
                    >
                      {selectedImage ? (
                        <>
                          <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                             <div className="flex flex-col items-center gap-1 text-white">
                                <Upload size={20} />
                                <span className="text-[10px] font-bold">TROCAR FOTO</span>
                             </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-center px-4">
                           <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: c.accentSoft, color: c.accent }}>
                              <Camera size={20} />
                           </div>
                           <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Clique para anexar imagem</p>
                              <p style={{ fontSize: 11, color: c.textFaint }}>PNG, JPG ou WEBP (Max. 5MB)</p>
                           </div>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>
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
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                        <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Ano</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border focus:outline-none" style={{ backgroundColor: c.textGhost, borderColor: c.border }} placeholder="2024" />
                     </div>
                     <div>
                        <label className="block mb-2" style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>Cor</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border focus:outline-none" style={{ backgroundColor: c.textGhost, borderColor: c.border }} placeholder="Branco, Prata..." />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
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
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                     <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Disponível para Locação</p>
                        <p style={{ fontSize: 11, color: c.textMuted }}>Exibir para alunos na lista</p>
                     </div>
                     <div className="w-12 h-6 rounded-full p-1 cursor-pointer transition-colors" style={{ backgroundColor: c.accent }}>
                        <div className="w-4 h-4 rounded-full bg-white ml-auto" />
                     </div>
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

      <AnimatePresence>
        {selectedVeiculo && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50" onClick={() => setSelectedVeiculo(null)} />
            <motion.div
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 lg:w-full lg:max-w-2xl rounded-t-3xl lg:rounded-2xl flex flex-col"
              style={{ backgroundColor: c.bgCard, paddingBottom: "env(safe-area-inset-bottom, 20px)", maxHeight: "90vh" }}
            >
              <div className="lg:hidden flex justify-center py-3 flex-shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: c.textGhost }} />
              </div>
              <div className="flex items-center gap-4 px-5 pb-4 pt-2 lg:p-6 flex-shrink-0 border-b" style={{ borderColor: c.border }}>
                 {selectedVeiculo.foto ? (
                    <img src={selectedVeiculo.foto} alt={selectedVeiculo.modelo} className="w-16 h-16 rounded-xl object-cover" />
                 ) : (
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.textGhost, color: c.textFaint }}>
                        <Car size={24} />
                    </div>
                 )}
                 <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedVeiculo.modelo}</h2>
                        <motion.button onClick={() => setSelectedVeiculo(null)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
                    </div>
                    <p style={{ fontSize: 13, color: c.textMuted }}>{selectedVeiculo.placa} • {selectedVeiculo.cor} • {selectedVeiculo.ano}</p>
                 </div>
              </div>

              <div className="p-5 overflow-y-auto space-y-6">
                 {/* Basic Stats */}
                 <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl col-span-2" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Status Atual</p>
                       <p style={{ fontSize: 16, fontWeight: 700, color: selectedVeiculo.disponivel ? "#22c55e" : "#ef4444", fontFamily: "'Sora', sans-serif" }}>
                          {selectedVeiculo.disponivel ? "Disponível para Exames" : "Indisponível / Ocupado"}
                       </p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Tipo</p>
                       <p style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedVeiculo.tipo}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Hora</p>
                       <p style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>R${selectedVeiculo.valorHora}</p>
                    </div>
                 </div>

                 {/* Histórico Rental */}
                 <div>
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                        <Calendar size={18} style={{ color: c.accent }} /> Histórico de Locações do Veículo
                    </h3>
                    {selectedVeiculo.historicoLocacoes && selectedVeiculo.historicoLocacoes.length > 0 ? (
                        <div className="space-y-2">
                            {selectedVeiculo.historicoLocacoes.map((locacao: any) => (
                                <div key={locacao.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600">
                                            <UserCheck size={16} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{locacao.condutor}</p>
                                            <p style={{ fontSize: 12, color: c.textMuted }}>{locacao.data} às {locacao.hora}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p style={{ fontSize: 14, fontWeight: 700, color: c.accent }}>R${locacao.valor}</p>
                                        <p style={{ fontSize: 11, color: c.textMuted }}>Receita</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 12 }}>Nenhuma locação registrada para este veículo.</p>
                    )}
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
