import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell, Building2, CalendarCheck, CalendarDays, CalendarOff, CheckCircle2, Clock3, Edit3, Eye,
  History, Mail, MessageCircle, Plus, RefreshCw, Search, Send, Settings2, ShieldCheck,
  Stethoscope, UserCheck, Users, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import {
  type Account, type Appointment, type Availability, type Guardian, type Patient, type Professional,
  type Room, type ScheduleRule, type Specialty, useReceptionData,
} from "./ReceptionDataContext";
import ReceptionCalendar, { type AppointmentPrefill } from "./ReceptionCalendar";
import ReceptionAccountSettings from "./ReceptionAccountSettings";
import ScheduleBlockDialog from "./ScheduleBlockDialog";
import { appointmentIsBlocked, loadScheduleBlocks, type ScheduleBlock } from "../../services/prototypeScheduleBlocks";

type Section = "dashboard" | "agenda" | "patients" | "notifications" | "professionals" | "resources" | "settings";
type FormKind = "guardian" | "patient" | "professional" | "specialty" | "room" | "availability" | "schedule" | "account";
type FormRecord = Guardian | Patient | Professional | Specialty | Room | Availability | ScheduleRule | Account;

const titles: Record<Section, [string, string]> = {
  dashboard: ["Bom dia, Maria", "Aqui está o resumo operacional da recepção."],
  agenda: ["Agenda por sala", "Gerencie horários, consultas e disponibilidade sem conflitos."],
  patients: ["Pacientes e responsáveis", "Cadastros administrativos e vínculos autorizados."],
  notifications: ["Notificações", "Envios simulados, prévias e confirmações de consultas."],
  professionals: ["Profissionais", "Terapeutas, especialidades e disponibilidade."],
  resources: ["Unidades e Recursos", "Salas e configurações de agenda por ambiente."],
  settings: ["Configurações", "Dados da conta e segurança da recepcionista conectada."],
};

const units = ["Unidade Centro", "Unidade Jardim Esperança"];
const weekdays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
function nextId(prefix: string, length: number) {
  return `${prefix}-${String(length + 1).padStart(3, "0")}`;
}

function validCpf(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
  const calculate = (size: number) => {
    let total = 0;
    for (let index = 0; index < size; index += 1) total += Number(digits[index]) * (size + 1 - index);
    const result = (total * 10) % 11;
    return result === 10 ? 0 : result;
  };
  return calculate(9) === Number(digits[9]) && calculate(10) === Number(digits[10]);
}

