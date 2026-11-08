import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

// Prontuário Terapêutico
export function ProntuarioTerapeuticoDialog({ open, onOpenChange, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>🧠 Prontuário Terapêutico</DialogTitle>
          <DialogDescription>
            Registro de sessão terapêutica
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pt-data">Data *</Label>
            <Input id="pt-data" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-profissional">Profissional responsável *</Label>
            <Input id="pt-profissional" placeholder="Nome do profissional" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-tipo">Tipo de terapia *</Label>
            <Select required>
              <SelectTrigger id="pt-tipo">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psicologia">Psicologia</SelectItem>
                <SelectItem value="fisioterapia">Fisioterapia</SelectItem>
                <SelectItem value="fonoaudiologia">Fonoaudiologia</SelectItem>
                <SelectItem value="terapia-ocupacional">Terapia Ocupacional</SelectItem>
                <SelectItem value="nutricao">Nutrição</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-objetivo">Objetivo da sessão *</Label>
            <Textarea id="pt-objetivo" placeholder="Qual o objetivo desta sessão..." rows={2} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-atividades">Atividades realizadas *</Label>
            <Textarea id="pt-atividades" placeholder="Descreva as atividades realizadas..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-evolucao">Evolução do paciente *</Label>
            <Textarea id="pt-evolucao" placeholder="Como o paciente evoluiu..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-comportamento">Comportamento observado *</Label>
            <Textarea id="pt-comportamento" placeholder="Descreva o comportamento observado..." rows={2} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pt-recomendacoes">Recomendações</Label>
            <Textarea id="pt-recomendacoes" placeholder="Recomendações para próximas sessões..." rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-[#4CAF50] hover:bg-[#45a049]">
            Salvar Prontuário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Prontuário Clínico
export function ProntuarioClinicoDialog({ open, onOpenChange, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>🩺 Prontuário Clínico</DialogTitle>
          <DialogDescription>
            Registro de consulta médica
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pc-data">Data *</Label>
            <Input id="pc-data" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-profissional">Profissional *</Label>
            <Input id="pc-profissional" placeholder="Nome do profissional" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-queixa">Queixa principal *</Label>
            <Textarea id="pc-queixa" placeholder="Qual a queixa do paciente..." rows={2} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-historico">Histórico resumido *</Label>
            <Textarea id="pc-historico" placeholder="Histórico relevante..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-avaliacao">Avaliação clínica *</Label>
            <Textarea id="pc-avaliacao" placeholder="Avaliação clínica..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-diagnostico">Diagnóstico / Hipótese *</Label>
            <Textarea id="pc-diagnostico" placeholder="Diagnóstico ou hipótese diagnóstica..." rows={2} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-conduta">Conduta *</Label>
            <Textarea id="pc-conduta" placeholder="Conduta e orientações..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-retorno">Retorno</Label>
            <Input id="pc-retorno" placeholder="Ex: Retorno em 30 dias" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-[#64B5F6] hover:bg-[#42A5F5]">
            Salvar Prontuário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Prontuário de Acompanhamento
export function ProntuarioAcompanhamentoDialog({ open, onOpenChange, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>📊 Prontuário de Acompanhamento</DialogTitle>
          <DialogDescription>
            Registro de evolução e acompanhamento
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pa-data">Data *</Label>
            <Input id="pa-data" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pa-area">Área *</Label>
            <Select required>
              <SelectTrigger id="pa-area">
                <SelectValue placeholder="Selecione a área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psicologia">Psicologia</SelectItem>
                <SelectItem value="fisioterapia">Fisioterapia</SelectItem>
                <SelectItem value="fonoaudiologia">Fonoaudiologia</SelectItem>
                <SelectItem value="terapia-ocupacional">Terapia Ocupacional</SelectItem>
                <SelectItem value="nutricao">Nutrição</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pa-indicadores">Indicadores avaliados *</Label>
            <Textarea id="pa-indicadores" placeholder="Quais indicadores foram avaliados..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pa-evolucao">Evolução *</Label>
            <Textarea id="pa-evolucao" placeholder="Como está a evolução do paciente..." rows={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pa-atencao">Pontos de atenção</Label>
            <Textarea id="pa-atencao" placeholder="O que merece atenção especial..." rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pa-continuidade">Plano de continuidade *</Label>
            <Textarea id="pa-continuidade" placeholder="Planejamento e próximos passos..." rows={2} required />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-[#9C27B0] hover:bg-[#7B1FA2]">
            Salvar Prontuário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Atestado
export function AtestadoDialog({ open, onOpenChange, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>📄 Atestado</DialogTitle>
          <DialogDescription>
            Atestado de comparecimento com afastamento
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="at-paciente">Nome do paciente *</Label>
            <Input id="at-paciente" placeholder="Nome completo" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="at-dias">Dias de afastamento *</Label>
            <Input id="at-dias" type="number" placeholder="Número de dias" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="at-data">Data *</Label>
            <Input id="at-data" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="at-profissional">Profissional *</Label>
            <Input id="at-profissional" placeholder="Nome do profissional" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="at-registro">Registro profissional *</Label>
            <Input id="at-registro" placeholder="Ex: CRM 12345/SP" required />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Pré-visualização</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-bold text-center">ATESTADO</p>
              <p>Declaro que o(a) paciente ___________________________, esteve em atendimento nesta instituição e necessita de afastamento de suas atividades por ____ dias.</p>
              <p className="mt-4">Data: ____/____/____</p>
              <p className="mt-4">____________________________________</p>
              <p className="text-xs">Assinatura do profissional</p>
              <p className="text-xs">Registro profissional:</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-[#E91E63] hover:bg-[#C2185B]">
            Gerar Atestado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Declaração
export function DeclaracaoDialog({ open, onOpenChange, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>📄 Declaração</DialogTitle>
          <DialogDescription>
            Declaração de comparecimento
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="dec-paciente">Nome do paciente *</Label>
            <Input id="dec-paciente" placeholder="Nome completo" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dec-data">Data *</Label>
            <Input id="dec-data" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dec-horario">Horário</Label>
            <Input id="dec-horario" type="time" placeholder="Horário do atendimento" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dec-profissional">Profissional *</Label>
            <Input id="dec-profissional" placeholder="Nome do profissional" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dec-registro">Registro profissional *</Label>
            <Input id="dec-registro" placeholder="Ex: CRM 12345/SP" required />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Pré-visualização</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-bold text-center">DECLARAÇÃO</p>
              <p>Declaro que o(a) paciente ___________________________ compareceu a atendimento nesta instituição.</p>
              <p className="mt-4">Data: ____/____/____</p>
              <p>Horário: _______</p>
              <p className="mt-4">____________________________________</p>
              <p className="text-xs">Assinatura do profissional</p>
              <p className="text-xs">Registro profissional:</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-[#00BCD4] hover:bg-[#0097A7]">
            Gerar Declaração
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Manter compatibilidade com código antigo
export const ProntuarioConsultaDialog = ProntuarioClinicoDialog;
export const ProntuarioExameDialog = ProntuarioAcompanhamentoDialog;
export const ProntuarioTerapiaDialog = ProntuarioTerapeuticoDialog;
