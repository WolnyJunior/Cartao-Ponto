import { describe, it, expect } from 'vitest';
import { fecharPeriodo } from '../src/domain/services/fechamentoPeriodo.service';

// Período de referência: 25/10/2026 a 24/11/2026 (31 dias).
// Tem 22 dias úteis (480 min) e 4 sábados (240 min): 22*480 + 4*240 = 11520 min previstos.
describe('fecharPeriodo', () => {
  it('sem marcações: tudo é faltante', () => {
    const fechamento = fecharPeriodo([], '2026-11-15');
    expect(fechamento.inicio).toBe('2026-10-25');
    expect(fechamento.fim).toBe('2026-11-24');
    expect(fechamento.dias).toHaveLength(31);
    expect(fechamento.totais.minutosPrevistos).toBe(11520);
    expect(fechamento.totais.minutosFaltantes).toBe(11520);
    expect(fechamento.totais.minutosTrabalhados).toBe(0);
  })

  it('agrupa em 6 semanas, a primeira parcial (só o domingo 25/10)', () => {
    const fechamento = fecharPeriodo([], '2026-11-15');
    expect(fechamento.semanas).toHaveLength(6);
    expect(fechamento.semanas[0].inicioSemana).toBe('2026-10-19');
    expect(fechamento.semanas[0].minutosPrevistos).toBe(0);
  })

  it('soma um dia com hora extra no dia, na semana e no período', () => {
    const fechamento = fecharPeriodo(
      [
        {
          data: '2026-11-09',
          entrada: '08:30',
          saidaIntervalo: '12:00',
          voltaIntervalo: '13:30',
          saida: '19:00',
        },
      ],
      '2026-11-15',
    )
    const semana = fechamento.semanas.find((s) => s.inicioSemana === '2026-11-09');

    expect(semana?.minutosTrabalhados).toBe(540);
    expect(semana?.minutosExtras50).toBe(60);
    expect(fechamento.totais.minutosTrabalhados).toBe(540);
    expect(fechamento.totais.minutosExtras50).toBe(60);
  })

  it('com ateData: não conta os dias futuros', () => {
    // De 25/10 a 15/11 são 22 dias
    const fechamento = fecharPeriodo([], '2026-11-15', '2026-11-15');
    expect(fechamento.dias).toHaveLength(22);
  })
})