function Page({ section, actions, children }: { section: Section; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1540px] px-4 py-6 md:px-7">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">HelpHope · ASIPECA</div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">{titles[section][0]}</p>
          <p className="mt-1 text-sm text-muted-foreground">{titles[section][1]}</p>
        </div>
        <div className="flex flex-wrap gap-2">{actions}</div>
      </div>
      {children}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-card shadow-sm ${className}`}>{children}</div>;
}

function Status({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return <Badge className={active ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}>{children}</Badge>;
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="pl-10" />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder = "Selecione" }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }>; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}

function TextField({ label, value, onChange, type = "text", placeholder, error, disabled }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; error?: string; disabled?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} disabled={disabled} aria-invalid={Boolean(error)} />
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="p-10 text-center text-sm text-muted-foreground">{text}</div>;
}

function Dashboard() {
  const navigate = useNavigate();
  const data = useReceptionData();
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const active = data.appointments.filter((item) => item.status !== "Cancelado");
  const metrics = [
    ["Agendamentos", String(active.length), CalendarDays],
    ["Confirmados", String(active.filter((item) => item.status === "Confirmado").length), CheckCircle2],
    ["Pacientes ativos", String(data.patients.filter((item) => item.status === "Ativo").length), Users],
    ["Salas disponíveis", String(data.rooms.filter((item) => item.active).length), Building2],
  ] as const;
  return (
    <Page section="dashboard" actions={<><Button variant="outline" onClick={() => navigate("/reception/pacientes")}><UserCheck />Cadastrar paciente</Button><Button onClick={() => setAppointmentOpen(true)}><Plus />Novo agendamento</Button></>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, Icon]) => <Card key={label} className="p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{label}</p><Icon className="h-5 w-5 text-primary" /></div><p className="mt-4 text-3xl font-bold">{value}</p></Card>)}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
        <Card>
          <div className="flex items-center justify-between border-b p-5"><div><p className="font-bold">Próximos atendimentos</p><p className="text-xs text-muted-foreground">Atualizados pelos cadastros e agendamentos locais</p></div><Button variant="link" onClick={() => navigate("/reception/agenda")}>Ver agenda</Button></div>
          <AppointmentTable items={active.slice(0, 5)} />
        </Card>
        <Card className="p-5">
          <p className="font-bold">Ações rápidas</p>
          <div className="mt-4 grid gap-2">
            <Button variant="outline" className="justify-start" onClick={() => setAppointmentOpen(true)}><CalendarCheck />Novo agendamento</Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate("/reception/pacientes")}><Users />Pacientes e responsáveis</Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate("/reception/recursos")}><Building2 />Consultar salas</Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate("/reception/notificacoes")}><MessageCircle />Enviar lembrete</Button>
          </div>
        </Card>
      </div>
      <AppointmentDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </Page>
  );
}

function AppointmentTable({ items, onSelect }: { items: Appointment[]; onSelect?: (item: Appointment) => void }) {
  const data = useReceptionData();
  if (!items.length) return <Empty text="Nenhum agendamento encontrado." />;
  return (
    <Table>
      <TableHeader><TableRow><TableHead>Data e hora</TableHead><TableHead>Paciente</TableHead><TableHead>Terapeuta</TableHead><TableHead>Sala</TableHead><TableHead>Situação</TableHead><TableHead /></TableRow></TableHeader>
      <TableBody>{items.map((item) => {
        const patient = data.patients.find((record) => record.id === item.patientId);
        const professional = data.professionals.find((record) => record.id === item.professionalId);
        const room = data.rooms.find((record) => record.id === item.roomId);
        return <TableRow key={item.id}><TableCell>{item.date}<br /><span className="text-xs text-muted-foreground">{item.start}–{item.end}</span></TableCell><TableCell className="font-semibold">{patient?.name}</TableCell><TableCell>{professional?.name}</TableCell><TableCell>{room?.name}</TableCell><TableCell><Status active={!["Cancelado", "Não compareceu"].includes(item.status)}>{item.status}</Status></TableCell><TableCell><Button size="sm" variant="ghost" onClick={() => onSelect?.(item)}><Eye />Detalhes</Button></TableCell></TableRow>;
      })}</TableBody>
    </Table>
  );
}

function Agenda() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [prefill, setPrefill] = useState<AppointmentPrefill | undefined>();
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(loadScheduleBlocks);
  const [blockOpen, setBlockOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<ScheduleBlock | null>(null);
  const openNew = (value?: AppointmentPrefill) => {
    setPrefill(value);
    setAppointmentOpen(true);
  };
  const openBlock = (block?: ScheduleBlock) => {
    setSelectedBlock(block || null);
    setBlockOpen(true);
  };
  return (
    <Page section="agenda" actions={<Button onClick={() => openBlock()}><CalendarOff />Bloquear período</Button>}>
      <ReceptionCalendar onNew={openNew} onSelect={setSelected} blocks={blocks} onBlockSelect={openBlock} />
      <AppointmentDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} initial={prefill} blocks={blocks} />
      <AppointmentDetails appointment={selected} onClose={() => setSelected(null)} onRebook={() => { if (!selected) return; openNew({ roomId: selected.roomId, unit: selected.unit, date: selected.date, start: selected.start, end: selected.end }); setSelected(null); }} />
      <ScheduleBlockDialog open={blockOpen} onOpenChange={setBlockOpen} block={selectedBlock} onChange={setBlocks} />
    </Page>
  );
}

function AppointmentDialog({ open, onOpenChange, initial, blocks }: { open: boolean; onOpenChange: (value: boolean) => void; initial?: AppointmentPrefill; blocks?: ScheduleBlock[] }) {
  const data = useReceptionData();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ unit: units[0], roomId: "", specialtyId: "", professionalId: "", patientId: "", date: "", start: "", end: "", emailAuthorized: true, whatsappAuthorized: true, communication: "WhatsApp e e-mail", reminder: true });
  useEffect(() => {
    if (!open) return;
    setStep(1);
    setErrors({});
    setForm({ unit: initial?.unit || units[0], roomId: initial?.roomId || "", specialtyId: "", professionalId: "", patientId: "", date: initial?.date || "", start: initial?.start || "", end: initial?.end || "", emailAuthorized: true, whatsappAuthorized: true, communication: "WhatsApp e e-mail", reminder: true });
  }, [open, initial]);
  const compatible = data.professionals.filter((item) => item.active && (!form.specialtyId || item.specialtyIds.includes(form.specialtyId)));
  const set = (key: string, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.roomId) next.roomId = "Selecione uma sala.";
    if (!form.specialtyId) next.specialtyId = "Selecione uma especialidade.";
    if (!form.professionalId) next.professionalId = "Selecione um terapeuta compatível.";
    if (!form.patientId) next.patientId = "Selecione um paciente.";
    if (!form.date) next.date = "Informe a data.";
    if (!form.start) next.start = "Informe o horário inicial.";
    if (!form.end || form.end <= form.start) next.end = "A hora final deve ser posterior à inicial.";
    const conflict = data.appointments.some((item) => item.status !== "Cancelado" && item.date === form.date && (item.roomId === form.roomId || item.professionalId === form.professionalId) && form.start < item.end && form.end > item.start);
    if (conflict) next.start = "Sala ou terapeuta indisponível nesse intervalo.";
    if (appointmentIsBlocked(blocks || [], { date: form.date, start: form.start, end: form.end, roomId: form.roomId })) next.start = "O período selecionado está bloqueado para atendimento.";
    setErrors(next);
    return !Object.keys(next).length;
  };
  const save = () => {
    if (!validate()) { setStep(1); toast.error("Revise os campos destacados."); return; }
    const id = nextId("CON", data.appointments.length);
    const appointment: Appointment = { id, ...form, status: "Agendado", history: ["Agendamento criado por Maria Souza (Recepção)"] };
    data.add("appointments", appointment);
    if (form.reminder) {
      const patient = data.patients.find((item) => item.id === form.patientId);
      const guardian = data.guardians.find((item) => item.id === patient?.guardianId);
      data.add("notifications", { id: nextId("NOT", data.notifications.length), appointmentId: id, person: guardian?.name || patient?.name || "", channel: form.communication.includes("WhatsApp") ? "WhatsApp" : "E-mail", type: "Confirmação", date: "Programada", status: "Envio simulado programado", simulated: true });
    }
    toast.success("Agendamento salvo e incluído na agenda.");
    onOpenChange(false);
    setStep(1);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader><DialogTitle>Novo agendamento</DialogTitle><DialogDescription>Etapa {step} de 5 · os dados são simulados e salvos neste navegador.</DialogDescription></DialogHeader>
        <div className="flex gap-2 overflow-x-auto">{["Local", "Paciente", "Data", "Comunicação", "Confirmação"].map((label, index) => <Badge key={label} variant={step === index + 1 ? "default" : "secondary"}>{index + 1}. {label}</Badge>)}</div>
        {step === 1 && <div className="grid gap-4 sm:grid-cols-2"><SelectField label="Unidade *" value={form.unit} onChange={(value) => set("unit", value)} options={units.map((item) => ({ value: item, label: item }))} /><SelectField label="Sala *" value={form.roomId} onChange={(value) => set("roomId", value)} options={data.rooms.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name }))} /><SelectField label="Especialidade *" value={form.specialtyId} onChange={(value) => { set("specialtyId", value); set("professionalId", ""); }} options={data.specialties.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name }))} /><SelectField label="Terapeuta compatível *" value={form.professionalId} onChange={(value) => set("professionalId", value)} options={compatible.map((item) => ({ value: item.id, label: item.name }))} />{Object.values(errors).slice(0, 1).map((error) => <p key={error} className="text-xs text-destructive">{error}</p>)}</div>}
        {step === 2 && <div className="space-y-4"><SelectField label="Paciente *" value={form.patientId} onChange={(value) => set("patientId", value)} options={data.patients.filter((item) => item.status === "Ativo").map((item) => ({ value: item.id, label: `${item.name} · ${item.id}` }))} />{form.patientId && <Card className="p-4"><p className="text-sm font-semibold">Responsável vinculado</p><p className="text-sm text-muted-foreground">{data.guardians.find((item) => item.id === data.patients.find((patient) => patient.id === form.patientId)?.guardianId)?.name}</p></Card>}<p className="text-xs text-muted-foreground">Cadastre novos pacientes no módulo Pacientes; eles aparecerão imediatamente neste seletor.</p></div>}
        {step === 3 && <div className="grid gap-4 sm:grid-cols-3"><TextField label="Data *" type="date" value={form.date} onChange={(value) => set("date", value)} error={errors.date} /><TextField label="Hora inicial *" type="time" value={form.start} onChange={(value) => set("start", value)} error={errors.start} /><TextField label="Hora final *" type="time" value={form.end} onChange={(value) => set("end", value)} error={errors.end} /></div>}
        {step === 4 && <div className="space-y-4"><SelectField label="Preferência de comunicação" value={form.communication} onChange={(value) => set("communication", value)} options={["WhatsApp e e-mail", "WhatsApp", "E-mail"].map((item) => ({ value: item, label: item }))} /><div className="flex items-center gap-2"><Checkbox checked={form.whatsappAuthorized} onCheckedChange={(value) => set("whatsappAuthorized", Boolean(value))} /><Label>WhatsApp autorizado</Label></div><div className="flex items-center gap-2"><Checkbox checked={form.emailAuthorized} onCheckedChange={(value) => set("emailAuthorized", Boolean(value))} /><Label>E-mail autorizado</Label></div><div className="flex items-center gap-2"><Checkbox checked={form.reminder} onCheckedChange={(value) => set("reminder", Boolean(value))} /><Label>Programar lembrete simulado</Label></div></div>}
        {step === 5 && <Card className="p-5"><p className="font-bold">Revisão do agendamento</p><div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><p>Paciente: <strong>{data.patients.find((item) => item.id === form.patientId)?.name || "Não selecionado"}</strong></p><p>Sala: <strong>{data.rooms.find((item) => item.id === form.roomId)?.name || "Não selecionada"}</strong></p><p>Terapeuta: <strong>{data.professionals.find((item) => item.id === form.professionalId)?.name || "Não selecionado"}</strong></p><p>Data: <strong>{form.date || "Não informada"} · {form.start || "--:--"}–{form.end || "--:--"}</strong></p></div><div className="mt-4 flex gap-2 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground"><ShieldCheck className="h-5 w-5 shrink-0" />O conflito será validado novamente ao confirmar.</div></Card>}
        <DialogFooter className="justify-between sm:justify-between"><Button variant="outline" onClick={() => step === 1 ? onOpenChange(false) : setStep((current) => current - 1)}>{step === 1 ? "Cancelar" : "Voltar"}</Button><Button onClick={() => step === 5 ? save() : setStep((current) => current + 1)}>{step === 5 ? "Confirmar agendamento" : "Continuar"}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AppointmentDetails({ appointment, onClose, onRebook }: { appointment: Appointment | null; onClose: () => void; onRebook: () => void }) {
  const data = useReceptionData();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  if (!appointment) return null;
  const changeStatus = (status: string) => {
    data.update("appointments", appointment.id, { status, history: [...appointment.history, `Situação alterada para ${status} por Maria Souza`] });
    toast.success(`Agendamento atualizado para ${status}.`);
  };
  return (
    <>
      <Dialog open onOpenChange={(value) => !value && onClose()}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detalhes do agendamento</DialogTitle><DialogDescription>{appointment.id} · registro histórico preservado</DialogDescription></DialogHeader>
          <Card className="p-4"><p className="font-bold">{data.patients.find((item) => item.id === appointment.patientId)?.name}</p><p className="mt-1 text-sm text-muted-foreground">{appointment.date} · {appointment.start}–{appointment.end}</p><p className="text-sm text-muted-foreground">{data.professionals.find((item) => item.id === appointment.professionalId)?.name} · {data.rooms.find((item) => item.id === appointment.roomId)?.name}</p><div className="mt-3"><Status active={appointment.status !== "Cancelado"}>{appointment.status}</Status></div></Card>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => changeStatus("Confirmado")}><CheckCircle2 />Confirmar</Button>
            <Button variant="outline" onClick={() => changeStatus("Aguardando atendimento")}><UserCheck />Registrar chegada</Button>
            <Button variant="outline" onClick={onRebook}><RefreshCw />Reagendar</Button>
            <Button variant="outline" onClick={() => setHistoryOpen(true)}><History />Histórico</Button>
            <Button variant="outline" onClick={() => { toast.info("Use Reagendar para alterar data e horário com nova validação de conflitos."); }}><Edit3 />Editar</Button>
            <Button variant="destructive" onClick={() => setCancelOpen(true)}><XCircle />Cancelar</Button>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Cancelar agendamento?</AlertDialogTitle><AlertDialogDescription>O registro continuará no histórico com a situação Cancelado.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Voltar</AlertDialogCancel><AlertDialogAction onClick={() => { changeStatus("Cancelado"); setCancelOpen(false); }}>Confirmar cancelamento</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}><DialogContent><DialogHeader><DialogTitle>Histórico</DialogTitle><DialogDescription>Ações simuladas registradas neste navegador.</DialogDescription></DialogHeader><div className="space-y-2">{appointment.history.map((item, index) => <div key={`${item}-${index}`} className="rounded-xl border p-3 text-sm">{item}</div>)}</div></DialogContent></Dialog>
    </>
  );
}

function Patients() {
  const data = useReceptionData();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("patients");
  const [kind, setKind] = useState<FormKind | null>(null);
  const [editing, setEditing] = useState<FormRecord | null>(null);
  const patients = data.patients.filter((item) => `${item.name} ${item.id}`.toLowerCase().includes(query.toLowerCase()));
  const guardians = data.guardians.filter((item) => `${item.name} ${item.cpf}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Page section="patients" actions={<><Button variant="outline" onClick={() => setKind("guardian")}><Plus />Cadastrar responsável</Button><Button onClick={() => setKind("patient")}><Plus />Cadastrar paciente</Button></>}>
      <Tabs value={tab} onValueChange={setTab}>
        <Card className="mb-4 p-3"><div className="flex flex-col gap-3 md:flex-row"><TabsList><TabsTrigger value="patients">Pacientes</TabsTrigger><TabsTrigger value="guardians">Responsáveis</TabsTrigger></TabsList><SearchBar value={query} onChange={setQuery} placeholder={tab === "patients" ? "Buscar por nome ou identificador..." : "Buscar por nome, CPF ou identificador..."} /></div></Card>
        <TabsContent value="patients"><Card>{patients.length ? <Table><TableHeader><TableRow><TableHead>Paciente</TableHead><TableHead>Responsável</TableHead><TableHead>Tipo</TableHead><TableHead>Unidade</TableHead><TableHead>Situação</TableHead><TableHead /></TableRow></TableHeader><TableBody>{patients.map((item) => <TableRow key={item.id}><TableCell className="font-semibold">{item.name}</TableCell><TableCell>{data.guardians.find((record) => record.id === item.guardianId)?.name}</TableCell><TableCell>{item.serviceType}</TableCell><TableCell>{item.unit}</TableCell><TableCell><Status active={item.status === "Ativo"}>{item.status}</Status></TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => { setEditing(item); setKind("patient"); }}><Edit3 />Editar</Button></TableCell></TableRow>)}</TableBody></Table> : <Empty text="Nenhum paciente encontrado." />}</Card></TabsContent>
        <TabsContent value="guardians"><Card>{guardians.length ? <Table><TableHeader><TableRow><TableHead>Responsável</TableHead><TableHead>CPF</TableHead><TableHead>Contato</TableHead><TableHead>Pacientes vinculados</TableHead><TableHead /></TableRow></TableHeader><TableBody>{guardians.map((item) => <TableRow key={item.id}><TableCell className="font-semibold">{item.name}</TableCell><TableCell>{item.cpf}</TableCell><TableCell>{item.phone}<br /><span className="text-xs text-muted-foreground">{item.email}</span></TableCell><TableCell>{data.patients.filter((patient) => patient.guardianId === item.id).map((patient) => patient.name).join(", ") || "Nenhum"}</TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => { setEditing(item); setKind("guardian"); }}><Edit3 />Editar</Button></TableCell></TableRow>)}</TableBody></Table> : <Empty text="Nenhum responsável encontrado." />}</Card></TabsContent>
      </Tabs>
      <EntityDialog kind={kind} editing={editing} onClose={() => { setKind(null); setEditing(null); }} />
    </Page>
  );
}

