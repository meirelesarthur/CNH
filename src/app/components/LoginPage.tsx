import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, type UserRole } from "./AuthContext";
import { useColors } from "./ThemeContext";
import { SigaBemLogo } from "./SigaBemLogo";
import { Shield, UserCheck, GraduationCap, Eye, EyeOff } from "lucide-react";
import imageLogin from "../../assets/ImageLogin.jpg";

const roles: { role: UserRole; label: string; desc: string; icon: React.ElementType }[] = [
  { role: "admin", label: "Administração", desc: "Gestão completa", icon: Shield },
  { role: "instrutor", label: "Instrutor", desc: "Aulas e veículos", icon: UserCheck },
  { role: "condutor", label: "Condutor", desc: "Agende aulas", icon: GraduationCap },
];

export function LoginPage() {
  const c = useColors();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("condutor");
  const [email, setEmail] = useState("teste@email.com");
  const [password, setPassword] = useState("12345678");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    login(email, password, selectedRole);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: c.bg, fontFamily: "'Inter', sans-serif" }}>
      {/* Left side - Image (Hidden on mobile, 50% on desktop) */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src={imageLogin}
          alt="Siga Bem Autoescola"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            O seu caminho para a independência começa aqui.
          </h2>
          <p className="text-lg opacity-90">
            Acompanhe suas aulas, gerencie seus horários e conquiste sua habilitação com a Siga Bem.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 relative">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <SigaBemLogo height={112} />
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 28, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif", textAlign: "center", marginBottom: 4 }}>
            Bem-vindo
          </h1>
          <p style={{ fontSize: 15, color: c.textMuted, textAlign: "center", marginBottom: 32 }}>
            Selecione seu perfil para entrar
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {roles.map(({ role, label, desc, icon: Icon }) => (
              <motion.button
                key={role}
                onClick={() => setSelectedRole(role)}
                className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl cursor-pointer transition-colors"
                style={{
                  backgroundColor: selectedRole === role ? c.accentSoft : c.bgCard,
                  border: `2px solid ${selectedRole === role ? c.accent : c.border}`,
                  color: selectedRole === role ? c.accent : c.textMuted,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={24} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                <span className="hidden sm:block" style={{ fontSize: 11, color: selectedRole === role ? c.accent : c.textFaint, opacity: 0.8, textAlign: "center" }}>{desc}</span>
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, display: "block" }}>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="seu@email.com"
                className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-shadow focus:ring-2"
                style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}`, '--tw-ring-color': c.accent } as React.CSSProperties}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, display: "block" }}>Senha</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl focus:outline-none pr-12 transition-shadow focus:ring-2"
                  style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}`, '--tw-ring-color': c.accent } as React.CSSProperties}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:opacity-80 transition-opacity" style={{ color: c.textFaint }}>
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 14, color: c.danger }}>{error}</motion.p>}

            <motion.button
              type="submit"
              className="w-full py-4 rounded-xl text-white cursor-pointer mt-2"
              style={{ fontSize: 16, fontWeight: 600, backgroundColor: c.accent }}
              whileTap={{ scale: 0.98 }}
              whileHover={{ opacity: 0.9 }}
            >
              Entrar como {roles.find(r => r.role === selectedRole)?.label}
            </motion.button>
          </form>

          <p style={{ fontSize: 13, color: c.textFaint, textAlign: "center", marginTop: 32 }}>
            Demo: use qualquer e-mail e senha
          </p>
        </motion.div>
      </div>
    </div>
  );
}