import { useState } from "react";
import { ArrowLeft, Search, User, Mail, Phone, Calendar, MapPin, FileText, Plus, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Patient = {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  cpf: string;
  registrationDate: string;
  responsible: string;
};

export default function ReceptionRoomPatients() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Dados mockados - em produção viriam do backend
  const roomInfo = {
    "1": { name: "Sala Azul - TEA", color: "from-blue-500 to-cyan-500" },
    "2": { name: "Sala Verde - Oncologia", color: "from-emerald-500 to-green-500" },
    "3": { name: "Sala Laranja - Terapia Ocupacional", color: "from-orange-500 to-amber-500" },
    "4": { name: "Sala Rosa - Fonoaudiologia", color: "from-pink-500 to-rose-500" },
    "5": { name: "Sala Roxa - Psicologia", color: "from-purple-500 to-violet-500" }
  };

  const currentRoom = roomInfo[roomId as keyof typeof roomInfo] || roomInfo["1"];

  const [patients] = useState<Patient[]>([
    {
      id: "1",
      name: "Ana Clara Santos",
      age: 7,
      phone: "(11) 98765-4321",
      email: "maria.santos@email.com",
      address: "Rua das Flores, 123 - São Paulo/SP",
      cpf: "123.456.789-00",
      registrationDate: "15/01/2025",
      responsible: "Maria Santos"
    },
    {
      id: "2",
      name: "Pedro Oliveira",
      age: 12,
      phone: "(11) 97654-3210",
      email: "joao.oliveira@email.com",
      address: "Av. Paulista, 456 - São Paulo/SP",
      cpf: "234.567.890-11",
      registrationDate: "22/02/2025",
      responsible: "João Oliveira"
    },
    {
      id: "3",
      name: "Lucas Ferreira",
      age: 9,
      phone: "(11) 96543-2109",
      email: "carla.ferreira@email.com",
      address: "Rua Augusta, 789 - São Paulo/SP",
      cpf: "345.678.901-22",
      registrationDate: "10/03/2025",
      responsible: "Carla Ferreira"
    },
    {
      id: "4",
      name: "Julia Costa",
      age: 6,
      phone: "(11) 95432-1098",
      email: "roberto.costa@email.com",
      address: "Rua Consolação, 321 - São Paulo/SP",
      cpf: "456.789.012-33",
      registrationDate: "05/04/2025",
      responsible: "Roberto Costa"
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar/atualizar paciente
    alert(editingPatient ? "Paciente atualizado com sucesso!" : "Paciente adicionado com sucesso!");
    setShowAddPatient(false);
    setEditingPatient(null);
  };

  const handleCloseForm = () => {
    setShowAddPatient(false);
    setEditingPatient(null);
  };

  // Form Modal
  if (showAddPatient || editingPatient) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleCloseForm}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPatient ? "Editar Paciente" : "Adicionar Novo Paciente"}
            </h2>

            <form onSubmit={handleSavePatient} className="space-y-6">
              {/* Patient Data */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Dados do Paciente</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do paciente *</label>
                    <Input
                      required
                      defaultValue={editingPatient?.name}
                      placeholder="Digite o nome do paciente"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Idade *</label>
                    <Input
                      required
                      type="number"
                      defaultValue={editingPatient?.age}
                      placeholder="Idade do paciente"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Responsible Info */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Dados do Responsável</h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do responsável *</label>
                    <Input
                      required
                      defaultValue={editingPatient?.responsible}
                      placeholder="Nome completo do responsável"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CPF do responsável *</label>
                    <Input
                      required
                      defaultValue={editingPatient?.cpf}
                      placeholder="000.000.000-00"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone do responsável *</label>
                    <Input
                      required
                      defaultValue={editingPatient?.phone}
                      placeholder="(00) 00000-0000"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail do responsável *</label>
                    <Input
                      required
                      type="email"
                      defaultValue={editingPatient?.email}
                      placeholder="email@exemplo.com"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Endereço completo *</label>
                  <Input
                    required
                    defaultValue={editingPatient?.address}
                    placeholder="Rua, número - Cidade/Estado"
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl"
                >
                  {editingPatient ? "Salvar Alterações" : "Adicionar Paciente"}
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
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/reception/patients")}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar para salas</span>
          </button>

          <div className={`bg-gradient-to-r ${currentRoom.color} rounded-2xl p-6 text-white mb-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">{currentRoom.name}</h1>
                  <p className="text-white/90">{filteredPatients.length} paciente(s) cadastrado(s)</p>
                </div>
              </div>
              <Button
                onClick={() => setShowAddPatient(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Adicionar Paciente
              </Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nome, CPF, telefone ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 rounded-xl text-lg"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-3">
              Encontrado(s) {filteredPatients.length} paciente(s)
            </p>
          )}
        </div>

        {/* Patients List */}
        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum paciente encontrado</h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Tente buscar com outros termos"
                : "Não há pacientes cadastrados nesta sala"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 bg-gradient-to-br ${currentRoom.color} rounded-xl`}>
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.age} anos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      Ativo
                    </span>
                    <button
                      onClick={() => setEditingPatient(patient)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                      title="Editar paciente"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Patient Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4 mb-4">
                      <div className="text-xs font-semibold text-blue-900 mb-2">DADOS DO RESPONSÁVEL</div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-blue-600">Nome</div>
                            <div className="font-semibold text-gray-900">{patient.responsible}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-blue-600">CPF</div>
                            <div className="font-semibold text-gray-900">{patient.cpf}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Telefone</div>
                        <div className="font-semibold text-gray-900">{patient.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">E-mail</div>
                        <div className="font-semibold text-gray-900">{patient.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Endereço</div>
                        <div className="font-semibold text-gray-900">{patient.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Data de cadastro</div>
                        <div className="font-semibold text-gray-900">{patient.registrationDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
