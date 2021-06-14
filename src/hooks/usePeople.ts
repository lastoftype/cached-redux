import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as qs from "qs";
import { fetchResults } from "../state/actionCreators";
import { createSelectResult, selectResultsByQuery } from "../state/selectors";

export const usePeople = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1 });
  const queryString = qs.stringify(query);
  const resultsByQuery = useSelector(selectResultsByQuery);

  const result = resultsByQuery[queryString];

  useEffect(() => {
    dispatch(fetchResults(query));
  }, [query]);

  const fetchPeople = () => {
    dispatch(fetchResults(query));
  };

  const incrementPage = () => {
    setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const decrementPage = () => {
    setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const setPage = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  return {
    fetchPeople,
    result,
    incrementPage,
    decrementPage,
    query,
    setPage,
  };
};
