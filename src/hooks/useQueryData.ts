import { Enabled, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (
    key: QueryKey,
    queryFn: QueryFunction,
    enabled?: Enabled
) => {
    const {
        data,
        isPending,
        isFetched,
        refetch,
        isFetching
    } = useQuery({
        queryKey: key,
        queryFn,
        enabled
    });

    return {
        data,
        isPending,
        isFetched,
        refetch,
        isFetching
    }
}