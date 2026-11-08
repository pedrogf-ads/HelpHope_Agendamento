import { useState } from "react";
import { Building2, Edit3, Eye, Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { getSession } from "../../services/prototypeAuth";
import { getPrototypeRooms, getPrototypeUnits, savePrototypeRoom, savePrototypeUnit, type PrototypeRoom, type PrototypeUnit } from "../../services/prototypeResources";

export default function ResourceManager() {
  const authorized = getSession()?.role === "Administração";
  const [rooms, setRooms] = useState(getPrototypeRooms);
  const [units, setUnits] = useState(getPrototypeUnits);
  const [roomOpen, setRoomOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);
  const [room, setRoom] = useState<PrototypeRoom | null>(null);
  const [unit, setUnit] = useState<PrototypeUnit | null>(null);
  const editRoom = (value?: PrototypeRoom) => { setRoom(value ?? { id: `SAL-${String(rooms.length + 1).padStart(3, "0")}`, name: "", unit: units[0]?.name || "", description: "", capacity: "", resources: "", active: true, availability: "Disponível para configuração", nextAppointments: 0 }); setRoomOpen(true); };
  const editUnit = (value?: PrototypeUnit) => { setUnit(value ?? { id: `UNI-${String(units.length + 1).padStart(3, "0")}`, name: "", address: "", active: true }); setUnitOpen(true); };
  const saveRoom = () => {
    if (!room?.name.trim() || !room.unit || !room.description.trim() || !room.resources.trim()) { toast.error("Preencha os campos obrigatórios da sala."); return; }
    savePrototypeRoom(room); setRooms(getPrototypeRooms()); setRoomOpen(false); toast.success("Sala salva e disponibilizada nas agendas e agendamentos.");
  };
  const saveUnit = () => {
    if (!unit?.name.trim() || !unit.address.trim()) { toast.error("Preencha nome e endereço da unidade."); return; }
    savePrototypeUnit(unit); setUnits(getPrototypeUnits()); setUnitOpen(false); toast.success("Unidade salva com sucesso.");
  };
  return (
    <>
      <Tabs defaultValue="rooms">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border bg-card p-2"><TabsList><TabsTrigger value="rooms">Salas</TabsTrigger><TabsTrigger value="units">Unidades</TabsTrigger></TabsList>{authorized && <Button onClick={() => editRoom()}><Plus />Nova sala</Button>}</div>
        <TabsContent value="rooms"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{rooms.map((item) => <div key={item.id} className="rounded-2xl border bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><span className="rounded-xl bg-secondary p-3 text-primary"><Building2 /></span><Badge variant={item.active ? "default" : "secondary"}>{item.active ? "Ativa" : "Inativa"}</Badge></div><p className="mt-4 text-base font-bold">{item.name}</p><p className="text-xs text-muted-foreground">{item.unit}</p><div className="my-4 h-px bg-border" /><div className="grid grid-cols-2 gap-3 text-xs"><div><p className="font-bold text-muted-foreground">Disponibilidade</p><p className="mt-1">{item.availability}</p></div><div><p className="font-bold text-muted-foreground">Próximos atendimentos</p><p className="mt-1">{item.nextAppointments}</p></div></div><p className="mt-3 text-xs text-muted-foreground">Recursos: {item.resources}</p><div className="mt-4 flex gap-2"><Button size="sm" variant="outline" onClick={() => toast.info(`${item.name}: ${item.description}. Capacidade ${item.capacity || "não informada"}.`)}><Eye />Visualizar</Button>{authorized && <Button size="sm" variant="outline" onClick={() => editRoom(item)}><Edit3 />Editar</Button>}</div></div>)}</div></TabsContent>
        <TabsContent value="units"><div className="mb-3 flex justify-end">{authorized && <Button onClick={() => editUnit()}><Plus />Nova unidade</Button>}</div><div className="space-y-3">{units.map((item) => <div key={item.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-5 md:flex-row md:items-center"><div className="flex-1"><div className="flex items-center gap-2"><p className="font-bold">{item.name}</p><Badge variant={item.active ? "default" : "secondary"}>{item.active ? "Ativa" : "Inativa"}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{item.address}</p><p className="mt-2 text-xs">{rooms.filter((roomItem) => roomItem.unit === item.name).length} salas vinculadas</p></div>{authorized && <Button variant="outline" size="sm" onClick={() => editUnit(item)}><Edit3 />Editar</Button>}</div>)}</div></TabsContent>
      </Tabs>
      <Dialog open={roomOpen} onOpenChange={setRoomOpen}><DialogContent className="sm:max-w-2xl"><DialogHeader><DialogTitle>{rooms.some((item) => item.id === room?.id) ? "Editar sala" : "Nova sala"}</DialogTitle><DialogDescription>Os recursos necessários permanecem dentro do cadastro da sala.</DialogDescription></DialogHeader>{room && <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Nome da sala *</Label><Input value={room.name} onChange={(event) => setRoom({ ...room, name: event.target.value })} /></div><div className="space-y-2"><Label>Unidade *</Label><Select value={room.unit} onValueChange={(value) => setRoom({ ...room, unit: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{units.filter((item) => item.active).map((item) => <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Descrição administrativa *</Label><Input value={room.description} onChange={(event) => setRoom({ ...room, description: event.target.value })} /></div><div className="space-y-2"><Label>Capacidade</Label><Input type="number" value={room.capacity} onChange={(event) => setRoom({ ...room, capacity: event.target.value })} /></div><div className="space-y-2 sm:col-span-2"><Label>Recursos necessários *</Label><Input value={room.resources} onChange={(event) => setRoom({ ...room, resources: event.target.value })} /></div><div className="flex items-center gap-2"><Checkbox checked={room.active} onCheckedChange={(value) => setRoom({ ...room, active: Boolean(value) })} /><Label>Sala ativa</Label></div></div>}<DialogFooter><Button variant="outline" onClick={() => setRoomOpen(false)}>Cancelar</Button><Button onClick={saveRoom}>Salvar sala</Button></DialogFooter></DialogContent></Dialog>
      <Dialog open={unitOpen} onOpenChange={setUnitOpen}><DialogContent><DialogHeader><DialogTitle>{units.some((item) => item.id === unit?.id) ? "Editar unidade" : "Nova unidade"}</DialogTitle><DialogDescription>Cadastro disponível somente para usuários autorizados.</DialogDescription></DialogHeader>{unit && <div className="space-y-4"><div className="space-y-2"><Label>Nome da unidade *</Label><Input value={unit.name} onChange={(event) => setUnit({ ...unit, name: event.target.value })} /></div><div className="space-y-2"><Label>Endereço *</Label><Input value={unit.address} onChange={(event) => setUnit({ ...unit, address: event.target.value })} /></div><div className="flex items-center gap-2"><Checkbox checked={unit.active} onCheckedChange={(value) => setUnit({ ...unit, active: Boolean(value) })} /><Label>Unidade ativa</Label></div></div>}<DialogFooter><Button variant="outline" onClick={() => setUnitOpen(false)}>Cancelar</Button><Button onClick={saveUnit}>Salvar unidade</Button></DialogFooter></DialogContent></Dialog>
    </>
  );
}
