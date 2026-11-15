# Cartão Ponto
Cálculo de horas trabalhadas, extras(50% e 100%) e faltantes.


## Stack
Node.js, TypeScript, Vitest

## Rodar
```bash
npm install
npm run dev
nom test
```

## Regras de cálculo
- Segunda a sexta: jornada de 8h (08:30 às 18:00, intervalo 12:00 às 13:30)
- Sábado: jornada de 4h (08:30 às 12:30)
- Hora extra 50%: as 2 primeiras horas extras do dia
- Hora extra 100%: o que passar das 2 primeiras horas extras, e todo o trabalho em domingo e feriado
- Horas faltantes: jornada prevista menos horas trabalhadas
