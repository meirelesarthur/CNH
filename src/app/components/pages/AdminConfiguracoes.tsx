import { useState } from "react";
import { motion } from "motion/react";
import { useColors } from "../ThemeContext";
import { Save, CheckCircle2 } from "lucide-react";

export function AdminConfiguracoes() {
  const c = useColors();
  const [saved, setSaved] = useState(false);

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
        <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Configurações gerais da administração</p>
      </div>

      <motion.div className="rounded-2xl p-4 lg:p-6" style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Nome da Empresa</label>
            <input defaultValue="Siga Bem" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>CNPJ</label>
            <input defaultValue="12.345.678/0001-90" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Taxa (%)</label>
              <input type="number" defaultValue={30} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Valor aula</label>
              <input type="number" defaultValue={120} className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>E-mail de contato</label>
            <input type="email" defaultValue="contato@sigabem.com" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>WhatsApp</label>
            <input defaultValue="(11) 99999-0001" type="tel" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
          </div>
          <motion.button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white cursor-pointer" style={{ fontSize: 15, fontWeight: 600, backgroundColor: c.accent }} whileTap={{ scale: 0.98 }}>
            {saved ? <><CheckCircle2 size={18} /> Salvo!</> : <><Save size={18} /> Salvar Alterações</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}