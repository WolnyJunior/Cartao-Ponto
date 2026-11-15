import type { MarcacaoDia } from "../entities/marcacaoDia.entities.js";
import type { ResultadoDia } from "../entities/resultadoDia.entities.js";
import { ehDomingoOuFeriado, obterJornadaPrevistaEmMinutos, LIMITE_HORAS_50_MINUTOS } from "../rules/jornada.rules.js";
import { converterHoraParaMinuto } from "../../shared/tempo.shared.js";

function calcularMinutosTrabalhados(marcacao: MarcacaoDia): number {
    const { entrada, saidaIntervalo, voltaIntervalo, saida } = marcacao
    if (!entrada || !saida) return 0

    const minutosEntrada = converterHoraParaMinuto(entrada)
    const minutosSaida = converterHoraParaMinuto(saida)

    if (saidaIntervalo && voltaIntervalo) {
        const manha = converterHoraParaMinuto(saidaIntervalo) - minutosEntrada
        const tarde = minutosSaida - converterHoraParaMinuto(voltaIntervalo)
        return manha + tarde
    }
    return minutosSaida - minutosEntrada
}

export function calcularDia(marcacao: MarcacaoDia): ResultadoDia {
    const minutosPrevistos = obterJornadaPrevistaEmMinutos(marcacao.data, marcacao.feriado)
    const minutosTrabalhados = calcularMinutosTrabalhados(marcacao)

    if (ehDomingoOuFeriado(marcacao.data, marcacao.feriado)) {
        return {
            data: marcacao.data,
            minutosPrevistos,
            minutosTrabalhados,
            minutosExtras50: 0,
            minutosExtras100: minutosTrabalhados,
            minutosFaltantes: 0
        }
    }

    const diferenca = minutosTrabalhados - minutosPrevistos
    const minutosExtras = diferenca > 0 ? diferenca : 0

    return {
        data: marcacao.data,
        minutosPrevistos,
        minutosTrabalhados,
        minutosExtras50: Math.min(minutosExtras, LIMITE_HORAS_50_MINUTOS),
        minutosExtras100: Math.max(minutosExtras - LIMITE_HORAS_50_MINUTOS, 0),
        minutosFaltantes: diferenca < 0 ? -diferenca : 0
    }
}