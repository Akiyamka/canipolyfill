export const getModulesByQuery = (targetsQuery: string) => {
  const { list } = compat({ targets: targetsQuery });
  return list;
};
