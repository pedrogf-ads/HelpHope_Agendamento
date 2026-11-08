import { Activity, Users, TrendingUp, UserCheck, ChevronRight } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { StatsCard } from "../../components/common/StatsCard";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const stats = [
    {
      title: "Evolução das Terapias",
      value: "78%",
      icon: TrendingUp,
      color: "#4CAF50",
      bgColor: "#E8F5E9",
    },
    {
      title: "Pacientes Ativos",
      value: "24",
      icon: Users,
      color: "#64B5F6",
      bgColor: "#E3F2FD",
    },
    {
      title: "Colaboradores",
      value: "12",
      icon: UserCheck,
      color: "#4CAF50",
      bgColor: "#E8F5E9",
    },
  ];

  const evolutionData = [
    { month: "Jan", value: 65, id: "jan-2026" },
    { month: "Fev", value: 68, id: "fev-2026" },
    { month: "Mar", value: 72, id: "mar-2026" },
    { month: "Abr", value: 75, id: "abr-2026" },
    { month: "Mai", value: 78, id: "mai-2026" },
  ];

  const distributionData = [
    { name: "TEA Leve", value: 8, color: "#4CAF50", id: "tea-leve" },
    { name: "TEA Moderado", value: 10, color: "#64B5F6", id: "tea-moderado" },
    { name: "TEA Severo", value: 6, color: "#A5D6A7", id: "tea-severo" },
  ];

  const activitiesData = [
    { name: "Fonoaudiologia", value: 18, id: "atividade-fono" },
    { name: "Terapia Ocupacional", value: 15, id: "atividade-to" },
    { name: "Psicologia", value: 12, id: "atividade-psico" },
    { name: "Fisioterapia", value: 8, id: "atividade-fisio" },
  ];

  const recentActivities = [
    { patient: "Ana Clara Santos", activity: "Sessão de Fonoaudiologia", time: "09:00" },
    { patient: "Pedro Oliveira", activity: "Terapia Ocupacional", time: "10:30" },
    { patient: "Lucas Ferreira", activity: "Avaliação Psicológica", time: "14:00" },
  ];

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Olá, Dr. João Silva"
        subtitle="Terapeuta - ASIPECA"
        bgGradient="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4 max-w-md">
          <p className="text-white text-sm">Data: 28 de Março, 2026</p>
          <p className="text-green-50 text-xs mt-1">3 sessões agendadas para hoje</p>
        </div>
      </PageHeader>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.color}
              iconBgColor={stat.bgColor}
            />
          ))}
        </div>

        {/* Evolution Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-800 mb-4">Evolução Mensal</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={evolutionData} id="evolution-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <Tooltip content={<div />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4CAF50"
                strokeWidth={3}
                dot={{ fill: "#4CAF50", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-800 mb-4">Distribuição de Pacientes</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart id="distribution-chart">
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`dist-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {distributionData.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-700">{item.name}</span>
                  <span className="text-xs font-semibold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-800 mb-4">Atividades Semanais</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activitiesData} id="activities-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="name" stroke="#9E9E9E" style={{ fontSize: '10px' }} angle={-15} textAnchor="end" height={60} />
              <YAxis stroke="#9E9E9E" style={{ fontSize: '12px' }} />
              <Tooltip content={<div />} />
              <Bar dataKey="value" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Atividades Recentes</h3>
            <button className="text-[#4CAF50] text-sm">Ver todas</button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={`activity-${index}`} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.patient}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{activity.activity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
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