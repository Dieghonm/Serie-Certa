import { buscarPorId, filtrarPorGrupo } from "./exercicios";

console.log(buscarPorId("rosca-direta"));
console.log(buscarPorId("nao-existe"));
console.log(filtrarPorGrupo("biceps").map((e) => e.nome));