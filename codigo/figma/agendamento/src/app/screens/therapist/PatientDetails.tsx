import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { 
  ArrowLeft, TrendingUp, Pill, Activity, FileText, 
  Plus, Edit, Trash2, Eye, MoreVertical, Menu, User, Settings, HelpCircle, LogOut,
  Clock, Calendar, CheckCircle, AlertCircle, Target, BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { ProntuarioTerapeuticoDialog, ProntuarioClinicoDialog, ProntuarioAcompanhamentoDialog, AtestadoDialog, DeclaracaoDialog } from "./PatientDetailsDialogs";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showProntuarioDialog, setShowProntuarioDialog] = useState(false);
  const [prontuarioType, setProntuarioType] = useState<"terapeutico" | "clinico" | "acompanhamento" | null>(null);
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [showAtestadoDialog, setShowAtestadoDialog] = useState(false);
  const [showDeclaracaoDialog, setShowDeclaracaoDialog] = useState(false);
  const [showFABMenu, setShowFABMenu] = useState(false);
  const [showProntuarioSubmenu, setShowProntuarioSubmenu] = useState(false);
  const [showEditIndicators, setShowEditIndicators] = useState(false);
  const [editableIndicators, setEditableIndicators] = useState([
    { title: "Comunicação", value: 85, color: "#4CAF50", icon: "💬", id: "comunicacao" },
    { title: "Socialização", value: 78, color: "#64B5F6", icon: "👥", id: "socializacao" },
    { title: "Comportamento", value: 82, color: "#A5D6A7", icon: "🎯", id: "comportamento" },
    { title: "Autonomia", value: 75, color: "#81C784", icon: "🌟", id: "autonomia" },
  ]);

  // Mock patient data
  const patient = {
    id: "1",
    name: "Ana Clara Santos",
    age: 7,
    birthDate: "15/04/2019",
    condition: "TEA Leve",
    cancerType: "Leucemia - Em remissão",
    photo: "",
    guardian: {
      name: "Maria Santos",
      phone: "(11) 98765-4321",
      email: "maria.santos@email.com",
    },
  };

  const evolutionData = [
    { month: "Nov", value: 65, id: "nov" },
    { month: "Dez", value: 70, id: "dez" },
    { month: "Jan", value: 75, id: "jan" },
    { month: "Fev", value: 80, id: "fev" },
    { month: "Mar", value: 85, id: "mar" },
  ];

  const indicators = [
    { title: "Comunicação", value: 85, color: "#4CAF50", icon: "💬", id: "comunicacao" },
    { title: "Socialização", value: 78, color: "#64B5F6", icon: "👥", id: "socializacao" },
    { title: "Comportamento", value: 82, color: "#A5D6A7", icon: "🎯", id: "comportamento" },
    { title: "Autonomia", value: 75, color: "#81C784", icon: "🌟", id: "autonomia" },
  ];

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Risperidona",
      dosage: "0,5mg",
      schedule: ["08:00", "20:00"],
      days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      active: true,
    },
    {
      id: 2,
      name: "Melatonina",
      dosage: "3mg",
      schedule: ["21:00"],
      days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      active: true,
    },
  ]);

  const toggleMedicationActive = (id: number) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, active: !med.active } : med
    ));
    const medication = medications.find(med => med.id === id);
    if (medication) {
      toast.success(medication.active ? "Medicamento desativado" : "Medicamento ativado");
    }
  };

  const activities = [
    {
      id: 1,
      type: "Fonoaudiologia",
      frequency: "2x por semana",
      nextSession: "30/03/2026 - 10:00",
      therapist: "Dra. Juliana Costa",
      completed: false,
      source: "recepcao", // recepção = não editável pelo doutor
    },
    {
      id: 2,
      type: "Terapia Ocupacional",
      frequency: "3x por semana",
      nextSession: "29/03/2026 - 14:00",
      therapist: "Dr. Ricardo Lima",
      completed: false,
      source: "recepcao",
    },
    {
      id: 3,
      type: "Natação",
      frequency: "1x por semana",
      nextSession: "31/03/2026 - 09:00",
      therapist: "Prof. Carlos Silva",
      completed: false,
      source: "externa", // externa = editável por todos os doutores
    },
  ];

  const medicalHistory = [
    {
      id: 1,
      date: "20/03/2026",
      type: "Consulta",
      description: "Avaliação comportamental - Progressos significativos na interação social",
      professional: "Dra. Juliana Costa",
    },
    {
      id: 2,
      date: "15/03/2026",
      type: "Exame",
      description: "Hemograma completo - Resultados dentro da normalidade",
      professional: "Dr. Paulo Silva",
    },
    {
      id: 3,
      date: "10/03/2026",
      type: "Terapia",
      description: "Sessão de terapia ocupacional - Trabalhado coordenação motora fina",
      professional: "Dr. Ricardo Lima",
    },
  ];

  const documents = [
    { id: 1, name: "Laudo Médico - TEA", date: "10/01/2026", type: "Laudo", category: "Médico", professional: "Dr. João Santos" },
    { id: 2, name: "Relatório de Evolução - Março", date: "25/03/2026", type: "Relatório", category: "Evolução", professional: "Dr. João Santos" },
    { id: 3, name: "Atestado Médico", date: "20/03/2026", type: "Atestado", category: "Médico", professional: "Dr. João Santos" },
    { id: 4, name: "Avaliação Psicológica", date: "15/03/2026", type: "Relatório", category: "Médico", professional: "Dra. Ana Paula" },
    { id: 5, name: "Relatório de Terapia Ocupacional", date: "18/03/2026", type: "Relatório", category: "Evolução", professional: "Dr. Ricardo Lima" },
  ];

  // Organize documents: own first, then others alphabetically
  const currentProfessional = "Dr. João Santos";
  const sortedDocuments = [
    ...documents.filter(doc => doc.professional === currentProfessional),
    ...documents.filter(doc => doc.professional !== currentProfessional).sort((a, b) => a.professional.localeCompare(b.professional))
  ];

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleAddMedication = () => {
    toast.success("Medicamento adicionado com sucesso!");
    setShowMedicationDialog(false);
  };

  const handleAddProntuario = () => {
    toast.success("Registro adicionado ao prontuário!");
    setShowProntuarioDialog(false);
  };

  const handleAddActivity = () => {
    toast.success("Atividade adicionada com sucesso!");
    setShowActivityDialog(false);
  };

  const handleAddDocument = () => {
    toast.success("Documento adicionado com sucesso!");
    setShowDocumentDialog(false);
  };

  const fabMenuOptions = [
    { icon: FileText, label: "🧾 Prontuário", color: "#4CAF50", onClick: () => { setShowProntuarioSubmenu(true); } },
    { icon: FileText, label: "📄 Atestado", color: "#E91E63", onClick: () => { setShowAtestadoDialog(true); setShowFABMenu(false); } },
    { icon: FileText, label: "📄 Declaração", color: "#00BCD4", onClick: () => { setShowDeclaracaoDialog(true); setShowFABMenu(false); } },
    { icon: Pill, label: "💊 Medicamento", color: "#FF9800", onClick: () => { setShowMedicationDialog(true); setShowFABMenu(false); } },
  ];

  const prontuarioSubmenuOptions = [
    { icon: FileText, label: "🧠 Terapêutico", color: "#4CAF50", onClick: () => { setProntuarioType("terapeutico"); setShowProntuarioDialog(true); setShowProntuarioSubmenu(false); setShowFABMenu(false); } },
    { icon: FileText, label: "🩺 Clínico", color: "#64B5F6", onClick: () => { setProntuarioType("clinico"); setShowProntuarioDialog(true); setShowProntuarioSubmenu(false); setShowFABMenu(false); } },
    { icon: FileText, label: "📊 Acompanhamento", color: "#9C27B0", onClick: () => { setProntuarioType("acompanhamento"); setShowProntuarioDialog(true); setShowProntuarioSubmenu(false); setShowFABMenu(false); } },
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Consulta: "#4CAF50",
      Exame: "#64B5F6",
      Terapia: "#FF9800",
      Procedimento: "#9C27B0",
    };
    return colors[type] || "#4CAF50";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white p-6 rounded-b-[32px] shadow-xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => navigate("/therapist/patients")} 
              className="p-2 hover:bg-white/20 rounded-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowProfileDialog(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowSettingsDialog(true)}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowHelpDialog(true)}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ajuda
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair / Desconectar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 shadow-lg">
              <span className="text-3xl font-semibold text-white">
                {patient.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-white text-2xl mb-1">{patient.name}</h1>
              <p className="text-green-50 text-sm mb-3">
                {patient.age} anos • {patient.birthDate}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/40 backdrop-blur-sm">
                  {patient.condition}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/40 backdrop-blur-sm">
                  {patient.cancerType}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Modern Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 bg-[#F5F5F5] pt-4 pb-3 z-20 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-1.5">
              <TabsList className="w-full h-auto bg-transparent grid grid-cols-5 gap-1">
                <TabsTrigger
                  value="dashboard"
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#66BB6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Home</span>
                </TabsTrigger>
                <TabsTrigger
                  value="prontuario"
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#66BB6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Prontuário</span>
                </TabsTrigger>
                <TabsTrigger
                  value="medicamentos"
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#66BB6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Pill className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Remédios</span>
                </TabsTrigger>
                <TabsTrigger
                  value="atividades"
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#66BB6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Activity className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Atividades</span>
                </TabsTrigger>
                <TabsTrigger
                  value="documentos"
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#66BB6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-[9px] font-medium">Docs</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="px-6 space-y-6 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-[#4CAF50]">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-[#4CAF50] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">85%</p>
                    <p className="text-xs text-gray-600 mt-1">Progresso</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-[#64B5F6]">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-[#64B5F6] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">12</p>
                    <p className="text-xs text-gray-600 mt-1">Sessões</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-[#FF9800]">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-[#FF9800] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">3</p>
                    <p className="text-xs text-gray-600 mt-1">Metas</p>
                  </div>
                </div>
              </div>

              {/* Guardian Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4CAF50]" />
                  Informações do Responsável
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Nome:</span>
                    <span className="text-gray-800 font-medium">{patient.guardian.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Telefone:</span>
                    <span className="text-gray-800 font-medium">{patient.guardian.phone}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-800 font-medium text-xs">{patient.guardian.email}</span>
                  </div>
                </div>
              </div>

              {/* Evolution Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
                    Evolução Terapêutica
                  </h3>
                  <Badge variant="secondary" className="bg-[#E8F5E9] text-[#4CAF50]">
                    +20% este mês
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="month" stroke="#9E9E9E" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9E9E9E" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #E0E0E0', 
                        borderRadius: '12px',
                        padding: '8px 12px'
                      }} 
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4CAF50"
                      strokeWidth={3}
                      dot={{ fill: "#4CAF50", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Development Indicators */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-gray-800 font-semibold">Indicadores de Desenvolvimento</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowEditIndicators(!showEditIndicators)}
                    className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    {showEditIndicators ? "Salvar" : "Editar"}
                  </Button>
                </div>
                <div className="space-y-5">
                  {editableIndicators.map((indicator, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{indicator.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{indicator.title}</span>
                        </div>
                        {showEditIndicators ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={indicator.value}
                            onChange={(e) => {
                              const newValue = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                              setEditableIndicators(editableIndicators.map((ind, i) =>
                                i === index ? { ...ind, value: newValue } : ind
                              ));
                            }}
                            className="w-16 px-2 py-1 text-sm font-bold text-gray-800 border border-[#4CAF50] rounded-lg text-center"
                          />
                        ) : (
                          <span className="text-sm font-bold text-gray-800">
                            {indicator.value}%
                          </span>
                        )}
                      </div>
                      <Progress value={indicator.value} className="h-3" style={{
                        backgroundColor: '#E0E0E0'
                      }} />
                    </motion.div>
                  ))}
                </div>
                {showEditIndicators && (
                  <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <p className="text-xs text-emerald-700">
                      <strong>Atualização em tempo real:</strong> As mudanças são salvas automaticamente e refletem a evolução do paciente.
                    </p>
                  </div>
                )}
              </div>

              {/* Next Appointment */}
              <div className="bg-gradient-to-br from-[#E8F5E9] to-[#E3F2FD] rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4CAF50] flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold mb-1">Próxima Consulta</h4>
                    <p className="text-sm text-gray-700 mb-2">Fonoaudiologia com Dra. Juliana Costa</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white text-[#4CAF50]">
                        30/03/2026 - 10:00
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Prontuário Tab */}
          <TabsContent value="prontuario" className="px-6 space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Timeline */}
              <div className="space-y-4">
                {medicalHistory.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-md relative overflow-hidden group hover:shadow-xl transition-all"
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5" 
                      style={{ backgroundColor: getTypeColor(record.type) }}
                    />
                    <div className="ml-3">
                      <div className="flex items-start justify-between mb-3">
                        <Badge 
                          variant="secondary" 
                          className="text-xs font-semibold"
                          style={{ 
                            backgroundColor: `${getTypeColor(record.type)}15`,
                            color: getTypeColor(record.type)
                          }}
                        >
                          {record.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{record.date}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2 leading-relaxed">{record.description}</p>
                      <p className="text-xs text-gray-600 mb-3">{record.professional}</p>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="h-8 text-[#4CAF50] hover:text-[#4CAF50] hover:bg-[#E8F5E9]">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 text-[#64B5F6] hover:text-[#64B5F6] hover:bg-blue-50">
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medicamentos" className="px-6 space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >

              {medications.map((med, index) => (
                <motion.div
                  key={med.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all ${
                    !med.active ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                      med.active
                        ? 'bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      <Pill className={`w-7 h-7 ${med.active ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-gray-800 font-semibold text-lg">{med.name}</h4>
                          <p className="text-sm text-gray-600">Dosagem: {med.dosage}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${med.active ? 'text-green-600' : 'text-gray-500'}`}>
                            {med.active ? 'Ativado' : 'Desativado'}
                          </span>
                          <Switch
                            checked={med.active}
                            onCheckedChange={() => toggleMedicationActive(med.id)}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2">Horários:</p>
                        <div className="flex flex-wrap gap-2">
                          {med.schedule.map((time, idx) => (
                            <Badge key={idx} className={med.active ? "bg-[#4CAF50] text-white" : "bg-gray-400 text-white"}>
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2">Dias da semana:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {med.days.map((day, idx) => (
                            <span key={idx} className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
                              med.active ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <Button size="sm" variant="outline" className="flex-1 border-[#64B5F6] text-[#64B5F6] hover:bg-blue-50">
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-red-300 text-red-500 hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="atividades" className="px-6 space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Info Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <p className="text-xs text-emerald-700">
                  <strong>Tipos:</strong> Atividades externas e consultas. <strong>Regra:</strong> Consultas são criadas pela recepção e não podem ser editadas pelo doutor. Use o botão "+" para criar atividades externas.
                </p>
              </div>

              {/* Add Activity Button */}
              <Button
                onClick={() => setShowActivityDialog(true)}
                className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#45a049] hover:to-[#5da85f] text-white rounded-xl py-6 shadow-lg flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Criar Nova Atividade</span>
              </Button>

              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all ${
                    activity.completed ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${
                      activity.completed 
                        ? 'bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]' 
                        : 'bg-gradient-to-br from-blue-50 to-blue-100'
                    } flex items-center justify-center shadow-md`}>
                      {activity.completed ? (
                        <CheckCircle className="w-7 h-7 text-[#4CAF50]" />
                      ) : (
                        <Activity className="w-7 h-7 text-[#64B5F6]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-semibold text-lg ${
                          activity.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                        }`}>
                          {activity.type}
                        </h4>
                        <Badge variant="secondary" className={
                          activity.source === 'recepcao'
                            ? 'bg-blue-100 text-blue-700 text-xs'
                            : 'bg-green-100 text-green-700 text-xs'
                        }>
                          {activity.source === 'recepcao' ? 'Recepção' : 'Externa'}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm mb-3">
                        <p className="text-gray-600">
                          <span className="font-medium">Frequência:</span> {activity.frequency}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Próxima:</span> {activity.nextSession}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Profissional:</span> {activity.therapist}
                        </p>
                      </div>

                      {activity.source === 'recepcao' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                          <p className="text-xs text-blue-700">
                            <strong>Atenção:</strong> Atividade criada pela recepção. Não pode ser editada pelo doutor.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {!activity.completed && (
                          <Button size="sm" className="bg-[#4CAF50] hover:bg-[#45a049]">
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            Concluir
                          </Button>
                        )}
                        {activity.source === 'externa' && (
                          <>
                            <Button size="sm" variant="outline" className="border-[#64B5F6] text-[#64B5F6]">
                              <Edit className="w-3.5 h-3.5 mr-1" />
                              Editar
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-500">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                        {activity.source === 'recepcao' && (
                          <Button size="sm" variant="outline" disabled className="border-gray-300 text-gray-400 cursor-not-allowed">
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Somente visualização
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documentos" className="px-6 space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Document Upload Area */}
              <div
                onClick={() => setShowDocumentDialog(true)}
                className="w-full border-2 border-dashed border-[#4CAF50] rounded-2xl p-8 bg-gradient-to-br from-[#E8F5E9] to-white hover:from-[#E8F5E9] hover:to-[#E8F5E9] transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-800 font-semibold mb-1">Adicionar Documento</p>
                    <p className="text-sm text-gray-600">Clique para selecionar ou arraste aqui</p>
                    <p className="text-xs text-gray-500 mt-2">PDF, Imagens ou Documentos</p>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="text-gray-800 font-semibold mb-4">Documentos Clínicos</h3>

                {/* My Documents */}
                {sortedDocuments.filter(doc => doc.type !== "Atestado" && doc.professional === currentProfessional).length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Meus Documentos</p>
                    <div className="space-y-3">
                      {sortedDocuments.filter(doc => doc.type !== "Atestado" && doc.professional === currentProfessional).map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl hover:shadow-md transition-all cursor-pointer group border-l-4 border-emerald-500"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center shadow-md">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{doc.date} • {doc.professional}</p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700">
                            {doc.type}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Professionals' Documents */}
                {sortedDocuments.filter(doc => doc.type !== "Atestado" && doc.professional !== currentProfessional).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Documentos de Outros Profissionais</p>
                    <div className="space-y-3">
                      {sortedDocuments.filter(doc => doc.type !== "Atestado" && doc.professional !== currentProfessional).map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#F5F5F5] to-white rounded-xl hover:shadow-md transition-all cursor-pointer group border-l-4 border-gray-300"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-md">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{doc.date} • {doc.professional}</p>
                          </div>
                          <Badge className="bg-gray-100 text-gray-700">
                            {doc.type}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-24 right-6 z-30">
        <AnimatePresence>
          {showFABMenu && !showProntuarioSubmenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 space-y-3 max-h-[70vh] overflow-y-auto pb-2"
            >
              {fabMenuOptions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={item.onClick}
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap pr-2">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {showProntuarioSubmenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 space-y-3 max-h-[70vh] overflow-y-auto pb-2"
            >
              {/* Back button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => setShowProntuarioSubmenu(false)}
                className="flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white">
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap pr-2">
                  Voltar
                </span>
              </motion.button>

              {/* Prontuario type options */}
              {prontuarioSubmenuOptions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: (index + 1) * 0.05 }}
                    onClick={item.onClick}
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap pr-2">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (showProntuarioSubmenu) {
              setShowProntuarioSubmenu(false);
            } else {
              setShowFABMenu(!showFABMenu);
            }
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all"
        >
          <motion.div
            animate={{ rotate: showFABMenu || showProntuarioSubmenu ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="max-w-sm mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Você será redirecionado para a tela inicial de login.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Medication Dialog */}
      <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
        <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Medicamento</DialogTitle>
            <DialogDescription>
              Adicione um novo medicamento ao tratamento do paciente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs text-blue-700">
                <strong>Visibilidade:</strong> Medicamentos ativados aparecem para o paciente/família. Desativados ficam ocultos.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="med-name">Nome do Medicamento *</Label>
              <Input id="med-name" placeholder="Ex: Risperidona" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="med-dosage">Dosagem *</Label>
              <Input id="med-dosage" placeholder="Ex: 0,5mg, 10ml" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="med-schedule">Horários *</Label>
              <Input id="med-schedule" placeholder="Ex: 08:00, 14:00, 20:00" required />
              <p className="text-xs text-gray-500">Separe múltiplos horários por vírgula</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="med-days">Dias da Semana</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
                  <label key={day} className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="med-notes">Observações</Label>
              <Textarea id="med-notes" placeholder="Informações adicionais sobre o medicamento..." rows={3} />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <Label htmlFor="med-active" className="cursor-pointer">Medicamento ativo (visível para família)</Label>
              <Switch id="med-active" defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMedicationDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddMedication} className="bg-[#4CAF50] hover:bg-[#45a049]">
              Adicionar Medicamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Prontuário Dialogs */}
      {prontuarioType === "terapeutico" && (
        <ProntuarioTerapeuticoDialog
          open={showProntuarioDialog}
          onOpenChange={(open) => {
            setShowProntuarioDialog(open);
            if (!open) setProntuarioType(null);
          }}
          onSave={() => {
            handleAddProntuario();
            setProntuarioType(null);
          }}
        />
      )}

      {prontuarioType === "clinico" && (
        <ProntuarioClinicoDialog
          open={showProntuarioDialog}
          onOpenChange={(open) => {
            setShowProntuarioDialog(open);
            if (!open) setProntuarioType(null);
          }}
          onSave={() => {
            handleAddProntuario();
            setProntuarioType(null);
          }}
        />
      )}

      {prontuarioType === "acompanhamento" && (
        <ProntuarioAcompanhamentoDialog
          open={showProntuarioDialog}
          onOpenChange={(open) => {
            setShowProntuarioDialog(open);
            if (!open) setProntuarioType(null);
          }}
          onSave={() => {
            handleAddProntuario();
            setProntuarioType(null);
          }}
        />
      )}

      {/* Atestado Dialog */}
      <AtestadoDialog
        open={showAtestadoDialog}
        onOpenChange={setShowAtestadoDialog}
        onSave={() => {
          toast.success("Atestado gerado com sucesso!");
          setShowAtestadoDialog(false);
        }}
      />

      {/* Declaração Dialog */}
      <DeclaracaoDialog
        open={showDeclaracaoDialog}
        onOpenChange={setShowDeclaracaoDialog}
        onSave={() => {
          toast.success("Declaração gerada com sucesso!");
          setShowDeclaracaoDialog(false);
        }}
      />

      {/* Add Activity Dialog */}
      <Dialog open={showActivityDialog} onOpenChange={setShowActivityDialog}>
        <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nova Atividade Externa</DialogTitle>
            <DialogDescription>
              Adicione uma nova atividade externa para o paciente. Atividades externas podem ser editadas por todos os doutores.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-xs text-green-700">
                <strong>Atividade Externa:</strong> Pode ser editada por qualquer doutor. Diferente das consultas da recepção que são apenas visualização.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-type">Tipo de Atividade *</Label>
              <Input id="activity-type" placeholder="Ex: Natação, Arteterapia, Musicoterapia..." required />
              <p className="text-xs text-gray-500">Campo livre - você pode criar qualquer tipo de atividade</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-frequency">Frequência *</Label>
              <Input id="activity-frequency" placeholder="Ex: 2x por semana" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-therapist">Profissional Responsável</Label>
              <Input id="activity-therapist" placeholder="Nome do profissional (se aplicável)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-next">Próxima Sessão</Label>
              <Input id="activity-next" type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-notes">Observações</Label>
              <Textarea id="activity-notes" placeholder="Informações adicionais sobre a atividade..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActivityDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddActivity} className="bg-[#4CAF50] hover:bg-[#45a049]">
              Adicionar Atividade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Document Dialog */}
      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Documento Clínico</DialogTitle>
            <DialogDescription>
              Adicione um documento clínico ao prontuário. Profissionais podem visualizar documentos de outros profissionais.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="doc-type">Tipo de Documento *</Label>
              <Select required>
                <SelectTrigger id="doc-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laudo">Laudo Médico</SelectItem>
                  <SelectItem value="relatorio">Relatório de Evolução</SelectItem>
                  <SelectItem value="exame">Resultado de Exame</SelectItem>
                  <SelectItem value="parecer">Parecer Técnico</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-name">Nome do Documento *</Label>
              <Input id="doc-name" placeholder="Ex: Laudo Neurológico" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-file">Arquivo (PDF, Imagem) *</Label>
              <Input id="doc-file" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-description">Descrição</Label>
              <Textarea id="doc-description" placeholder="Descrição ou observações sobre o documento..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-responsible">Profissional Responsável *</Label>
              <Input id="doc-responsible" placeholder="Nome do profissional" required defaultValue="Dr. João Santos" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddDocument} className="bg-[#4CAF50] hover:bg-[#45a049]">
              Adicionar Documento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Standard Dialogs */}
      <ProfileDialog open={showProfileDialog} onOpenChange={setShowProfileDialog} userType="doctor" />
      <SettingsDialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog} />
      <HelpDialog open={showHelpDialog} onOpenChange={setShowHelpDialog} />
    </div>
  );
}