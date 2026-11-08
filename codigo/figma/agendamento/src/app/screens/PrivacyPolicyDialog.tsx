import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";

const sections = [
  {
    title: "1. Apresentação",
    paragraphs: [
      "O HelpHope é uma plataforma em desenvolvimento destinada a apoiar a organização de cadastros e agendamentos de atendimentos realizados por instituições de assistência e saúde, tendo como instituição parceira do projeto acadêmico a ASIPECA, localizada em Sorocaba, São Paulo.",
      "Esta Política de Privacidade apresenta informações sobre o tratamento de dados pessoais previsto para a plataforma, observando os princípios da Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).",
    ],
  },
  {
    title: "2. Dados pessoais",
    paragraphs: ["Conforme as funcionalidades utilizadas, a plataforma poderá tratar as seguintes informações:"],
    items: [
      "Dados de funcionários da Recepção: nome, CPF, telefone, e-mail e credenciais de autenticação protegidas.",
      "Dados de pacientes: nome, CPF, data de nascimento e informações necessárias à organização dos atendimentos.",
      "Dados de responsáveis: nome, CPF, telefone e e-mail.",
      "Dados de profissionais: nome, CPF, telefone, e-mail, especialidades e disponibilidade.",
      "Dados de agendamentos: data, horário, profissional, paciente, responsável, especialidade e situação do atendimento.",
    ],
    closing: "Informações relacionadas à saúde são consideradas dados pessoais sensíveis pela LGPD e exigem proteção específica.",
  },
  {
    title: "3. Finalidades do tratamento",
    paragraphs: ["Os dados pessoais poderão ser utilizados para:"],
    items: [
      "Identificação e gerenciamento dos usuários autorizados.",
      "Cadastro e identificação dos pacientes e responsáveis.",
      "Organização dos agendamentos.",
      "Consulta à disponibilidade dos profissionais.",
      "Organização das salas e horários.",
      "Comunicação administrativa relacionada aos atendimentos.",
      "Proteção e controle de acesso às informações.",
    ],
    closing: "Os dados não deverão ser utilizados para finalidades incompatíveis com aquelas informadas aos titulares.",
  },
  {
    title: "4. Acesso às informações",
    paragraphs: [
      "O acesso às informações deverá ser limitado aos usuários autorizados, conforme suas funções e responsabilidades.",
      "A Recepção deverá acessar apenas as informações necessárias à realização de suas atividades administrativas.",
      "Dados clínicos sensíveis não deverão ser disponibilizados indiscriminadamente aos usuários.",
    ],
  },
  {
    title: "5. Segurança dos dados",
    paragraphs: [
      "Na implementação definitiva, o HelpHope deverá adotar medidas técnicas e administrativas adequadas para proteger os dados pessoais contra acessos não autorizados, perda, alteração, divulgação ou tratamento inadequado.",
      "Essas medidas deverão incluir, conforme a arquitetura implementada, autenticação segura, proteção de credenciais, controle de acesso, registros de operações e mecanismos de proteção dos dados armazenados e transmitidos.",
      "O protótipo acadêmico atual não representa garantia de que todos esses mecanismos já estejam implementados.",
    ],
  },
  {
    title: "6. Compartilhamento de informações",
    paragraphs: [
      "O compartilhamento de dados pessoais deverá ocorrer somente quando necessário para as finalidades legítimas da plataforma, mediante fundamento legal adequado e observadas as exigências da LGPD.",
      "Eventuais prestadores de serviços e integrações externas deverão ser avaliados antes de receber dados pessoais.",
    ],
  },
  {
    title: "7. Direitos dos titulares",
    paragraphs: ["Nos termos da LGPD e observadas as condições legais aplicáveis, os titulares poderão solicitar:"],
    items: [
      "Confirmação da existência de tratamento de seus dados.",
      "Acesso aos dados pessoais.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Informações sobre compartilhamento.",
      "Anonimização, bloqueio ou eliminação de dados, quando cabível.",
      "Informações sobre as consequências da negativa de consentimento, quando aplicável.",
      "Revogação do consentimento, quando essa for a base legal utilizada.",
      "Outros direitos previstos na legislação.",
    ],
  },
  {
    title: "8. Armazenamento e conservação",
    paragraphs: [
      "Os dados deverão ser mantidos somente pelo período necessário às finalidades do tratamento e ao cumprimento de obrigações legais ou regulatórias aplicáveis.",
      "Os prazos específicos de conservação serão definidos pela instituição responsável antes da utilização definitiva do sistema.",
    ],
  },
  {
    title: "9. Comunicação com os usuários",
    paragraphs: [
      "As mensagens de confirmação, lembrete, reagendamento e cancelamento deverão utilizar os contatos cadastrados e respeitar as regras aplicáveis de privacidade e comunicação.",
      "As mensagens administrativas não deverão expor desnecessariamente informações clínicas ou dados sensíveis.",
    ],
  },
  {
    title: "10. Responsável pelo tratamento e contato",
    paragraphs: [
      "Antes da implantação definitiva, deverão ser identificados o controlador dos dados pessoais, o canal para exercício dos direitos dos titulares e, quando aplicável, o contato do encarregado pelo tratamento de dados pessoais.",
      "Essas informações ainda precisam ser confirmadas pela instituição responsável.",
    ],
  },
  {
    title: "11. Atualizações desta política",
    paragraphs: [
      "Esta Política de Privacidade poderá ser atualizada para refletir mudanças na plataforma, nos processos de tratamento de dados ou nas exigências legais.",
      "Quando necessário, os usuários deverão ser informados sobre alterações relevantes.",
    ],
  },
  {
    title: "12. Natureza do documento",
    paragraphs: [
      "Este texto é uma versão preliminar elaborada para o protótipo acadêmico HelpHope. Antes da implantação com dados reais, deverá ser revisado e aprovado pela instituição responsável, com a definição das informações operacionais, responsabilidades e bases legais aplicáveis.",
    ],
  },
];

export function PrivacyPolicyDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Política de Privacidade — HelpHope</DialogTitle>
          <DialogDescription>Última atualização: 01/11/2026</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 pr-5">
          <div className="space-y-6 pb-4">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <p className="font-bold text-foreground">{section.title}</p>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-sm leading-6 text-muted-foreground">{paragraph}</p>)}
                {section.items && <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.closing && <p className="text-sm leading-6 text-muted-foreground">{section.closing}</p>}
              </section>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Fechar</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