function Professionals() {
  const data = useReceptionData();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("professionals");
  const [kind, setKind] = useState<FormKind | null>(null);
  const [editing, setEditing] = useState<FormRecord | null>(null);
  const people = data.professionals.filter((item) => `${item.name} ${item.email}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Page section="professionals" actions={<><Button variant="outline" onClick={() => setKind("specialty")}><Plus />Nova especialidade</Button><Button onClick={() => setKind("professional")}><Plus />Cadastrar terapeuta</Button></>}>
      <Tabs value={tab} onValueChange={setTab}>
        <Card className="mb-4 p-3"><div className="flex flex-col gap-3 md:flex-row"><TabsList><TabsTrigger value="professionals">Terapeutas</TabsTrigger><TabsTrigger value="specialties">Especialidades</TabsTrigger><TabsTrigger value="availability">Disponibilidade</TabsTrigger></TabsList><SearchBar value={query} onChange={setQuery} placeholder="Buscar profissional..." /></div></Card>
        <TabsContent value="professionals"><Card>{people.length ? <Table><TableHeader><TableRow><TableHead>Terapeuta</TableHead><TableHead>Especialidades</TableHead><TableHead>Unidade</TableHead><TableHead>Contato</TableHead><TableHead>Situação</TableHead><TableHead /></TableRow></TableHeader><TableBody>{people.map((item) => <TableRow key={item.id}><TableCell className="font-semibold">{item.name}</TableCell><TableCell>{item.specialtyIds.map((id) => data.specialties.find((record) => record.id === id)?.name).join(", ")}</TableCell><TableCell>{item.unit}</TableCell><TableCell>{item.phone}<br /><span className="text-xs text-muted-foreground">{item.email}</span></TableCell><TableCell><Status active={item.active}>{item.active ? "Ativo" : "Inativo"}</Status></TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => { setEditing(item); setKind("professional"); }}><Edit3 />Editar</Button></TableCell></TableRow>)}</TableBody></Table> : <Empty text="Nenhum terapeuta encontrado." />}</Card></TabsContent>
        <TabsContent value="specialties"><Card><Table><TableHeader><TableRow><TableHead>Especialidade</TableHead><TableHead>Terapeutas vinculados</TableHead><TableHead>Situação</TableHead><TableHead /></TableRow></TableHeader><TableBody>{data.specialties.map((item) => <TableRow key={item.id}><TableCell className="font-semibold">{item.name}</TableCell><TableCell>{data.professionals.filter((person) => person.specialtyIds.includes(item.id)).length}</TableCell><TableCell><Status active={item.active}>{item.active ? "Ativa" : "Inativa"}</Status></TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => { setEditing(item); setKind("specialty"); }}><Edit3 />Editar</Button></TableCell></TableRow>)}</TableBody></Table></Card></TabsContent>
        <TabsContent value="availability"><div className="mb-3 flex justify-end"><Button onClick={() => setKind("availability")}><Plus />Configurar disponibilidade</Button></div><Card><Table><TableHeader><TableRow><TableHead>Terapeuta</TableHead><TableHead>Dia</TableHead><TableHead>Intervalo</TableHead><TableHead /></TableRow></TableHeader><TableBody>{data.availabilities.map((item) => <TableRow key={item.id}><TableCell>{data.professionals.find((person) => person.id === item.professionalId)?.name}</TableCell><TableCell>{item.weekday}</TableCell><TableCell>{item.start}–{item.end}</TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => { setEditing(item); setKind("availability"); }}><Edit3 />Editar</Button></TableCell></TableRow>)}</TableBody></Table></Card></TabsContent>
      </Tabs>
      <EntityDialog kind={kind} editing={editing} onClose={() => { setKind(null); setEditing(null); }} />
    </Page>
  );
}

function Resources() {
  const data = useReceptionData();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<FormKind | null>(null);
  const [editing, setEditing] = useState<FormRecord | null>(null);
  const rooms = data.rooms.filter((item) => `${item.name} ${item.unit}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Page section="resources" actions={<><Button variant="outline" onClick={() => setKind("schedule")}><Settings2 />Configurar agenda da sala</Button><Button onClick={() => setKind("room")}><Plus />Nova sala</Button></>}>
      <Card className="mb-4 p-3"><SearchBar value={query} onChange={setQuery} placeholder="Buscar sala pelo nome ou unidade..." /></Card>
      {rooms.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{rooms.map((room) => <Card key={room.id} className="p-5"><div className="flex items-start justify-between"><div className="rounded-xl bg-secondary p-3 text-primary"><Building2 /></div><Status active={room.active}>{room.active ? "Ativa" : "Inativa"}</Status></div><p className="mt-4 text-lg font-bold">{room.name}</p><p className="text-sm text-muted-foreground">{room.unit} · capacidade {room.capacity}</p><p className="mt-3 text-sm">{room.description}</p><p className="mt-2 text-xs text-muted-foreground">Recursos: {room.resources}</p><div className="mt-4 flex gap-2"><Button variant="outline" size="sm" onClick={() => { setEditing(room); setKind("room"); }}><Edit3 />Editar</Button><Button size="sm" onClick={() => setKind("schedule")}><CalendarDays />Configurar</Button></div></Card>)}</div> : <Empty text="Nenhuma sala encontrada." />}
      <Card className="mt-5 p-4"><p className="text-sm font-semibold">Expansão planejada do banco</p><p className="mt-1 text-xs text-muted-foreground">Salas e recursos estão persistidos localmente neste protótipo e deverão receber tabelas próprias no modelo definitivo.</p></Card>
      <EntityDialog kind={kind} editing={editing} onClose={() => { setKind(null); setEditing(null); }} />
    </Page>
  );
}

