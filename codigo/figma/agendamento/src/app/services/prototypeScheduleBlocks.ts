export type ScheduleBlock = {
  id: string;
  date: string;
  start: string;
  end: string;
  roomId: "all" | string;
  label: string;
  holiday: boolean;
  released: boolean;
  scope: "Nacional" | "Estadual" | "Municipal" | "Manual";
};

const KEY = "helphope-schedule-blocks-v1";

function iso(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function relativeDate(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return iso(result.getFullYear(), result.getMonth() + 1, result.getDate());
}

function officialHolidays(): ScheduleBlock[] {
  const result: ScheduleBlock[] = [];
  const add = (year: number, date: string, label: string, scope: ScheduleBlock["scope"]) => result.push({
    id: `HOL-${date}`,
    date,
    start: "00:00",
    end: "23:59",
    roomId: "all",
    label,
    holiday: true,
    released: false,
    scope,
  });
  for (let year = 2024; year <= 2032; year += 1) {
    add(year, iso(year, 1, 1), "Confraternização Universal", "Nacional");
    add(year, relativeDate(easterSunday(year), -2), "Paixão de Cristo", "Municipal");
    add(year, iso(year, 4, 21), "Tiradentes", "Nacional");
    add(year, iso(year, 5, 1), "Dia Mundial do Trabalho", "Nacional");
    add(year, relativeDate(easterSunday(year), 60), "Corpus Christi", "Municipal");
    add(year, iso(year, 7, 9), "Revolução Constitucionalista", "Estadual");
    add(year, iso(year, 8, 15), "Aniversário de Sorocaba", "Municipal");
    add(year, iso(year, 9, 7), "Independência do Brasil", "Nacional");
    add(year, iso(year, 10, 12), "Nossa Senhora Aparecida", "Nacional");
    add(year, iso(year, 11, 2), "Finados", "Nacional");
    add(year, iso(year, 11, 15), "Proclamação da República", "Nacional");
    add(year, iso(year, 11, 20), "Dia Nacional de Zumbi e da Consciência Negra", "Nacional");
    add(year, iso(year, 12, 25), "Natal", "Nacional");
  }
  return result;
}

function loadStored(): ScheduleBlock[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as ScheduleBlock[];
  } catch {
    return [];
  }
}

function persist(blocks: ScheduleBlock[]) {
  localStorage.setItem(KEY, JSON.stringify(blocks));
}

export function loadScheduleBlocks() {
  const stored = loadStored();
  const byId = new Map(stored.map((item) => [item.id, item]));
  officialHolidays().forEach((holiday) => {
    if (!byId.has(holiday.id)) byId.set(holiday.id, holiday);
  });
  const merged = Array.from(byId.values());
  persist(merged);
  return merged;
}

export function saveScheduleBlock(block: ScheduleBlock) {
  const blocks = loadScheduleBlocks();
  const next = blocks.some((item) => item.id === block.id) ? blocks.map((item) => item.id === block.id ? block : item) : [...blocks, block];
  persist(next);
  return next;
}

export function deleteScheduleBlock(id: string) {
  const next = loadScheduleBlocks().filter((item) => item.id !== id || item.holiday);
  persist(next);
  return next;
}

export function appointmentIsBlocked(blocks: ScheduleBlock[], input: { date: string; start: string; end: string; roomId: string }) {
  return blocks.some((block) =>
    !block.released &&
    block.date === input.date &&
    (block.roomId === "all" || block.roomId === input.roomId) &&
    input.start < block.end &&
    input.end > block.start
  );
}
