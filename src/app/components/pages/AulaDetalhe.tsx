import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useColors } from "../ThemeContext";
import {
  ChevronLeft, MapPin, Clock, Car, Star, Calendar,
  CheckCircle2, User, Navigation, DollarSign, MessageSquare
} from "lucide-react";
import { useState } from "react";

const allAulas: Record<string, {
  id: string;
  instrutor: string;
  instrutorAvatar: string;
  rota: string;
  data: string;
  hora: string;
  duracao: string;
  veiculo: string;
  placa: string;
  categoria: string;
  valor: string;
  avaliacao: number;
  status: string;
  fotos: string;
  tipoVeiculo: "Veículo" | "Moto";
  distancia: string;
  observacoes: string;
  pontosPercorridos: string[];
  feedback?: string;
}> = {
  "1": {
    id: "1", instrutor: "Roberto Silva", instrutorAvatar: "RS", fotos: "https://i.pravatar.cc/150?u=1", rota: "Rota Centro",
    data: "17/03/2026", hora: "08:00", duracao: "50 min", veiculo: "Chevrolet Onix 1.0", tipoVeiculo: "Veículo",
    placa: "ABC-1D23", categoria: "B", valor: "R$ 120,00", avaliacao: 5, status: "concluída",
    distancia: "12 km", observacoes: "Aluna demonstrou boa evolução em baliza e semáforos.",
    pontosPercorridos: ["Av. Paulista", "R. Augusta", "Pça da República", "R. Consolação"],
    feedback: "Excelente aula! Me senti muito mais confiante.",
  },
  "2": {
    id: "2", instrutor: "Roberto Silva", instrutorAvatar: "RS", fotos: "https://i.pravatar.cc/150?u=1", rota: "Rota Zona Norte",
    data: "14/03/2026", hora: "10:00", duracao: "45 min", veiculo: "Chevrolet Onix 1.0", tipoVeiculo: "Veículo",
    placa: "ABC-1D23", categoria: "B", valor: "R$ 120,00", avaliacao: 4, status: "concluída",
    distancia: "10 km", observacoes: "Precisa melhorar em ladeiras íngremes e conversões à esquerda.",
    pontosPercorridos: ["Av. Casa Verde", "R. Voluntários da Pátria", "Pça do Mandaqui"],
  },
  "3": {
    id: "3", instrutor: "Maria Santos", instrutorAvatar: "MS", fotos: "https://i.pravatar.cc/150?u=2", rota: "Rota Detran",
    data: "12/03/2026", hora: "14:00", duracao: "30 min", veiculo: "Hyundai HB20 1.0", tipoVeiculo: "Veículo",
    placa: "DEF-4G56", categoria: "B", valor: "R$ 180,00", avaliacao: 5, status: "concluída",
    distancia: "5 km", observacoes: "Simulação de exame realizada com sucesso. Aluna aprovada na simulação.",
    pontosPercorridos: ["Detran Entrada", "Av. do Estado", "Retorno", "Detran Saída"],
    feedback: "Ótima simulação! Instrutora muito paciente.",
  },
  "4": {
    id: "4", instrutor: "Carlos Dias", instrutorAvatar: "CD", fotos: "https://i.pravatar.cc/150?u=3", rota: "Rota Zona Leste",
    data: "10/03/2026", hora: "08:00", duracao: "50 min", veiculo: "Honda CG 160", tipoVeiculo: "Moto",
    placa: "MTO-9R12", categoria: "A", valor: "R$ 110,00", avaliacao: 5, status: "concluída",
    distancia: "15 km", observacoes: "Foco em corredor e equilíbrio em baixa velocidade.",
    pontosPercorridos: ["Radial Leste", "Tatuapé", "Penha"],
  },
  "5": {
    id: "5", instrutor: "Maria Santos", instrutorAvatar: "MS", fotos: "https://i.pravatar.cc/150?u=2", rota: "Rota Centro",
    data: "07/03/2026", hora: "09:00", duracao: "50 min", veiculo: "Hyundai HB20 1.0", tipoVeiculo: "Veículo",
    placa: "DEF-4G56", categoria: "B", valor: "R$ 120,00", avaliacao: 4, status: "concluída",
    distancia: "12 km", observacoes: "Primeira aula com a instrutora. Boa adaptação ao novo veículo.",
    pontosPercorridos: ["Av. Paulista", "R. Augusta", "Pça da República"],
  },
  "6": {
    id: "6", instrutor: "Fernanda Alves", instrutorAvatar: "FA", fotos: "https://i.pravatar.cc/150?u=4", rota: "Rota Zona Norte",
    data: "05/03/2026", hora: "14:00", duracao: "45 min", veiculo: "Fiat Mobi 1.0", tipoVeiculo: "Veículo",
    placa: "GHI-7J89", categoria: "B", valor: "R$ 120,00", avaliacao: 5, status: "concluída",
    distancia: "10 km", observacoes: "Treino de curvas e lombadas. Aluna evoluiu bastante na condução defensiva.",
    pontosPercorridos: ["Av. Casa Verde", "R. Voluntários da Pátria", "Pça do Mandaqui"],
    feedback: "Muito boa a aula, gostei da rota diferente.",
  },
  "7": {
    id: "7", instrutor: "Roberto Silva", instrutorAvatar: "RS", fotos: "https://i.pravatar.cc/150?u=1", rota: "Rota Centro",
    data: "25/03/2026", hora: "14:00", duracao: "50 min", veiculo: "Chevrolet Onix 1.0", tipoVeiculo: "Veículo",
    placa: "ABC-1D23", categoria: "B", valor: "R$ 120,00", avaliacao: 0, status: "agendada",
    distancia: "12 km", observacoes: "Aula focada em baliza.",
    pontosPercorridos: ["Av. Paulista", "R. Augusta", "Pça da República"],
  },
  "8": {
    id: "8", instrutor: "Maria Santos", instrutorAvatar: "MS", fotos: "https://i.pravatar.cc/150?u=2", rota: "Rota Detran",
    data: "28/03/2026", hora: "09:00", duracao: "50 min", veiculo: "Hyundai HB20 1.0", tipoVeiculo: "Veículo",
    placa: "DEF-4G56", categoria: "B", valor: "R$ 180,00", avaliacao: 0, status: "agendada",
    distancia: "5 km", observacoes: "Simulação de exame prático.",
    pontosPercorridos: ["Detran Entrada", "Av. do Estado", "Retorno", "Detran Saída"],
  },
};

