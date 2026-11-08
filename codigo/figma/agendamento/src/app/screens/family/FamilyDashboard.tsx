import { Clock, Pill, Activity, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

export default function FamilyDashboard() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const child = {
    name: "Ana Clara",
    age: 7,
    photo: "",
  };

  const dailyRoutine = [
    { time: "08:00", activity: "Café da manhã", icon: "🍽️", done: true },
    { time: "09:00", activity: "Medicamento - Risperidona 0,5mg", icon: "💊", done: true },
    { time: "10:00", activity: "Sessão de Fonoaudiologia", icon: "🗣️", done: false },
    { time: "12:00", activity: "Almoço", icon: "🍽️", done: false },
    { time: "14:00", activity: "Atividade sensorial", icon: "🎨", done: false },
    { time: "20:00", activity: "Medicamento - Risperidona 0,5mg", icon: "💊", done: false },
    { time: "21:00", activity: "Medicamento - Melatonina 3mg", icon: "💊", done: false },
  ];

  const medications = [
    {
      name: "Risperidona",
      dosage: "0,5mg",
      times: ["08:00", "20:00"],
      color: "#4CAF50",
    },
    {
      name: "Melatonina",
      dosage: "3mg",
      times: ["21:00"],
      color: "#64B5F6",
    },
  ];

  const weekActivities = [
    { day: "Segunda", activities: ["Fonoaudiologia 10h", "Terapia Ocupacional 14h"] },
    { day: "Terça", activities: ["Terapia Ocupacional 14h"] },
    { day: "Quarta", activities: ["Fonoaudiologia 10h", "Psicologia 15h"] },
    { day: "Quinta", activities: ["Terapia Ocupacional 14h"] },
    { day: "Sexta", activities: ["Fonoaudiologia 10h"] },
  ];

  const currentDay = "Quarta"; // Mock

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title={`Olá, ${child.name}!`}
        subtitle={`${child.age} anos`}
        bgGradient="bg-gradient-to-br from-orange-500 to-amber-500"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4 max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Quarta-feira, 28 de Março</p>
              <p className="text-white/80 text-xs mt-1">3 atividades hoje</p>
            </div>
            <Heart className="w-8 h-8 text-white/80" />
          </div>
        </div>
      </PageHeader>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Daily Routine */}
        <div className="space-y-3">
          <h3 className="text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#4CAF50]" />
            Rotina de Hoje
          </h3>

          <div className="space-y-2">
            {dailyRoutine.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-4 shadow-sm ${
                  item.done ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      item.done ? "bg-gray-100" : "bg-[#E8F5E9]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        item.done
                          ? "text-gray-500 line-through"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {item.activity}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                  {item.done && (
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="space-y-3">
          <h3 className="text-gray-800 flex items-center gap-2">
            <Pill className="w-5 h-5 text-[#64B5F6]" />
            Medicamentos
          </h3>

          <div className="grid gap-3">
            {medications.map((med, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm border-l-4"
                style={{ borderColor: med.color }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-gray-800">{med.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">Dosagem: {med.dosage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Horários:</p>
                    {med.times.map((time, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs rounded-full mr-1 mb-1"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Week Activities */}
        <div className="space-y-3">
          <h3 className="text-gray-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#4CAF50]" />
            Atividades da Semana
          </h3>

          <div className="space-y-2">
            {weekActivities.map((day, index) => {
              const isToday = day.day === currentDay;
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-4 shadow-sm ${
                    isToday
                      ? "bg-gradient-to-r from-[#4CAF50] to-[#64B5F6] text-white"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`px-3 py-1 rounded-xl ${
                        isToday ? "bg-white/20" : "bg-[#E8F5E9]"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          isToday ? "text-white" : "text-[#4CAF50]"
                        }`}
                      >
                        {day.day}
                      </p>
                    </div>
                    <div className="flex-1">
                      {day.activities.map((activity, idx) => (
                        <p
                          key={idx}
                          className={`text-sm ${
                            isToday ? "text-white" : "text-gray-700"
                          }`}
                        >
                          • {activity}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-[#E8F5E9] to-blue-50 rounded-2xl p-6 text-center">
          <Heart className="w-12 h-12 text-[#4CAF50] mx-auto mb-3" />
          <h4 className="text-gray-800 mb-2">Você está indo muito bem!</h4>
          <p className="text-sm text-gray-600">
            Continue seguindo a rotina para o melhor desenvolvimento da Ana Clara.
          </p>
        </div>

        {/* Contact Button */}
        <button className="w-full py-4 bg-[#4CAF50] text-white rounded-2xl shadow-md hover:bg-[#45a049] transition-all">
          Entrar em Contato com a Equipe
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
        userType="family"
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