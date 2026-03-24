import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import { DataTable } from "../DataTable";
import { Plus, X, Star, CheckCircle2, Clock } from "lucide-react";

const mockInstrutores = [
  { id: "1", nome: "Roberto Silva", email: "roberto@email.com", telefone: "(11) 99999-1001", categoria: "B", veiculo: "Onix 2024", avaliacao: 4.8, aulas: 156, status: "ativo" },
  { id: "2", nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 99999-1002", categoria: "A/B", veiculo: "HB20 2023", avaliacao: 4.9, aulas: 203, status: "ativo" },
  { id: "3", nome: "Carlos Dias", email: "carlos@email.com", telefone: "(11) 99999-1003", categoria: "B", veiculo: "Kwid 2024", avaliacao: 4.5, aulas: 89, status: "inativo" },
  { id: "4", nome: "Fernanda Alves", email: "fernanda@email.com", telefone: "(11) 99999-1004", categoria: "B", veiculo: "Mobi 2023", avaliacao: 4.7, aulas: 134, status: "ativo" },
  { id: "5", nome: "Paulo Rocha", email: "paulo@email.com", telefone: "(11) 99999-1005", categoria: "A/B", veiculo: "Argo 2024", avaliacao: 4.6, aulas: 112, status: "ativo" },
];

export function AdminInstrutores() {
  const c = useColors();
  const [showModal, setShowModal] = useState(false);

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
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Novo Instrutor</h2>
                  <motion.button onClick={() => setShowModal(false)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                  {[{ label: "Nome completo", placeholder: "Ex: João da Silva" }, { label: "E-mail", placeholder: "email@exemplo.com", type: "email" }, { label: "WhatsApp", placeholder: "(11) 99999-9999", type: "tel" }, { label: "Categoria (CNH)", placeholder: "Ex: A/B" }].map((field) => (
                    <div key={field.label}>
                      <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>{field.label}</label>
                      <input type={field.type || "text"} placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` }} />
                    </div>
                  ))}
                  <motion.button type="submit" className="w-full py-3.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 15, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.98 }}>
                    Cadastrar Instrutor
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
