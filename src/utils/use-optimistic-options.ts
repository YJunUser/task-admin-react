import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
    // 在mutate完成前触发，接受和mutate一样的参数
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    // This function will fire if the mutation encounters an error and will be passed the error.
    // If a promise is returned, it will be awaited and resolved before proceeding
    onError(error: Error, newItems: any, context: any) {
      // 回滚
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old?.filter((item) => item.id !== target.id) || [];
  });

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old ? [...old, ...target] : [];
  });

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return (
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
    );
  });