function Notifications() {
  const data = useReceptionData();
  const [status, setStatus] = useState("all");
  const [channel, setChannel] = useState("all");
  const [selected, setSelected] = useState<(typeof data.notifications)[number] | null>(null);
  const filtered = data.notifications.filter((item) => (status === "all" || item.status === status) && (channel === "all" || item.channel === channel));
  const simulate = (id: string) => {
    data.update("notifications", id, { status: "Simulação enviada agora", date: "Agora" });
    toast.success("Envio simulado; nenhuma entrega real foi afirmada.");
  };
  return (
    <Page section="notifications" actions={<Button onClick={() => toast.success("Prévia criada a partir do próximo agendamento.")}><Plus />Programar mensagem</Button>}>
      <Card className="mb-4 p-3"><div className="grid gap-3 md:grid-cols-2"><SelectField label="Situação" value={status} onChange={setStatus} options={[{ value: "all", label: "Todas" }, ...Array.from(new Set(data.notifications.map((item) => item.status))).map((item) => ({ value: item, label: item }))]} /><SelectField label="Canal" value={channel} onChange={setChannel} options={[{ value: "all", label: "Todos" }, { value: "WhatsApp", label: "WhatsApp" }, { value: "E-mail", label: "E-mail" }]} /></div></Card>
      <Card>{filtered.length ? <Table><TableHeader><TableRow><TableHead>Destinatário</TableHead><TableHead>Canal</TableHead><TableHead>Tipo</TableHead><TableHead>Data</TableHead><TableHead>Situação</TableHead><TableHead /></TableRow></TableHeader><TableBody>{filtered.map((item) => <TableRow key={item.id}><TableCell className="font-semibold">{item.person}</TableCell><TableCell>{item.channel === "WhatsApp" ? <MessageCircle className="mr-2 inline h-4 w-4 text-primary" /> : <Mail className="mr-2 inline h-4 w-4 text-sky-600" />}{item.channel}</TableCell><TableCell>{item.type}</TableCell><TableCell>{item.date}</TableCell><TableCell><Status active>{item.status}</Status></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => setSelected(item)}><Eye />Visualizar</Button><Button size="sm" variant="ghost" onClick={() => simulate(item.id)}><Send />Simular</Button></div></TableCell></TableRow>)}</TableBody></Table> : <Empty text="Nenhuma notificação corresponde aos filtros." />}</Card>
      <Dialog open={Boolean(selected)} onOpenChange={(value) => !value && setSelected(null)}><DialogContent><DialogHeader><DialogTitle>Prévia da mensagem</DialogTitle><DialogDescription>Esta é uma simulação; não representa entrega por integração externa.</DialogDescription></DialogHeader><Card className="p-4"><p className="text-sm">Olá, {selected?.person}. Este é um lembrete de atendimento da ASIPECA. Responda para confirmar sua presença.</p></Card><DialogFooter><Button variant="outline" onClick={() => toast.info("Confirmação consultada: sem retorno real disponível.")}>Consultar confirmação</Button><Button onClick={() => selected && simulate(selected.id)}>Reenviar simulação</Button></DialogFooter></DialogContent></Dialog>
    </Page>
  );
}

