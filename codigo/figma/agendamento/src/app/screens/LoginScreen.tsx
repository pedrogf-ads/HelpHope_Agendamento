import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import asipecaLogo from "../../imports/Asipeca_logo-4.jpg";
import helpHopeLogo from "../../imports/helphope.png";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { authenticate, signOut, startReceptionDemoSession } from "../services/prototypeAuth";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password.trim()) {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    setBusy(true);
    setError("");

    const demoSession = startReceptionDemoSession(normalizedEmail);
    if (demoSession) {
      setBusy(false);
      navigate("/reception");
      return;
    }

    const session = await authenticate(normalizedEmail, password);
    if (!session || session.role !== "Recepção") {
      signOut();
      setBusy(false);
      setError("E-mail ou senha inválidos.");
      return;
    }

    setBusy(false);
    navigate("/reception");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 via-background to-blue-50">
      <div aria-hidden className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-secondary blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-center gap-4">
            <img src={helpHopeLogo} alt="HelpHope" className="h-16 w-16 rounded-2xl bg-white object-contain p-1 shadow-sm" />
            <div className="h-10 w-px bg-border" />
            <img src={asipecaLogo} alt="ASIPECA" className="h-16 w-auto rounded-xl object-contain" />
          </div>

          <form onSubmit={handleLogin} className="rounded-3xl border bg-card p-6 shadow-xl sm:p-8">
            <div className="mb-6 text-center">
              <p className="text-2xl font-bold text-foreground">Bem-vindo</p>
              <p className="mt-2 text-sm text-muted-foreground">Faça login para acessar a recepção</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
                  <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" autoComplete="email" className="pl-10" aria-invalid={Boolean(error)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
                  <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="pl-10 pr-10" aria-invalid={Boolean(error)} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword((current) => !current)} className="absolute right-0 top-0" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              {error && <p className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">{error}</p>}

              <Button type="submit" size="lg" className="w-full" disabled={busy}>
                {busy ? "Verificando..." : "Entrar"}
              </Button>

              <Button type="button" variant="link" className="w-full" onClick={() => navigate("/recuperar-senha")}>
                Esqueci minha senha
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Não possui uma conta?{" "}
                <Button type="button" variant="link" className="h-auto p-0" onClick={() => navigate("/criar-conta")}>
                  Criar conta
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
