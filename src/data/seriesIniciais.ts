import { ExercicioDoTreino, Treino } from "@/types/treino";

function ex(exercicioId: string, series = 3, repeticoes = 12): ExercicioDoTreino {
  return { exercicioId, series, repeticoes, carga: 0 };
}

export function criarSeriesIniciais(): Treino[] {
  const agora = new Date().toISOString();

  return [
    {
      id: "inicial-pernas",
      nome: "Pernas",
      arquivado: false,
      criadoEm: agora,
      exercicios: [
        ex("agachamento-sumo", 4, 12),
        ex("leg-press", 4, 12),
        ex("panturrilha-em-pe", 4, 15),
        ex("afundo"),
        ex("stiff"),
        ex("mesa-flexora"),
        ex("elevacao-pelvica", 4, 12),
        ex("coice-polia", 3, 15),
        ex("prancha", 3, 30),
        ex("prancha-lateral", 3, 30),
      ],
    },
    {
      id: "inicial-costas-biceps",
      nome: "Costas e bíceps",
      arquivado: false,
      criadoEm: agora,
      exercicios: [
        ex("puxada-frontal"),
        ex("remada-baixa"),
        ex("pullover-polia"),
        ex("remada-alta"),
        ex("fly-inverso"),
        ex("rosca-martelo"),
        ex("rosca-scott"),
        ex("cadeira-flexora"),
        ex("cadeira-abdutora"),
      ],
    },
    {
      id: "inicial-peito-triceps",
      nome: "Peito e tríceps",
      arquivado: false,
      criadoEm: agora,
      exercicios: [
        ex("supino-inclinado-halteres"),
        ex("crucifixo-reto"),
        ex("desenvolvimento-halteres"),
        ex("triceps-corda"),
        ex("triceps-maquina"),
        ex("abdominal-crunch", 3, 15),
        ex("elevacao-de-pernas", 3, 15),
        ex("cadeira-extensora"),
        ex("cadeira-adutora"),
      ],
    },
  ];
}