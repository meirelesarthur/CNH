import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { DataTable } from "../DataTable";
import { CheckCircle2, Clock, X, Calendar, Car, UserCheck, DollarSign } from "lucide-react";

const mockAlunos = [
  { id: "1", nome: "Ana Costa", email: "ana@email.com", categoria: "B", aulas: 12, progresso: "80%", progNum: 80, status: "ativo",
    historicoAulas: [
        { id: "a1", data: "17/03/2026", hora: "10:00", instrutor: "Roberto Silva", status: "concluída" },
        { id: "a2", data: "15/03/2026", hora: "14:00", instrutor: "Roberto Silva", status: "concluída" },
    ],
    historicoLocacoes: [
        { id: "l1", veiculo: "Chevrolet Onix 1.0 (Frota)", data: "17/03/2026", hora: "08:00", valor: 150 }
    ]
  },
  { id: "2", nome: "João Mendes", email: "joao@email.com", categoria: "A", aulas: 5, progresso: "33%", progNum: 33, status: "ativo", historicoAulas: [], historicoLocacoes: [] },
  { id: "3", nome: "Carla Souza", email: "carla@email.com", categoria: "B", aulas: 15, progresso: "100%", progNum: 100, status: "concluído", historicoAulas: [], historicoLocacoes: [] },
  { id: "4", nome: "Pedro Lima", email: "pedro@email.com", categoria: "B", aulas: 8, progresso: "53%", progNum: 53, status: "ativo", historicoAulas: [], historicoLocacoes: [] },
  { id: "5", nome: "Lucas Ramos", email: "lucas@email.com", categoria: "A/B", aulas: 3, progresso: "20%", progNum: 20, status: "ativo", historicoAulas: [], historicoLocacoes: [] },
];

