import { describe, it, expect } from "vitest";
import { calcularDia } from '../src/domain/services/calculoDia.js'
import { MarcacaoDia } from "../src/domain/entities/marcacaoDia.js";


function criarDiaUtil(alteracoes: Partial<MarcacaoDia> = {}): MarcacaoDia {
    return {
        data: '2026-11-09',
        entrada: '08:30',
        saidaIntervalo: '12:00',
        voltaIntervalo: '13:30',
        saida: '18:00',
        ...alteracoes,
    }
}
describe('calcularDia', () => {
    it('dia util cumprido:sem extras e sem faltantes', () => {
        const resultado = calcularDia(criarDiaUtil())
        expect(resultado.minutosTrabalhados).toBe(480)
        expect(resultado.minutosExtras50).toBe(0)
        expect(resultado.minutosExtras100).toBe(0)
    })

    it('dia útil com 1h a mais: extra 50%', () => {
        const resultado = calcularDia(criarDiaUtil({ saida: '19:00' }))
        expect(resultado.minutosExtras50).toBe(60)
        expect(resultado.minutosExtras100).toBe(0)
    })
    it('dia útil com 2h a mais: extra 50%', () => {
        const resultado = calcularDia(criarDiaUtil({ saida: '20:00' }))
        expect(resultado.minutosExtras50).toBe(120)
        expect(resultado.minutosExtras100).toBe(0)
    })
    it('dia útil com 1h 50% e 30min 100%', () => {
        const resultado = calcularDia(criarDiaUtil({ saida: '20:30' }))
        expect(resultado.minutosExtras50).toBe(120)
        expect(resultado.minutosExtras100).toBe(30)
    })

    it('atraso de 30 min: faltantes', () => {
        const resultado = calcularDia(criarDiaUtil({ entrada: '09:00' }))
        expect(resultado.minutosFaltantes).toBe(30);
        expect(resultado.minutosExtras50).toBe(0)
    })

    it('sábado cumprido: sem extras', () => {
        const resultado = calcularDia({ data: '2026-11-14', entrada: '08:30', saida: '12:30' });
        expect(resultado.minutosTrabalhados).toBe(240);
        expect(resultado.minutosExtras50).toBe(0);
    })

    it('sábado com 1h a mais: extra 50%', () => {
        const resultado = calcularDia({ data: '2026-11-14', entrada: '08:30', saida: '13:30' });
        expect(resultado.minutosExtras50).toBe(60);
    })

    it('sábado com 3h extras: 2h em 50% e 1h em 100%', () => {
        const resultado = calcularDia({
            data: '2026-11-14',
            entrada: '08:30',
            saidaIntervalo: '12:30',
            voltaIntervalo: '14:00',
            saida: '17:00'
        });
        expect(resultado.minutosExtras50).toBe(120);
        expect(resultado.minutosExtras100).toBe(60);
    })


    it('domingo: tudo é extra 100%', () => {
        const resultado = calcularDia({ data: '2026-11-15', entrada: '08:00', saida: '12:00' });
        expect(resultado.minutosExtras100).toBe(240);
        expect(resultado.minutosExtras50).toBe(0);
    })

    it('feriado em dia útil: tudo é extra 100%', () => {
        const resultado = calcularDia({
            data: '2026-11-09',
            feriado: true,
            entrada: '08:30',
            saida: '12:00',
        })
        expect(resultado.minutosExtras100).toBe(210);
        expect(resultado.minutosFaltantes).toBe(0);
    })

    it('falta (sem marcações em dia útil): 8h00 faltantes', () => {
        const resultado = calcularDia({ data: '2026-11-09' });
        expect(resultado.minutosFaltantes).toBe(480);
    })
})