function SettingsPage() {
  return <Page section="settings"><ReceptionAccountSettings /></Page>;
}

function EntityDialog({ kind, editing, onClose }: { kind: FormKind | null; editing?: FormRecord | null; onClose: () => void }) {
  const data = useReceptionData();
  const [form, setForm] = useState<Record<string, string | boolean | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [patientTab, setPatientTab] = useState("identification");
  const value = (key: string, fallback = "") => String(form[key] ?? (editing as unknown as Record<string, unknown> | null)?.[key] ?? fallback);
  const bool = (key: string, fallback = true) => Boolean(form[key] ?? (editing as unknown as Record<string, unknown> | null)?.[key] ?? fallback);
  const array = (key: string) => (form[key] ?? (editing as unknown as Record<string, unknown> | null)?.[key] ?? []) as string[];
  const set = (key: string, next: string | boolean | string[]) => setForm((current) => ({ ...current, [key]: next }));
  if (!kind) return null;
  const title = {
    guardian: "Responsável", patient: "Paciente", professional: "Terapeuta", specialty: "Especialidade",
    room: "Sala", availability: "Disponibilidade", schedule: "Agenda da sala", account: "Conta e usuário",
  }[kind];

  const validateCommon = (required: string[]) => {
    const next: Record<string, string> = {};
    required.forEach((key) => { if (!value(key).trim()) next[key] = "Campo obrigatório."; });
    if (required.includes("email") && value("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = "Informe um e-mail válido.";
    if (required.includes("cpf") && !validCpf(value("cpf"))) next.cpf = "Informe um CPF válido.";
    if (required.includes("cpf")) {
      const collections = [...data.guardians, ...data.patients, ...data.professionals, ...data.accounts];
      if (collections.some((item) => item.cpf.replace(/\D/g, "") === value("cpf").replace(/\D/g, "") && item.id !== (editing as { id?: string } | null)?.id)) next.cpf = "CPF já cadastrado.";
    }
    if ((kind === "availability" || kind === "schedule") && value("end") <= value("start")) next.end = "A hora final deve ser posterior à inicial.";
    setErrors(next);
    return !Object.keys(next).length;
  };

  const save = () => {
    let valid = false;
    if (kind === "guardian") valid = validateCommon(["name", "cpf", "phone", "email"]);
    if (kind === "patient") valid = validateCommon(["name", "birth", "serviceType", "guardianId", "phone", "unit"]);
    if (kind === "professional") valid = validateCommon(["name", "cpf", "phone", "email", "unit"]);
    if (kind === "specialty") {
      valid = validateCommon(["name"]);
      if (data.specialties.some((item) => item.name.toLowerCase() === value("name").toLowerCase() && item.id !== (editing as Specialty | null)?.id)) { setErrors({ name: "Especialidade já cadastrada." }); valid = false; }
    }
    if (kind === "room") valid = validateCommon(["name", "unit", "description", "capacity", "resources"]);
    if (kind === "availability") valid = validateCommon(["professionalId", "weekday", "start", "end"]);
    if (kind === "schedule") valid = validateCommon(["roomId", "unit", "professionalId", "specialtyId", "weekday", "start", "end", "duration"]);
    if (kind === "account") valid = validateCommon(["name", "email", "cpf", "phone", "role", "unit"]);
    if (!valid) { toast.error("Corrija os campos destacados."); return; }

    const id = (editing as { id?: string } | null)?.id;
    if (kind === "guardian") {
      const record: Guardian = { id: id || nextId("RES", data.guardians.length), name: value("name"), cpf: value("cpf"), phone: value("phone"), email: value("email") };
      id ? data.update("guardians", id, record) : data.add("guardians", record);
    }
    if (kind === "patient") {
      const record: Patient = { id: id || nextId("PAC", data.patients.length + 248), name: value("name"), cpf: value("cpf"), birth: value("birth"), serviceType: value("serviceType"), guardianId: value("guardianId"), phone: value("phone"), whatsapp: bool("whatsapp"), email: value("email"), communication: value("communication", "WhatsApp e e-mail"), unit: value("unit"), status: bool("active") ? "Ativo" : "Inativo" };
      id ? data.update("patients", id, record) : data.add("patients", record);
    }
    if (kind === "professional") {
      const record: Professional = { id: id || nextId("TER", data.professionals.length), name: value("name"), cpf: value("cpf"), phone: value("phone"), email: value("email"), specialtyIds: array("specialtyIds"), unit: value("unit"), active: bool("active") };
      id ? data.update("professionals", id, record) : data.add("professionals", record);
    }
    if (kind === "specialty") {
      const record: Specialty = { id: id || nextId("ESP", data.specialties.length), name: value("name"), active: bool("active") };
      id ? data.update("specialties", id, record) : data.add("specialties", record);
    }
    if (kind === "room") {
      const record: Room = { id: id || nextId("SAL", data.rooms.length), name: value("name"), unit: value("unit"), description: value("description"), capacity: value("capacity"), resources: value("resources"), active: bool("active") };
      id ? data.update("rooms", id, record) : data.add("rooms", record);
    }
    if (kind === "availability") {
      const record: Availability = { id: id || nextId("DIS", data.availabilities.length), professionalId: value("professionalId"), weekday: value("weekday"), start: value("start"), end: value("end") };
      id ? data.update("availabilities", id, record) : data.add("availabilities", record);
    }
    if (kind === "schedule") {
      const professional = data.professionals.find((item) => item.id === value("professionalId"));
      if (!professional?.specialtyIds.includes(value("specialtyId"))) { setErrors({ specialtyId: "Especialidade incompatível com o terapeuta." }); return; }
      const record: ScheduleRule = { id: id || nextId("AGE", data.schedules.length), roomId: value("roomId"), unit: value("unit"), professionalId: value("professionalId"), specialtyId: value("specialtyId"), weekday: value("weekday"), start: value("start"), end: value("end"), duration: value("duration"), interval: value("interval", "0"), active: bool("active") };
      id ? data.update("schedules", id, record) : data.add("schedules", record);
    }
    if (kind === "account") {
      const record: Account = { id: id || nextId("USR", data.accounts.length), name: value("name"), email: value("email"), cpf: value("cpf"), phone: value("phone"), role: value("role"), unit: value("unit"), active: bool("active"), invite: bool("invite") };
      id ? data.update("accounts", id, record) : data.add("accounts", record);
    }
    toast.success(`${title} ${id ? "atualizado" : "cadastrado"} com sucesso.`);
    onClose();
  };

  const activeToggle = <div className="flex items-center gap-2"><Checkbox checked={bool("active")} onCheckedChange={(checked) => set("active", Boolean(checked))} /><Label>Cadastro ativo</Label></div>;
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader><DialogTitle>{editing ? "Editar" : "Cadastrar"} {title.toLowerCase()}</DialogTitle><DialogDescription>Os dados são fictícios e permanecem salvos localmente neste protótipo.</DialogDescription></DialogHeader>
        {kind === "guardian" && <div className="grid gap-4 sm:grid-cols-2"><TextField label="Nome completo *" value={value("name")} onChange={(v) => set("name", v)} error={errors.name} /><TextField label="CPF *" value={value("cpf")} onChange={(v) => set("cpf", v)} error={errors.cpf} /><TextField label="Telefone *" value={value("phone")} onChange={(v) => set("phone", v)} error={errors.phone} /><TextField label="E-mail *" type="email" value={value("email")} onChange={(v) => set("email", v)} error={errors.email} /></div>}
        {kind === "patient" && <Tabs value={patientTab} onValueChange={setPatientTab}><TabsList className="grid w-full grid-cols-4"><TabsTrigger value="identification">Identificação</TabsTrigger><TabsTrigger value="guardian">Responsável</TabsTrigger><TabsTrigger value="contact">Contato</TabsTrigger><TabsTrigger value="review">Revisão</TabsTrigger></TabsList><TabsContent value="identification" className="grid gap-4 sm:grid-cols-2"><TextField label="Nome completo *" value={value("name")} onChange={(v) => set("name", v)} error={errors.name} /><TextField label="Data de nascimento *" type="date" value={value("birth")} onChange={(v) => set("birth", v)} error={errors.birth} /><SelectField label="Tipo de atendimento *" value={value("serviceType")} onChange={(v) => set("serviceType", v)} options={["Avaliação inicial", "Atendimento contínuo", "Acompanhamento institucional"].map((item) => ({ value: item, label: item }))} /></TabsContent><TabsContent value="guardian"><SelectField label="Responsável cadastrado *" value={value("guardianId")} onChange={(v) => set("guardianId", v)} options={data.guardians.map((item) => ({ value: item.id, label: `${item.name} · ${item.cpf}` }))} /><p className="mt-3 text-xs text-muted-foreground">Cadastre um novo responsável na listagem e retorne ao formulário para selecioná-lo.</p></TabsContent><TabsContent value="contact" className="grid gap-4 sm:grid-cols-2"><TextField label="Telefone de contato *" value={value("phone")} onChange={(v) => set("phone", v)} error={errors.phone} /><TextField label="E-mail para notificações" type="email" value={value("email")} onChange={(v) => set("email", v)} error={errors.email} /><SelectField label="Preferência de comunicação" value={value("communication", "WhatsApp e e-mail")} onChange={(v) => set("communication", v)} options={["WhatsApp e e-mail", "WhatsApp", "E-mail"].map((item) => ({ value: item, label: item }))} /><SelectField label="Unidade de referência *" value={value("unit")} onChange={(v) => set("unit", v)} options={units.map((item) => ({ value: item, label: item }))} /><div className="flex items-center gap-2"><Checkbox checked={bool("whatsapp")} onCheckedChange={(checked) => set("whatsapp", Boolean(checked))} /><Label>WhatsApp autorizado</Label></div>{activeToggle}</TabsContent><TabsContent value="review"><Card className="p-4"><p className="font-bold">{value("name") || "Nome não informado"}</p><p className="mt-2 text-sm text-muted-foreground">Nascimento: {value("birth") || "—"}</p><p className="text-sm text-muted-foreground">Responsável: {data.guardians.find((item) => item.id === value("guardianId"))?.name || "Não selecionado"}</p><p className="text-sm text-muted-foreground">Unidade: {value("unit") || "—"}</p></Card></TabsContent></Tabs>}
        {kind === "professional" && <div className="grid gap-4 sm:grid-cols-2"><TextField label="Nome completo *" value={value("name")} onChange={(v) => set("name", v)} error={errors.name} /><TextField label="CPF *" value={value("cpf")} onChange={(v) => set("cpf", v)} error={errors.cpf} /><TextField label="Telefone *" value={value("phone")} onChange={(v) => set("phone", v)} error={errors.phone} /><TextField label="E-mail *" type="email" value={value("email")} onChange={(v) => set("email", v)} error={errors.email} /><SelectField label="Unidade *" value={value("unit")} onChange={(v) => set("unit", v)} options={units.map((item) => ({ value: item, label: item }))} /><div><Label>Especialidades vinculadas *</Label><div className="mt-2 space-y-2">{data.specialties.filter((item) => item.active).map((item) => <div key={item.id} className="flex items-center gap-2"><Checkbox checked={array("specialtyIds").includes(item.id)} onCheckedChange={(checked) => set("specialtyIds", checked ? [...array("specialtyIds"), item.id] : array("specialtyIds").filter((id) => id !== item.id))} /><Label>{item.name}</Label></div>)}</div></div>{activeToggle}</div>}
        {kind === "specialty" && <div className="space-y-4"><TextField label="Nome da especialidade *" value={value("name")} onChange={(v) => set("name", v)} error={errors.name} />{activeToggle}</div>}
        {kind === "room" && <div className="grid gap-4 sm:grid-cols-2"><TextField label="Nome da sala *" value={value("name")} onChange={(v) => set("name", v)} error={errors.name} /><SelectField label="Unidade *" value={value("unit")} onChange={(v) => set("unit", v)} options={units.map((item) => ({ value: item, label: item }))} /><TextField label="Descrição *" value={value("description")} onChange={(v) => set("description", v)} error={errors.description} /><TextField label="Capacidade *" type="number" value={value("capacity")} onChange={(v) => set("capacity", v)} error={errors.capacity} /><TextField label="Recursos disponíveis *" value={value("resources")} onChange={(v) => set("resources", v)} error={errors.resources} />{activeToggle}</div>}
        {kind === "availability" && <div className="grid gap-4 sm:grid-cols-2"><SelectField label="Terapeuta *" value={value("professionalId")} onChange={(v) => set("professionalId", v)} options={data.professionals.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name }))} /><SelectField label="Dia da semana *" value={value("weekday")} onChange={(v) => set("weekday", v)} options={weekdays.map((item) => ({ value: item, label: item }))} /><TextField label="Hora inicial *" type="time" value={value("start")} onChange={(v) => set("start", v)} error={errors.start} /><TextField label="Hora final *" type="time" value={value("end")} onChange={(v) => set("end", v)} error={errors.end} /></div>}
        {kind === "schedule" && <div className="grid gap-4 sm:grid-cols-2"><SelectField label="Sala *" value={value("roomId")} onChange={(v) => set("roomId", v)} options={data.rooms.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name }))} /><SelectField label="Unidade *" value={value("unit")} onChange={(v) => set("unit", v)} options={units.map((item) => ({ value: item, label: item }))} /><SelectField label="Terapeuta *" value={value("professionalId")} onChange={(v) => set("professionalId", v)} options={data.professionals.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name }))} /><SelectField label="Especialidade *" value={value("specialtyId")} onChange={(v) => set("specialtyId", v)} options={data.specialties.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name }))} />{errors.specialtyId && <p className="text-xs text-destructive">{errors.specialtyId}</p>}<SelectField label="Dia da semana *" value={value("weekday")} onChange={(v) => set("weekday", v)} options={weekdays.map((item) => ({ value: item, label: item }))} /><TextField label="Hora inicial *" type="time" value={value("start")} onChange={(v) => set("start", v)} error={errors.start} /><TextField label="Hora final *" type="time" value={value("end")} onChange={(v) => set("end", v)} error={errors.end} /><TextField label="Duração (minutos) *" type="number" value={value("duration", "45")} onChange={(v) => set("duration", v)} error={errors.duration} /><TextField label="Intervalo (minutos)" type="number" value={value("interval", "0")} onChange={(v) => set("interval", v)} />{activeToggle}</div>}
        {kind === "account" && <div className="grid gap-4 sm:grid-cols-2"><TextField label="Nome completo *" value={value("name")} onChange={(v) => set("name", v)} error={errors.name} /><TextField label="E-mail *" type="email" value={value("email")} onChange={(v) => set("email", v)} error={errors.email} /><TextField label="CPF *" value={value("cpf")} onChange={(v) => set("cpf", v)} error={errors.cpf} /><TextField label="Telefone *" value={value("phone")} onChange={(v) => set("phone", v)} error={errors.phone} /><SelectField label="Perfil de acesso *" value={value("role")} onChange={(v) => set("role", v)} options={["Administração", "Recepção", "Terapeuta"].map((item) => ({ value: item, label: item }))} /><SelectField label="Unidade autorizada *" value={value("unit")} onChange={(v) => set("unit", v)} options={[...units, "Todas as unidades"].map((item) => ({ value: item, label: item }))} />{activeToggle}<div className="flex items-center gap-2"><Checkbox checked={bool("invite")} onCheckedChange={(checked) => set("invite", Boolean(checked))} /><Label>Enviar convite de primeiro acesso</Label></div><Card className="p-3 sm:col-span-2"><p className="text-xs text-muted-foreground">A senha não é exibida nem armazenada neste cadastro. O funcionário a define no fluxo de primeiro acesso.</p></Card></div>}
        <DialogFooter><Button variant="outline" onClick={onClose}>Cancelar</Button><Button onClick={save}>Salvar {title}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ReceptionWorkspace({ section }: { section: Section }) {
  if (section === "dashboard") return <Dashboard />;
  if (section === "agenda") return <Agenda />;
  if (section === "patients") return <Patients />;
  if (section === "notifications") return <Notifications />;
  if (section === "professionals") return <Professionals />;
  if (section === "resources") return <Resources />;
  return <SettingsPage />;
}
