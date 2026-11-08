export type AccessRole = "Administração" | "Recepção" | "Terapeuta";

export type AccountRequest = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  status: "Pendente" | "Aguardando verificação" | "Aprovada" | "Recusada";
  role?: AccessRole;
  unit?: string;
  createdAt: string;
};

type Credential = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  passwordHash: string;
  passwordSalt: string;
  role: AccessRole;
  unit: string;
  active: boolean;
  verified: boolean;
};

export type AuthSession = Pick<Credential, "id" | "name" | "email" | "role" | "unit">;

type AuthStore = { credentials: Credential[]; requests: AccountRequest[] };
type RecoveryRecord = { email: string; expiresAt: number; used: boolean };

const STORE_KEY = "helphope-auth-prototype-v1";
const SESSION_KEY = "helphope-auth-session-v1";
const recoveryTokens = new Map<string, RecoveryRecord>();

const seedCredentials: Credential[] = [
  {
    id: "USR-001",
    name: "Maria Souza",
    email: "recepcao@asipeca.org.br",
    cpf: "168.995.350-09",
    passwordHash: "69e10d350d2b07a129919ff8b69ee11beebe5a9dd44488623c20464a3bf4d332",
    passwordSalt: "0f3a6b0d95e4485f839d340b4d5cf928",
    role: "Recepção",
    unit: "Unidade Centro",
    active: true,
    verified: true,
  },
  {
    id: "USR-002",
    name: "Ana Administração",
    email: "admin@asipeca.org.br",
    cpf: "078.532.260-00",
    passwordHash: "fab92fe0d032de145e272b44474ef2648eda502c9e072f288a4c8eca13e92c31",
    passwordSalt: "a61d2e975527456aafc52a48673bcd5f",
    role: "Administração",
    unit: "Todas as unidades",
    active: true,
    verified: true,
  },
];

function loadStore(): AuthStore {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) return JSON.parse(stored) as AuthStore;
  } catch {
    // Falls back to non-sensitive fictional seed records.
  }
  const initial = { credentials: seedCredentials, requests: [] };
  localStorage.setItem(STORE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStore(store: AuthStore) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function randomHex(bytes: number) {
  const value = new Uint8Array(bytes);
  crypto.getRandomValues(value);
  return Array.from(value, (item) => item.toString(16).padStart(2, "0")).join("");
}

async function deriveHash(password: string, saltHex: string) {
  const encoder = new TextEncoder();
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ?? []);
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: 120000 }, key, 256);
  return Array.from(new Uint8Array(bits), (item) => item.toString(16).padStart(2, "0")).join("");
}

export function passwordRequirements(password: string) {
  return {
    length: password.length >= 10,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
}

export function isStrongPassword(password: string) {
  return Object.values(passwordRequirements(password)).every(Boolean);
}

export async function authenticate(email: string, password: string): Promise<AuthSession | null> {
  const account = loadStore().credentials.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  if (!account || !account.active || !account.verified) return null;
  const hash = await deriveHash(password, account.passwordSalt);
  if (hash !== account.passwordHash) return null;
  const session = { id: account.id, name: account.name, email: account.email, role: account.role, unit: account.unit };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): AuthSession | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as AuthSession | null;
  } catch {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateSessionProfile(patch: Partial<Pick<AuthSession, "name" | "email">>) {
  const session = getSession();
  if (!session) return;
  const store = loadStore();
  const credential = store.credentials.find((item) => item.id === session.id || item.email.toLowerCase() === session.email.toLowerCase());
  if (credential) {
    if (patch.name) credential.name = patch.name;
    if (patch.email) credential.email = patch.email;
    saveStore(store);
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, ...patch }));
}

