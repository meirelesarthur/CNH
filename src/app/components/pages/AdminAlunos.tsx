import { useColors } from "../ThemeContext";
import { DataTable } from "../DataTable";
import { CheckCircle2, Clock } from "lucide-react";

const mockAlunos = [
  { id: "1", nome: "Ana Costa", email: "ana@email.com", categoria: "B", aulas: 12, progresso: "80%", progNum: 80, status: "ativo" },
  { id: "2", nome: "João Mendes", email: "joao@email.com", categoria: "A", aulas: 5, progresso: "33%", progNum: 33, status: "ativo" },
  { id: "3", nome: "Carla Souza", email: "carla@email.com", categoria: "B", aulas: 15, progresso: "100%", progNum: 100, status: "concluído" },
  { id: "4", nome: "Pedro Lima", email: "pedro@email.com", categoria: "B", aulas: 8, progresso: "53%", progNum: 53, status: "ativo" },
  { id: "5", nome: "Lucas Ramos", email: "lucas@email.com", categoria: "A/B", aulas: 3, progresso: "20%", progNum: 20, status: "ativo" },
];

export function AdminAlunos() {
  const c = useColors();

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
        ]}
      />
    </div>
  );
}
