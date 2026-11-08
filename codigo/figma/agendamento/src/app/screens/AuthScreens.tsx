import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Check, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck, UserPlus } from "lucide-react";
import asipecaLogo from "../../imports/Asipeca_logo-4.jpg";
import helpHopeLogo from "../../imports/helphope.png";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { PrivacyPolicyDialog } from "./PrivacyPolicyDialog";
import {
  isStrongPassword,
  passwordRequirements,
  recoveryTokenStatus,
  requestPasswordRecovery,
  resetPassword,
  submitAccountRequest,
} from "../services/prototypeAuth";

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 via-background to-blue-50">
      <div aria-hidden className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-secondary blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <div className="mb-6 flex items-center justify-center gap-4">
            <img src={helpHopeLogo} alt="HelpHope" className="h-16 w-16 rounded-2xl bg-white object-contain p-1 shadow-sm" />
            <div className="h-10 w-px bg-border" />
            <img src={asipecaLogo} alt="ASIPECA" className="h-16 w-auto rounded-xl object-contain" />
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-xl sm:p-8">
            <div className="mb-6 text-center"><p className="text-2xl font-bold text-foreground">{title}</p><p className="mt-2 text-sm text-muted-foreground">{subtitle}</p></div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

function PasswordField({ id, label, value, onChange, error }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string }) {
  const [visible, setVisible] = useState(false);
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input id={id} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} className="pl-10 pr-10" aria-invalid={Boolean(error)} /><Button type="button" variant="ghost" size="icon" onClick={() => setVisible((current) => !current)} className="absolute right-0 top-0" aria-label={visible ? "Ocultar senha" : "Mostrar senha"}>{visible ? <EyeOff /> : <Eye />}</Button></div>{error && <p className="text-xs font-medium text-destructive">{error}</p>}</div>;
}

function validCpf(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
  const digit = (size: number) => { let sum = 0; for (let index = 0; index < size; index += 1) sum += Number(digits[index]) * (size + 1 - index); const result = (sum * 10) % 11; return result === 10 ? 0 : result; };
  return digit(9) === Number(digits[9]) && digit(10) === Number(digits[10]);
}

export function CreateAccountScreen() {
  const navigate = useNavigate();
  const [privacy, setPrivacy] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", cpf: "", phone: "", email: "", confirmEmail: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const requirements = useMemo(() => passwordRequirements(form.password), [form.password]);
  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Informe o nome completo.";
    if (!validCpf(form.cpf)) next.cpf = "Informe um CPF válido.";
    if (!form.phone.trim()) next.phone = "Informe o telefone.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Informe um e-mail válido.";
    if (form.email.toLowerCase() !== form.confirmEmail.toLowerCase()) next.confirmEmail = "Os e-mails não coincidem.";
    if (!isStrongPassword(form.password)) next.password = "A senha ainda não atende aos requisitos.";
    if (form.password !== form.confirmPassword) next.confirmPassword = "As senhas não coincidem.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      await submitAccountRequest({ name: form.name, cpf: form.cpf, phone: form.phone, email: form.email, password: form.password });
      setDone(true);
    } catch (error) {
      setErrors({ email: error instanceof Error ? error.message : "Não foi possível registrar a solicitação." });
    } finally {
      setBusy(false);
    }
  };
  if (done) return <AuthShell title="Solicitação recebida" subtitle="Seu cadastro foi encaminhado para análise administrativa."><div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary"><Check /></div><p className="mt-5 text-sm text-muted-foreground">Cadastro da Recepção registrado e confirmação de e-mail simulada com sucesso. Na implementação real, o acesso dependerá de autorização institucional e verificação do endereço.</p><Button className="mt-6 w-full" onClick={() => navigate("/login")}>Voltar ao login</Button></div></AuthShell>;
  return <AuthShell title="Criar conta no HelpHope" subtitle="Cadastro exclusivo para funcionários da Recepção autorizados pela instituição."><><form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2 sm:col-span-2"><Label htmlFor="name">Nome completo</Label><Input id="name" value={form.name} onChange={(event) => set("name", event.target.value)} aria-invalid={Boolean(errors.name)} />{errors.name && <p className="text-xs text-destructive">{errors.name}</p>}</div><div className="space-y-2"><Label htmlFor="cpf">CPF</Label><Input id="cpf" value={form.cpf} onChange={(event) => set("cpf", event.target.value)} aria-invalid={Boolean(errors.cpf)} />{errors.cpf && <p className="text-xs text-destructive">{errors.cpf}</p>}</div><div className="space-y-2"><Label htmlFor="phone">Telefone</Label><Input id="phone" value={form.phone} onChange={(event) => set("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} />{errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}</div><div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={form.email} onChange={(event) => set("email", event.target.value)} aria-invalid={Boolean(errors.email)} />{errors.email && <p className="text-xs text-destructive">{errors.email}</p>}</div><div className="space-y-2"><Label htmlFor="confirmEmail">Confirmar e-mail</Label><Input id="confirmEmail" type="email" value={form.confirmEmail} onChange={(event) => set("confirmEmail", event.target.value)} aria-invalid={Boolean(errors.confirmEmail)} />{errors.confirmEmail && <p className="text-xs text-destructive">{errors.confirmEmail}</p>}</div></div><div className="rounded-xl border border-primary/20 bg-secondary p-3 text-xs text-secondary-foreground">Utilize um e-mail válido ao qual você tenha acesso. Esse endereço será utilizado para verificar sua conta e recuperar sua senha, caso necessário.</div><div className="grid gap-4 sm:grid-cols-2"><PasswordField id="password" label="Senha" value={form.password} onChange={(value) => set("password", value)} error={errors.password} /><PasswordField id="confirmPassword" label="Confirmar senha" value={form.confirmPassword} onChange={(value) => set("confirmPassword", value)} error={errors.confirmPassword} /></div><div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-3 text-xs">{[["length", "10 caracteres"], ["uppercase", "Letra maiúscula"], ["lowercase", "Letra minúscula"], ["number", "Número"], ["symbol", "Símbolo"]].map(([key, label]) => <span key={key} className={requirements[key as keyof typeof requirements] ? "font-semibold text-primary" : "text-muted-foreground"}>{requirements[key as keyof typeof requirements] ? "✓" : "○"} {label}</span>)}</div><div className="flex items-center gap-2"><Checkbox checked={privacy} onCheckedChange={(value) => setPrivacy(Boolean(value))} /><Label>Li e aceito a <Button type="button" variant="link" className="h-auto p-0" onClick={() => setPolicyOpen(true)}>Política de Privacidade</Button></Label></div><Button type="submit" className="w-full" disabled={!privacy || busy}><UserPlus />{busy ? "Registrando..." : "Criar conta"}</Button><Button type="button" variant="link" className="w-full" onClick={() => navigate("/login")}>Já possui uma conta? Entrar</Button></form><PrivacyPolicyDialog open={policyOpen} onOpenChange={setPolicyOpen} /></></AuthShell>;
}

