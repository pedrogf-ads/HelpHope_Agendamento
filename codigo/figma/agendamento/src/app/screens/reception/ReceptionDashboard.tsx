import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { StatsCard } from "../../components/common/StatsCard";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

export default function ReceptionDashboard() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      icon: Calendar,
      iconColor: "#14B8A6",
      iconBgColor: "#E6FFFA"
    },
    {
      title: "Pacientes Ativos",
      value: "48",
      icon: Users,
      iconColor: "#10B981",
      iconBgColor: "#D1FAE5"
    },
    {
      title: "Próximo Horário",
      value: "14:30",
      icon: Clock,
      iconColor: "#F59E0B",
      iconBgColor: "#FEF3C7"
    },
    {
      title: "Concluídos Hoje",
      value: "8",
      icon: CheckCircle,
      iconColor: "#8B5CF6",
      iconBgColor: "#EDE9FE"
    }
  ];

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  const todayAppointments = [
    { time: "14:30", patient: "Maria Silva", doctor: "Dr. João Santos", type: "Consulta" },
    { time: "15:00", patient: "Pedro Costa", doctor: "Dra. Ana Paula", type: "Retorno" },
    { time: "16:00", patient: "Lucas Oliveira", doctor: "Dr. João Santos", type: "Terapia" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Olá, Maria Silva"
        subtitle="Recepção - ASIPECA"
        bgGradient="bg-gradient-to-br from-emerald-500 to-green-500"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4 max-w-md">
          <p className="text-white text-sm">Data: 19 de Abril, 2026</p>
          <p className="text-green-50 text-xs mt-1">12 agendamentos para hoje</p>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Próximos Agendamentos</h2>
                <p className="text-sm text-gray-600">Agendamentos para hoje</p>
              </div>
              <button
                onClick={() => navigate("/reception/schedule")}
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
              >
                Ver todos
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {todayAppointments.map((apt, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-4">
                    <Clock className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-bold text-gray-900">{apt.time}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {apt.type}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">Paciente:</span> {apt.patient}
                      </div>
                      <div>
                        <span className="font-semibold">Profissional:</span> {apt.doctor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/reception/schedule")}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl text-left"
          >
            <Calendar className="w-8 h-8 mb-3" />
            <div className="font-bold text-xl mb-1">Novo Agendamento</div>
            <div className="text-sm text-emerald-100">Agendar nova consulta ou atendimento</div>
          </button>

          <button
            onClick={() => navigate("/reception/patients")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl text-left"
          >
            <Users className="w-8 h-8 mb-3" />
            <div className="font-bold text-xl mb-1">Ver Pacientes</div>
            <div className="text-sm text-blue-100">Acessar lista completa de pacientes</div>
          </button>
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
        userType="reception"
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
