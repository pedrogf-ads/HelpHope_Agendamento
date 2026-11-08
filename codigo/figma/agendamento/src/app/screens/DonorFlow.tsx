import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Smartphone, Phone, Instagram, Heart } from "lucide-react";
import asipecaLogo from "../../imports/Asipeca_logo-4.jpg";

export default function DonorFlow() {
  const navigate = useNavigate();
  const [showPixPhone, setShowPixPhone] = useState(false);
  const [showContactPhone, setShowContactPhone] = useState(false);

  const needs = [
    "Cestas básicas",
    "Remédios",
    "Outros itens essenciais",
  ];

  const handleInstagram = () => {
    window.open("https://www.instagram.com/asi_peca/", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-5 sm:py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-green-100 transition-colors mb-3 sm:mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base">Voltar</span>
          </button>
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-white p-3 sm:p-4 rounded-2xl">
              <img src={asipecaLogo} alt="ASIPECA" className="h-16 sm:h-20 w-auto" />
            </div>
          </div>
          <h1 className="text-center text-white mb-2 text-2xl sm:text-3xl font-bold">Doe Agora</h1>
          <p className="text-center text-green-50 text-sm sm:text-base">
            Sua ajuda transforma vidas
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Donation Methods */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-gray-800 text-center text-lg sm:text-xl font-semibold">Formas de Doação</h3>

          {/* PIX Donation */}
          <button
            onClick={() => setShowPixPhone(!showPixPhone)}
            className="w-full bg-white hover:bg-[#E8F5E9] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-200 hover:border-[#4CAF50] transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-xl">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-800 mb-1 text-base sm:text-lg font-semibold">Doar por PIX</h3>
                <p className="text-sm text-gray-600">
                  Clique para ver a chave PIX
                </p>
              </div>
            </div>
            {showPixPhone && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href="tel:+551533291003"
                  className="block text-center text-2xl font-bold text-[#4CAF50] hover:text-[#45a049] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  (15) 3329-1003
                </a>
              </div>
            )}
          </button>

          {/* Contact to Donate */}
          <button
            onClick={() => setShowContactPhone(!showContactPhone)}
            className="w-full bg-white hover:bg-[#E8F5E9] rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#4CAF50] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-xl">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-800 mb-1">Entrar em contato para doar</h3>
                <p className="text-sm text-gray-600">
                  Clique para ver o contato
                </p>
              </div>
            </div>
            {showContactPhone && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href="tel:+551533291003"
                  className="block text-center text-2xl font-bold text-[#4CAF50] hover:text-[#45a049] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  (15) 3329-1003
                </a>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Fale conosco sobre outras formas de doação
                </p>
              </div>
            )}
          </button>
        </div>

        {/* Needs Section */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-[#4CAF50] rounded-2xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="text-gray-800">O que precisamos</h3>
          </div>
          <ul className="space-y-3">
            {needs.map((need, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full" />
                <span>{need}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instagram */}
        <button
          onClick={handleInstagram}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-6 shadow-lg transition-all"
        >
          <div className="flex items-center justify-center gap-3">
            <Instagram className="w-6 h-6" />
            <div>
              <p className="font-bold">Siga-nos no Instagram</p>
              <p className="text-sm text-white/90">@asi_peca</p>
            </div>
          </div>
        </button>

        {/* Footer Info */}
        <div className="bg-[#E8F5E9] rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-700 leading-relaxed">
            Todas as doações são destinadas diretamente ao cuidado das crianças e famílias atendidas pela ASIPECA. Agradecemos sua generosidade!
          </p>
        </div>
      </div>
    </div>
  );
}