export function RecoverPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Informe um e-mail válido."); return; }
    const token = requestPasswordRecovery(email);
    navigate(`/recuperar-senha/enviado?token=${encodeURIComponent(token)}`);
  };
  return <AuthShell title="Recuperar senha" subtitle="Informe o e-mail associado à sua conta HelpHope. Se houver uma conta cadastrada e habilitada para recuperação, enviaremos um link para redefinir sua senha."><form onSubmit={submit} className="space-y-4"><div className="space-y-2"><Label htmlFor="recoveryEmail">E-mail cadastrado</Label><div className="relative"><Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input id="recoveryEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10" aria-invalid={Boolean(error)} /></div>{error && <p className="text-xs text-destructive">{error}</p>}</div><Button type="submit" className="w-full"><KeyRound />Enviar link de recuperação</Button><Button type="button" variant="link" className="w-full" onClick={() => navigate("/login")}><ArrowLeft />Voltar para o login</Button></form></AuthShell>;
}

export function RecoverySentScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  return <AuthShell title="Instruções enviadas" subtitle="Se o e-mail informado estiver associado a uma conta elegível, você receberá instruções para redefinir sua senha."><div className="space-y-4 text-center"><div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-xs text-amber-800"><strong>Simulação do protótipo:</strong> nenhum e-mail real foi enviado. O botão abaixo representa a abertura do link recebido.</div><Button className="w-full" onClick={() => navigate(`/redefinir-senha?token=${encodeURIComponent(token)}`)}><Mail />Abrir e-mail demonstrativo</Button><Button variant="link" className="w-full" onClick={() => navigate("/login")}>Voltar ao login</Button></div></AuthShell>;
}

export function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const initialStatus = recoveryTokenStatus(token);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <AuthShell title="Senha alterada com sucesso" subtitle="O link foi invalidado e as sessões existentes foram encerradas."><Button className="w-full" onClick={() => navigate("/login")}>Voltar ao login</Button></AuthShell>;
  if (initialStatus !== "valid") return <AuthShell title={initialStatus === "expired" ? "Link expirado" : "Link inválido"} subtitle={initialStatus === "expired" ? "O prazo deste link terminou. Solicite uma nova recuperação." : "Este link não existe, já foi utilizado ou não pode ser validado."}><Button className="w-full" onClick={() => navigate("/recuperar-senha")}>Solicitar novo link</Button><Button variant="link" className="w-full" onClick={() => navigate("/login")}>Voltar ao login</Button></AuthShell>;
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isStrongPassword(password)) { setError("A nova senha não atende aos requisitos."); return; }
    if (password !== confirmation) { setError("As senhas não coincidem."); return; }
    if (await resetPassword(token, password)) setDone(true);
    else setError("O link não é mais válido.");
  };
  return <AuthShell title="Definir nova senha" subtitle="Crie uma nova senha segura para sua conta HelpHope."><form onSubmit={submit} className="space-y-4"><PasswordField id="newPassword" label="Nova senha" value={password} onChange={setPassword} error={error} /><PasswordField id="newPasswordConfirmation" label="Confirmar nova senha" value={confirmation} onChange={setConfirmation} /><Button type="submit" className="w-full"><ShieldCheck />Alterar senha</Button><Button type="button" variant="link" className="w-full" onClick={() => navigate("/login")}>Cancelar e voltar ao login</Button></form></AuthShell>;
}
