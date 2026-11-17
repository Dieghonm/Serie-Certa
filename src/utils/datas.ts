export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// mes começa em 0 (janeiro = 0), igual ao Date do JavaScript
export function chaveDia(ano: number, mes: number, dia: number): string {
  return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

export function chaveHoje(): string {
  const d = new Date();
  return chaveDia(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatarDia(chave: string): string {
  const [ano, mes, dia] = chave.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}