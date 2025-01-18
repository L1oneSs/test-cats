import {
  useInfiniteQuery,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import CatsService from "@/services/catsService";
import { ICatImage } from "@/interfaces/ICatImage";
interface UseCatsReturn {
  cats: ICatImage[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const useCats = (): UseCatsReturn => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["cats"],
    queryFn: ({ pageParam }) =>
      CatsService.getCats({ page: pageParam as number, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  const cats = data?.pages.flat() || [];

  return {
    cats,
    isLoading,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
  };
};
