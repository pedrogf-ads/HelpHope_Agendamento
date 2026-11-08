import { Shield, Users, CheckCircle, XCircle, Stethoscope, Home, UserPlus, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type UserType = "doctor" | "reception" | "family" | "admin";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, name: "Dr. Carlos Mendes", email: "carlos.mendes@email.com", type: "Doutor", date: "19/04/2026", icon: Stethoscope, color: "text-blue-600" },
    { id: 2, name: "Maria Santos", email: "maria.santos@email.com", type: "Recepção", date: "18/04/2026", icon: Users, color: "text-emerald-600" },
    { id: 3, name: "João Silva", email: "joao.silva@email.com", type: "Familiar", date: "17/04/2026", icon: Home, color: "text-orange-600" },
    { id: 4, name: "Dra. Ana Paula", email: "ana.paula@email.com", type: "Doutor", date: "16/04/2026", icon: Stethoscope, color: "text-blue-600" },
    { id: 5, name: "Pedro Oliveira", email: "pedro.oliveira@email.com", type: "Administração", date: "15/04/2026", icon: Shield, color: "text-purple-600" },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

  const userTypes = [
    { type: "admin" as UserType, label: "Administrador", icon: Shield, color: "from-purple-500 to-violet-500", bgColor: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-700" },
    { type: "doctor" as UserType, label: "Doutor / Profissional", icon: Stethoscope, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700" },
    { type: "reception" as UserType, label: "Recepção", icon: Users, color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", textColor: "text-emerald-700" },
    { type: "family" as UserType, label: "Familiar / Paciente", icon: Home, color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50", borderColor: "border-orange-200", textColor: "text-orange-700" }
  ];

  const handleApprove = (id: number, name: string) => {
    setPendingApprovals(pendingApprovals.filter(approval => approval.id !== id));
    toast.success(`Conta de ${name} aprovada com sucesso!`);
  };

  const handleReject = (id: number, name: string) => {
    setPendingApprovals(pendingApprovals.filter(approval => approval.id !== id));
    toast.error(`Conta de ${name} rejeitada.`);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Conta criada com sucesso!");
    setShowCreateDialog(false);
    setSelectedUserType(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Administração ASIPECA"
        subtitle="Gestão de aprovações de contas"
        bgGradient="bg-gradient-to-r from-purple-600 to-violet-600"
        showBackButton={false}
        showUserMenu={false}
      />

      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

        {/* Create Account Button */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Gestão de Contas</h2>
              <p className="text-sm text-gray-600">Crie novas contas ou gerencie contas existentes</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/admin/accounts")}
                variant="outline"
                className="flex-1 sm:flex-none border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl shadow-md flex items-center gap-2 py-6 sm:py-3"
              >
                <Settings className="w-5 h-5" />
                <span className="font-semibold">Gerenciar Contas</span>
              </Button>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-xl shadow-lg flex items-center gap-2 py-6 sm:py-3"
              >
                <UserPlus className="w-5 h-5" />
                <span className="font-semibold">Criar Nova Conta</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Approvals Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Aprovações Pendentes</h2>
                <p className="text-sm text-gray-600">
                  {pendingApprovals.length} {pendingApprovals.length === 1 ? 'conta aguardando' : 'contas aguardando'} aprovação
                </p>
              </div>
            </div>
          </div>

          {pendingApprovals.length === 0 ? (
            <EmptyState
              icon={CheckCircle}
              title="Tudo em dia!"
              description="Não há aprovações pendentes no momento."
            />
          ) : (
            <div className="divide-y divide-gray-100">
              {pendingApprovals.map((approval) => {
                const Icon = approval.icon;
                return (
                  <div key={approval.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-3 sm:p-4">
                          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${approval.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-base sm:text-lg mb-1 truncate">{approval.name}</div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{approval.email}</div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span className={`px-2 sm:px-3 py-1 rounded-full font-semibold ${approval.color} bg-gray-100 whitespace-nowrap`}>
                              {approval.type}
                            </span>
                            <span className="hidden sm:inline">Solicitado em {approval.date}</span>
                            <span className="sm:hidden">{approval.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleApprove(approval.id, approval.name)}
                          className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span className="sm:inline">Aprovar</span>
                        </button>
                        <button
                          onClick={() => handleReject(approval.id, approval.name)}
                          className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                        >
                          <XCircle className="w-4 h-4" />
                          <span className="sm:inline">Rejeitar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
                      <Input id="create-name" required placeholder="Nome completo" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-email">E-mail *</Label>
                      <Input id="create-email" type="email" required placeholder="email@exemplo.com" className="mt-2" />
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-bold text-gray-900 mb-4">Informações do Paciente</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="patient-name">Nome do paciente *</Label>
                          <Input id="patient-name" required placeholder="Nome completo" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="patient-age">Idade do paciente *</Label>
                          <Input id="patient-age" type="number" required placeholder="Idade" className="mt-2" />
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
                      <Input id="create-name" required placeholder="Nome completo" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-email">E-mail *</Label>
                      <Input id="create-email" type="email" required placeholder="email@exemplo.com" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-role">Cargo / Função *</Label>
                      <Input id="create-role" required placeholder="Ex: Fonoaudiólogo, Recepcionista, Coordenador" className="mt-2" />
                    </div>
                  </>
                )}

                {/* Password */}
                <div className="border-t pt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="create-password">Senha *</Label>
                      <Input id="create-password" type="password" required placeholder="Mínimo 6 caracteres" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="create-password-confirm">Confirmar senha *</Label>
                      <Input id="create-password-confirm" type="password" required placeholder="Digite novamente" className="mt-2" />
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