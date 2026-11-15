const JORNADA_DIA_UTIL_MINUTOS = 8 * 60
const JORNADA_SABADO_MINUTOS = 4 * 60
const DOMINGO = 0
const SABADO = 6
export const LIMITE_HORAS_50_MINUTOS = 2 * 60

function obterDiaDaSemana(data: string): number {
    return new Date(`${data}T00:00:00`).getDay()
}

export function ehDomingoOuFeriado(data: string, feriado = false): boolean {
    return feriado || obterDiaDaSemana(data) === DOMINGO
}

export function obterJornadaPrevistaEmMinutos(data: string, feriado = false): number {
    if (ehDomingoOuFeriado(data, feriado)) return 0
    if (obterDiaDaSemana(data) === SABADO) return JORNADA_SABADO_MINUTOS
    return JORNADA_DIA_UTIL_MINUTOS
}