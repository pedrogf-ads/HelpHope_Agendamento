import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

type AppointmentStatus = "confirmed" | "pending" | "cancelled";

interface Appointment {
  id: string;
  patient: string;
  type: string;
  time: string;
  status: AppointmentStatus;
  therapist: string;
}

export default function TherapistSchedule() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 28)); // March 28, 2026
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const appointments: Appointment[] = [
    {
      id: "1",
      patient: "Ana Clara Santos",
      type: "Fonoaudiologia",
      time: "09:00",
      status: "confirmed",
      therapist: "Dra. Juliana Costa",
    },
    {
      id: "2",
      patient: "Pedro Oliveira",
      type: "Terapia Ocupacional",
      time: "10:30",
      status: "confirmed",
      therapist: "Dr. Ricardo Lima",
    },
    {
      id: "3",
      patient: "Lucas Ferreira",
      type: "Psicologia",
      time: "14:00",
      status: "pending",
      therapist: "Dra. Fernanda Alves",
    },
    {
      id: "4",
      patient: "Maria Eduarda Silva",
      type: "Fisioterapia",
      time: "15:30",
      status: "confirmed",
      therapist: "Dr. Carlos Mendes",
    },
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  const getWeekDays = () => {
    const current = new Date(selectedDate);
    const week = [];
    const day = current.getDay();
    const diff = current.getDate() - day;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(current);
      date.setDate(diff + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDays();

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return { bg: "#E8F5E9", text: "#4CAF50", label: "Confirmado" };
      case "pending":
        return { bg: "#FFF3E0", text: "#FF9800", label: "Pendente" };
      case "cancelled":
        return { bg: "#FFEBEE", text: "#F44336", label: "Cancelado" };
    }
  };

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Agenda"
        subtitle="Dr. João Silva - Terapeuta"
        bgGradient="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        {/* Date Navigation */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <p className="text-white">Março 2026</p>
              <p className="text-green-50 text-sm mt-1">
                {selectedDate.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric"
                })}
              </p>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1">
            {weekDates.map((date, index) => {
              const isToday = date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    isToday
                      ? "bg-white text-[#4CAF50]"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <span className="text-xs mb-1">{weekDays[date.getDay()]}</span>
                  <span className={`text-sm ${isToday ? "font-semibold" : ""}`}>
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PageHeader>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-semibold text-[#4CAF50]">
              {appointments.filter(a => a.status === "confirmed").length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Confirmadas</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-semibold text-[#FF9800]">
              {appointments.filter(a => a.status === "pending").length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Pendentes</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-semibold text-gray-800">{appointments.length}</p>
            <p className="text-xs text-gray-600 mt-1">Total</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          <h3 className="text-gray-800">Consultas do Dia</h3>
          
          {appointments.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Nenhuma consulta agendada para hoje</p>
            </div>
          ) : (
            appointments.map((appointment) => {
              const statusInfo = getStatusColor(appointment.status);
              return (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                        <Clock className="w-6 h-6 text-[#4CAF50]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{appointment.time}</p>
                        <p className="text-xs text-gray-600">{appointment.type}</p>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: statusInfo.bg,
                        color: statusInfo.text,
                      }}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  
                  <div className="pl-15 space-y-1">
                    <p className="text-sm text-gray-800">
                      <span className="text-gray-600">Paciente:</span>{" "}
                      <span className="font-medium">{appointment.patient}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      <span>Profissional:</span> {appointment.therapist}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Read-only Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <CalendarIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-900 mb-1">
                Visualização de Agenda
              </div>
              <div className="text-sm text-blue-700">
                Profissionais de saúde podem visualizar os agendamentos mas não podem editá-los.
                Para alterações, entre em contato com a recepção ou administração.
              </div>
            </div>
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