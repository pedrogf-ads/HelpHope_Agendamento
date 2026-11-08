import { Shield, Users, Stethoscope, Home, Search, Edit2, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";

type UserType = "doctor" | "reception" | "family" | "admin";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  type: UserType;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
  patientName?: string;
  patientAge?: number;
}

type SortField = "name" | "email" | "type" | "createdAt";
type SortOrder = "asc" | "desc";

export default function AdminAccounts() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Dr. Carlos Mendes",
      email: "carlos.mendes@asipeca.org",
      role: "Fonoaudiólogo",
      type: "doctor",
      status: "active",
      createdAt: "15/03/2026",
      lastLogin: "28/04/2026"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@asipeca.org",
      role: "Recepcionista",
      type: "reception",
      status: "active",
      createdAt: "20/03/2026",
      lastLogin: "29/04/2026"
    },
    {
      id: 3,
      name: "João Silva",
      email: "joao.silva@email.com",
      role: "Pai/Responsável",
      type: "family",
      status: "active",
      createdAt: "22/03/2026",
      lastLogin: "27/04/2026",
      patientName: "Lucas Silva",
      patientAge: 7
    },
    {
      id: 4,
      name: "Dra. Ana Paula",
      email: "ana.paula@asipeca.org",
      role: "Psicóloga",
      type: "doctor",
      status: "active",
      createdAt: "25/03/2026",
      lastLogin: "29/04/2026"
    },
    {
      id: 5,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@asipeca.org",
      role: "Coordenador",
      type: "admin",
      status: "active",
      createdAt: "01/03/2026",
      lastLogin: "29/04/2026"
    },
    {
      id: 6,
      name: "Carla Pereira",
      email: "carla.pereira@email.com",
      role: "Mãe/Responsável",
      type: "family",
      status: "active",
      createdAt: "10/04/2026",
      lastLogin: "25/04/2026",
      patientName: "Sofia Pereira",
      patientAge: 5
    },
    {
      id: 7,
      name: "Dr. Roberto Lima",
      email: "roberto.lima@asipeca.org",
      role: "Terapeuta Ocupacional",
      type: "doctor",
      status: "inactive",
      createdAt: "05/02/2026",
      lastLogin: "15/03/2026"
    },
    {
      id: 8,
      name: "Fernanda Costa",
      email: "fernanda.costa@asipeca.org",
      role: "Recepcionista",
      type: "reception",
      status: "active",
      createdAt: "12/04/2026",
      lastLogin: "28/04/2026"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<UserType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

  const userTypes = [
    { type: "admin" as UserType, label: "Administrador", icon: Shield, color: "from-purple-500 to-violet-500", bgColor: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-700", badgeColor: "bg-purple-100 text-purple-700" },
    { type: "doctor" as UserType, label: "Doutor / Profissional", icon: Stethoscope, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700", badgeColor: "bg-blue-100 text-blue-700" },
    { type: "reception" as UserType, label: "Recepção", icon: Users, color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", textColor: "text-emerald-700", badgeColor: "bg-emerald-100 text-emerald-700" },
    { type: "family" as UserType, label: "Familiar / Paciente", icon: Home, color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50", borderColor: "border-orange-200", textColor: "text-orange-700", badgeColor: "bg-orange-100 text-orange-700" }
  ];

  const getUserTypeConfig = (type: UserType) => {
    return userTypes.find(ut => ut.type === type) || userTypes[0];
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setSelectedUserType(user.type);
    setShowEditDialog(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      toast.success(`Conta de ${selectedUser.name} excluída com sucesso!`);
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedUser = {
        ...selectedUser,
        name: formData.get("edit-name") as string,
        email: formData.get("edit-email") as string,
        role: formData.get("edit-role") as string,
        status: formData.get("edit-status") as "active" | "inactive",
        type: selectedUserType || selectedUser.type,
        ...(selectedUserType === "family" && {
          patientName: formData.get("patient-name") as string,
          patientAge: parseInt(formData.get("patient-age") as string)
        })
      };

      setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
      toast.success(`Conta de ${updatedUser.name} atualizada com sucesso!`);
      setShowEditDialog(false);
      setSelectedUser(null);
      setSelectedUserType(null);
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newUser: User = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: formData.get("create-name") as string,
      email: formData.get("create-email") as string,
      role: formData.get("create-role") as string || "Usuário",
      type: selectedUserType!,
      status: "active",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      ...(selectedUserType === "family" && {
        patientName: formData.get("patient-name") as string,
        patientAge: parseInt(formData.get("patient-age") as string)
      })
    };

    setUsers([...users, newUser]);
    toast.success(`Conta de ${newUser.name} criada com sucesso!`);
    setShowCreateDialog(false);
    setSelectedUserType(null);
  };

  const toggleStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === "active" ? "inactive" as const : "active" as const }
        : u
    ));
    const user = users.find(u => u.id === userId);
    if (user) {
      toast.success(`Conta ${user.status === "active" ? "desativada" : "ativada"} com sucesso!`);
    }
  };

  // Filtros e busca
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || user.type === filterType;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Ordenação
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (sortField === "createdAt") {
      aValue = new Date(a.createdAt.split("/").reverse().join("-")).getTime();
      bValue = new Date(b.createdAt.split("/").reverse().join("-")).getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const stats = [
    { label: "Total de Contas", value: users.length, color: "text-purple-600" },
    { label: "Contas Ativas", value: users.filter(u => u.status === "active").length, color: "text-green-600" },
    { label: "Profissionais", value: users.filter(u => u.type === "doctor").length, color: "text-blue-600" },
    { label: "Familiares", value: users.filter(u => u.type === "family").length, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Gerenciar Contas"
        subtitle="Visualize, edite e gerencie todas as contas do sistema"
        bgGradient="bg-gradient-to-r from-purple-600 to-violet-600"
        showBackButton={false}
        showUserMenu={false}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email ou cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base rounded-xl"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label className="text-sm font-semibold mb-2 block">Tipo de Conta</Label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as UserType | "all")}
                  className="w-full h-10 px-4 border border-gray-200 rounded-xl bg-white text-sm"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="admin">Administrador</option>
                  <option value="doctor">Doutor / Profissional</option>
                  <option value="reception">Recepção</option>
                  <option value="family">Familiar / Paciente</option>
                </select>
              </div>

              <div className="flex-1">
                <Label className="text-sm font-semibold mb-2 block">Status</Label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
                  className="w-full h-10 px-4 border border-gray-200 rounded-xl bg-white text-sm"
                >
                  <option value="all">Todos os status</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="flex-1">
                <Label className="text-sm font-semibold mb-2 block">Ordenar por</Label>
                <select
                  value={`${sortField}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("-") as [SortField, SortOrder];
                    setSortField(field);
                    setSortOrder(order);
                  }}
                  className="w-full h-10 px-4 border border-gray-200 rounded-xl bg-white text-sm"
                >
                  <option value="name-asc">Nome (A-Z)</option>
                  <option value="name-desc">Nome (Z-A)</option>
                  <option value="email-asc">Email (A-Z)</option>
                  <option value="email-desc">Email (Z-A)</option>
                  <option value="type-asc">Tipo (A-Z)</option>
                  <option value="type-desc">Tipo (Z-A)</option>
                  <option value="createdAt-desc">Mais recentes</option>
                  <option value="createdAt-asc">Mais antigos</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-xl shadow-lg h-10 px-6"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Nova Conta</span>
                </Button>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-600">
              Mostrando <strong>{sortedUsers.length}</strong> de <strong>{users.length}</strong> contas
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {sortedUsers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Nenhuma conta encontrada"
              description="Tente ajustar os filtros ou criar uma nova conta."
            />
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedUsers.map((user) => {
                const typeConfig = getUserTypeConfig(user.type);
                const Icon = typeConfig.icon;
                
                return (
                  <div key={user.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* User Info */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className={`bg-gradient-to-br ${typeConfig.bgColor} rounded-2xl p-3 sm:p-4 flex-shrink-0`}>
                          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${typeConfig.textColor}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg">{user.name}</h3>
                            <Badge className={`${typeConfig.badgeColor} text-xs`}>
                              {typeConfig.label}
                            </Badge>
                            <StatusBadge
                              status={user.status === "active" ? "success" : "error"}
                              label={user.status === "active" ? "Ativa" : "Inativa"}
                            />
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2">{user.email}</div>
                          
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <strong>Cargo:</strong> {user.role}
                            </span>
                            <span className="flex items-center gap-1">
                              <strong>Criado em:</strong> {user.createdAt}
                            </span>
                            {user.lastLogin && (
                              <span className="flex items-center gap-1">
                                <strong>Último acesso:</strong> {user.lastLogin}
                              </span>
                            )}
                          </div>

                          {user.type === "family" && user.patientName && (
                            <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                              <div className="text-xs text-orange-800">
                                <strong>Paciente:</strong> {user.patientName} ({user.patientAge} anos)
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 lg:flex-col lg:min-w-[120px]">
                        <Button
                          onClick={() => toggleStatus(user.id)}
                          variant="outline"
                          className={`flex-1 lg:w-full rounded-xl text-xs font-semibold ${
                            user.status === "active"
                              ? "border-orange-300 text-orange-700 hover:bg-orange-50"
                              : "border-green-300 text-green-700 hover:bg-green-50"
                          }`}
                        >
                          {user.status === "active" ? "Desativar" : "Ativar"}
                        </Button>
                        
                        <Button
                          onClick={() => handleEdit(user)}
                          variant="outline"
                          className="flex-1 lg:w-full border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-semibold"
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        
                        <Button
                          onClick={() => handleDelete(user)}
                          variant="outline"
                          className="flex-1 lg:w-full border-red-300 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Editar Conta</DialogTitle>
            <DialogDescription>
              Atualize as informações da conta do usuário
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <form onSubmit={handleSaveEdit} className="space-y-6 py-4">
              {/* User Type Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Tipo de Conta *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.type}
                        type="button"
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedUserType === type.type
                            ? `${type.borderColor} ${type.bgColor}`
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedUserType(type.type)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${selectedUserType === type.type ? type.textColor : "text-gray-500"}`} />
                          <span className={`font-medium text-sm ${selectedUserType === type.type ? type.textColor : "text-gray-700"}`}>
                            {type.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Nome completo *</Label>
                  <Input id="edit-name" name="edit-name" required defaultValue={selectedUser.name} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-email">E-mail *</Label>
                  <Input id="edit-email" name="edit-email" type="email" required defaultValue={selectedUser.email} className="mt-2" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-role">Cargo / Função *</Label>
                  <Input id="edit-role" name="edit-role" required defaultValue={selectedUser.role} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status *</Label>
                  <select
                    id="edit-status"
                    name="edit-status"
                    defaultValue={selectedUser.status}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg bg-white mt-2"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>

              {/* Patient Info for Family Type */}
              {selectedUserType === "family" && (
                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-900 mb-4">Informações do Paciente</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patient-name">Nome do paciente *</Label>
                      <Input 
                        id="patient-name" 
                        name="patient-name" 
                        required 
                        defaultValue={selectedUser.patientName} 
                        className="mt-2" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="patient-age">Idade do paciente *</Label>
                      <Input 
                        id="patient-age" 
                        name="patient-age" 
                        type="number" 
                        required 
                        defaultValue={selectedUser.patientAge} 
                        className="mt-2" 
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditDialog(false);
                    setSelectedUser(null);
                    setSelectedUserType(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                >
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-sm mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a conta de <strong>{selectedUser?.name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir Conta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Account Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Criar Nova Conta</DialogTitle>
            <DialogDescription>
              Crie uma nova conta de usuário diretamente sem necessidade de aprovação
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateAccount} className="space-y-6 py-4">
            {/* User Type Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Tipo de Conta *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.type}
                      type="button"
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedUserType === type.type
                          ? `${type.borderColor} ${type.bgColor}`
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedUserType(type.type)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${selectedUserType === type.type ? type.textColor : "text-gray-500"}`} />
                        <span className={`font-medium text-sm ${selectedUserType === type.type ? type.textColor : "text-gray-700"}`}>
                          {type.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedUserType && (
              <>
                {/* For Family/Responsible */}
                {selectedUserType === "family" && (
                  <>
                    <div>
                      <Label htmlFor="create-name">Nome completo do responsável *</Label>
                      <Input id="create-name" name="create-name" required placeholder="Nome completo" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-email">E-mail *</Label>
                      <Input id="create-email" name="create-email" type="email" required placeholder="email@exemplo.com" className="mt-2" />
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-bold text-gray-900 mb-4">Informações do Paciente</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="patient-name">Nome do paciente *</Label>
                          <Input id="patient-name" name="patient-name" required placeholder="Nome completo" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="patient-age">Idade do paciente *</Label>
                          <Input id="patient-age" name="patient-age" type="number" required placeholder="Idade" className="mt-2" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* For Professionals (Doctor, Reception, Admin) */}
                {(selectedUserType === "doctor" || selectedUserType === "admin" || selectedUserType === "reception") && (
                  <>
                    <div>
                      <Label htmlFor="create-name">Nome completo *</Label>
                      <Input id="create-name" name="create-name" required placeholder="Nome completo" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-email">E-mail *</Label>
                      <Input id="create-email" name="create-email" type="email" required placeholder="email@exemplo.com" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-role">Cargo / Função *</Label>
                      <Input id="create-role" name="create-role" required placeholder="Ex: Fonoaudiólogo, Recepcionista, Coordenador" className="mt-2" />
                    </div>
                  </>
                )}

                {/* Password */}
                <div className="border-t pt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="create-password">Senha *</Label>
                      <Input id="create-password" name="create-password" type="password" required placeholder="Mínimo 6 caracteres" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-password-confirm">Confirmar senha *</Label>
                      <Input id="create-password-confirm" name="create-password-confirm" type="password" required placeholder="Digite novamente" className="mt-2" />
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-sm text-purple-900">
                    <strong>Atenção:</strong> A conta será criada e ativada imediatamente. O usuário poderá fazer login assim que a conta for criada.
                  </p>
                </div>
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCreateDialog(false);
                  setSelectedUserType(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!selectedUserType}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                Criar Conta
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