export function startReceptionDemoSession(email: string): AuthSession | null {
  const normalizedEmail = email.trim().toLowerCase();
  const demoHost =
    import.meta.env.DEV ||
    window.location.hostname.includes("figma.site") ||
    window.location.hostname.includes("makeproxy");
  const acceptedDemoEmails = [
    "recepcao@asipeca.org.br",
    "recepcao@speca.org.br",
  ];
  if (!demoHost || !acceptedDemoEmails.includes(normalizedEmail)) return null;
  const session: AuthSession = {
    id: "DEMO-RECEPCAO",
    name: "Recepção ASIPECA",
    email: normalizedEmail,
    role: "Recepção",
    unit: "Unidade Centro",
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function submitAccountRequest(input: Omit<AccountRequest, "id" | "passwordHash" | "passwordSalt" | "status" | "createdAt"> & { password: string }) {
  const store = loadStore();
  const email = input.email.trim().toLowerCase();
  const cpf = input.cpf.replace(/\D/g, "");
  if (store.credentials.some((item) => item.email.toLowerCase() === email || item.cpf.replace(/\D/g, "") === cpf)) throw new Error("E-mail ou CPF já cadastrado.");
  if (store.requests.some((item) => item.status !== "Recusada" && (item.email.toLowerCase() === email || item.cpf.replace(/\D/g, "") === cpf))) throw new Error("Já existe uma solicitação para este e-mail ou CPF.");
  const passwordSalt = randomHex(16);
  const passwordHash = await deriveHash(input.password, passwordSalt);
  const request: AccountRequest = {
    id: `SOL-${String(store.requests.length + 1).padStart(3, "0")}`,
    name: input.name.trim(),
    cpf: input.cpf,
    phone: input.phone,
    email,
    passwordHash,
    passwordSalt,
    status: "Pendente",
    createdAt: new Date().toLocaleDateString("pt-BR"),
  };
  store.requests.push(request);
  saveStore(store);
  return request;
}

export function listAccountRequests() {
  return loadStore().requests;
}

export function approveAccountRequest(id: string, role: AccessRole, unit: string) {
  const store = loadStore();
  const request = store.requests.find((item) => item.id === id);
  if (!request) return;
  request.status = "Aguardando verificação";
  request.role = role;
  request.unit = unit;
  const credential: Credential = {
    id: `USR-${String(store.credentials.length + 1).padStart(3, "0")}`,
    name: request.name,
    email: request.email,
    cpf: request.cpf,
    passwordHash: request.passwordHash,
    passwordSalt: request.passwordSalt,
    role,
    unit,
    active: false,
    verified: false,
  };
  store.credentials = [...store.credentials.filter((item) => item.email !== request.email), credential];
  saveStore(store);
}

export async function createAdministrativeAccount(input: { name: string; cpf: string; phone: string; email: string; role: AccessRole; unit: string }) {
  const request = await submitAccountRequest({ name: input.name, cpf: input.cpf, phone: input.phone, email: input.email, password: randomHex(24) });
  approveAccountRequest(request.id, input.role, input.unit);
  return request;
}

export function verifyRequestedAccount(id: string) {
  const store = loadStore();
  const request = store.requests.find((item) => item.id === id);
  if (!request || request.status !== "Aguardando verificação") return;
  request.status = "Aprovada";
  const credential = store.credentials.find((item) => item.email === request.email);
  if (credential) {
    credential.active = true;
    credential.verified = true;
  }
  saveStore(store);
}

export function rejectAccountRequest(id: string) {
  const store = loadStore();
  const request = store.requests.find((item) => item.id === id);
  if (request) request.status = "Recusada";
  saveStore(store);
}

export function requestPasswordRecovery(email: string) {
  const account = loadStore().credentials.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.active && item.verified);
  const token = randomHex(24);
  if (account) recoveryTokens.set(token, { email: account.email, expiresAt: Date.now() + 15 * 60 * 1000, used: false });
  return account ? token : `invalid-${token}`;
}

export function recoveryTokenStatus(token: string): "valid" | "invalid" | "expired" | "used" {
  const record = recoveryTokens.get(token);
  if (!record) return "invalid";
  if (record.used) return "used";
  if (record.expiresAt < Date.now()) return "expired";
  return "valid";
}

export async function resetPassword(token: string, password: string) {
  const record = recoveryTokens.get(token);
  if (!record || recoveryTokenStatus(token) !== "valid") return false;
  const store = loadStore();
  const account = store.credentials.find((item) => item.email === record.email);
  if (!account) return false;
  account.passwordSalt = randomHex(16);
  account.passwordHash = await deriveHash(password, account.passwordSalt);
  record.used = true;
  saveStore(store);
  signOut();
  return true;
}
