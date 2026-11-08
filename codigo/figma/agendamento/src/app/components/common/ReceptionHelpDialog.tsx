import { CalendarDays, CircleHelp, UserRound, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

const questions = [
  { icon: UserRound, title: "Como cadastrar um paciente?", answer: "Abra Pacientes no menu lateral e use Cadastrar paciente. Preencha as etapas e salve o cadastro." },
  { icon: CalendarDays, title: "Como criar um agendamento?", answer: "Abra Agenda, clique em um horário livre da sala desejada e conclua as etapas do novo agendamento." },
  { icon: CalendarDays, title: "Como consultar a agenda de uma sala?", answer: "Na Agenda Geral, clique no nome da sala para abrir sua visualização individual." },
  { icon: XCircle, title: "Como cancelar uma consulta?", answer: "Abra o atendimento na Agenda, selecione Cancelar e confirme. O registro continuará preservado no histórico." },
];

export function ReceptionHelpDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajuda e Suporte — HelpHope</DialogTitle>
          <DialogDescription>Orientações rápidas para utilização do aplicativo desktop.</DialogDescription>
        </DialogHeader>
        <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
          <CircleHelp className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-secondary-foreground">Precisa de ajuda para utilizar o HelpHope? Entre em contato com nossa equipe de suporte pelo telefone [número oficial a definir].</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {questions.map(({ icon: Icon, title, answer }) => <div key={title} className="rounded-xl border p-4"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /><p className="text-sm font-bold">{title}</p></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{answer}</p></div>)}
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>Fechar</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
