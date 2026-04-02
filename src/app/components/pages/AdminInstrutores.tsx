import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { DataTable } from "../DataTable";
import { Plus, X, Star, CheckCircle2, Clock, Calendar, DollarSign, Car, UserCheck, BookOpen, GraduationCap } from "lucide-react";

const mockInstrutores = [
  { id: "1", nome: "Roberto Silva", email: "roberto@email.com", telefone: "(11) 99999-1001", categoria: "B", veiculo: "Onix 2024", avaliacao: 4.8, aulas: 156, status: "ativo", foto: "https://i.pravatar.cc/150?u=1", biografia: "Especialista em direção defensiva e alunos com medo de dirigir.",
    historicoAulas: [
        { id: "a1", aluno: "Ana Costa", data: "17/03/2026", hora: "10:00", status: "concluída", valor: 120 }
    ],
    financeiro: [
        { id: "f1", descricao: "Repasse Semanal", data: "18/03/2026", valor: 450, tipo: "entrada" }
    ]
  },
  { id: "2", nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 99999-1002", categoria: "A/B", veiculo: "HB20 2023", avaliacao: 4.9, aulas: 203, status: "ativo", foto: "https://i.pravatar.cc/150?u=2", biografia: "Instrutora premiada com foco em percursos no centro e baliza perfeita.", historicoAulas: [], financeiro: [] },
  { id: "3", nome: "Carlos Dias", email: "carlos@email.com", telefone: "(11) 99999-1003", categoria: "A", veiculo: "Honda CG 160", avaliacao: 4.5, aulas: 89, status: "inativo", foto: "https://i.pravatar.cc/150?u=3", biografia: "Focado em aulas de moto para o dia a dia.", historicoAulas: [], financeiro: [] },
  { id: "4", nome: "Fernanda Alves", email: "fernanda@email.com", telefone: "(11) 99999-1004", categoria: "B", veiculo: "Mobi 2023", avaliacao: 4.7, aulas: 134, status: "ativo", foto: "https://i.pravatar.cc/150?u=4", biografia: "Especializada em rotas tranquilas.", historicoAulas: [], financeiro: [] },
  { id: "5", nome: "Paulo Rocha", email: "paulo@email.com", telefone: "(11) 99999-1005", categoria: "A/B", veiculo: "Argo 2024", avaliacao: 4.6, aulas: 112, status: "ativo", foto: "https://i.pravatar.cc/150?u=5", biografia: "Aulas dinâmicas e focadas na aprovação rápida.", historicoAulas: [], financeiro: [] },
];

export function AdminInstrutores() {
  const c = useColors();
  const [showModal, setShowModal] = useState(false);
  const [selectedInstrutor, setSelectedInstrutor] = useState<any>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Instrutores</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Gerencie os instrutores cadastrados</p>
      </div>

      <DataTable
        title="Lista de Instrutores"
        searchKey="nome"
        data={mockInstrutores}
        action={
          <motion.button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white cursor-pointer"
            style={{ fontSize: 13, fontWeight: 600, backgroundColor: c.accent }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} /> <span className="hidden sm:inline">Novo</span>
          </motion.button>
        }
        renderMobileItem={(item) => {
          const active = item.status === "ativo";
          return (
            <div className="flex flex-col gap-3">
              {/* Top Row: Avatar + Name/Email (Left) and Categoria (Right) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {item.foto ? (
                    <img src={item.foto} alt={item.nome} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 13, fontWeight: 700 }}>
                      {item.nome.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <p style={{ fontWeight: 500, color: c.text, fontSize: 15 }}>{item.nome}</p>
                    <p style={{ fontSize: 12.5, color: c.textMuted }}>{item.email}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md" style={{ fontSize: 12, fontWeight: 600, backgroundColor: c.accentSoft, color: c.accent }}>
                  {item.categoria}
                </span>
              </div>
              
              {/* Bottom Row: Nota (Left) and Status (Right) */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5" style={{ fontSize: 14, fontWeight: 500, color: c.text }}>
                  <Star size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  {item.avaliacao}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{
                  backgroundColor: active ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  color: active ? "#22c55e" : "#ef4444", fontSize: 12, fontWeight: 500
                }}>
                  {active ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {item.status}
                </span>
              </div>
              <motion.button onClick={() => setSelectedInstrutor(item)} className="w-full mt-2 py-2 rounded-xl text-center cursor-pointer font-semibold text-sm" style={{ backgroundColor: c.textGhost, color: c.text }} whileTap={{ scale: 0.98 }}>
                Ver Tudo do Instrutor
              </motion.button>
            </div>
          );
        }}
        columns={[
          {
            key: "nome", label: "Nome", render: (item) => (
              <div className="flex items-center gap-2.5">
                {item.foto ? (
                  <img src={item.foto} alt={item.nome} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 11, fontWeight: 700 }}>
                    {item.nome.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <p style={{ fontWeight: 500, color: c.text, fontSize: 14 }}>{item.nome}</p>
                  <p style={{ fontSize: 11.5, color: c.textMuted }}>{item.email}</p>
                </div>
              </div>
            )
          },
          { key: "categoria", label: "Cat.", render: (item) => <span className="px-2 py-0.5 rounded-md" style={{ fontSize: 11, fontWeight: 600, backgroundColor: c.accentSoft, color: c.accent }}>{item.categoria}</span> },
          { key: "veiculo", label: "Veículo", hideOnMobile: true },
          { key: "avaliacao", label: "Nota", render: (item) => <span className="flex items-center gap-1" style={{ fontSize: 13 }}><Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />{item.avaliacao}</span> },
          { key: "aulas", label: "Aulas", hideOnMobile: true, render: (item) => <span style={{ fontWeight: 600 }}>{item.aulas}</span> },
          {
            key: "status", label: "Status", render: (item) => {
              const active = item.status === "ativo";
              return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{
                  backgroundColor: active ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  color: active ? "#22c55e" : "#ef4444", fontSize: 11, fontWeight: 500
                }}>
                  {active ? <CheckCircle2 size={11} /> : <Clock size={11} />}{item.status}
                </span>
              );
            }
          },
          {
             key: "actions", label: "Ações", render: (item) => (
                <button onClick={() => setSelectedInstrutor(item)} className="px-3 py-1.5 rounded-lg font-semibold text-xs cursor-pointer hover:opacity-80" style={{ backgroundColor: c.textGhost, color: c.text }}>
                    Visualizar
                </button>
             )
          }
        ]}
      />

      {/* Modal - slides up on mobile */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 lg:w-full lg:max-w-md rounded-t-3xl lg:rounded-2xl"
              style={{ backgroundColor: c.bgCard, paddingBottom: "env(safe-area-inset-bottom, 20px)", maxHeight: "85vh", overflowY: "auto" }}
            >
              {/* Drag handle on mobile */}
              <div className="lg:hidden flex justify-center py-3">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: c.textGhost }} />
              </div>
              <div className="px-5 pb-5 lg:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Perfil do Instrutor</h2>
                  <motion.button onClick={() => setShowModal(false)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-3">
                    <img src="https://i.pravatar.cc/150?u=new" alt="Novo" className="w-24 h-24 rounded-full object-cover border-4" style={{ borderColor: c.bgCard }} />
                    <motion.button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer" style={{ backgroundColor: c.accent }} whileTap={{ scale: 0.9 }}>
                      <Plus size={16} />
                    </motion.button>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Adicionar Foto</h3>
                  <p style={{ fontSize: 13, color: c.textMuted }}>Sua biografia visual começa aqui</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Biografia (Sobre o instrutor)</label>
                    <textarea placeholder="Ex: Sou apaixonado por ensinar..." rows={3} className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none" style={{ fontSize: 14, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }} />
                  </div>
                  {[{ label: "Nome completo", placeholder: "Ex: João da Silva" }, { label: "E-mail", placeholder: "email@exemplo.com", type: "email" }, { label: "WhatsApp", placeholder: "(11) 99999-9999", type: "tel" }, { label: "Categoria (CNH)", placeholder: "Ex: A/B" }].map((field) => (
                    <div key={field.label}>
                      <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>{field.label}</label>
                      <input type={field.type || "text"} placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={{ fontSize: 14, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }} />
                    </div>
                  ))}
                  <motion.button type="submit" className="w-full py-3.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 15, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.98 }}>
                    Salvar Perfil
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedInstrutor && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50" onClick={() => setSelectedInstrutor(null)} />
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
              <div className="px-5 pb-4 pt-2 lg:p-6 flex items-center justify-between flex-shrink-0 border-b" style={{ borderColor: c.border }}>
                 <div className="flex items-center gap-3">
                    <img src={selectedInstrutor.foto} alt={selectedInstrutor.nome} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedInstrutor.nome}</h2>
                        <span className="flex items-center gap-1 mt-0.5" style={{ fontSize: 13, color: c.textMuted }}>
                            <Star size={13} style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {selectedInstrutor.avaliacao} • {selectedInstrutor.email}
                        </span>
                    </div>
                 </div>
                 <motion.button onClick={() => setSelectedInstrutor(null)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
              </div>

              <div className="p-5 overflow-y-auto space-y-6">
                 {/* Basic Stats */}
                 <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Categoria</p>
                       <p style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedInstrutor.categoria}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>T. Aulas</p>
                       <p style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedInstrutor.aulas}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Veículo Principal</p>
                       <p style={{ fontSize: 14, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedInstrutor.veiculo}</p>
                    </div>
                 </div>

                 {/* Histórico Classes */}
                 <div>
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                        <BookOpen size={18} style={{ color: c.accent }} /> Últimas Aulas
                    </h3>
                    {selectedInstrutor.historicoAulas && selectedInstrutor.historicoAulas.length > 0 ? (
                        <div className="space-y-2">
                            {selectedInstrutor.historicoAulas.map((aula: any) => (
                                <div key={aula.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                                            <GraduationCap size={16} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{aula.aluno}</p>
                                            <p style={{ fontSize: 12, color: c.textMuted }}>{aula.data} às {aula.hora}</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                                        {aula.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 12 }}>Nenhuma aula resgistrada recente.</p>
                    )}
                 </div>

                 {/* Histórico Financeiro */}
                 <div>
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                        <DollarSign size={18} style={{ color: c.accent }} /> Financeiro / Repasses
                    </h3>
                    {selectedInstrutor.financeiro && selectedInstrutor.financeiro.length > 0 ? (
                        <div className="space-y-2">
                            {selectedInstrutor.financeiro.map((fin: any) => (
                                <div key={fin.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                                    <div className="flex flex-col">
                                        <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{fin.descricao}</p>
                                        <p style={{ fontSize: 12, color: c.textMuted }}>{fin.data}</p>
                                    </div>
                                    <div className="text-right">
                                        <p style={{ fontSize: 15, fontWeight: 700, color: fin.tipo === 'entrada' ? '#22c55e' : c.danger }}>
                                            {fin.tipo === 'entrada' ? '+' : '-'} R${fin.valor}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 12 }}>Nenhuma transação financeira encontrada.</p>
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
