import { useColors } from "../ThemeContext";
import { StatCard } from "../StatCard";
import { DataTable } from "../DataTable";
import { DollarSign, TrendingUp, ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "motion/react";

const pieData = [
  { name: "Aulas Práticas", value: 65 },
  { name: "Exame Detran", value: 20 },
  { name: "Treinamento", value: 10 },
  { name: "Aluguel Veículo", value: 5 },
];
const COLORS = ["#06b6d4", "#0891b2", "#0e7490", "#155e75"];

const transactions = [
  { id: "1", descricao: "Aula - Ana Costa", instrutor: "Roberto Silva", data: "17/03", tipo: "entrada", valor: "R$ 120" },
  { id: "2", descricao: "Repasse - Roberto", instrutor: "Roberto Silva", data: "17/03", tipo: "saída", valor: "R$ 84" },
  { id: "3", descricao: "Exame - João", instrutor: "Maria Santos", data: "16/03", tipo: "entrada", valor: "R$ 180" },
  { id: "4", descricao: "Repasse - Maria", instrutor: "Maria Santos", data: "16/03", tipo: "saída", valor: "R$ 126" },
  { id: "5", descricao: "Aula - Carla", instrutor: "Roberto Silva", data: "15/03", tipo: "entrada", valor: "R$ 120" },
];

export function AdminFinanceiro() {
  const c = useColors();

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Financeiro</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Controle de receitas e repasses</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Receita Total" value="R$ 21k" change="+12%" positive icon={DollarSign} />
        <StatCard title="Repasses" value="R$ 14.7k" change="+10%" positive icon={Wallet} />
        <StatCard title="Lucro" value="R$ 6.3k" change="+18%" positive icon={TrendingUp} />
        <StatCard title="Taxa Média" value="30%" icon={DollarSign} />
      </div>

      {/* Chart */}
      <motion.div className="rounded-2xl p-4 lg:p-5" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif", marginBottom: 12 }}>Receita por Serviço</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={4}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 w-full sm:w-auto">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between gap-4" style={{ fontSize: 12 }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span style={{ color: c.textMuted }}>{item.name}</span>
                </div>
                <span style={{ color: c.text, fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <DataTable
        title="Movimentações"
        searchKey="descricao"
        data={transactions}
        columns={[
          { key: "descricao", label: "Descrição" },
          { key: "instrutor", label: "Instrutor", hideOnMobile: true },
          { key: "data", label: "Data" },
          {
            key: "tipo", label: "Tipo", render: (item) => {
              const isEntrada = item.tipo === "entrada";
              return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{
                  backgroundColor: isEntrada ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  color: isEntrada ? "#22c55e" : "#ef4444", fontSize: 11, fontWeight: 500
                }}>
                  {isEntrada ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}{item.tipo}
                </span>
              );
            }
          },
          { key: "valor", label: "Valor", render: (item) => <span style={{ fontWeight: 600, color: item.tipo === "entrada" ? "#22c55e" : "#ef4444", fontSize: 13 }}>{item.valor}</span> },
        ]}
      />
    </div>
  );
}
