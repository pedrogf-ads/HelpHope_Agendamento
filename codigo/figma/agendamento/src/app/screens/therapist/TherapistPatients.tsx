import { useNavigate } from "react-router";
import {
  Search, Filter, ChevronRight, Plus, Users, Clock,
  Heart, Sparkles, Sun, Circle
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

export default function TherapistPatients() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showCreatePatientDialog, setShowCreatePatientDialog] = useState(false);
  const [view, setView] = useState<"rooms" | "patients">("rooms"); // Toggle view
  const [sortBy, setSortBy] = useState<"name" | "age" | "severity">("severity"); // Default to severity

  const rooms = [
    {
      id: "1",
      name: "Sala Esperança",
      description: "Grupo de apoio emocional e desenvolvimento",
      participants: 8,
      color: "#4CAF50",
      lightColor: "#E8F5E9",
      icon: Heart,
      status: "active",
      nextSession: "Hoje às 14:00",
      type: "Acompanhamento terapêutico",
      avatars: ["A", "P", "L", "M"],
    },
    {
      id: "2",
      name: "Sala Amor",
      description: "Acompanhamento terapêutico infantil",
      participants: 10,
      color: "#E91E63",
      lightColor: "#FCE4EC",
      icon: Heart,
      status: "active",
      nextSession: "Amanhã às 10:00",
      type: "Grupo de apoio",
      avatars: ["L", "M", "G", "S"],
    },
    {
      id: "3",
      name: "Sala Alegria",
      description: "Atividades lúdicas e socialização",
      participants: 6,
      color: "#FF9800",
      lightColor: "#FFF3E0",
      icon: Sun,
      status: "scheduled",
      nextSession: "Segunda às 15:00",
      type: "Atividades em grupo",
      avatars: ["G", "R", "C"],
    },
    {
      id: "4",
      name: "Sala Luz",
      description: "Terapia ocupacional em grupo",
      participants: 5,
      color: "#9C27B0",
      lightColor: "#F3E5F5",
      icon: Sparkles,
      status: "scheduled",
      nextSession: "Terça às 16:00",
      type: "Terapia ocupacional",
      avatars: ["E", "F", "T"],
    },
  ];

  const patients = [
    {
      id: "1",
      name: "Ana Clara Santos",
      age: 7,
      condition: "TEA",
      severity: "Leve" as const,
      type: "TEA" as const,
      roomId: "1",
      lastSession: "25/03/2026",
      evolution: 85,
    },
    {
      id: "2",
      name: "Pedro Oliveira",
      age: 5,
      condition: "TEA",
      severity: "Médio" as const,
      type: "TEA" as const,
      roomId: "1",
      lastSession: "26/03/2026",
      evolution: 72,
    },
    {
      id: "3",
      name: "Lucas Ferreira",
      age: 9,
      condition: "TEA",
      severity: "Leve" as const,
      type: "TEA" as const,
      roomId: "2",
      lastSession: "27/03/2026",
      evolution: 88,
    },
    {
      id: "4",
      name: "Maria Eduarda Silva",
      age: 6,
      condition: "TEA",
      severity: "Médio" as const,
      type: "TEA" as const,
      roomId: "2",
      lastSession: "25/03/2026",
      evolution: 75,
    },
    {
      id: "5",
      name: "Gabriel Costa",
      age: 8,
      condition: "TEA",
      severity: "Grave" as const,
      type: "TEA" as const,
      roomId: "3",
      lastSession: "28/03/2026",
      evolution: 68,
    },
    {
      id: "6",
      name: "Beatriz Almeida",
      age: 10,
      condition: "Câncer",
      severity: "Grave" as const,
      type: "Câncer" as const,
      roomId: "1",
      lastSession: "27/03/2026",
      evolution: 62,
    },
    {
      id: "7",
      name: "Rafael Santos",
      age: 8,
      condition: "Câncer",
      severity: "Médio" as const,
      type: "Câncer" as const,
      roomId: "2",
      lastSession: "26/03/2026",
      evolution: 78,
    },
    {
      id: "8",
      name: "Carolina Lima",
      age: 6,
      condition: "Câncer",
      severity: "Leve" as const,
      type: "Câncer" as const,
      roomId: "3",
      lastSession: "28/03/2026",
      evolution: 90,
    },
  ];

  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRoom = !selectedRoom || patient.roomId === selectedRoom;
      return matchesSearch && matchesRoom;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        return a.age - b.age;
      } else if (sortBy === "severity") {
        // Priority: Câncer (Grave → Médio → Leve) then TEA (Grave → Médio → Leve)
        const typeOrder = { "Câncer": 0, "TEA": 1 };
        const severityOrder = { "Grave": 0, "Médio": 1, "Leve": 2 };

        const typeCompare = typeOrder[a.type] - typeOrder[b.type];
        if (typeCompare !== 0) return typeCompare;

        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return 0;
    });

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeRooms = filteredRooms.filter((r) => r.status === "active");
  const scheduledRooms = filteredRooms.filter((r) => r.status === "scheduled");

  const handleCreatePatient = () => {
    toast.success("Paciente adicionado com sucesso!");
    setShowCreatePatientDialog(false);
  };

  const handleEnterRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    setView("patients");
  };

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title={view === "rooms" ? "Salas em Grupo" : "Pacientes"}
        subtitle={
          view === "rooms"
            ? "Espaços colaborativos para apoio e acompanhamento"
            : `${filteredPatients.length} paciente${filteredPatients.length !== 1 ? "s" : ""}`
        }
        bgGradient="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]"
        showBackButton={view === "patients"}
        onBackClick={() => {
          setView("rooms");
          setSelectedRoom(null);
        }}
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        {/* Search Bar */}
        <div className="relative mt-4 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={view === "rooms" ? "Buscar sala..." : "Buscar paciente..."}
            className="pl-12 pr-4 py-6 bg-white rounded-2xl border-0 shadow-lg text-base"
          />
        </div>
      </PageHeader>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {view === "rooms" ? (
          <>
            {/* Active Rooms */}
            {activeRooms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <h3 className="text-gray-800 font-semibold">Ativas Agora</h3>
                </div>
                
                <div className="grid gap-4">
                  {activeRooms.map((room, index) => {
                    const Icon = room.icon;
                    return (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                      >
                        {/* Card Header with Gradient */}
                        <div 
                          className="p-6 pb-4"
                          style={{ 
                            background: `linear-gradient(135deg, ${room.color}15 0%, ${room.color}05 100%)`
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: room.color }}
                              >
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              <div>
                                <h4 className="text-gray-800 font-semibold text-lg">{room.name}</h4>
                                <p className="text-xs text-gray-600 mt-0.5">{room.type}</p>
                              </div>
                            </div>
                            <Badge 
                              className="animate-pulse shadow-lg"
                              style={{ 
                                backgroundColor: `${room.color}20`,
                                color: room.color,
                                borderColor: room.color
                              }}
                            >
                              <Circle className="w-2 h-2 mr-1 fill-current" />
                              Ativa
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-700 mb-4">{room.description}</p>

                          {/* Participants Avatars */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {room.avatars.map((avatar, idx) => (
                                  <div
                                    key={idx}
                                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold shadow-md"
                                    style={{ 
                                      backgroundColor: room.lightColor,
                                      color: room.color
                                    }}
                                  >
                                    {avatar}
                                  </div>
                                ))}
                                {room.participants > room.avatars.length && (
                                  <div
                                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold shadow-md bg-gray-200 text-gray-700"
                                  >
                                    +{room.participants - room.avatars.length}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-gray-600">
                                {room.participants} participante{room.participants !== 1 ? "s" : ""}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">{room.nextSession}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer with Actions */}
                        <div className="p-4 bg-gray-50">
                          <Button
                            onClick={() => handleEnterRoom(room.id)}
                            className="w-full shadow-md"
                            style={{ backgroundColor: room.color }}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Ver Pacientes
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scheduled Rooms */}
            {scheduledRooms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <h3 className="text-gray-800 font-semibold">Próximas Sessões</h3>
                </div>
                
                <div className="grid gap-4">
                  {scheduledRooms.map((room, index) => {
                    const Icon = room.icon;
                    return (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (activeRooms.length + index) * 0.1 }}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                      >
                        {/* Card Header with Gradient */}
                        <div 
                          className="p-6 pb-4"
                          style={{ 
                            background: `linear-gradient(135deg, ${room.color}15 0%, ${room.color}05 100%)`
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: room.color }}
                              >
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              <div>
                                <h4 className="text-gray-800 font-semibold text-lg">{room.name}</h4>
                                <p className="text-xs text-gray-600 mt-0.5">{room.type}</p>
                              </div>
                            </div>
                            <Badge 
                              variant="secondary"
                              className="bg-gray-100 text-gray-700"
                            >
                              Agendada
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-700 mb-4">{room.description}</p>

                          {/* Participants Avatars */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {room.avatars.map((avatar, idx) => (
                                  <div
                                    key={idx}
                                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold shadow-md"
                                    style={{ 
                                      backgroundColor: room.lightColor,
                                      color: room.color
                                    }}
                                  >
                                    {avatar}
                                  </div>
                                ))}
                                {room.participants > room.avatars.length && (
                                  <div
                                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold shadow-md bg-gray-200 text-gray-700"
                                  >
                                    +{room.participants - room.avatars.length}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-gray-600">
                                {room.participants} participante{room.participants !== 1 ? "s" : ""}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">{room.nextSession}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer with Actions */}
                        <div className="p-4 bg-gray-50">
                          <Button
                            onClick={() => handleEnterRoom(room.id)}
                            className="w-full shadow-md"
                            style={{ backgroundColor: room.color }}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Ver Pacientes
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Patients List View */
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-800 font-semibold">
                  {filteredPatients.length} Paciente{filteredPatients.length !== 1 ? "s" : ""}
                </h3>
                <Button
                  onClick={() => setShowCreatePatientDialog(true)}
                  className="bg-[#4CAF50] hover:bg-[#45a049] shadow-md"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Paciente
                </Button>
              </div>

              {/* Filter Options */}
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">Ordenar por:</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("severity")}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      sortBy === "severity"
                        ? "bg-[#4CAF50] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Nível/Grau
                  </button>
                  <button
                    onClick={() => setSortBy("name")}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      sortBy === "name"
                        ? "bg-[#4CAF50] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Alfabética
                  </button>
                  <button
                    onClick={() => setSortBy("age")}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      sortBy === "age"
                        ? "bg-[#4CAF50] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Idade
                  </button>
                </div>
              </div>
            </div>

            {filteredPatients.map((patient, index) => (
              <motion.button
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/therapist/patients/${patient.id}`)}
                className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center shadow-md">
                      <span className="text-xl font-semibold text-[#4CAF50]">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-800 font-semibold">{patient.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-600">
                          {patient.age} anos
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            patient.type === "Câncer"
                              ? patient.severity === "Grave"
                                ? "bg-red-100 text-red-700"
                                : patient.severity === "Médio"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                              : patient.severity === "Grave"
                              ? "bg-purple-100 text-purple-700"
                              : patient.severity === "Médio"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {patient.type} - {patient.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-[120px]">
                          <div
                            className="bg-[#4CAF50] h-2.5 rounded-full transition-all"
                            style={{ width: `${patient.evolution}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#4CAF50]">
                          {patient.evolution}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Última sessão: {patient.lastSession}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Create Patient Dialog */}
      <Dialog open={showCreatePatientDialog} onOpenChange={setShowCreatePatientDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4CAF50]" />
              Adicionar Novo Paciente
            </DialogTitle>
            <DialogDescription>
              Cadastre um novo paciente na plataforma.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Nome Completo</Label>
              <Input id="patient-name" placeholder="Ex: Ana Clara Santos" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="patient-age">Idade</Label>
                <Input id="patient-age" type="number" placeholder="Ex: 7" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-birth">Data de Nasc.</Label>
                <Input id="patient-birth" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-guardian">Responsável</Label>
              <Input id="patient-guardian" placeholder="Nome do responsável" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-phone">Telefone de Contato</Label>
              <Input id="patient-phone" type="tel" placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-diagnosis">Diagnóstico</Label>
              <Select>
                <SelectTrigger id="patient-diagnosis">
                  <SelectValue placeholder="Selecione o diagnóstico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tea-leve">TEA Leve</SelectItem>
                  <SelectItem value="tea-moderado">TEA Moderado</SelectItem>
                  <SelectItem value="tea-severo">TEA Severo</SelectItem>
                  <SelectItem value="cancer">Câncer</SelectItem>
                  <SelectItem value="ambos">TEA + Câncer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-room">Sala / Grupo</Label>
              <Select>
                <SelectTrigger id="patient-room">
                  <SelectValue placeholder="Atribuir a uma sala (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Sala Esperança</SelectItem>
                  <SelectItem value="2">Sala Amor</SelectItem>
                  <SelectItem value="3">Sala Alegria</SelectItem>
                  <SelectItem value="4">Sala Luz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-notes">Observações</Label>
              <Textarea 
                id="patient-notes" 
                placeholder="Informações adicionais sobre o paciente..." 
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreatePatientDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePatient} className="bg-[#4CAF50] hover:bg-[#45a049]">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Paciente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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