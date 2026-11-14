export function withClass<State>(base: string, className?: string | ((state: State) => string | undefined)) {
  return typeof className === 'function'
    ? (state: State) => [base, className(state)].filter(Boolean).join(' ')
    : [base, className].filter(Boolean).join(' ');
}
