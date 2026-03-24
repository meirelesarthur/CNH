import { useColors } from "../ThemeContext";
import { StatCard } from "../StatCard";
import { DataTable } from "../DataTable";
import { DollarSign, TrendingUp, Calendar, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "motion/react";

const chartData = [
  { semana: "Sem 1", valor: 960 }, { semana: "Sem 2", valor: 1200 }, { semana: "Sem 3", valor: 1080 }, { semana: "Sem 4", valor: 1440 },
];

const payments = [
  { id: "1", descricao: "Aula - Ana Costa", data: "17/03", valor: "R$ 84" },
  { id: "2", descricao: "Exame - João Mendes", data: "16/03", valor: "R$ 126" },
  { id: "3", descricao: "Aula - Carla Souza", data: "15/03", valor: "R$ 84" },
  { id: "4", descricao: "Treinamento - Pedro", data: "14/03", valor: "R$ 105" },
  { id: "5", descricao: "Aula - Lucas Ramos", data: "13/03", valor: "R$ 84" },
];

export function InstrutorFinanceiro() {
  const c = useColors();

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Financeiro</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Seus ganhos</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard title="Ganhos/Mês" value="R$ 4.6k" change="+15%" positive icon={DollarSign} />
        <StatCard title="Média/Aula" value="R$ 84" icon={TrendingUp} />
        <div className="col-span-2 lg:col-span-1">
          <StatCard title="Aulas Pagas" value="39" change="+5" positive icon={Calendar} />
        </div>
      </div>

      <motion.div className="rounded-2xl p-4 lg:p-5" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif", marginBottom: 16 }}>Ganhos Semanais</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
            <XAxis dataKey="semana" tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
            <Tooltip contentStyle={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="valor" stroke={c.accent} fill={c.accentSoft} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <DataTable
        title="Pagamentos"
        data={payments}
        columns={[
          { key: "descricao", label: "Descrição" },
          { key: "data", label: "Data" },
          {
            key: "valor", label: "Valor", render: (item) => (
              <span className="flex items-center gap-1" style={{ fontWeight: 600, color: "#22c55e", fontSize: 13 }}>
                <ArrowDownRight size={13} />{item.valor}
              </span>
            )
          },
        ]}
      />
    </div>
  );
}
