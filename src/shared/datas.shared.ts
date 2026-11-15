export function formatarData(data: Date): string {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')
    return `${ano}-${mes}-${dia}`
}

export function adicionarDias(data: string, dias: number): string {
    const resultado = new Date(`${data}T00:00:00`)
    resultado.setDate(resultado.getDate() + dias)
    return formatarData(resultado)
}

export function listarDatas(inicio: string, fim: string): string[] {
    const datas: string[] = []
    for (let atual = inicio; atual <= fim; atual = adicionarDias(atual, 1)) {
        datas.push(atual)
    }
    return datas
}

export function obterSegundaDaSemana(data: string): string {
    const diaDaSemana = new Date(`${data}T00:00:00`).getDay()
    const diasParaVoltar = diaDaSemana === 0 ? 6 : diaDaSemana - 1
    return adicionarDias(data, -diasParaVoltar)
}