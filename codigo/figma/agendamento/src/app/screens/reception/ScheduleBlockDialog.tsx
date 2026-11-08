import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CalendarOff, LockOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { deleteScheduleBlock, saveScheduleBlock, type ScheduleBlock } from "../../services/prototypeScheduleBlocks";
import { useReceptionData } from "./ReceptionDataContext";

type FormState = { date: string; period: "day" | "custom"; start: string; end: string; roomId: string };

function todayIso() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function ScheduleBlockDialog({ open, onOpenChange, block, onChange }: { open: boolean; onOpenChange: (open: boolean) => void; block: ScheduleBlock | null; onChange: (blocks: ScheduleBlock[]) => void }) {
  const data = useReceptionData();
  const [form, setForm] = useState<FormState>({ date: todayIso(), period: "day", start: "08:00", end: "18:00", roomId: "all" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(block ? {
      date: block.date,
      period: block.start === "00:00" && block.end === "23:59" ? "day" : "custom",
      start: block.start === "00:00" ? "08:00" : block.start,
      end: block.end === "23:59" ? "18:00" : block.end,
      roomId: block.roomId,
    } : { date: data.appointments[0]?.date || todayIso(), period: "day", start: "08:00", end: "18:00", roomId: "all" });
  }, [open, block, data.appointments]);

  const interval = form.period === "day" ? { start: "00:00", end: "23:59" } : { start: form.start, end: form.end };
  const conflicts = useMemo(() => data.appointments.filter((item) =>
    item.status !== "Cancelado" &&
    item.date === form.date &&
    (form.roomId === "all" || item.roomId === form.roomId) &&
    item.start < interval.end &&
    item.end > interval.start
  ), [data.appointments, form.date, form.roomId, interval.end, interval.start]);

  const confirm = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.date) nextErrors.date = "Selecione a data.";
    if (form.period === "custom" && (!form.start || !form.end || form.end <= form.start)) nextErrors.end = "O horário final deve ser posterior ao inicial.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const saved = saveScheduleBlock({
      id: block?.id || `BLQ-${Date.now()}`,
      date: form.date,
      start: interval.start,
      end: interval.end,
      roomId: form.roomId,
      label: block?.holiday ? block.label : "Sem atendimento",
      holiday: block?.holiday || false,
      released: false,
      scope: block?.scope || "Manual",
    });
    onChange(saved);
    onOpenChange(false);
    toast.success("Período bloqueado na Agenda.");
  };

  const unblock = () => {
    if (!block) return;
    const next = block.holiday ? saveScheduleBlock({ ...block, released: true }) : deleteScheduleBlock(block.id);
    onChange(next);
    onOpenChange(false);
    toast.success(block.holiday ? "Atendimento liberado no feriado; a data permanece identificada." : "Período desbloqueado.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{block ? "Editar período bloqueado" : "Bloquear período"}</DialogTitle>
          <DialogDescription>{block?.holiday ? `${block.label} · ${block.scope}` : "Defina somente a data, o período e as salas afetadas."}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="block-date">Data</Label><Input id="block-date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} disabled={block?.holiday} aria-invalid={Boolean(errors.date)} />{errors.date && <p className="text-xs text-destructive">{errors.date}</p>}</div>
          <div className="space-y-2"><Label>Período</Label><Select value={form.period} onValueChange={(value) => setForm({ ...form, period: value as FormState["period"] })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="day">Dia inteiro</SelectItem><SelectItem value="custom">Horário personalizado</SelectItem></SelectContent></Select></div>
          {form.period === "custom" && <><div className="space-y-2"><Label htmlFor="block-start">Início</Label><Input id="block-start" type="time" value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} /></div><div className="space-y-2"><Label htmlFor="block-end">Fim</Label><Input id="block-end" type="time" value={form.end} onChange={(event) => setForm({ ...form, end: event.target.value })} aria-invalid={Boolean(errors.end)} />{errors.end && <p className="text-xs text-destructive">{errors.end}</p>}</div></>}
          <div className="col-span-2 space-y-2"><Label>Salas</Label><Select value={form.roomId} onValueChange={(value) => setForm({ ...form, roomId: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todas as salas</SelectItem>{data.rooms.filter((room) => room.active).map((room) => <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>)}</SelectContent></Select></div>
        </div>
        {conflicts.length > 0 && <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4"><AlertTriangle className="h-5 w-5 shrink-0 text-amber-700" /><div><p className="text-sm font-bold text-amber-900">Existem {conflicts.length} agendamento(s) neste período</p><p className="mt-1 text-xs text-amber-800">O bloqueio será aplicado, mas nenhuma consulta existente será cancelada automaticamente.</p></div></div>}
        <DialogFooter className="justify-between sm:justify-between">
          <div>{block && !block.released && <Button variant="destructive" onClick={unblock}><LockOpen />{block.holiday ? "Liberar atendimento" : "Desbloquear período"}</Button>}</div>
          <div className="flex gap-2"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button><Button onClick={confirm}><CalendarOff />Confirmar bloqueio</Button></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
