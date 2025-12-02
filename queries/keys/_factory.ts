/*
Factory function to create strongly typed query keys for different entities.
This helps maintain consistency and type safety across the application when
working with React Query.
*/
export function createQueryKeys<Entity extends string, Filters = undefined>(
  entity: Entity,
) {
  return {
    all: [entity] as const,
    lists: () => [entity, 'list'] as const,
    // list filters are strongly typed via the Filters generic
    list: (filters?: Filters) => [entity, 'list', { filters }] as const,
    detail: (id: string) => [entity, 'detail', id] as const,
  };
}
