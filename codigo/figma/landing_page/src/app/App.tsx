import {
  Building2,
  CalendarCheck,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Facebook,
  HeartHandshake,
  Instagram,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  UserRoundPlus,
  UsersRound,
} from "lucide-react"
import { ImageWithFallback } from "./components/figma/ImageWithFallback"
import asipecaLogo from "../imports/Asipeca_logo-4.jpg"
import helpHopeLogo from "../imports/helphope-2.png"
import helpHopeAgendaScreenshot from "../imports/helphope-agenda-salas.png"
import photoPreviouslyShownForEduardoHenrique from "../imports/thumbnail.jpg"
import photoPreviouslyShownForPedro from "../imports/thumbnail-1.jpg"
import photoPreviouslyShownForJoao from "../imports/thumbnail-2.jpg"
import photoPreviouslyShownForEduardoLima from "../imports/thumbnail-3.jpg"

const features = [
  {
    icon: CalendarDays,
    number: "01",
    title: "Agenda e calendário",
    description:
      "Organize e visualize os atendimentos em um calendário prático, com acesso às datas e aos horários agendados.",
    style: "bg-[#e8f5e9] text-[#2f8134]",
  },
  {
    icon: UserRoundPlus,
    number: "02",
    title: "Cadastro de pacientes",
    description:
      "Centralize as informações necessárias dos pacientes e seus responsáveis, facilitando a consulta e a organização dos atendimentos.",
    style: "bg-[#e7f3fc] text-[#337db5]",
  },
  {
    icon: UsersRound,
    number: "03",
    title: "Salas e profissionais",
    description:
      "Organize os atendimentos por salas, profissionais e horários disponíveis.",
    style: "bg-[#fff0f3] text-[#c75d74]",
  },
  {
    icon: Clock3,
    number: "04",
    title: "Controle de agendamentos",
    description:
      "Cadastre, consulte, altere e cancele agendamentos, acompanhando a situação de cada atendimento.",
    style: "bg-[#f0edfb] text-[#6d5db2]",
  },
]

const steps = [
  {
    icon: UserRoundPlus,
    number: "01",
    title: "Cadastre o paciente",
    description:
      "Registre as informações necessárias do paciente e de seu responsável.",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Organize o agendamento",
    description:
      "Selecione o profissional, a sala, a data e o horário disponíveis.",
  },
  {
    icon: CalendarDays,
    number: "03",
    title: "Acompanhe a agenda",
    description:
      "Consulte os agendamentos no calendário e acompanhe a situação de cada atendimento.",
  },
]