export function AulaDetalhe() {
  const { aulaId } = useParams();
  const navigate = useNavigate();
  const c = useColors();
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const aula = aulaId ? allAulas[aulaId] : null;

  if (!aula) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p style={{ fontSize: 15, color: c.textMuted }}>Aula não encontrada.</p>
        <motion.button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-xl cursor-pointer"
          style={{ fontSize: 14, color: c.accent, backgroundColor: c.accentSoft }}
          whileTap={{ scale: 0.95 }}
        >
          Voltar
        </motion.button>
      </div>
    );
  }

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setShowFeedbackInput(false);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Back button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 cursor-pointer -ml-1"
        style={{ fontSize: 14, color: c.textMuted }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={20} /> Voltar
      </motion.button>

      {/* Header card */}
      <motion.div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Status banner */}
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: "rgba(22,163,74,0.08)" }}>
          <span className="flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 600, color: c.success }}>
            <CheckCircle2 size={15} /> Aula {aula.status}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.accent }}>{aula.valor}</span>
        </div>

        <div className="p-4">
          {/* Date & time */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: c.accentSoft }}>
              <Calendar size={14} style={{ color: c.accent }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: c.accent, marginTop: 1 }}>{aula.data.slice(0, 5)}</span>
            </div>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{aula.hora}</p>
              <p style={{ fontSize: 13, color: c.textMuted }}>{aula.data} • {aula.duracao}</p>
            </div>
          </div>

          {/* Instructor Profile Style Header */}
          <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{ backgroundColor: c.textGhost }}>
            <img src={aula.fotos} alt={aula.instrutor} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: c.accentSoft }} />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <User size={13} style={{ color: c.textFaint }} />
                <span style={{ fontSize: 11, color: c.textFaint }}>Instrutor</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, color: c.text }}>{aula.instrutor}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} style={{ color: i < aula.avaliacao ? "#f59e0b" : c.textGhost, fill: i < aula.avaliacao ? "#f59e0b" : "transparent" }} />
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={12} style={{ color: c.accent }} />
                <span style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Rota</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{aula.rota}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Navigation size={12} style={{ color: c.accent }} />
                <span style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Distância</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{aula.distancia}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Car size={12} style={{ color: c.accent }} />
                <span style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>{aula.tipoVeiculo}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{aula.veiculo}</p>
              <p style={{ fontSize: 11, color: c.textMuted }}>{aula.placa}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
              <div className="flex items-center gap-1.5 mb-1">
                <DollarSign size={12} style={{ color: c.accent }} />
                <span style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Pagamento</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: c.success }}>{aula.valor}</p>
              <p style={{ fontSize: 11, color: c.textMuted }}>Cat. {aula.categoria}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Percurso */}
      <motion.div
        className="rounded-2xl p-4"
        style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>
          <MapPin size={16} style={{ color: c.accent }} /> Percurso
        </h3>
        <div className="relative pl-5">
          {aula.pontosPercorridos.map((ponto, i) => (
            <div key={ponto} className="relative pb-4 last:pb-0">
              {/* Line */}
              {i < aula.pontosPercorridos.length - 1 && (
                <div className="absolute left-[-13px] top-3 w-px h-full" style={{ backgroundColor: c.accentBorder }} />
              )}
              {/* Dot */}
              <div
                className="absolute left-[-16px] top-1 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: i === 0 || i === aula.pontosPercorridos.length - 1 ? c.accent : c.textFaint,
                  border: `2px solid ${c.bgCard}`,
                  boxShadow: `0 0 0 2px ${i === 0 || i === aula.pontosPercorridos.length - 1 ? c.accentBorder : c.border}`
                }}
              />
              <p style={{ fontSize: 13.5, color: i === 0 || i === aula.pontosPercorridos.length - 1 ? c.text : c.textMuted, fontWeight: i === 0 ? 500 : 400 }}>
                {ponto}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Observações do Instrutor */}
      <motion.div
        className="rounded-2xl p-4"
        style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>
          <MessageSquare size={16} style={{ color: c.accent }} /> Observações do Instrutor
        </h3>
        <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.7 }}>{aula.observacoes}</p>
      </motion.div>

      {/* Feedback do Aluno */}
      {aula.status === "concluída" && (
        <motion.div
          className="rounded-2xl p-4"
          style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: "'Sora', sans-serif" }}>
            <Star size={16} style={{ color: c.warning }} /> Seu Feedback
          </h3>

          {aula.feedback || feedbackSent ? (
            <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
              <p style={{ fontSize: 14, color: c.text, lineHeight: 1.6 }}>
                {feedbackSent ? feedbackText : aula.feedback}
              </p>
              {feedbackSent && (
                <p style={{ fontSize: 12, color: c.success, marginTop: 6, fontWeight: 500 }}>
                  Feedback enviado com sucesso!
                </p>
              )}
            </div>
          ) : showFeedbackInput ? (
            <div className="space-y-3">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Como foi sua aula? Deixe um comentário..."
                className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none"
                style={{ fontSize: 14, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}`, minHeight: 80 }}
              />
              <div className="flex gap-2">
                <motion.button
                  onClick={handleSendFeedback}
                  className="flex-1 py-3 rounded-xl text-white cursor-pointer"
                  style={{ fontSize: 14, fontWeight: 600, backgroundColor: c.accent }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar
                </motion.button>
                <motion.button
                  onClick={() => setShowFeedbackInput(false)}
                  className="px-4 py-3 rounded-xl cursor-pointer"
                  style={{ fontSize: 14, color: c.textMuted, backgroundColor: c.textGhost }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.button
              onClick={() => setShowFeedbackInput(true)}
              className="w-full py-3 rounded-xl cursor-pointer"
              style={{ fontSize: 14, fontWeight: 500, color: c.accent, backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}
              whileTap={{ scale: 0.98 }}
            >
              Deixar um feedback
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
}
