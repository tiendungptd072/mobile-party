declare const repository: {
  getPage(
    cursor: string,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
};
declare const api: {
  getFeed(
    cursor: string | null,
    signal: AbortSignal,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
};

// #region show
const query = useInfiniteQuery({
  queryKey: ["feed"],
  initialPageParam: null as string | null,
  queryFn: ({ pageParam, signal }) => api.getFeed(pageParam, signal),
  getNextPageParam: (page) => page.nextCursor,
});

const posts = query.data?.pages.flatMap((page) => page.items) ?? [];
// #endregion
