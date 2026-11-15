import { formatarData } from "../../shared/datas.shared.js";

const DIA_INICIO_PERIODO = 25

export interface PeriodoApuracao {
    inicio: string
    fim: string
}

export function obterPeriodo(dataReferencia: string): PeriodoApuracao {
    const [ano, mes, dia] = dataReferencia.split('-').map(Number)

    const deslocamentoMes = dia >= DIA_INICIO_PERIODO ? 0 : -1

    const inicio = new Date(ano, mes - 1 + deslocamentoMes, DIA_INICIO_PERIODO)
    const fim = new Date(ano, mes + deslocamentoMes, DIA_INICIO_PERIODO - 1)

    return { inicio: formatarData(inicio), fim: formatarData(fim) }
}