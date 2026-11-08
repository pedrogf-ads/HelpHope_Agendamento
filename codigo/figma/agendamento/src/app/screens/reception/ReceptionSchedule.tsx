import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, Clock, User, FileText, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled";
};

export default function ReceptionSchedule() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Maria Silva",
      doctorName: "Dr. João Santos",
      date: "2026-04-20",
      time: "09:00",
      type: "Consulta Inicial",
      status: "scheduled"
    },
    {
      id: "2",
      patientName: "Pedro Costa",
      doctorName: "Dra. Ana Paula",
      date: "2026-04-20",
      time: "10:30",
      type: "Retorno",
      status: "scheduled"
    },
    {
      id: "3",
      patientName: "Lucas Oliveira",
      doctorName: "Dr. João Santos",
      date: "2026-04-21",
      time: "14:00",
      type: "Terapia",
      status: "scheduled"
    }
  ]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    if (editingAppointment) {
      // Atualizar agendamento existente
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === editingAppointment.id
            ? {
                ...apt,
                patientName: formData.get('patient') as string || apt.patientName,
                doctorName: formData.get('doctor') as string || apt.doctorName,
                date: formData.get('date') as string || apt.date,
                time: formData.get('time') as string || apt.time,
                type: formData.get('type') as string || apt.type,
              }
            : apt
        )
      );
      showSuccess("Agendamento atualizado com sucesso!");
      setEditingAppointment(null);
    } else {
      // Criar novo agendamento
      const newAppointment: Appointment = {
        id: String(Date.now()),
        patientName: formData.get('patient') as string || "Paciente",
        doctorName: formData.get('doctor') as string || "Profissional",
        date: formData.get('date') as string || new Date().toISOString().split('T')[0],
        time: formData.get('time') as string || "09:00",
        type: formData.get('type') as string || "Consulta",
        status: "scheduled"
      };
      setAppointments(prev => [...prev, newAppointment]);
      showSuccess("Agendamento criado com sucesso!");
    }

    setShowNewAppointment(false);
  };

  const handleEdit = (id: string) => {
    const appointment = appointments.find(apt => apt.id === id);
    if (appointment) {
      setEditingAppointment(appointment);
      setShowNewAppointment(true);
    }
  };

  const handleDelete = (id: string) => {
    const appointment = appointments.find(apt => apt.id === id);
    if (confirm(`Deseja realmente excluir o agendamento de ${appointment?.patientName}?`)) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      showSuccess("Agendamento excluído com sucesso!");
    }
  };

  const handleCancel = (id: string) => {
    if (confirm("Deseja realmente cancelar este agendamento?")) {
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, status: "cancelled" as const } : apt)
      );
    }
  };

  const handleCloseForm = () => {
    setShowNewAppointment(false);
    setEditingAppointment(null);
  };

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Agendamentos"
        subtitle="Recepção - ASIPECA"
        bgGradient="bg-gradient-to-br from-emerald-500 to-green-500"
        showBackButton={true}
        backPath="/reception"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">{successMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          <Button
            onClick={() => setShowNewAppointment(true)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Agendamento
          </Button>
        </div>

        {/* New/Edit Appointment Form */}
        {showNewAppointment && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAppointment ? "Editar Agendamento" : "Novo Agendamento"}
              </h2>
              {editingAppointment && (
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancelar edição
                </button>
              )}
            </div>

            {!editingAppointment && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <strong>Importante:</strong> Agendamentos só podem ser feitos com pacientes já cadastrados no sistema.
                    Isso garante organização e evita duplicidade de dados.
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleCreateAppointment} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Paciente *
                  </label>
                  <select
                    name="patient"
                    required
                    defaultValue={editingAppointment?.patientName || ""}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione o paciente</option>
                    <option value="Ana Clara Santos">Ana Clara Santos</option>
                    <option value="Pedro Oliveira">Pedro Oliveira</option>
                    <option value="Lucas Ferreira">Lucas Ferreira</option>
                    <option value="Julia Costa">Julia Costa</option>
                    <option value="Maria Silva">Maria Silva</option>
                    <option value="Pedro Costa">Pedro Costa</option>
                  </select>
                  {!editingAppointment && (
                    <p className="text-xs text-gray-500 mt-2">
                      ℹ️ Apenas pacientes já cadastrados aparecem nesta lista
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profissional *
                  </label>
                  <select
                    name="doctor"
                    required
                    defaultValue={editingAppointment?.doctorName || ""}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione o profissional</option>
                    <option value="Dr. João Santos">Dr. João Santos</option>
                    <option value="Dra. Ana Paula">Dra. Ana Paula</option>
                    <option value="Dra. Juliana Costa">Dra. Juliana Costa</option>
                    <option value="Dr. Ricardo Lima">Dr. Ricardo Lima</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data *
                  </label>
                  <Input
                    name="date"
                    required
                    type="date"
                    defaultValue={editingAppointment?.date || ""}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Horário *
                  </label>
                  <Input
                    name="time"
                    required
                    type="time"
                    defaultValue={editingAppointment?.time || ""}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de atendimento *
                  </label>
                  <Input
                    name="type"
                    required
                    defaultValue={editingAppointment?.type || ""}
                    placeholder="Ex: Consulta Inicial"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  placeholder="Informações adicionais sobre o agendamento"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl"
                >
                  {editingAppointment ? "Salvar Alterações" : "Agendar"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCloseForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Próximos Agendamentos</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  appointment.status === "cancelled" ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-6 flex-1">
                    <div className={`p-4 rounded-2xl ${
                      appointment.status === "cancelled"
                        ? "bg-gray-100"
                        : "bg-gradient-to-br from-emerald-100 to-green-100"
                    }`}>
                      <Calendar className={`w-6 h-6 ${
                        appointment.status === "cancelled"
                          ? "text-gray-400"
                          : "text-emerald-600"
                      }`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {appointment.patientName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === "scheduled"
                            ? "bg-blue-100 text-blue-700"
                            : appointment.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {appointment.status === "scheduled" ? "Agendado" :
                           appointment.status === "completed" ? "Concluído" : "Cancelado"}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{appointment.doctorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {appointment.status !== "cancelled" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(appointment.id)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                        title="Editar agendamento"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        title="Excluir agendamento"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  {appointment.status === "cancelled" && (
                    <span className="text-sm text-gray-500 italic">Cancelado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Info */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="font-semibold text-emerald-900 mb-1">
                Permissões de Recepção
              </div>
              <div className="text-sm text-emerald-700">
                Você pode criar, editar, remarcar e cancelar agendamentos. Todas as alterações são
                visíveis para profissionais de saúde, administração e pacientes/familiares.
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
