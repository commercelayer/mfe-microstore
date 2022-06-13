// create a set options from 1 to `n`, where `n` is the total available number capped at 10
export const createSelectOptions = (max: number) =>
  Array.from({ length: Math.min(max, 10) }, (_, i) => i + 1)
