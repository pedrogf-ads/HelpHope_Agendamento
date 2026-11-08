import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, CalendarOff, ChevronLeft, ChevronRight, Clock3, MapPin, Stethoscope } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { type Appointment, useReceptionData } from "./ReceptionDataContext";
import { type ScheduleBlock } from "../../services/prototypeScheduleBlocks";

export type AppointmentPrefill = { roomId: string; unit: string; date: string; start: string; end: string };
type View = "day" | "week" | "month";

function iso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromIso(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function moveDate(value: string, amount: number, view: View) {
  const date = fromIso(value);
  if (view === "month") date.setMonth(date.getMonth() + amount);
  else date.setDate(date.getDate() + amount * (view === "week" ? 7 : 1));
  return iso(date);
}

function addMinutes(time: string, minutes: number) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, hour, minute + minutes);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function weekDates(selected: string) {
  const date = fromIso(selected);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return Array.from({ length: 7 }, (_, index) => {
    const item = new Date(date);
    item.setDate(date.getDate() + index);
    return iso(item);
  });
}

function monthDates(selected: string) {
  const date = fromIso(selected);
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const offset = first.getDay();
  first.setDate(first.getDate() - offset);
  return Array.from({ length: 42 }, (_, index) => {
    const item = new Date(first);
    item.setDate(first.getDate() + index);
    return iso(item);
  });
}

const slots = Array.from({ length: 20 }, (_, index) => {
  const total = 8 * 60 + index * 30;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
});

function AppointmentCard({ appointment, onClick }: { appointment: Appointment; onClick: () => void }) {
  const data = useReceptionData();
  const patient = data.patients.find((item) => item.id === appointment.patientId);
  const professional = data.professionals.find((item) => item.id === appointment.professionalId);
  const specialty = data.specialties.find((item) => item.id === appointment.specialtyId);
  const tone = appointment.status === "Cancelado" ? "border-destructive/30 bg-destructive/5" : appointment.status === "Confirmado" ? "border-primary/30 bg-secondary" : "border-amber-200 bg-amber-50";
  return (
    <Button variant="ghost" onClick={onClick} className={`h-auto w-full items-start justify-start whitespace-normal rounded-xl border p-3 text-left ${tone}`}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2"><span className="font-bold text-foreground">{patient?.name || "Paciente"}</span><Badge variant="secondary">{appointment.status}</Badge></div>
        <p className="mt-1 text-xs text-muted-foreground">{appointment.start}–{appointment.end}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">{professional?.name} · {specialty?.name}</p>
      </div>
    </Button>
  );
}

