import { useState } from "react";
import { Search, Trash2, Users, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";

type Room = {
  id: string;
  name: string;
  description: string;
  patientCount: number;
  color: string;
};

export default function ReceptionPatients() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Sala Azul - TEA",
      description: "Atendimentos para pacientes com TEA",
      patientCount: 12,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "2",
      name: "Sala Verde - Oncologia",
      description: "Acompanhamento oncológico",
      patientCount: 8,
      color: "from-emerald-500 to-green-500"
    },
    {
      id: "3",
      name: "Sala Laranja - Terapia Ocupacional",
      description: "Sessões de terapia ocupacional",
      patientCount: 15,
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "4",
      name: "Sala Rosa - Fonoaudiologia",
      description: "Atendimento fonoaudiológico",
      patientCount: 10,
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "5",
      name: "Sala Roxa - Psicologia",
      description: "Atendimento psicológico",
      patientCount: 18,
      color: "from-purple-500 to-violet-500"
    }
  ]);

  // Filtrar salas em tempo real
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteRoom = (roomId: string, roomName: string) => {
    if (confirm(`Deseja realmente excluir a sala "${roomName}"? Esta ação não pode ser desfeita.`)) {
      setRooms(prev => prev.filter(room => room.id !== roomId));
    }
  };

  const handleViewPatients = (roomId: string) => {
    navigate(`/reception/patients/room/${roomId}`);
  };

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Pacientes por Sala"
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
        {/* Action Button */}
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Sala
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar sala por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 rounded-xl text-lg"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-3">
              Encontradas {filteredRooms.length} sala(s)
            </p>
          )}
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma sala encontrada</h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Tente buscar com outros termos"
                : "Crie uma nova sala para começar"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all group"
              >
                {/* Room Header */}
                <div className={`bg-gradient-to-br ${room.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <button
                      onClick={() => handleDeleteRoom(room.id, room.name)}
                      className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all"
                      title="Excluir sala"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-sm text-white/90">{room.description}</p>
                </div>

                {/* Room Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{room.patientCount}</div>
                      <div className="text-sm text-gray-600">Pacientes cadastrados</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewPatients(room.id)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all group-hover:shadow-lg"
                  >
                    Ver pacientes
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
