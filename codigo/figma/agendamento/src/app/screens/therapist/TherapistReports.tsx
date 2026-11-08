import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Activity, Download } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

export default function TherapistReports() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const therapyData = [
    { name: "Fonoaudiologia", value: 18, color: "#4CAF50", id: "therapy-fono" },
    { name: "Terapia Ocupacional", value: 15, color: "#64B5F6", id: "therapy-to" },
    { name: "Psicologia", value: 12, color: "#A5D6A7", id: "therapy-psico" },
    { name: "Fisioterapia", value: 8, color: "#81C784", id: "therapy-fisio" },
  ];

  const monthlyEvolution = [
    { month: "Nov", sessions: 45, evolution: 68, id: "nov-2025" },
    { month: "Dez", sessions: 48, evolution: 72, id: "dez-2025" },
    { month: "Jan", sessions: 52, evolution: 75, id: "jan-2026" },
    { month: "Fev", sessions: 50, evolution: 77, id: "fev-2026" },
    { month: "Mar", sessions: 53, evolution: 80, id: "mar-2026" },
  ];


  const patientDistribution = [
    { range: "0-5 anos", count: 8, id: "age-0-5" },
    { range: "6-10 anos", count: 12, id: "age-6-10" },
    { range: "11-15 anos", count: 4, id: "age-11-15" },
  ];

  const stats = [
    {
      title: "Total de Sessões",
      value: "53",
      subtitle: "Este mês",
      icon: Activity,
      color: "#4CAF50",
    },
    {
      title: "Taxa de Evolução",
      value: "80%",
      subtitle: "+3% vs mês anterior",
      icon: TrendingUp,
      color: "#64B5F6",
    },
    {
      title: "Pacientes Ativos",
      value: "24",
      subtitle: "Em acompanhamento",
      icon: Users,
      color: "#A5D6A7",
    },
  ];

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Relatórios"
        subtitle="Dr. João Silva - Terapeuta"
        bgGradient="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4 max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Período: Março 2026</p>
              <p className="text-green-50 text-xs mt-1">Relatório gerado em 28/03/2026</p>
            </div>
            <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </PageHeader>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-3 shadow-sm">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Therapy Distribution */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-800 mb-4">Distribuição de Terapias</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart id="therapy-pie-chart">
                <Pie
                  data={therapyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {therapyData.map((entry, index) => (
                    <Cell key={`therapy-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {therapyData.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-xs text-gray-700">{item.name}</p>
                    <p className="text-xs font-semibold text-gray-800">{item.value} sessões</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Evolution */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-800 mb-4">Evolução Mensal</h3>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyEvolution} id="monthly-evolution-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <Tooltip content={<div />} />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#64B5F6"
                strokeWidth={2}
                dot={{ fill: "#64B5F6", r: 4 }}
                name="Sessões"
              />
              <Line
                type="monotone"
                dataKey="evolution"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ fill: "#4CAF50", r: 4 }}
                name="Evolução %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Distribution */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-800 mb-4">Distribuição por Faixa Etária</h3>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={patientDistribution} id="patient-distribution-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="range" stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <Tooltip content={<div />} />
              <Bar dataKey="count" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="bg-[#E8F5E9] border-2 border-[#4CAF50] rounded-2xl p-4">
          <h4 className="text-[#4CAF50] mb-3">Resumo do Período</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Total de atendimentos:</span>
              <span className="font-semibold text-gray-800">53 sessões</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Taxa de presença:</span>
              <span className="font-semibold text-gray-800">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Evolução média:</span>
              <span className="font-semibold text-[#4CAF50]">+12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Novos pacientes:</span>
              <span className="font-semibold text-gray-800">3</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button className="w-full py-4 bg-[#4CAF50] text-white rounded-2xl shadow-md hover:bg-[#45a049] transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Relatório Completo
        </button>
      </div>

      {/* Dialogs */}
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
      <ProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        userType="doctor"
      />
      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
      <HelpDialog
        open={showHelpDialog}
        onOpenChange={setShowHelpDialog}
      />
    </div>
  );
}