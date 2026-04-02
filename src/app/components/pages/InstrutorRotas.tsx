import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColors } from "../ThemeContext";
import {
  MapPin, Plus, X, Clock, Navigation, Car, DollarSign,
  ChevronLeft, ChevronRight, CheckCircle2, Percent, Info,
  Trash2, GripVertical, Route
} from "lucide-react";

const TAXA_PLATAFORMA = 0.10;

const mockVeiculos = [
  { id: "1", modelo: "Chevrolet Onix 1.0", ano: "2024", placa: "ABC-1D23", cor: "Branco" },
  { id: "2", modelo: "Hyundai HB20 1.0", ano: "2023", placa: "DEF-4G56", cor: "Prata" },
  { id: "3", modelo: "Honda CG 160", ano: "2024", placa: "MTO-9R12", cor: "Preto" },
];

interface Rota {
  id: string;
  nome: string;
  uf: string;
  cidade: string;
  descricao: string;
  duracao: string;
  distancia: string;
  pontos: { nome: string; x: number; y: number }[];
  veiculo: string;
  veiculoPlaca: string;
  valorBruto: number;
  taxaPlataforma: number;
  valorLiquido: number;
  horarios: string[];
}

const mockRotas: Rota[] = [
  {
    id: "1", nome: "Rota Centro", uf: "SP", cidade: "São Paulo",
    descricao: "Circuito pelo centro com semáforos e rotatórias",
    duracao: "50 min", distancia: "12 km",
    pontos: [
      { nome: "Av. Paulista", x: 50, y: 150 },
      { nome: "R. Augusta", x: 130, y: 100 },
      { nome: "Pça República", x: 260, y: 60 },
    ],
    veiculo: "Chevrolet Onix 1.0", veiculoPlaca: "ABC-1D23",
    valorBruto: 120, taxaPlataforma: 12, valorLiquido: 108,
    horarios: ["08:00", "10:00", "14:00", "16:00"],
  },
  {
    id: "2", nome: "Rota Zona Norte", uf: "SP", cidade: "São Paulo",
    descricao: "Percurso residencial com ladeiras e ruas estreitas",
    duracao: "45 min", distancia: "10 km",
    pontos: [
      { nome: "Av. Casa Verde", x: 40, y: 140 },
      { nome: "R. Voluntários", x: 160, y: 80 },
      { nome: "Mandaqui", x: 300, y: 50 },
    ],
    veiculo: "Hyundai HB20 1.0", veiculoPlaca: "DEF-4G56",
    valorBruto: 110, taxaPlataforma: 11, valorLiquido: 99,
    horarios: ["09:00", "11:00", "15:00"],
  },
  {
    id: "3", nome: "Rota Detran", uf: "SP", cidade: "São Paulo",
    descricao: "Simulação do trajeto oficial do exame prático",
    duracao: "30 min", distancia: "5 km",
    pontos: [
      { nome: "Detran", x: 60, y: 130 },
      { nome: "Av. do Estado", x: 180, y: 90 },
      { nome: "Retorno", x: 310, y: 60 },
    ],
    veiculo: "Chevrolet Onix 1.0", veiculoPlaca: "ABC-1D23",
    valorBruto: 180, taxaPlataforma: 18, valorLiquido: 162,
    horarios: ["08:00", "10:00", "14:00"],
  },
];

