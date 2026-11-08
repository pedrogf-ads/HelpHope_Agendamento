import { useState } from "react";
import { CheckCircle2, MailCheck, Plus, ShieldCheck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { approveAccountRequest, createAdministrativeAccount, type AccessRole, listAccountRequests, rejectAccountRequest, verifyRequestedAccount } from "../../services/prototypeAuth";

export default function AccountRequestsPanel() {
  const [requests, setRequests] = useState(listAccountRequests);
  const [selected, setSelected] = useState<string | null>(null);
  const [role, setRole] = useState<AccessRole>("Recepção");
  const [unit, setUnit] = useState("Unidade Centro");
  const [createOpen, setCreateOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: "", cpf: "", phone: "", email: "", role: "Recepção" as AccessRole, unit: "Unidade Centro" });
  const refresh = () => setRequests([...listAccountRequests()]);
  const request = requests.find((item) => item.id === selected);
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-primary/20 bg-secondary p-4 sm:flex-row sm:items-center"><ShieldCheck className="h-5 w-5 text-primary" /><div className="flex-1"><p className="text-sm font-bold text-secondary-foreground">Contas e Usuários</p><p className="mt-1 text-xs text-muted-foreground">Aprove solicitações, defina perfil e unidade e simule a verificação do e-mail.</p></div><Button size="sm" onClick={() => setCreateOpen(true)}><Plus />Criar conta diretamente</Button></div>
      <div className="space-y-3">
        {requests.length === 0 && <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">Nenhuma solicitação de conta recebida.</div>}
        {requests.map((item) => <div key={item.id} className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center"><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold">{item.name}</p><Badge variant={item.status === "Aprovada" ? "default" : "secondary"}>{item.status}</Badge></div><p className="mt-1 text-xs text-muted-foreground">{item.email} · {item.cpf} · solicitada em {item.createdAt}</p>{item.role && <p className="mt-1 text-xs font-medium text-primary">{item.role} · {item.unit}</p>}</div><div className="flex flex-wrap gap-2">{item.status === "Pendente" && <><Button size="sm" onClick={() => setSelected(item.id)}><CheckCircle2 />Analisar</Button><Button size="sm" variant="destructive" onClick={() => { rejectAccountRequest(item.id); refresh(); toast.success("Solicitação recusada."); }}><XCircle />Recusar</Button></>}{item.status === "Aguardando verificação" && <Button size="sm" onClick={() => { verifyRequestedAccount(item.id); refresh(); toast.success("E-mail verificado e conta ativada na simulação."); }}><MailCheck />Simular verificação</Button>}</div></div>)}
      </div>
      <Dialog open={Boolean(request)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Aprovar solicitação</DialogTitle><DialogDescription>Defina somente as permissões necessárias para {request?.name}.</DialogDescription></DialogHeader>
          <div className="space-y-4"><div className="space-y-2"><Label>Perfil de acesso</Label><Select value={role} onValueChange={(value) => setRole(value as AccessRole)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Administração", "Recepção", "Terapeuta"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Unidade autorizada</Label><Select value={unit} onValueChange={setUnit}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Unidade Centro", "Unidade Jardim Esperança", "Todas as unidades"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div></div>
          <DialogFooter><Button variant="outline" onClick={() => setSelected(null)}>Cancelar</Button><Button onClick={() => { if (!request) return; approveAccountRequest(request.id, role, unit); setSelected(null); refresh(); toast.success("Solicitação aprovada. Aguardando verificação do e-mail."); }}>Aprovar e enviar verificação</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader><DialogTitle>Criar conta de funcionário</DialogTitle><DialogDescription>A senha será definida pelo funcionário no primeiro acesso; nenhuma senha legível é armazenada.</DialogDescription></DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nome completo *</Label><Input value={newAccount.name} onChange={(event) => setNewAccount({ ...newAccount, name: event.target.value })} /></div>
            <div className="space-y-2"><Label>CPF *</Label><Input value={newAccount.cpf} onChange={(event) => setNewAccount({ ...newAccount, cpf: event.target.value })} /></div>
            <div className="space-y-2"><Label>Telefone *</Label><Input value={newAccount.phone} onChange={(event) => setNewAccount({ ...newAccount, phone: event.target.value })} /></div>
            <div className="space-y-2"><Label>E-mail *</Label><Input type="email" value={newAccount.email} onChange={(event) => setNewAccount({ ...newAccount, email: event.target.value })} /></div>
            <div className="space-y-2"><Label>Perfil</Label><Select value={newAccount.role} onValueChange={(value) => setNewAccount({ ...newAccount, role: value as AccessRole })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Administração", "Recepção", "Terapeuta"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label>Unidade</Label><Select value={newAccount.unit} onValueChange={(value) => setNewAccount({ ...newAccount, unit: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Unidade Centro", "Unidade Jardim Esperança", "Todas as unidades"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setCreateOpen(false)}>Cancelar</Button><Button onClick={async () => {
            if (!newAccount.name.trim() || !newAccount.cpf.trim() || !newAccount.phone.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAccount.email)) { toast.error("Preencha todos os campos com dados válidos."); return; }
            try {
              await createAdministrativeAccount(newAccount);
              setCreateOpen(false);
              setNewAccount({ name: "", cpf: "", phone: "", email: "", role: "Recepção", unit: "Unidade Centro" });
              refresh();
              toast.success("Conta criada. Convite de primeiro acesso simulado e aguardando verificação.");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Não foi possível criar a conta.");
            }
          }}>Criar e enviar convite</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
