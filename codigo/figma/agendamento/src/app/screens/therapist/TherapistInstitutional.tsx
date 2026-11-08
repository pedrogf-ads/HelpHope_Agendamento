import {
  Users, Phone, Mail, MapPin, ExternalLink, Building2, Heart, Target, Award, Calendar, TrendingUp
} from "lucide-react";
import { AsipecaLogo } from "../../components/AsipecaLogo";
import { useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PageHeader } from "../../components/common/PageHeader";
import { LogoutDialog } from "../../components/common/LogoutDialog";
import { ProfileDialog } from "../../components/common/ProfileDialog";
import { SettingsDialog } from "../../components/common/SettingsDialog";
import { HelpDialog } from "../../components/common/HelpDialog";
import { StatsCard } from "../../components/common/StatsCard";

export default function TherapistInstitutional() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const handleLogout = () => {
    toast.success("Saindo da conta...");
    setTimeout(() => navigate("/"), 1000);
  };

  const stats = [
    { title: "Anos de Experiência", value: "19", icon: Calendar, iconColor: "#4CAF50", iconBgColor: "#E8F5E9" },
    { title: "Famílias Atendidas", value: "200+", icon: Users, iconColor: "#64B5F6", iconBgColor: "#E3F2FD" },
    { title: "Atendimentos", value: "1.200+", icon: TrendingUp, iconColor: "#FFA726", iconBgColor: "#FFF3E0" },
    { title: "Taxa de Evolução", value: "98%", icon: Award, iconColor: "#AB47BC", iconBgColor: "#F3E5F5" },
  ];

  const services = [
    { name: "Fonoaudiologia", description: "Desenvolvimento da comunicação e linguagem" },
    { name: "Terapia Ocupacional", description: "Autonomia e habilidades do dia a dia" },
    { name: "Psicologia", description: "Suporte emocional e comportamental" },
    { name: "Fisioterapia", description: "Desenvolvimento motor e físico" },
    { name: "Nutrição", description: "Alimentação saudável e adequada" },
    { name: "Apoio Familiar", description: "Orientação e suporte aos responsáveis" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      <PageHeader
        title="ASIPECA"
        subtitle="Painel Institucional"
        bgGradient="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]"
        onProfileClick={() => setShowProfileDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        onHelpClick={() => setShowHelpDialog(true)}
        onLogoutClick={() => setShowLogoutDialog(true)}
      >
        <div className="flex justify-center mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <AsipecaLogo className="h-16" />
          </div>
        </div>
        <p className="text-green-50 text-xs text-center mt-3 opacity-90 max-w-md mx-auto">
          Associação de Apoio às Crianças com TEA e Câncer
        </p>
      </PageHeader>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                iconBgColor={stat.iconBgColor}
              />
            </motion.div>
          ))}
        </div>
        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="text-gray-800 font-semibold">Nossos Serviços</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-[#F5F5F5] to-white rounded-xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#4CAF50] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{service.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="text-gray-800 font-semibold">Sobre a ASIPECA</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            A ASIPECA (Associação de Apoio às Crianças com TEA e Câncer) é uma organização
            sem fins lucrativos dedicada ao cuidado e apoio de crianças com Transtorno do
            Espectro Autista (TEA) e câncer. Com 19 anos de experiência, oferecemos
            terapias especializadas, acompanhamento multidisciplinar e suporte integral às famílias.
          </p>

          <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#4CAF50]" />
              <p className="text-sm font-semibold text-gray-800">Nossa Missão</p>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Proporcionar atendimento humanizado e integral, promovendo qualidade de vida
              e desenvolvimento para crianças e suas famílias, com respeito, amor e dedicação.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#4CAF50]" />
              <div>
                <p className="text-xs text-gray-600">Telefone</p>
                <a href="tel:+551533291003" className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors">
                  (15) 3329-1003
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#4CAF50]" />
              <div>
                <p className="text-xs text-gray-600">Email</p>
                <a href="mailto:contato@asipeca.org.br" className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors">
                  contato@asipeca.org.br
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#4CAF50]" />
              <div>
                <p className="text-xs text-gray-600">Endereço</p>
                <p className="text-sm font-medium text-gray-800">
                  Sorocaba, São Paulo - SP
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open("https://www.instagram.com/asi_peca/", "_blank")}
            className="w-full mt-4 py-3 bg-[#E8F5E9] text-[#4CAF50] rounded-xl flex items-center justify-center gap-2 hover:bg-[#4CAF50] hover:text-white transition-all shadow-sm"
          >
            <ExternalLink className="w-5 h-5" />
            Visitar Site Institucional
          </button>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="text-gray-800 font-semibold">Nossa Equipe</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Profissionais qualificados e dedicados ao cuidado integral
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Dra. Juliana Costa", role: "Fonoaudióloga" },
              { name: "Dr. Ricardo Lima", role: "Terapeuta Ocupacional" },
              { name: "Dra. Fernanda Alves", role: "Psicóloga" },
              { name: "Dr. Carlos Mendes", role: "Fisioterapeuta" },
              { name: "Dr. João Santos", role: "Psiquiatra" },
              { name: "Dra. Ana Paula", role: "Nutricionista" },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="p-4 bg-gradient-to-br from-[#F5F5F5] to-white rounded-xl text-center shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#4CAF50]"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <span className="text-2xl font-bold text-[#4CAF50]">
                    {member.name.charAt(4)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{member.name}</p>
                <p className="text-xs text-gray-600 mt-1.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-2xl p-6 shadow-xl text-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6" />
            <h3 className="font-bold text-xl">Nossos Valores</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Humanização", description: "Atendimento acolhedor e respeitoso" },
              { title: "Excelência", description: "Compromisso com a qualidade" },
              { title: "Dedicação", description: "Amor e cuidado em cada ação" },
            ].map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="font-semibold mb-1">{value.title}</p>
                <p className="text-sm text-green-50">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dialogs */}
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
      <ProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        userType="doctor"
      />
      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
      <HelpDialog
        open={showHelpDialog}
        onOpenChange={setShowHelpDialog}
      />
    </div>
  );
}