export default function ReceptionCalendar({ onNew, onSelect, blocks, onBlockSelect }: { onNew: (prefill: AppointmentPrefill) => void; onSelect: (appointment: Appointment) => void; blocks: ScheduleBlock[]; onBlockSelect: (block: ScheduleBlock) => void }) {
  const data = useReceptionData();
  const initialDate = data.appointments[0]?.date || iso(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [view, setView] = useState<View>("day");
  const [unit, setUnit] = useState("all");
  const [roomFilter, setRoomFilter] = useState("all");
  const [individualRoomId, setIndividualRoomId] = useState<string | null>(null);

  const activeRooms = data.rooms.filter((room) => room.active && (unit === "all" || room.unit === unit));
  const visibleRooms = activeRooms.filter((room) => (individualRoomId ? room.id === individualRoomId : roomFilter === "all" || room.id === roomFilter));
  const individualRoom = data.rooms.find((room) => room.id === individualRoomId);
  const uniqueUnits = Array.from(new Set(data.rooms.map((room) => room.unit)));
  const selectedLabel = fromIso(selectedDate).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const periodDates = view === "week" ? weekDates(selectedDate) : view === "month" ? monthDates(selectedDate) : [];
  const appointmentsForDate = useMemo(() => data.appointments.filter((item) => item.date === selectedDate && item.status !== "Cancelado"), [data.appointments, selectedDate]);
  const holidayBlocks = blocks.filter((block) => block.date === selectedDate && block.holiday);

  const createAt = (roomId: string, start: string) => {
    const room = data.rooms.find((item) => item.id === roomId);
    if (!room) return;
    onNew({ roomId, unit: room.unit, date: selectedDate, start, end: addMinutes(start, 45) });
  };

  const blockFor = (roomId: string, start: string) => blocks.find((block) =>
    !block.released &&
    block.date === selectedDate &&
    (block.roomId === "all" || block.roomId === roomId) &&
    start >= block.start &&
    start < block.end
  );

  return (
    <div className="space-y-4">
      {individualRoom && <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center"><Button variant="outline" onClick={() => setIndividualRoomId(null)}><ArrowLeft />Voltar à Agenda Geral</Button><div className="flex-1"><p className="font-bold">{individualRoom.name}</p><p className="text-xs text-muted-foreground">{individualRoom.unit} · Agenda individual</p></div></div>}

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-lg font-bold capitalize text-foreground">{selectedLabel}</p>
            <p className="mt-1 text-xs text-muted-foreground">{individualRoom ? "Horários e atendimentos da sala selecionada" : "Agenda Geral organizada por sala"}</p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <Button size="icon" variant="outline" onClick={() => setSelectedDate(moveDate(selectedDate, -1, view))} aria-label="Período anterior"><ChevronLeft /></Button>
            <Button variant="outline" onClick={() => setSelectedDate(iso(new Date()))}>Hoje</Button>
            <Button size="icon" variant="outline" onClick={() => setSelectedDate(moveDate(selectedDate, 1, view))} aria-label="Próximo período"><ChevronRight /></Button>
            <div className="space-y-1"><Label htmlFor="calendar-date">Selecionar data</Label><Input id="calendar-date" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} /></div>
            <Tabs value={view} onValueChange={(value) => setView(value as View)}><TabsList><TabsTrigger value="day">Dia</TabsTrigger><TabsTrigger value="week">Semana</TabsTrigger><TabsTrigger value="month">Mês</TabsTrigger></TabsList></Tabs>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1"><Label>Unidade</Label><Select value={unit} onValueChange={setUnit}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todas as unidades</SelectItem>{uniqueUnits.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
          {!individualRoom && <div className="space-y-1"><Label>Sala</Label><Select value={roomFilter} onValueChange={setRoomFilter}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todas as salas</SelectItem>{activeRooms.map((room) => <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>)}</SelectContent></Select></div>}
        </div>
      </div>

      {view === "week" && <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">{periodDates.map((date) => <Button key={date} variant={date === selectedDate ? "default" : "outline"} onClick={() => setSelectedDate(date)} className="h-auto flex-col py-3"><span className="text-xs">{fromIso(date).toLocaleDateString("pt-BR", { weekday: "short" })}</span><span className="text-lg font-bold">{fromIso(date).getDate()}</span><span className="text-xs">{data.appointments.filter((item) => item.date === date && (!individualRoomId || item.roomId === individualRoomId)).length} atend.</span></Button>)}</div>}

      {view === "month" && <div className="rounded-2xl border bg-card p-3"><div className="grid grid-cols-7 gap-1">{["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => <div key={day} className="p-2 text-center text-xs font-bold text-muted-foreground">{day}</div>)}{periodDates.map((date) => { const count = data.appointments.filter((item) => item.date === date && (!individualRoomId || item.roomId === individualRoomId)).length; const outside = fromIso(date).getMonth() !== fromIso(selectedDate).getMonth(); return <Button key={date} variant={date === selectedDate ? "default" : "ghost"} onClick={() => setSelectedDate(date)} className={`h-16 flex-col ${outside ? "opacity-40" : ""}`}><span>{fromIso(date).getDate()}</span>{count > 0 && <Badge variant="secondary">{count}</Badge>}</Button>; })}</div></div>}

      {holidayBlocks.map((holiday) => <Button key={holiday.id} variant="outline" onClick={() => onBlockSelect(holiday)} className="h-auto w-full justify-start rounded-xl bg-muted/60 p-4 text-left"><CalendarOff /><div><p className="font-bold">{holiday.label} — {holiday.released ? "Atendimento liberado" : "Sem atendimento"}</p><p className="mt-1 text-xs text-muted-foreground">{holiday.scope} · clique para {holiday.released ? "bloquear novamente" : "liberar o atendimento"}</p></div></Button>)}

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-3xl">
            <div className="flex border-b bg-muted/40">
              <div className="w-20 shrink-0 p-3 text-xs font-bold text-muted-foreground">Horário</div>
              {visibleRooms.map((room) => <Button key={room.id} variant="ghost" onClick={() => setIndividualRoomId(room.id)} className="h-auto min-w-56 flex-1 justify-start rounded-none border-l p-3 text-left"><div><p className="font-bold">{room.name}</p><p className="text-xs text-muted-foreground">{room.unit}</p></div></Button>)}
            </div>
            {visibleRooms.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">Nenhuma sala ativa corresponde aos filtros.</div>}
            {visibleRooms.length > 0 && slots.map((slot) => (
              <div key={slot} className="flex min-h-24 border-b last:border-b-0">
                <div className="w-20 shrink-0 p-3 text-xs font-semibold text-muted-foreground"><Clock3 className="mb-1 h-4 w-4" />{slot}</div>
                {visibleRooms.map((room) => {
                  const appointment = appointmentsForDate.find((item) => item.roomId === room.id && item.start === slot);
                  const blocked = blockFor(room.id, slot);
                  return <div key={room.id} className="min-w-56 flex-1 border-l p-2">{appointment ? <AppointmentCard appointment={appointment} onClick={() => onSelect(appointment)} /> : blocked ? <Button variant="ghost" onClick={() => onBlockSelect(blocked)} className="h-full w-full flex-col border bg-muted text-muted-foreground hover:bg-muted/80"><CalendarOff /><span className="font-semibold">{blocked.holiday ? `${blocked.label} — Sem atendimento` : "Sem atendimento"}</span><span className="text-xs">{blocked.start === "00:00" ? "Dia inteiro" : `${blocked.start}–${blocked.end}`}</span></Button> : <Button variant="ghost" onClick={() => createAt(room.id, slot)} className="h-full w-full border border-dashed text-xs text-muted-foreground hover:border-primary/40 hover:bg-secondary/50">Livre · adicionar</Button>}</div>;
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 border-t bg-muted/30 p-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-primary" />Clique no nome da sala para abrir sua agenda</span><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />Clique em um horário livre para agendar</span><span className="flex items-center gap-1"><Stethoscope className="h-4 w-4 text-primary" />Clique no atendimento para ver detalhes</span></div>
      </div>
    </div>
  );
}
