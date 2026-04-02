import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth, type UserRole } from "./AuthContext";
import { useColors } from "./ThemeContext";
import { SigaBemLogo } from "./SigaBemLogo";
import { UserCheck, GraduationCap, Eye, EyeOff } from "lucide-react";
import imageLogin from "../../assets/ImageLogin.jpg";

const signupRoles: { role: UserRole; label: string; desc: string; icon: React.ElementType }[] = [
  { role: "condutor", label: "Condutor", desc: "Quero aprender a dirigir", icon: GraduationCap },
  { role: "instrutor", label: "Instrutor", desc: "Quero ensinar rotas", icon: UserCheck },
];

export function SignupPage() {
  const c = useColors();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("condutor");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    // Simulate signup & login
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
        />
        <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Acelere pro seu novo futuro!
          </h2>
          <p className="text-lg opacity-90">
            Crie sua conta na Siga Bem e tenha o controle total da sua evolução.
          </p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 relative">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <SigaBemLogo height={96} />
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 28, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif", textAlign: "center", marginBottom: 4 }}>
            Criar Conta
          </h1>
          <p style={{ fontSize: 15, color: c.textMuted, textAlign: "center", marginBottom: 28 }}>
            Como você deseja utilizar a plataforma?
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {signupRoles.map(({ role, label, desc, icon: Icon }) => (
              <motion.button
                key={role}
                type="button"
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
                <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
                <span className="hidden sm:block" style={{ fontSize: 11, color: selectedRole === role ? c.accent : c.textFaint, opacity: 0.8, textAlign: "center" }}>{desc}</span>
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, display: "block" }}>Nome completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => { setNome(e.target.value); setError(""); }}
                placeholder="João da Silva"
                className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-shadow focus:ring-2"
                style={{ fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}`, '--tw-ring-color': c.accent } as React.CSSProperties}
              />
            </div>
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
              Criar Conta
            </motion.button>
          </form>

          <p style={{ fontSize: 14, color: c.textMuted, textAlign: "center", marginTop: 24 }}>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ color: c.accent, fontWeight: 600, textDecoration: "none" }}>
              Entre aqui
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
