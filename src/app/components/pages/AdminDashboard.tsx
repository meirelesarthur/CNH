import { useColors } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import { StatCard } from "../StatCard";
import { DataTable } from "../DataTable";
import { Users, DollarSign, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "motion/react";

const revenueData = [
  { month: "Jan", value: 12400 }, { month: "Fev", value: 15800 }, { month: "Mar", value: 14200 },
  { month: "Abr", value: 18500 }, { month: "Mai", value: 21000 }, { month: "Jun", value: 19300 },
];

const recentActivity = [
  { id: "1", aluno: "Ana Costa", instrutor: "Roberto Silva", tipo: "Aula Prática", data: "17/03", status: "concluída", valor: "R$ 120" },
  { id: "2", aluno: "João Mendes", instrutor: "Maria Santos", tipo: "Exame Detran", data: "17/03", status: "agendada", valor: "R$ 180" },
  { id: "3", aluno: "Carla Souza", instrutor: "Roberto Silva", tipo: "Aula Prática", data: "16/03", status: "concluída", valor: "R$ 120" },
  { id: "4", aluno: "Pedro Lima", instrutor: "Carlos Dias", tipo: "Treinamento", data: "16/03", status: "cancelada", valor: "R$ 150" },
  { id: "5", aluno: "Lucas Ramos", instrutor: "Maria Santos", tipo: "Aula Prática", data: "15/03", status: "concluída", valor: "R$ 120" },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  concluída: { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
  agendada: { bg: "rgba(6,182,212,0.12)", color: "#06b6d4" },
  cancelada: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
};
const statusIcons: Record<string, React.ElementType> = {
  concluída: CheckCircle2, agendada: Clock, cancelada: AlertCircle,
};

export function AdminDashboard() {
  const c = useColors();
  const { user } = useAuth();

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div>
        <p style={{ fontSize: 13, color: c.textMuted }}>Olá, {user?.name?.split(" ")[0]} 👋</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif", marginTop: 2 }}>Dashboard</h1>
      </div>

      {/* Stats - 2 cols on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Receita Mensal" value="R$ 21k" change="+12%" positive icon={DollarSign} />
        <StatCard title="Instrutores" value="14" change="+2" positive icon={Users} />
        <StatCard title="Alunos" value="187" change="+23" positive icon={Users} />
        <StatCard title="Aulas/Mês" value="342" change="+8%" positive icon={Calendar} />
      </div>

      {/* Chart */}
      <motion.div
        className="rounded-2xl p-4 lg:p-5"
        style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif", marginBottom: 16 }}>Receita Mensal</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
            <XAxis dataKey="month" tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={30} />
            <Tooltip
              contentStyle={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: c.text }}
              itemStyle={{ color: c.accent }}
              formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"]}
            />
            <Bar dataKey="value" fill={c.accent} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Activity */}
      <DataTable
        title="Atividade Recente"
        searchKey="aluno"
        data={recentActivity}
        columns={[
          { key: "aluno", label: "Aluno" },
          { key: "instrutor", label: "Instrutor", hideOnMobile: true },
          { key: "tipo", label: "Tipo", hideOnMobile: true },
          { key: "data", label: "Data" },
          {
            key: "status", label: "Status", render: (item) => {
              const s = statusColors[item.status] || statusColors.agendada;
              const Icon = statusIcons[item.status] || Clock;
              return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{ backgroundColor: s.bg, color: s.color, fontSize: 11, fontWeight: 500 }}>
                  <Icon size={11} />{item.status}
                </span>
              );
            }
          },
          { key: "valor", label: "Valor", render: (item) => <span style={{ fontWeight: 600, color: c.accent, fontSize: 13 }}>{item.valor}</span> },
        ]}
      />
    </div>
  );
}
