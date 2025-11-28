export function createQueryKeys<T extends string>(entity: T) {
  return {
    all: [entity] as const,
    lists: () => [...[entity], 'list'] as const,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: (filters?: Record<string, any>) =>
      [...[entity, 'list'], { filters }] as const,
    detail: (id: string) => [...[entity, 'detail'], id] as const,
  };
}
