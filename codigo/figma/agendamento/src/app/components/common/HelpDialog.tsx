import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { HelpCircle, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const faqs = [
    {
      question: "Como recuperar minha senha?",
      answer: "Clique em 'Esqueci minha senha' na tela de login e siga as instruções enviadas para seu e-mail."
    },
    {
      question: "Como agendar uma consulta?",
      answer: "Entre em contato com a recepção ou utilize a área de agendamentos no sistema."
    },
    {
      question: "Como atualizar minhas informações?",
      answer: "Acesse seu Perfil através do menu e edite as informações desejadas."
    },
    {
      question: "O sistema está seguro?",
      answer: "Sim! Utilizamos criptografia e as melhores práticas de segurança para proteger seus dados."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gray-700" />
            Central de Ajuda
          </DialogTitle>
          <DialogDescription>
            Encontre respostas e entre em contato conosco
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Fale Conosco</h3>

            <a
              href="tel:+551533291003"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-green-500 rounded-lg">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Telefone</p>
                <p className="text-sm text-gray-600">(15) 3329-1003</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
            </a>

            <a
              href="mailto:contato@asipeca.org.br"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-blue-500 rounded-lg">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">E-mail</p>
                <p className="text-sm text-gray-600">contato@asipeca.org.br</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </a>

            <button
              onClick={() => window.open("https://wa.me/5515933291003", "_blank")}
              className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-emerald-500 rounded-lg">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-800">WhatsApp</p>
                <p className="text-sm text-gray-600">Atendimento rápido</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
            </button>
          </div>

          {/* FAQs */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">Dúvidas Frequentes</h3>

            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-xl p-3 group">
                <summary className="cursor-pointer text-sm font-medium text-gray-800 list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          {/* System Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Horário de Atendimento:</strong><br />
              Segunda a Sexta: 8h às 18h<br />
              Sábado: 8h às 12h
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
          Fechar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
