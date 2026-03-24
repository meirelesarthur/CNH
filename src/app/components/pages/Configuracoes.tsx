import { useState } from "react";
import { motion } from "motion/react";
import { useColors } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import { Save, CheckCircle2 } from "lucide-react";

export function Configuracoes() {
  const c = useColors();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = { fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` };

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Configurações</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Gerencie seu perfil</p>
      </div>

      <motion.div className="rounded-2xl p-4 lg:p-6" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Avatar */}
        <div className="flex items-center gap-3 mb-5 pb-5" style={{ borderBottom: `1px solid ${c.border}` }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: c.accentSoft, color: c.accent, fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
            {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p style={{ fontSize: 17, fontWeight: 600, color: c.text }}>{user.name}</p>
            <p style={{ fontSize: 13, color: c.textMuted }}>{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Nome completo</label>
            <input defaultValue={user.name} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>E-mail</label>
            <input type="email" defaultValue={user.email} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>WhatsApp</label>
            <input defaultValue={user.phone} type="tel" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Nova senha</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <motion.button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 15, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.98 }}>
            {saved ? <><CheckCircle2 size={18} /> Salvo!</> : <><Save size={18} /> Salvar Alterações</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
