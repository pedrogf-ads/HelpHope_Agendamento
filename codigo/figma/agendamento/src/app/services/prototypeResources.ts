export type PrototypeRoom = {
  id: string; name: string; unit: string; description: string; capacity: string; resources: string;
  active: boolean; availability: string; nextAppointments: number;
};
export type PrototypeUnit = { id: string; name: string; address: string; active: boolean };

const KEY = "helphope-resources-prototype-v1";
const initial: { rooms: PrototypeRoom[]; units: PrototypeUnit[] } = {
  rooms: [
    { id: "SAL-001", name: "Sala Girassol", unit: "Unidade Centro", description: "Atendimentos individuais", capacity: "4", resources: "Materiais sensoriais", active: true, availability: "Livre às 10:45", nextAppointments: 3 },
    { id: "SAL-002", name: "Sala Ipê", unit: "Unidade Centro", description: "Atendimento infantil", capacity: "4", resources: "Mesa infantil e jogos", active: true, availability: "Em uso até 11:00", nextAppointments: 2 },
    { id: "SAL-003", name: "Sala Sementinha", unit: "Unidade Centro", description: "Sala multiprofissional", capacity: "5", resources: "Maca e armário", active: true, availability: "Livre às 09:30", nextAppointments: 4 },
  ],
  units: [
    { id: "UNI-001", name: "Unidade Centro", address: "Av. Central, 120 · Centro", active: true },
    { id: "UNI-002", name: "Unidade Jardim Esperança", address: "Rua das Flores, 85 · Jardim Esperança", active: true },
  ],
};

function load() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) return JSON.parse(stored) as typeof initial;
  } catch {
    // Uses fictional defaults when local storage is unavailable.
  }
  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

function save(value: typeof initial) {
  localStorage.setItem(KEY, JSON.stringify(value));
}

export function getPrototypeRooms() { return load().rooms; }
export function getPrototypeUnits() { return load().units; }
export function savePrototypeRoom(room: PrototypeRoom) {
  const data = load();
  data.rooms = data.rooms.some((item) => item.id === room.id) ? data.rooms.map((item) => item.id === room.id ? room : item) : [...data.rooms, room];
  save(data);
}
export function savePrototypeUnit(unit: PrototypeUnit) {
  const data = load();
  data.units = data.units.some((item) => item.id === unit.id) ? data.units.map((item) => item.id === unit.id ? unit : item) : [...data.units, unit];
  save(data);
}