const team = [
  {
    name: "Eduardo Henrique Silveira Ferreira",
    photo: photoPreviouslyShownForJoao,
    crop: "object-center",
  },
  {
    name: "Pedro Gustavo Fernandes Bendinelli",
    photo: photoPreviouslyShownForEduardoHenrique,
    crop: "object-[50%_26%]",
  },
  {
    name: "João Pedro Pereti do Nascimento Leite",
    photo: photoPreviouslyShownForEduardoLima,
    crop: "object-center",
  },
  {
    name: "Eduardo Lima de Almeida",
    photo: photoPreviouslyShownForPedro,
    crop: "object-center",
  },
]

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <a
            href="#inicio"
            className="flex items-center gap-3 sm:gap-4"
            aria-label="HelpHope — início"
          >
            <ImageWithFallback
              src={asipecaLogo}
              alt="Logotipo da ASIPECA"
              className="h-11 w-11 rounded-xl object-contain"
            />
            <span className="h-8 w-px bg-border" aria-hidden="true" />
            <ImageWithFallback
              src={helpHopeLogo}
              alt="Logotipo do HelpHope"
              className="h-9 w-auto object-contain"
            />
          </a>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Navegação principal"
          >
            <a
              href="#missao"
              className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              ASIPECA
            </a>
            <a
              href="#funcionalidades"
              className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              Funcionalidades
            </a>
            <a
              href="#como-funciona"
              className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              Como funciona
            </a>
            <a
              href="#equipe"
              className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              Equipe
            </a>
          </nav>

          <button
            type="button"
            title="Destino externo pendente de configuração"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-extrabold text-primary-foreground shadow-[0_8px_22px_rgba(76,175,80,0.22)] transition hover:-translate-y-0.5 hover:bg-[#419b45] hover:shadow-[0_12px_28px_rgba(76,175,80,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Entrar
          </button>
        </div>
      </header>

      <main>
        <section
          id="inicio"
          className="relative isolate scroll-mt-[78px] overflow-hidden border-b border-border bg-[#fbfdfb]"
        >
          <div className="pointer-events-none absolute -right-36 -top-24 h-[650px] w-[650px] rounded-full bg-[#dff2e1]/80 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-[32%] h-[380px] w-[380px] rounded-full bg-[#e2f2fd]/80 blur-3xl" />
          <div className="pointer-events-none absolute left-[4%] top-20 h-16 w-16 rounded-2xl border border-[#c9e4cb] bg-[#e8f5e9] opacity-70 rotate-12" />

          <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-24">
            <div className="max-w-[650px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#cde6cf] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#2b7c30] shadow-sm">
                <CalendarDays className="h-4 w-4" />
                Gestão inteligente de agendamentos
              </div>

              <h1 className="mt-7 text-[clamp(2.7rem,5vw,4.85rem)] font-extrabold leading-[1.02] tracking-[-0.058em] text-[#172019]">
                Cuidar, Apoiar e{" "}
                <span className="relative inline-block text-primary">
                  Acreditar
                  <span
                    className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#a5d6a7]"
                    aria-hidden="true"
                  />
                </span>{" "}
                em cada criança
              </h1>

              <p className="mt-7 max-w-[630px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                O HelpHope é uma solução desktop de gerenciamento de
                agendamentos desenvolvida para a ASIPECA, proporcionando mais
                organização, praticidade e eficiência no controle de horários,
                pacientes e atendimentos.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                {[
                  "Horários organizados",
                  "Informações centralizadas",
                  "Agenda visual",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#405047]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dff2e1] text-primary">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[640px] lg:mr-0">
              <div className="absolute -left-7 top-16 z-10 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-[0_18px_50px_rgba(31,74,38,0.15)] backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5e9] text-primary">
                    <Laptop className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Solução desktop
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold text-[#213027]">
                      HelpHope
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-[#d5e2d7] bg-white p-2 shadow-[0_30px_80px_rgba(31,73,38,0.17)]">
                <ImageWithFallback
                  src={helpHopeAgendaScreenshot}
                  alt="Tela real da agenda por sala do aplicativo desktop HelpHope"
                  className="block h-auto w-full rounded-[21px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="missao"
          className="scroll-mt-[78px] bg-[#f3f6f3] px-5 py-16 sm:px-8 md:py-20"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                HelpHope e ASIPECA
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[#18241b] sm:text-4xl">
                Nossa missão
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Organização, tecnologia e cuidado reunidos em uma solução
                pensada para a rotina da instituição.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-[26px] bg-[#318737] p-7 text-white shadow-[0_18px_50px_rgba(43,119,48,0.2)] sm:p-9">
                <div
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[42px] border-white/5"
                  aria-hidden="true"
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <CalendarDays className="h-6 w-6" />
                </span>
                <h3 className="relative mt-8 text-xl font-extrabold">
                  Objetivo do HelpHope
                </h3>
                <p className="relative mt-3 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  Facilitar a organização dos atendimentos da ASIPECA por meio
                  de uma solução digital intuitiva, que auxilia no gerenciamento
                  de agendas, horários e informações dos pacientes.
                </p>
              </article>

              <article className="rounded-[26px] border border-[#dce5dd] bg-white p-7 shadow-[0_14px_45px_rgba(27,66,34,0.07)] sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f3] text-[#d06278]">
                    <HeartHandshake className="h-6 w-6" />
                  </span>
                  <ImageWithFallback
                    src={asipecaLogo}
                    alt="Logotipo da ASIPECA"
                    className="h-12 w-12 rounded-xl object-contain"
                  />
                </div>
                <h3 className="mt-8 text-xl font-extrabold text-[#1d2a21]">
                  Sobre a ASIPECA
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  A ASIPECA é uma organização sem fins lucrativos que oferece
                  acolhimento e apoio a crianças com Transtorno do Espectro
                  Autista (TEA), pessoas com câncer e seus familiares.
                </p>
              </article>
            </div>

            <div className="mt-5 grid items-center overflow-hidden rounded-[22px] border border-[#cfe4d1] bg-white shadow-[0_10px_35px_rgba(27,66,34,0.06)] md:grid-cols-[200px_1fr_auto]">
              <div className="flex min-h-32 items-center justify-center bg-[#e8f5e9] px-6 py-5">
                <span className="text-6xl font-extrabold tracking-[-0.07em] text-primary">
                  2
                </span>
              </div>
              <div className="px-6 py-5 sm:px-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#6d796f]">
                  Informação institucional
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-[#1f2d23] sm:text-2xl">
                  Unidades em Sorocaba
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Unidades de atendimento da ASIPECA.
                </p>
              </div>
              <Building2 className="mx-8 mb-6 h-9 w-9 text-[#8ebf92] md:mb-0" />
            </div>

            <div className="mt-5 grid items-center overflow-hidden rounded-[22px] border border-[#cfe4d1] bg-white shadow-[0_10px_35px_rgba(27,66,34,0.06)] md:grid-cols-[200px_1fr_auto]">
              <div className="flex min-h-32 items-center justify-center bg-[#e8f5e9] px-6 py-5">
                <span className="text-5xl font-extrabold tracking-[-0.07em] text-primary sm:text-6xl">
                  300+
                </span>
              </div>
              <div className="px-6 py-5 sm:px-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#6d796f]">
                  Informação institucional
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-[#1f2d23] sm:text-2xl">
                  Famílias atendidas
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Famílias atendidas pela ASIPECA.
                </p>
              </div>
              <UsersRound className="mx-8 mb-6 h-9 w-9 text-[#8ebf92] md:mb-0" />
            </div>
          </div>
        </section>

        <section
          id="funcionalidades"
          className="scroll-mt-[78px] bg-white px-5 py-16 sm:px-8 md:py-20"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-11 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                  Organização em um só lugar
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[#18241b] sm:text-4xl">
                  Funcionalidades do HelpHope
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Funcionalidades pensadas para organizar agendas, pacientes,
                salas e profissionais.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <article
                    key={feature.title}
                    className="group rounded-[24px] border border-[#dfe5e0] bg-[#fbfcfb] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d9ba] hover:bg-white hover:shadow-[0_20px_50px_rgba(31,73,38,0.1)] sm:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.style}`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-widest text-[#a5afa7]">
                        {feature.number}
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl font-extrabold text-[#1d2a21]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {feature.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="relative scroll-mt-[78px] overflow-hidden bg-[#1f7025] px-5 py-16 text-white sm:px-8 md:py-20"
        >
          <div
            className="absolute -right-24 -top-28 h-96 w-96 rounded-full border-[70px] border-white/[0.04]"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-[#64b5f6]/10 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#bfe6c2]">
                Fluxo simples e organizado
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Como funciona
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                Três etapas conectam as informações do paciente à rotina de
                agendamentos.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <article
                    key={step.title}
                    className="relative rounded-[24px] border border-white/15 bg-white/[0.08] p-7 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.12]"
                  >
                    {index < steps.length - 1 && (
                      <span
                        className="absolute -right-5 top-12 z-10 hidden h-px w-5 bg-white/25 lg:block"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2d7f33]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-sm font-bold text-white/45">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl font-extrabold">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                      {step.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="equipe"
          className="scroll-mt-[78px] bg-[#f3f6f3] px-5 py-16 sm:px-8 md:py-20"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto mb-11 max-w-xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                Time HelpHope
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[#18241b] sm:text-4xl">
                Desenvolvido por
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Uma equipe comprometida com uma solução clara, confiável e
                centrada nas necessidades da ASIPECA.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="group flex min-h-[330px] flex-col items-center rounded-[24px] border border-[#dce4dd] bg-white px-5 py-7 text-center shadow-[0_10px_35px_rgba(29,68,35,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(29,68,35,0.11)]"
                >
                  <div className="rounded-full border-[3px] border-primary bg-[#e8f5e9] p-1.5 shadow-[0_8px_24px_rgba(49,131,54,0.18)]">
                    <ImageWithFallback
                      src={member.photo}
                      alt={`Fotografia de ${member.name}`}
                      className={`h-32 w-32 rounded-full object-cover ${member.crop}`}
                    />
                  </div>
                  <h3 className="mt-5 flex min-h-[60px] max-w-[230px] items-center justify-center text-[15px] font-extrabold leading-5 text-[#1e2b21]">
                    {member.name}
                  </h3>
                  <button
                    type="button"
                    title="Endereço do perfil pendente de configuração"
                    className="mt-auto inline-flex items-center gap-2 rounded-full bg-[#087bb5] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#076b9d] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087bb5] focus-visible:ring-offset-2"
                  >
                    <Linkedin className="h-3.5 w-3.5" fill="currentColor" />
                    LinkedIn
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#141a16] px-5 pb-7 pt-12 text-white sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.9fr_0.95fr]">
            <div>
              <div className="flex items-center gap-4">
                <span className="rounded-xl bg-white p-2">
                  <ImageWithFallback
                    src={asipecaLogo}
                    alt="Logotipo da ASIPECA"
                    className="h-11 w-11 rounded-lg object-contain"
                  />
                </span>
                <span className="h-10 w-px bg-white/15" />
                <span className="rounded-xl bg-white p-2">
                  <ImageWithFallback
                    src={helpHopeLogo}
                    alt="Logotipo do HelpHope"
                    className="h-8 w-auto object-contain"
                  />
                </span>
              </div>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
                HelpHope — Solução desktop de gerenciamento de agendamentos
                desenvolvida para a ASIPECA.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#a5d6a7]">
                Contato institucional
              </h3>
              <div className="mt-5 space-y-3.5 text-sm text-white/70">
                <a
                  href="tel:+551533291003"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#7bc67f]" />
                  (15) 3329-1003
                </a>
                <a
                  href="mailto:contato@asipeca.org.br"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#7bc67f]" />
                  contato@asipeca.org.br
                </a>
                <span className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#ef8da1]" />
                  Sorocaba, São Paulo
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#a5d6a7]">
                Canais oficiais
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://asipeca.org.br/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-[#7bc67f] hover:bg-white/5 hover:text-white"
                >
                  Site oficial
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/asi_peca/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-[#ef8da1] hover:bg-white/5 hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                  @asi_peca
                </a>
                <a
                  href="https://www.facebook.com/ASIPECA/?locale=pt_BR"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook oficial da ASIPECA"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 p-2.5 text-white/80 transition hover:border-[#64b5f6] hover:bg-white/5 hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/asipeca-associa%C3%A7%C3%A3o-do-c%C3%A2ncer-sorocaba-9b4aba16a/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn oficial da ASIPECA"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 p-2.5 text-white/80 transition hover:border-[#64b5f6] hover:bg-white/5 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>ASIPECA · Associação de Apoio às Crianças com TEA e Câncer</p>
            <p>HelpHope · Gestão de agendamentos</p>
          </div>
          <p className="mt-5 border-t border-white/10 pt-5 text-center text-xs text-white/55">
            © 2026 HelpHope. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