/* ─── Interactive Map Component ─── */
function InteractiveMap({
  pontos,
  onAddPoint,
  onRemovePoint,
  editable = false,
  c,
}: {
  pontos: { nome: string; x: number; y: number }[];
  onAddPoint?: (x: number, y: number) => void;
  onRemovePoint?: (index: number) => void;
  editable?: boolean;
  c: any;
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!editable || !onAddPoint) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 380);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 200);
      onAddPoint(x, y);
    },
    [editable, onAddPoint]
  );

  // Build polyline string
  const polylinePoints = pontos.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{
        backgroundColor: "#e8eef4",
        height: 220,
        border: `1px solid ${c.border}`,
        cursor: editable ? "crosshair" : "default",
      }}
      onClick={handleClick}
    >
      {/* Grid pattern */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
        <defs>
          <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a8be" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapGrid)" />
      </svg>

      {/* Fake streets */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-15">
        <line x1="0" y1="80" x2="100%" y2="80" stroke="#5a7a96" strokeWidth="2" />
        <line x1="0" y1="140" x2="100%" y2="140" stroke="#5a7a96" strokeWidth="2" />
        <line x1="100" y1="0" x2="100" y2="100%" stroke="#5a7a96" strokeWidth="1.5" />
        <line x1="220" y1="0" x2="220" y2="100%" stroke="#5a7a96" strokeWidth="1.5" />
        <line x1="320" y1="0" x2="320" y2="100%" stroke="#5a7a96" strokeWidth="1.5" />
        <line x1="50" y1="30" x2="280" y2="180" stroke="#5a7a96" strokeWidth="1" />
      </svg>

      {/* Route line */}
      {pontos.length > 1 && (
        <svg width="100%" height="100%" className="absolute inset-0" viewBox="0 0 380 200" preserveAspectRatio="none">
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#0891b2"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 4"
            opacity="0.85"
          />
        </svg>
      )}

      {/* Points */}
      <svg width="100%" height="100%" className="absolute inset-0" viewBox="0 0 380 200" preserveAspectRatio="none">
        {pontos.map((p, i) => (
          <g key={i}>
            {/* Pulse ring for latest point */}
            {editable && i === pontos.length - 1 && (
              <circle cx={p.x} cy={p.y} r="14" fill="none" stroke="#0891b2" strokeWidth="1.5" opacity="0.3">
                <animate attributeName="r" values="8;16" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r="8" fill="#0891b2" stroke="#fff" strokeWidth="2.5" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* Labels */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
        {pontos.map((p, i) => (
          <span
            key={i}
            className="px-1.5 py-0.5 rounded text-white flex items-center gap-1"
            style={{ fontSize: 9, fontWeight: 600, backgroundColor: "rgba(8,145,178,0.85)" }}
          >
            {i + 1}. {p.nome}
            {editable && onRemovePoint && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemovePoint(i);
                }}
                className="hover:bg-white/20 rounded-sm cursor-pointer"
              >
                <X size={8} />
              </button>
            )}
          </span>
        ))}
      </div>

      {/* Map branding */}
      <div
        className="absolute top-2 right-2 px-2 py-0.5 rounded-md"
        style={{ backgroundColor: "rgba(255,255,255,0.85)", fontSize: 10, color: "#5a7a96" }}
      >
        <MapPin size={10} className="inline mr-0.5" style={{ verticalAlign: "middle" }} />
        Maps
      </div>

      {/* Click hint */}
      {editable && pontos.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
            <MapPin size={24} className="mx-auto mb-1" style={{ color: c.accent }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Toque no mapa para adicionar paradas</p>
            <p style={{ fontSize: 11, color: c.textMuted }}>Cada toque cria um ponto no percurso</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Static map for listing ─── */
function StaticMap({ pontos, c }: { pontos: { nome: string; x: number; y: number }[]; c: any }) {
  return <InteractiveMap pontos={pontos} c={c} />;
}

const HORARIO_OPTIONS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export function InstrutorRotas() {
  const c = useColors();
  const [rotas, setRotas] = useState<Rota[]>(mockRotas);
  const [showCreate, setShowCreate] = useState(false);
  const [createStep, setCreateStep] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState<Rota | null>(null);

  // Create form state
  const [formNome, setFormNome] = useState("");
  const [formUf, setFormUf] = useState("SP");
  const [formCidade, setFormCidade] = useState("");
  const [formDescricao, setFormDescricao] = useState("");
  const [formDuracao, setFormDuracao] = useState("");
  const [formPontos, setFormPontos] = useState<{ nome: string; x: number; y: number }[]>([]);
  const [formVeiculoId, setFormVeiculoId] = useState<string | null>(null);
  const [formValor, setFormValor] = useState("");
  const [formHorarios, setFormHorarios] = useState<string[]>([]);
  const [newPointName, setNewPointName] = useState("");
  const [pendingPoint, setPendingPoint] = useState<{ x: number; y: number } | null>(null);

  const valorNum = parseFloat(formValor) || 0;
  const taxaCalc = Math.round(valorNum * TAXA_PLATAFORMA * 100) / 100;
  const liquidoCalc = Math.round((valorNum - taxaCalc) * 100) / 100;

  const selectedVeiculo = mockVeiculos.find((v) => v.id === formVeiculoId);

  const resetForm = () => {
    setFormNome(""); setFormUf("SP"); setFormCidade(""); setFormDescricao("");
    setFormDuracao(""); setFormPontos([]); setFormVeiculoId(null);
    setFormValor(""); setFormHorarios([]); setNewPointName(""); setPendingPoint(null);
    setCreateStep(0); setShowCreate(false);
  };

  const handleAddMapPoint = (x: number, y: number) => {
    setPendingPoint({ x, y });
    setNewPointName("");
  };

  const confirmPoint = () => {
    if (!pendingPoint || !newPointName.trim()) return;
    setFormPontos([...formPontos, { nome: newPointName.trim(), x: pendingPoint.x, y: pendingPoint.y }]);
    setPendingPoint(null);
    setNewPointName("");
  };

  const handleRemovePoint = (index: number) => {
    setFormPontos(formPontos.filter((_, i) => i !== index));
  };

  const toggleHorario = (h: string) => {
    setFormHorarios((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h].sort()
    );
  };

  const canProceedStep0 = formNome.trim() && formCidade.trim() && formPontos.length >= 2;
  const canProceedStep1 = !!formVeiculoId;
  const canFinish = valorNum > 0;

  const handleCreate = () => {
    if (!selectedVeiculo || !valorNum) return;
    const newRota: Rota = {
      id: String(Date.now()),
      nome: formNome || "Nova Rota",
      uf: formUf,
      cidade: formCidade,
      descricao: formDescricao,
      duracao: formDuracao || "45 min",
      distancia: `${Math.round(formPontos.length * 3.5)} km`,
      pontos: formPontos,
      veiculo: selectedVeiculo.modelo,
      veiculoPlaca: selectedVeiculo.placa,
      valorBruto: valorNum,
      taxaPlataforma: taxaCalc,
      valorLiquido: liquidoCalc,
      horarios: formHorarios,
    };
    setRotas([newRota, ...rotas]);
    resetForm();
  };

  const inputStyle = { fontSize: 15, backgroundColor: c.textGhost, color: c.text, border: `1px solid ${c.border}` };
  const stepLabels = ["Rota & Mapa", "Veículo", "Valor"];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Rotas</h1>
          <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>Defina rotas, veículos e valores</p>
        </div>
        <motion.button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-white cursor-pointer"
          style={{ fontSize: 13, fontWeight: 600, backgroundColor: c.accent }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} /> <span className="hidden sm:inline">Criar Rota</span>
        </motion.button>
      </div>

      {/* Existing routes */}
      <div className="space-y-3">
        {rotas.map((r) => (
          <motion.button
            key={r.id}
            onClick={() => setSelectedDetail(r)}
            className="w-full rounded-2xl p-4 text-left cursor-pointer"
            style={{ backgroundColor: c.bgCard, border: `1px solid ${c.border}` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accentSoft }}>
                <MapPin size={20} style={{ color: c.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="truncate" style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{r.nome}</h3>
                  <ChevronRight size={16} style={{ color: c.textFaint, flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: 12, color: c.textMuted }}>{r.cidade}/{r.uf}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="flex items-center gap-1" style={{ fontSize: 12, color: c.textFaint }}><Clock size={12} />{r.duracao}</span>
              <span className="flex items-center gap-1" style={{ fontSize: 12, color: c.textFaint }}><Navigation size={12} />{r.distancia}</span>
              <span className="flex items-center gap-1" style={{ fontSize: 12, color: c.textFaint }}><Car size={12} />{r.veiculo.split(" ").slice(0, 2).join(" ")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1" style={{ fontSize: 12, color: c.textMuted }}>
                <Route size={12} /> {r.pontos.length} parada{r.pontos.length !== 1 ? "s" : ""}
              </span>
              <div className="text-right flex-shrink-0">
                <p style={{ fontSize: 16, fontWeight: 700, color: c.accent, fontFamily: "'Sora', sans-serif" }}>
                  R$ {r.valorBruto.toFixed(2).replace(".", ",")}
                </p>
                <p style={{ fontSize: 10, color: c.success }}>
                  Líquido: R$ {r.valorLiquido.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* ─── Route detail sheet ─── */}
      <AnimatePresence>
        {selectedDetail && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setSelectedDetail(null)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 lg:w-full lg:max-w-lg rounded-t-3xl lg:rounded-2xl"
              style={{ backgroundColor: c.bgCard, paddingBottom: "env(safe-area-inset-bottom, 20px)", maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="lg:hidden flex justify-center py-3">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: c.textGhost }} />
              </div>
              <div className="px-5 pb-5 lg:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>{selectedDetail.nome}</h2>
                  <motion.button onClick={() => setSelectedDetail(null)} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
                </div>

                <StaticMap pontos={selectedDetail.pontos} c={c} />

                <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6 }}>{selectedDetail.descricao}</p>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                    <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Localização</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{selectedDetail.cidade}/{selectedDetail.uf}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                    <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Duração</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{selectedDetail.duracao}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                    <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Veículo</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{selectedDetail.veiculo}</p>
                    <p style={{ fontSize: 11, color: c.textMuted }}>{selectedDetail.veiculoPlaca}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: c.textGhost }}>
                    <p style={{ fontSize: 10, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Distância</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{selectedDetail.distancia}</p>
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className="rounded-xl p-4" style={{ backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 13, color: c.textMuted }}>Valor da aula</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: c.text }}>R$ {selectedDetail.valorBruto.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1" style={{ fontSize: 13, color: c.danger }}>
                      <Percent size={12} /> Taxa plataforma (10%)
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: c.danger }}>- R$ {selectedDetail.taxaPlataforma.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="h-px my-2" style={{ backgroundColor: c.accentBorder }} />
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 14, fontWeight: 700, color: c.success }}>Você recebe</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: c.success, fontFamily: "'Sora', sans-serif" }}>R$ {selectedDetail.valorLiquido.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6 }}>Horários disponíveis</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDetail.horarios.map((h) => (
                      <span key={h} className="px-3 py-1.5 rounded-lg" style={{ fontSize: 13, fontWeight: 600, backgroundColor: c.textGhost, color: c.text }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Create route flow ─── */}
      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={resetForm} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 lg:w-full lg:max-w-lg rounded-t-3xl lg:rounded-2xl"
              style={{ backgroundColor: c.bgCard, paddingBottom: "env(safe-area-inset-bottom, 20px)", maxHeight: "92vh", overflowY: "auto" }}
            >
              <div className="lg:hidden flex justify-center py-3">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: c.textGhost }} />
              </div>
              <div className="px-5 pb-5 lg:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>Criar Rota</h2>
                  <motion.button onClick={resetForm} className="cursor-pointer p-1" style={{ color: c.textMuted }} whileTap={{ scale: 0.9 }}><X size={20} /></motion.button>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
                  {stepLabels.map((label, i) => (
                    <div key={label} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{
                        backgroundColor: createStep >= i ? c.accentSoft : c.textGhost,
                        color: createStep >= i ? c.accent : c.textFaint,
                        fontSize: 12, fontWeight: 600,
                        border: `1px solid ${createStep >= i ? c.accentBorder : "transparent"}`
                      }}>
                        <span className="rounded-full flex items-center justify-center" style={{ backgroundColor: createStep >= i ? c.accent : c.textGhost, color: createStep >= i ? "#fff" : c.textFaint, fontSize: 10, fontWeight: 700, width: 18, height: 18 }}>{i + 1}</span>
                        {label}
                      </div>
                      {i < 2 && <div className="w-4 h-px" style={{ backgroundColor: c.border }} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* ─── STEP 0: Define route on map ─── */}
                  {createStep === 0 && (
                    <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Nome da rota *</label>
                        <input value={formNome} onChange={(e) => setFormNome(e.target.value)} placeholder="Ex: Rota Zona Sul" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>UF</label>
                          <select value={formUf} onChange={(e) => setFormUf(e.target.value)} className="w-full px-3 py-3 rounded-xl focus:outline-none appearance-none" style={inputStyle}>
                            {UFS.map((uf) => (
                              <option key={uf} value={uf}>{uf}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Cidade *</label>
                          <input value={formCidade} onChange={(e) => setFormCidade(e.target.value)} placeholder="São Paulo" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Descrição do percurso</label>
                        <textarea value={formDescricao} onChange={(e) => setFormDescricao(e.target.value)} placeholder="Descreva as características da rota..." className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none" style={{ ...inputStyle, minHeight: 70 }} />
                      </div>

                      {/* Interactive Map */}
                      <div>
                        <label className="flex items-center gap-1.5 mb-2" style={{ fontSize: 12, fontWeight: 500, color: c.textMuted }}>
                          <MapPin size={13} style={{ color: c.accent }} /> Toque no mapa para adicionar paradas *
                        </label>
                        <InteractiveMap
                          pontos={formPontos}
                          onAddPoint={handleAddMapPoint}
                          onRemovePoint={handleRemovePoint}
                          editable
                          c={c}
                        />
                      </div>

                      {/* Name pending point */}
                      <AnimatePresence>
                        {pendingPoint && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="rounded-xl p-3 flex items-center gap-2"
                            style={{ backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}
                          >
                            <MapPin size={16} style={{ color: c.accent, flexShrink: 0 }} />
                            <input
                              value={newPointName}
                              onChange={(e) => setNewPointName(e.target.value)}
                              placeholder="Nome da parada..."
                              className="flex-1 px-3 py-2 rounded-lg focus:outline-none"
                              style={{ fontSize: 14, backgroundColor: c.bgCard, color: c.text, border: `1px solid ${c.border}` }}
                              autoFocus
                              onKeyDown={(e) => e.key === "Enter" && confirmPoint()}
                            />
                            <motion.button
                              onClick={confirmPoint}
                              className="px-3 py-2 rounded-lg text-white cursor-pointer"
                              style={{ fontSize: 13, fontWeight: 600, backgroundColor: c.accent, opacity: newPointName.trim() ? 1 : 0.4 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <CheckCircle2 size={16} />
                            </motion.button>
                            <motion.button
                              onClick={() => setPendingPoint(null)}
                              className="p-2 rounded-lg cursor-pointer"
                              style={{ color: c.textMuted }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <X size={14} />
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Points list */}
                      {formPontos.length > 0 && (
                        <div className="space-y-1.5">
                          <p style={{ fontSize: 12, fontWeight: 500, color: c.textMuted }}>
                            {formPontos.length} parada{formPontos.length !== 1 ? "s" : ""} definida{formPontos.length !== 1 ? "s" : ""}
                          </p>
                          {formPontos.map((p, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: c.textGhost }}>
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.accent, color: "#fff", fontSize: 10, fontWeight: 700 }}>{i + 1}</span>
                              <span className="flex-1" style={{ fontSize: 13, color: c.text }}>{p.nome}</span>
                              <button onClick={() => handleRemovePoint(i)} className="cursor-pointer p-1 rounded" style={{ color: c.textFaint }}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Duração estimada</label>
                          <input value={formDuracao} onChange={(e) => setFormDuracao(e.target.value)} placeholder="50 min" className="w-full px-4 py-3 rounded-xl focus:outline-none" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Horários</label>
                          <div className="flex flex-wrap gap-1">
                            {formHorarios.length > 0 ? (
                              <p style={{ fontSize: 13, color: c.text }}>{formHorarios.length} selecionado{formHorarios.length !== 1 ? "s" : ""}</p>
                            ) : (
                              <p style={{ fontSize: 13, color: c.textFaint }}>Selecione abaixo</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Horarios picker */}
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 6, display: "block" }}>Selecione os horários disponíveis</label>
                        <div className="flex flex-wrap gap-1.5">
                          {HORARIO_OPTIONS.map((h) => (
                            <motion.button
                              key={h}
                              onClick={() => toggleHorario(h)}
                              className="px-3 py-1.5 rounded-lg cursor-pointer"
                              style={{
                                fontSize: 12, fontWeight: 600,
                                backgroundColor: formHorarios.includes(h) ? c.accentSoft : c.textGhost,
                                color: formHorarios.includes(h) ? c.accent : c.textMuted,
                                border: `1px solid ${formHorarios.includes(h) ? c.accentBorder : "transparent"}`,
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {h}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        onClick={() => canProceedStep0 && setCreateStep(1)}
                        className="w-full py-3.5 rounded-xl text-white cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          fontSize: 15, fontWeight: 600,
                          backgroundColor: canProceedStep0 ? c.accent : c.textFaint,
                          opacity: canProceedStep0 ? 1 : 0.5,
                        }}
                        whileTap={canProceedStep0 ? { scale: 0.98 } : {}}
                      >
                        Próximo: Veículo <ChevronRight size={18} />
                      </motion.button>
                      {!canProceedStep0 && (
                        <p className="text-center" style={{ fontSize: 11, color: c.textFaint }}>
                          Preencha o nome, cidade e adicione ao menos 2 paradas no mapa
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* ─── STEP 1: Choose vehicle ─── */}
                  {createStep === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <motion.button onClick={() => setCreateStep(0)} className="flex items-center gap-1 cursor-pointer" style={{ fontSize: 13, color: c.textMuted }} whileTap={{ scale: 0.95 }}>
                        <ChevronLeft size={16} /> Voltar
                      </motion.button>

                      <p style={{ fontSize: 14, color: c.text, fontWeight: 500 }}>Selecione o veículo para esta rota:</p>

                      <div className="space-y-2.5">
                        {mockVeiculos.map((v) => (
                          <motion.button
                            key={v.id}
                            onClick={() => setFormVeiculoId(v.id)}
                            className="w-full rounded-2xl p-4 text-left cursor-pointer flex items-center gap-3"
                            style={{
                              backgroundColor: c.bgCard,
                              border: `2px solid ${formVeiculoId === v.id ? c.accent : c.border}`,
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: formVeiculoId === v.id ? c.accentSoft : c.textGhost }}>
                              <Car size={24} style={{ color: formVeiculoId === v.id ? c.accent : c.textFaint }} />
                            </div>
                            <div className="flex-1">
                              <p style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{v.modelo}</p>
                              <p style={{ fontSize: 12, color: c.textMuted }}>{v.ano} • {v.cor} • {v.placa}</p>
                            </div>
                            {formVeiculoId === v.id && (
                              <CheckCircle2 size={22} style={{ color: c.accent }} />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Summary so far */}
                      <div className="rounded-xl p-3 space-y-1" style={{ backgroundColor: c.textGhost }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Resumo até aqui</p>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Rota: <strong style={{ color: c.text }}>{formNome}</strong></p>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Local: <strong style={{ color: c.text }}>{formCidade}/{formUf}</strong></p>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Paradas: <strong style={{ color: c.text }}>{formPontos.length}</strong></p>
                      </div>

                      <motion.button
                        onClick={() => canProceedStep1 && setCreateStep(2)}
                        className="w-full py-3.5 rounded-xl text-white cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          fontSize: 15, fontWeight: 600,
                          backgroundColor: canProceedStep1 ? c.accent : c.textFaint,
                          opacity: canProceedStep1 ? 1 : 0.5,
                        }}
                        whileTap={canProceedStep1 ? { scale: 0.98 } : {}}
                      >
                        Próximo: Definir Valor <ChevronRight size={18} />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ─── STEP 2: Set price ─── */}
                  {createStep === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <motion.button onClick={() => setCreateStep(1)} className="flex items-center gap-1 cursor-pointer" style={{ fontSize: 13, color: c.textMuted }} whileTap={{ scale: 0.95 }}>
                        <ChevronLeft size={16} /> Voltar
                      </motion.button>

                      <p style={{ fontSize: 14, color: c.text, fontWeight: 500 }}>Defina o valor cobrado do aluno:</p>

                      {/* Value input */}
                      <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: c.textGhost, border: `1px solid ${c.border}` }}>
                        <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 8 }}>Valor da aula (R$)</p>
                        <div className="flex items-center justify-center gap-1">
                          <span style={{ fontSize: 28, fontWeight: 700, color: c.textFaint, fontFamily: "'Sora', sans-serif" }}>R$</span>
                          <input
                            type="number"
                            value={formValor}
                            onChange={(e) => setFormValor(e.target.value)}
                            placeholder="0,00"
                            className="text-center focus:outline-none bg-transparent"
                            style={{ fontSize: 40, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif", width: 160 }}
                            min={0}
                            step={5}
                          />
                        </div>
                      </div>

                      {/* Real-time fee breakdown */}
                      <motion.div
                        className="rounded-2xl p-4 space-y-3"
                        style={{ backgroundColor: c.accentSoft, border: `1px solid ${c.accentBorder}` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Info size={14} style={{ color: c.accent }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: c.accent, fontFamily: "'Sora', sans-serif" }}>Detalhamento em tempo real</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 14, color: c.textMuted }}>Valor cobrado do aluno</span>
                          <span style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: "'Sora', sans-serif" }}>
                            R$ {valorNum.toFixed(2).replace(".", ",")}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5" style={{ fontSize: 14, color: c.danger }}>
                            <Percent size={13} /> Taxa Siga Bem (10%)
                          </span>
                          <motion.span
                            key={taxaCalc}
                            initial={{ scale: 1.15, color: "#dc2626" }}
                            animate={{ scale: 1, color: "#dc2626" }}
                            style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}
                          >
                            - R$ {taxaCalc.toFixed(2).replace(".", ",")}
                          </motion.span>
                        </div>

                        <div className="h-px" style={{ backgroundColor: c.accentBorder }} />

                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 15, fontWeight: 700, color: c.success }}>Você recebe</span>
                          <motion.span
                            key={liquidoCalc}
                            initial={{ scale: 1.15 }}
                            animate={{ scale: 1 }}
                            style={{ fontSize: 22, fontWeight: 700, color: c.success, fontFamily: "'Sora', sans-serif" }}
                          >
                            R$ {liquidoCalc.toFixed(2).replace(".", ",")}
                          </motion.span>
                        </div>

                        {valorNum > 0 && (
                          <div className="mt-1">
                            <div className="w-full h-3 rounded-full overflow-hidden flex" style={{ backgroundColor: c.bgCard }}>
                              <motion.div className="h-full rounded-l-full" style={{ backgroundColor: c.success, width: "90%" }} initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ duration: 0.5, ease: "easeOut" }} />
                              <motion.div className="h-full rounded-r-full" style={{ backgroundColor: c.danger, width: "10%" }} initial={{ width: 0 }} animate={{ width: "10%" }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} />
                            </div>
                            <div className="flex items-center justify-between mt-1.5">
                              <span style={{ fontSize: 10, color: c.success, fontWeight: 600 }}>90% instrutor</span>
                              <span style={{ fontSize: 10, color: c.danger, fontWeight: 600 }}>10% plataforma</span>
                            </div>
                          </div>
                        )}
                      </motion.div>

                      {/* Full summary */}
                      <div className="rounded-xl p-3 space-y-1.5" style={{ backgroundColor: c.textGhost }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: c.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>Resumo completo</p>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Rota: <strong style={{ color: c.text }}>{formNome}</strong></p>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Local: <strong style={{ color: c.text }}>{formCidade}/{formUf}</strong></p>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Paradas: <strong style={{ color: c.text }}>{formPontos.map((p) => p.nome).join(" → ")}</strong></p>
                        {selectedVeiculo && (
                          <p style={{ fontSize: 13, color: c.textMuted }}>Veículo: <strong style={{ color: c.text }}>{selectedVeiculo.modelo} ({selectedVeiculo.placa})</strong></p>
                        )}
                        {formHorarios.length > 0 && (
                          <p style={{ fontSize: 13, color: c.textMuted }}>Horários: <strong style={{ color: c.text }}>{formHorarios.join(", ")}</strong></p>
                        )}
                      </div>

                      <motion.button
                        onClick={handleCreate}
                        className="w-full py-3.5 rounded-xl text-white cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          fontSize: 15, fontWeight: 600,
                          backgroundColor: canFinish ? c.accent : c.textFaint,
                          opacity: canFinish ? 1 : 0.5,
                        }}
                        whileTap={canFinish ? { scale: 0.98 } : {}}
                      >
                        <CheckCircle2 size={18} /> Criar Rota
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
