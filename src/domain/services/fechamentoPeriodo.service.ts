import type { MarcacaoDia } from "../entities/marcacaoDia.entities.js";
import type { ResultadoDia } from "../entities/resultadoDia.entities.js";
import type { FechamentoPerido, ResumoSemana, TotaisHoras } from "../entities/fechamentoPeriodo.js";
import { obterPeriodo } from "../rules/periodo.rules.js";
import { calcularDia } from "./calculoDia.service.js";
import { listarDatas, obterSegundaDaSemana } from "../../shared/datas.shared.js";

export function somarResultados(resultados: ResultadoDia[]): TotaisHoras {
    return resultados.reduce<TotaisHoras>(
        (totais, resultado) => ({
            minutosPrevistos: totais.minutosPrevistos + resultado.minutosPrevistos,
            minutosTrabalhados: totais.minutosTrabalhados + resultado.minutosTrabalhados,
            minutosExtras50: totais.minutosExtras50 + resultado.minutosExtras50,
            minutosExtras100: totais.minutosExtras100 + resultado.minutosExtras100,
            minutosFaltantes: totais.minutosFaltantes + resultado.minutosFaltantes
        }),
        {
            minutosPrevistos: 0,
            minutosTrabalhados: 0,
            minutosExtras50: 0,
            minutosExtras100: 0,
            minutosFaltantes: 0
        }
    )
}

export function fecharPeriodo(marcacoes: MarcacaoDia[], dataReferencia: string, ateData?: string): FechamentoPerido {
    const periodo = obterPeriodo(dataReferencia)
    const dataFinal = ateData && ateData < periodo.fim ? ateData : periodo.fim

    const marcacaoPorData = new Map<string, MarcacaoDia>(
        marcacoes.map((marcacao): [string, MarcacaoDia] => [marcacao.data, marcacao])
    )

    const dias = listarDatas(periodo.inicio, dataFinal).map((data) =>
        calcularDia(marcacaoPorData.get(data) ?? { data }
        ))

    const diasPorSemana = new Map<string, ResultadoDia[]>()
    for (const dia of dias) {
        const segunda = obterSegundaDaSemana(dia.data)
        const diasDaSemana = diasPorSemana.get(segunda) ?? []
        diasDaSemana.push(dia)
        diasPorSemana.set(segunda, diasDaSemana)
    }

    const semanas: ResumoSemana[] = [...diasPorSemana].map(([inicioSemana, diasDaSemana]) => ({
        inicioSemana,
        ...somarResultados(diasDaSemana)
    }))

    return {
        inicio: periodo.inicio,
        fim: periodo.fim,
        dias,
        semanas,
        totais: somarResultados(dias)
    }
}