export function AdminAlunos() {
  const c = useColors();
  const [selectedAluno, setSelectedAluno] = useState<any>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Alunos</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Gerencie os condutores cadastrados</p>
      </div>

      <DataTable
        title="Lista de Alunos"
        searchKey="nome"
        data={mockAlunos}
        renderMobileItem={(item) => {
          const done = item.status === "concluído";
          return (
            <div className="flex flex-col gap-3">
              {/* Top Row: Avatar + Name/Email (Left) and Categoria (Right) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 13, fontWeight: 700 }}>
                    {item.nome.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, color: c.text, fontSize: 15 }}>{item.nome}</p>
                    <p style={{ fontSize: 12.5, color: c.textMuted }}>{item.email}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md" style={{ fontSize: 12, fontWeight: 600, backgroundColor: c.accentSoft, color: c.accent }}>
                  {item.categoria}
                </span>
              </div>
              
              {/* Bottom Row: Progresso (Left) and Status (Right) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-24">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: c.textGhost }}>
                    <div className="h-full rounded-full" style={{ width: item.progresso, backgroundColor: c.accent }} />
                  </div>
                  <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 500 }}>{item.progresso}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{
                  backgroundColor: done ? "rgba(34,197,94,0.12)" : "rgba(6,182,212,0.12)",
                  color: done ? "#22c55e" : "#06b6d4", fontSize: 12, fontWeight: 500
                }}>
                  {done ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {item.status}
                </span>
              </div>
              <motion.button onClick={() => setSelectedAluno(item)} className="w-full mt-2 py-2 rounded-xl text-center cursor-pointer font-semibold text-sm" style={{ backgroundColor: c.textGhost, color: c.text }} whileTap={{ scale: 0.98 }}>
                Ver Detalhes
              </motion.button>
            </div>
          );
        }}
        columns={[
          {
            key: "nome", label: "Nome", render: (item) => (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 11, fontWeight: 700 }}>
                  {item.nome.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: c.text, fontSize: 14 }}>{item.nome}</p>
                  <p style={{ fontSize: 11.5, color: c.textMuted }}>{item.email}</p>
                </div>
              </div>
            )
          },
          { key: "categoria", label: "Cat.", render: (item) => <span className="px-2 py-0.5 rounded-md" style={{ fontSize: 11, fontWeight: 600, backgroundColor: c.accentSoft, color: c.accent }}>{item.categoria}</span> },
          { key: "aulas", label: "Aulas", hideOnMobile: true, render: (item) => <span style={{ fontWeight: 600, fontSize: 13 }}>{item.aulas}</span> },
          {
            key: "progresso", label: "Progresso", render: (item) => (
              <div className="flex items-center gap-2 min-w-20">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: c.textGhost }}>
                  <div className="h-full rounded-full" style={{ width: item.progresso, backgroundColor: c.accent }} />
                </div>
                <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 500 }}>{item.progresso}</span>
              </div>
            )
          },
          {
            key: "status", label: "Status", render: (item) => {
              const done = item.status === "concluído";
              return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{
                  backgroundColor: done ? "rgba(34,197,94,0.12)" : "rgba(6,182,212,0.12)",
                  color: done ? "#22c55e" : "#06b6d4", fontSize: 11, fontWeight: 500
                }}>
                  {done ? <CheckCircle2 size={11} /> : <Clock size={11} />}{item.status}
                </span>
              );
            }
          },
          {
             key: "actions", label: "Ações", render: (item) => (
                <button onClick={() => setSelectedAluno(item)} className="px-3 py-1.5 rounded-lg font-semibold text-xs cursor-pointer hover:opacity-80" style={{ backgroundColor: c.textGhost, color: c.text }}>
                    Detalhes
                </button>
             )
          }
        ]}
      />

      <AnimatePresence>
        {selectedAluno && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50" onClick={() => setSelectedAluno(null)} />
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
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 16, fontWeight: 700 }}>
                        {selectedAluno.nome.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedAluno.nome}</h2>
                        <p style={{ fontSize: 13, color: c.textMuted }}>{selectedAluno.email}</p>
                    </div>
                 </div>
                 <motion.button onClick={() => setSelectedAluno(null)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
              </div>

              <div className="p-5 overflow-y-auto space-y-6">
                 {/* Basic Stats */}
                 <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Categoria</p>
                       <p style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedAluno.categoria}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                       <p style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Aulas</p>
                       <p style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedAluno.aulas}</p>
                    </div>
                    <div className="p-3 rounded-xl flex flex-col justify-center gap-1" style={{ backgroundColor: c.textGhost }}>
                        <div className="flex items-center justify-between">
                            <span style={{ fontSize: 11, color: c.textFaint, textTransform: "uppercase", fontWeight: 600 }}>Progresso</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{selectedAluno.progresso}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden w-full" style={{ backgroundColor: c.border }}>
                            <div className="h-full rounded-full" style={{ width: selectedAluno.progresso, backgroundColor: c.accent }} />
                        </div>
                    </div>
                 </div>

                 {/* History of Classes */}
                 <div>
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                        <Calendar size={18} style={{ color: c.accent }} /> Histórico de Aulas
                    </h3>
                    {selectedAluno.historicoAulas && selectedAluno.historicoAulas.length > 0 ? (
                        <div className="space-y-2">
                            {selectedAluno.historicoAulas.map((aula: any) => (
                                <div key={aula.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                                            <UserCheck size={16} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{aula.instrutor}</p>
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
                        <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 12 }}>Nenhuma aula registrada ainda.</p>
                    )}
                 </div>

                 {/* History of Rentals */}
                 <div>
                    <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                        <Car size={18} style={{ color: c.accent }} /> Histórico de Locações
                    </h3>
                    {selectedAluno.historicoLocacoes && selectedAluno.historicoLocacoes.length > 0 ? (
                        <div className="space-y-2">
                            {selectedAluno.historicoLocacoes.map((locacao: any) => (
                                <div key={locacao.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600">
                                            <Car size={16} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{locacao.veiculo}</p>
                                            <p style={{ fontSize: 12, color: c.textMuted }}>{locacao.data} às {locacao.hora}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p style={{ fontSize: 14, fontWeight: 700, color: c.accent }}>R${locacao.valor}</p>
                                        <p style={{ fontSize: 11, color: c.textMuted }}>Locação Exam.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 12 }}>Nenhuma locação registrada.</p>
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
