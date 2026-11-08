import { Heart, Calendar, FileText, Users, TrendingUp, Shield, Sparkles, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import helpHopeLogo from "../../imports/helphope-2.png";
import asipecaLogo from "../../imports/Asipeca_logo-4.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: FileText,
      title: "Prontuário digital",
      description: "Registro completo dos atendimentos dos pacientes com segurança e praticidade",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Calendar,
      title: "Agenda de atendimentos",
      description: "Organização de consultas e atividades de forma intuitiva e eficiente",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Gestão organizada",
      description: "Centralização das informações da ONG em uma plataforma integrada",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Heart,
      title: "Doações online",
      description: "Facilidade para contribuição com total transparência e segurança",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const impact = [
    { icon: Users, text: "Inclusão social", stat: "500+" },
    { icon: TrendingUp, text: "Desenvolvimento e bem-estar", stat: "98%" },
    { icon: Shield, text: "Acesso a terapias", stat: "24/7" },
    { icon: Heart, text: "Apoio às famílias", stat: "100%" }
  ];

  const whoWeHelp = [
    "Pessoas com TEA (autismo)",
    "Pessoas com câncer (todas as idades)",
    "Famílias que precisam de orientação",
    "Comunidade que busca inclusão"
  ];

  const donationBenefits = [
    "Fortalece a estrutura da ONG",
    "Amplia atendimentos especializados",
    "Garante continuidade no cuidado integral"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-blue-50/30">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header/Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={helpHopeLogo} alt="Help Hope" className="h-14 w-auto drop-shadow-md" />
              <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                <img src={asipecaLogo} alt="ASIPECA" className="h-10 w-auto opacity-80" />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 sm:px-5 py-2.5 text-gray-700 hover:text-green-600 transition-colors font-medium rounded-full text-sm sm:text-base"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/donor")}
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
              >
                Doar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200/50">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Plataforma completa de gestão para ONGs</span>
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Organize atendimentos e ajude quem precisa,{" "}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    tudo em um só lugar
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Prontuário digital, agenda de pacientes e sistema de doações integrado
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/login?register=true")}
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all font-semibold rounded-full shadow-xl hover:shadow-2xl text-lg flex items-center justify-center gap-2"
                >
                  Começar agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all font-medium rounded-full shadow-md text-lg"
                >
                  Saiba mais
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-4 border-white flex items-center justify-center text-white font-bold"
                    >
                      {i === 1 ? "👨" : i === 2 ? "👩" : i === 3 ? "👧" : "👦"}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Vidas transformadas</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Hero Image/Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-2xl opacity-40" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-40" />

                <div className="relative space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">1.200+</div>
                      <div className="text-sm text-gray-600">Atendimentos realizados</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">200+</div>
                      <div className="text-sm text-gray-600">Famílias assistidas</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">19 anos</div>
                      <div className="text-sm text-gray-600">De dedicação e cuidado</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Who We Help Section */}
      <section id="mission" className="relative px-6 lg:px-8 py-24 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <span className="text-sm font-semibold text-white">ASIPECA</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Nossa missão
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20"
            >
              <div className="p-4 bg-white/20 rounded-2xl inline-block mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Missão</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Promover qualidade de vida, desenvolvimento e cuidado integral às pessoas atendidas,
                com atendimento humanizado e suporte às famílias.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20"
            >
              <div className="p-4 bg-white/20 rounded-2xl inline-block mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Quem ajudamos</h3>
              <ul className="space-y-3">
                {whoWeHelp.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg text-white/90">
                    <Check className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative px-6 lg:px-8 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nosso impacto
            </h2>
            <p className="text-xl text-gray-600">A ASIPECA contribui para:</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all text-center"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                    {item.stat}
                  </div>
                  <div className="text-gray-700 font-medium">{item.text}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 lg:px-8 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">Funcionalidades completas</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Diferenciais do sistema
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo que você precisa para gerenciar sua ONG de forma profissional, eficiente e transparente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all"
                >
                  <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="relative px-6 lg:px-8 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-50" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex p-5 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Heart className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Faça parte dessa transformação
            </h2>

            <p className="text-2xl mb-4 text-white/95">
              Por que doar?
            </p>

            <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Sua contribuição ajuda a manter atendimentos, terapias e suporte para quem realmente precisa.
            </p>

            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 mb-12 max-w-xl mx-auto border border-white/30">
              <h3 className="text-2xl font-bold mb-6">Como sua doação ajuda?</h3>
              <ul className="space-y-4 text-left">
                {donationBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg text-white/95">
                    <Check className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate("/donor")}
              className="group px-12 py-5 bg-white text-rose-600 hover:bg-gray-50 transition-all font-bold text-xl rounded-full shadow-2xl hover:shadow-none hover:scale-105 inline-flex items-center gap-3"
            >
              Doar agora
              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 lg:px-8 py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="bg-white rounded-2xl p-3 inline-block mb-4">
                <img src={helpHopeLogo} alt="Help Hope" className="h-12 w-auto" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Organize atendimentos e ajude quem precisa, tudo em um só lugar.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">ASIPECA</h4>
              <div className="bg-white rounded-2xl p-3 inline-block mb-4">
                <img src={asipecaLogo} alt="ASIPECA" className="h-12 w-auto" />
              </div>
              <p className="text-gray-400 text-sm">
                Associação de Apoio às Crianças e Famílias
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>contato@asipeca.org.br</p>
                <p className="text-sm">Transformando vidas desde 2007</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 Help Hope · ASIPECA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
