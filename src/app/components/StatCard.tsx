import { motion } from "motion/react";
import { useColors } from "./ThemeContext";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ElementType;
}

export function StatCard({ title, value, change, positive, icon: Icon }: StatCardProps) {
  const c = useColors();

  return (
    <motion.div
      className="rounded-2xl p-4 lg:p-5"
      style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: `0 8px 30px ${c.shadow}` }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-2 lg:mb-3">
        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.accentSoft }}>
          <Icon size={18} style={{ color: c.accent }} />
        </div>
        {change && (
          <div className="flex items-center gap-0.5" style={{ color: positive ? c.success : c.danger, fontSize: 11, fontWeight: 600 }}>
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </div>
        )}
      </div>
      <p style={{ fontSize: 11, color: c.textMuted, marginBottom: 2 }}>{title}</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{value}</p>
    </motion.div>
  );
}
