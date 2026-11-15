import type { ResultadoDia } from "./resultadoDia.entities.js";

export type TotaisHoras = Omit<ResultadoDia, 'data'>

export interface ResumoSemana extends TotaisHoras {
    inicioSemana: string
}

export interface FechamentoPerido {
    inicio: string
    fim: string
    dias: ResultadoDia[]
    semanas: ResumoSemana[]
    totais: TotaisHoras
}