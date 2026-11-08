import { useMemo, useState } from "react";
import { ArrowLeft, Edit3, Eye, EyeOff, KeyRound, Mail, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { getSession, isStrongPassword, passwordRequirements, updateSessionProfile } from "../../services/prototypeAuth";
import { useReceptionData } from "./ReceptionDataContext";

function PasswordInput({ id, label, value, onChange, visible, onToggle, error }: { id: string; label: string; value: string; onChange: (value: string) => void; visible: boolean; onToggle: () => void; error?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input id={id} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} className="pr-10" aria-invalid={Boolean(error)} />
        <Button type="button" variant="ghost" size="icon" onClick={onToggle} className="absolute right-0 top-0" aria-label={visible ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`}>{visible ? <EyeOff /> : <Eye />}</Button>
      </div>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export default function ReceptionAccountSettings() {
  const data = useReceptionData();
  const session = getSession();
  const account = data.accounts.find((item) => item.email.toLowerCase() === session?.email.toLowerCase()) || data.accounts.find((item) => item.role === "Recepção");
  const [opened, setOpened] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [edit, setEdit] = useState({ name: "", phone: "", email: "" });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [passwords, setPasswords] = useState({ current: "", next: "", confirmation: "" });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState({ current: false, next: false, confirmation: false });
  const requirements = useMemo(() => passwordRequirements(passwords.next), [passwords.next]);

  if (!account) return <div className="rounded-2xl border bg-card p-8 text-sm text-muted-foreground">Não foi possível localizar a conta da recepcionista conectada.</div>;

  const openEdit = () => {
    setEdit({ name: account.name, phone: account.phone, email: account.email });
    setEditErrors({});
    setEditOpen(true);
  };

  const saveEdit = () => {
    const errors: Record<string, string> = {};
    if (!edit.name.trim()) errors.name = "Informe o nome completo.";
    const phoneDigits = edit.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.phone = "Informe um telefone válido com DDD.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(edit.email)) errors.email = "Informe um e-mail válido.";
    if (data.accounts.some((item) => item.id !== account.id && item.email.toLowerCase() === edit.email.trim().toLowerCase())) errors.email = "Este e-mail já está associado a outra conta.";
    setEditErrors(errors);
    if (Object.keys(errors).length) return;
    data.update("accounts", account.id, { name: edit.name.trim(), phone: edit.phone.trim(), email: edit.email.trim().toLowerCase() });
    updateSessionProfile({ name: edit.name.trim(), email: edit.email.trim().toLowerCase() });
    setEditOpen(false);
    toast.success("Dados da conta atualizados no protótipo.");
  };

  const openPassword = () => {
    setPasswords({ current: "", next: "", confirmation: "" });
    setPasswordErrors({});
    setVisible({ current: false, next: false, confirmation: false });
    setPasswordOpen(true);
  };

  const savePassword = () => {
    const errors: Record<string, string> = {};
    if (!passwords.current) errors.current = "Informe a senha atual.";
    if (!passwords.next) errors.next = "Informe a nova senha.";
    else if (!isStrongPassword(passwords.next)) errors.next = "A nova senha ainda não atende aos requisitos.";
    if (passwords.next === passwords.current && passwords.next) errors.next = "A nova senha deve ser diferente da senha atual.";
    if (passwords.confirmation !== passwords.next) errors.confirmation = "As senhas não coincidem.";
    setPasswordErrors(errors);
    if (Object.keys(errors).length) return;
    setPasswordOpen(false);
    setPasswords({ current: "", next: "", confirmation: "" });
    toast.success("Nova senha validada na simulação. Nenhuma senha foi armazenada.");
  };

  if (!opened) {
    return (
      <Button variant="ghost" onClick={() => setOpened(true)} className="h-auto w-full max-w-2xl justify-start whitespace-normal rounded-2xl border bg-card p-6 text-left shadow-sm hover:bg-secondary/40">
        <div className="flex w-full items-center gap-4">
          <div className="rounded-xl bg-secondary p-3 text-primary"><UserRound /></div>
          <div className="flex-1"><p className="text-base font-bold text-foreground">Minha Conta</p><p className="mt-1 text-sm text-muted-foreground">Consulte seus dados, edite contatos e altere sua senha.</p></div>
          <span className="text-sm font-semibold text-primary">Abrir</span>
        </div>
      </Button>
    );
  }

  return (
    <>
      <div className="max-w-4xl space-y-5">
        <Button variant="outline" onClick={() => setOpened(false)}><ArrowLeft />Voltar para Configurações</Button>
        <div className="rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <div><p className="text-lg font-bold">Minha Conta</p><p className="mt-1 text-sm text-muted-foreground">Dados administrativos da recepcionista conectada.</p></div>
            <div className="rounded-xl bg-secondary p-3 text-primary"><UserRound /></div>
          </div>
          <div className="grid grid-cols-2 gap-5 p-6">
            <div className="space-y-1"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome completo</p><p className="font-semibold">{account.name}</p></div>
            <div className="space-y-1"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CPF</p><p className="font-semibold">{account.cpf}</p></div>
            <div className="space-y-1"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Phone className="h-4 w-4" />Telefone</p><p className="font-semibold">{account.phone}</p></div>
            <div className="space-y-1"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Mail className="h-4 w-4" />E-mail</p><p className="font-semibold">{account.email}</p></div>
          </div>
          <div className="flex gap-3 border-t p-6"><Button onClick={openEdit}><Edit3 />Editar dados</Button><Button variant="outline" onClick={openPassword}><KeyRound />Alterar senha</Button></div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border bg-secondary/60 p-4 text-sm text-muted-foreground"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" /><p>O protótipo atualiza apenas dados simulados locais. Com backend, as alterações serão aplicadas somente ao registro autenticado e o novo e-mail exigirá confirmação.</p></div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader><DialogTitle>Editar dados</DialogTitle><DialogDescription>Atualize somente os dados permitidos da recepcionista conectada.</DialogDescription></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="account-name">Nome completo *</Label><Input id="account-name" value={edit.name} onChange={(event) => setEdit({ ...edit, name: event.target.value })} aria-invalid={Boolean(editErrors.name)} />{editErrors.name && <p className="text-xs text-destructive">{editErrors.name}</p>}</div>
            <div className="space-y-2"><Label htmlFor="account-cpf">CPF</Label><Input id="account-cpf" value={account.cpf} disabled /><p className="text-xs text-muted-foreground">O CPF não pode ser alterado diretamente.</p></div>
            <div className="space-y-2"><Label htmlFor="account-phone">Telefone *</Label><Input id="account-phone" value={edit.phone} onChange={(event) => setEdit({ ...edit, phone: event.target.value })} aria-invalid={Boolean(editErrors.phone)} />{editErrors.phone && <p className="text-xs text-destructive">{editErrors.phone}</p>}</div>
            <div className="space-y-2"><Label htmlFor="account-email">E-mail *</Label><Input id="account-email" type="email" value={edit.email} onChange={(event) => setEdit({ ...edit, email: event.target.value })} aria-invalid={Boolean(editErrors.email)} />{editErrors.email && <p className="text-xs text-destructive">{editErrors.email}</p>}</div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditOpen(false)}>Cancelar</Button><Button onClick={saveEdit}><Save />Salvar alterações</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader><DialogTitle>Alterar senha</DialogTitle><DialogDescription>Validação demonstrativa. Nenhuma senha real será armazenada neste protótipo.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <PasswordInput id="current-password" label="Senha atual" value={passwords.current} onChange={(value) => setPasswords({ ...passwords, current: value })} visible={visible.current} onToggle={() => setVisible({ ...visible, current: !visible.current })} error={passwordErrors.current} />
            <div className="grid grid-cols-2 gap-4">
              <PasswordInput id="new-password" label="Nova senha" value={passwords.next} onChange={(value) => setPasswords({ ...passwords, next: value })} visible={visible.next} onToggle={() => setVisible({ ...visible, next: !visible.next })} error={passwordErrors.next} />
              <PasswordInput id="new-password-confirmation" label="Confirmar nova senha" value={passwords.confirmation} onChange={(value) => setPasswords({ ...passwords, confirmation: value })} visible={visible.confirmation} onToggle={() => setVisible({ ...visible, confirmation: !visible.confirmation })} error={passwordErrors.confirmation} />
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-3 text-xs">{[["length", "10 caracteres"], ["uppercase", "Letra maiúscula"], ["lowercase", "Letra minúscula"], ["number", "Número"], ["symbol", "Símbolo"]].map(([key, label]) => <span key={key} className={requirements[key as keyof typeof requirements] ? "font-semibold text-primary" : "text-muted-foreground"}>{requirements[key as keyof typeof requirements] ? "✓" : "○"} {label}</span>)}</div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setPasswordOpen(false)}>Cancelar</Button><Button onClick={savePassword}><Save />Salvar nova senha</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
