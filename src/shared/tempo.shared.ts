export function converterHoraParaMinuto(hora: string): number {
    const [horas, minutos] = hora.split(':').map(Number)
    return horas * 60 + minutos
}

export function formatarMinutoParaHora(totalMinutos: number): string {
    const horas = Math.floor(totalMinutos / 60)
    const minutos = totalMinutos % 60
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
}