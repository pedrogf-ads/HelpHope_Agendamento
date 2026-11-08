import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { User, Mail, Shield } from "lucide-react";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: "admin" | "doctor" | "reception" | "family";
}

export function ProfileDialog({ open, onOpenChange, userType }: ProfileDialogProps) {
  const userTypeLabels = {
    admin: "Administrador",
    doctor: "Doutor / Profissional de Saúde",
    reception: "Recepção",
    family: "Familiar / Responsável"
  };

  const userTypeColors = {
    admin: "bg-purple-100 text-purple-700",
    doctor: "bg-blue-100 text-blue-700",
    reception: "bg-emerald-100 text-emerald-700",
    family: "bg-orange-100 text-orange-700"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-700" />
            Meu Perfil
          </DialogTitle>
          <DialogDescription>
            Visualize e edite suas informações básicas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* User Type Badge */}
          <div className="flex items-center justify-center">
            <Badge className={`${userTypeColors[userType]} px-4 py-2`}>
              <Shield className="w-4 h-4 mr-2" />
              {userTypeLabels[userType]}
            </Badge>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              JD
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="profile-name">Nome Completo</Label>
            <Input id="profile-name" defaultValue="Dr. João Santos" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="profile-email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="profile-email" className="pl-10" defaultValue="joao.santos@asipeca.org.br" />
            </div>
          </div>

          {/* Additional Info based on user type */}
          {userType === "doctor" && (
            <div className="space-y-2">
              <Label htmlFor="profile-specialty">Especialidade</Label>
              <Input id="profile-specialty" defaultValue="Fonoaudiólogo" />
            </div>
          )}

          {userType === "family" && (
            <div className="space-y-2">
              <Label htmlFor="profile-patient">Paciente Vinculado</Label>
              <Input id="profile-patient" defaultValue="Ana Clara Santos" disabled />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049]">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
