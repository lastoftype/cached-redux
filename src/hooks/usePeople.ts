import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as qs from "qs";
import { fetchResults } from "../state/actionCreators";
import { selectResultsByQuery } from "../state/selectors";

interface IPeopleConfig {
  page: number;
  limit: number;
}

const DEFAULT_CONFIG: IPeopleConfig = {
  page: 1,
  limit: 10,
};

/**
 * Stores logic for triggering API methods and storing data in redux
 */
export const usePeople = (config: Partial<IPeopleConfig> = {}) => {
  const dispatch = useDispatch();
  const resultsByQuery = useSelector(selectResultsByQuery);

  // store query as object
  const [query, setQuery] = useState<IPeopleConfig>({ ...DEFAULT_CONFIG });
  const queryString = qs.stringify(query);

  // use `queryString` (stringified query) to access keyed object with data
  const result = resultsByQuery[queryString];

  // When this mounts, or when `query` is updated, fetch
  useEffect(() => {
    dispatch(fetchResults(query));
  }, [query]);

  // triggers API fetch
  const fetchPeople = useCallback(() => {
    dispatch(fetchResults(query));
  }, [dispatch]);

  const incrementPage = useCallback(() => {
    setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [dispatch]);

  const decrementPage = useCallback(() => {
    setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  }, [dispatch]);

  const setPage = useCallback(
    (page: number) => {
      setQuery((prev) => ({ ...prev, page }));
    },
    [dispatch]
  );

  return {
    fetchPeople,
    result,
    incrementPage,
    decrementPage,
    query,
    setPage,
  };
};
