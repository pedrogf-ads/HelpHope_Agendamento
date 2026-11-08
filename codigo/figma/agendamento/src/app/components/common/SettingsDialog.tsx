import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Settings, Lock, Bell, Eye } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-700" />
            Configurações
          </DialogTitle>
          <DialogDescription>
            Gerencie suas preferências e segurança
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Change Password */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <Lock className="w-4 h-4" />
              <h3>Segurança</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>

            <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
              Alterar Senha
            </Button>
          </div>

          {/* Preferences */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <Bell className="w-4 h-4" />
              <h3>Preferências</h3>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <Label htmlFor="notifications" className="cursor-pointer text-sm font-medium text-gray-700">
                  Notificações por E-mail
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Receba atualizações importantes por e-mail
                </p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <Label htmlFor="reminders" className="cursor-pointer text-sm font-medium text-gray-700">
                  Lembretes de Consulta
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Notificações antes das consultas agendadas
                </p>
              </div>
              <Switch id="reminders" defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <Label htmlFor="updates" className="cursor-pointer text-sm font-medium text-gray-700">
                  Atualizações do Sistema
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Novidades e melhorias da plataforma
                </p>
              </div>
              <Switch id="updates" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
