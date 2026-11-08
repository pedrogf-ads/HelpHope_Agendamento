import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Guardian = { id: string; name: string; cpf: string; phone: string; email: string };
export type Patient = {
  id: string; name: string; cpf: string; birth: string; serviceType: string; guardianId: string;
  phone: string; whatsapp: boolean; email: string; communication: string; unit: string; status: string;
};
export type Specialty = { id: string; name: string; active: boolean };
export type Professional = {
  id: string; name: string; cpf: string; phone: string; email: string; specialtyIds: string[]; unit: string; active: boolean;
};
export type Room = { id: string; name: string; unit: string; description: string; capacity: string; resources: string; active: boolean };
export type Availability = { id: string; professionalId: string; weekday: string; start: string; end: string };
export type ScheduleRule = {
  id: string; roomId: string; unit: string; professionalId: string; specialtyId: string; weekday: string;
  start: string; end: string; duration: string; interval: string; active: boolean;
};
export type Account = {
  id: string; name: string; email: string; cpf: string; phone: string; role: string; unit: string; active: boolean; invite: boolean;
};
export type Appointment = {
  id: string; unit: string; roomId: string; specialtyId: string; professionalId: string; patientId: string;
  date: string; start: string; end: string; emailAuthorized: boolean; whatsappAuthorized: boolean;
  communication: string; reminder: boolean; status: string; history: string[];
};
export type Notification = {
  id: string; appointmentId: string; person: string; channel: string; type: string; date: string; status: string; simulated: boolean;
};

type Data = {
  guardians: Guardian[]; patients: Patient[]; specialties: Specialty[]; professionals: Professional[]; rooms: Room[];
  availabilities: Availability[]; schedules: ScheduleRule[]; accounts: Account[]; appointments: Appointment[]; notifications: Notification[];
};

const initialData: Data = {
  guardians: [
    { id: "RES-001", name: "Carla Santos", cpf: "123.456.789-09", phone: "(11) 99842-1160", email: "carla@exemplo.com" },
    { id: "RES-002", name: "Rafael Lima", cpf: "529.982.247-25", phone: "(11) 99352-4087", email: "rafael@exemplo.com" },
  ],
  patients: [
    { id: "PAC-0248", name: "Ana Clara Santos", cpf: "390.533.447-05", birth: "2017-03-12", serviceType: "Atendimento contínuo", guardianId: "RES-001", phone: "(11) 99842-1160", whatsapp: true, email: "carla@exemplo.com", communication: "WhatsApp e e-mail", unit: "Unidade Centro", status: "Ativo" },
    { id: "PAC-0247", name: "Pedro Henrique Lima", cpf: "111.444.777-35", birth: "2015-09-28", serviceType: "Avaliação inicial", guardianId: "RES-002", phone: "(11) 99352-4087", whatsapp: true, email: "rafael@exemplo.com", communication: "WhatsApp", unit: "Unidade Centro", status: "Ativo" },
  ],
  specialties: [
    { id: "ESP-001", name: "Terapia ocupacional", active: true },
    { id: "ESP-002", name: "Psicologia", active: true },
    { id: "ESP-003", name: "Fonoaudiologia", active: true },
  ],
  professionals: [
    { id: "TER-001", name: "Dra. Juliana Costa", cpf: "987.654.321-00", phone: "(11) 97777-1001", email: "juliana@asipeca.org.br", specialtyIds: ["ESP-001"], unit: "Unidade Centro", active: true },
    { id: "TER-002", name: "Dr. Marcos Vieira", cpf: "714.602.380-01", phone: "(11) 97777-1002", email: "marcos@asipeca.org.br", specialtyIds: ["ESP-002"], unit: "Unidade Centro", active: true },
  ],
  rooms: [
    { id: "SAL-001", name: "Sala Flor", unit: "Unidade Centro", description: "Atendimentos individuais", capacity: "3", resources: "Materiais sensoriais", active: true },
    { id: "SAL-002", name: "Sala Girassol", unit: "Unidade Centro", description: "Atendimento infantil", capacity: "4", resources: "Jogos e mesa infantil", active: true },
    { id: "SAL-003", name: "Sala Azul", unit: "Unidade Centro", description: "Sala multiprofissional", capacity: "5", resources: "TV e materiais lúdicos", active: true },
  ],
  availabilities: [
    { id: "DIS-001", professionalId: "TER-001", weekday: "Segunda-feira", start: "08:00", end: "16:00" },
    { id: "DIS-002", professionalId: "TER-002", weekday: "Terça-feira", start: "09:00", end: "17:00" },
  ],
  schedules: [
    { id: "AGE-001", roomId: "SAL-001", unit: "Unidade Centro", professionalId: "TER-001", specialtyId: "ESP-001", weekday: "Segunda-feira", start: "08:00", end: "16:00", duration: "45", interval: "15", active: true },
  ],
  accounts: [
    { id: "USR-001", name: "Maria Souza", email: "recepcao@asipeca.org.br", cpf: "168.995.350-09", phone: "(11) 99999-0001", role: "Recepção", unit: "Unidade Centro", active: true, invite: false },
    { id: "USR-002", name: "Ana Administração", email: "admin@asipeca.org.br", cpf: "078.532.260-00", phone: "(11) 99999-0002", role: "Administração", unit: "Todas as unidades", active: true, invite: false },
  ],
  appointments: [
    { id: "CON-001", unit: "Unidade Centro", roomId: "SAL-001", specialtyId: "ESP-001", professionalId: "TER-001", patientId: "PAC-0248", date: "2026-04-20", start: "08:00", end: "08:45", emailAuthorized: true, whatsappAuthorized: true, communication: "WhatsApp e e-mail", reminder: true, status: "Confirmado", history: ["Criado por Maria Souza", "Confirmação simulada registrada"] },
  ],
  notifications: [
    { id: "NOT-001", appointmentId: "CON-001", person: "Carla Santos", channel: "WhatsApp", type: "Lembrete", date: "Hoje, 07:02", status: "Confirmação simulada", simulated: true },
  ],
};

type Collection = keyof Data;
type ContextValue = Data & {
  add: <K extends Collection>(collection: K, record: Data[K][number]) => void;
  update: <K extends Collection>(collection: K, id: string, patch: Partial<Data[K][number]>) => void;
};

const ReceptionDataContext = createContext<ContextValue | null>(null);

export function ReceptionDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Data>(() => {
    try {
      const stored = localStorage.getItem("helphope-reception-data-v2");
      return stored ? JSON.parse(stored) : initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => localStorage.setItem("helphope-reception-data-v2", JSON.stringify(data)), [data]);

  const value = useMemo<ContextValue>(() => ({
    ...data,
    add: (collection, record) => setData((current) => ({ ...current, [collection]: [...current[collection], record] })),
    update: (collection, id, patch) => setData((current) => ({
      ...current,
      [collection]: current[collection].map((record: { id: string }) => record.id === id ? { ...record, ...patch } : record),
    })),
  }), [data]);

  return <ReceptionDataContext.Provider value={value}>{children}</ReceptionDataContext.Provider>;
}

export function useReceptionData() {
  const value = useContext(ReceptionDataContext);
  if (!value) throw new Error("useReceptionData must be used inside ReceptionDataProvider");
  return value;
}
