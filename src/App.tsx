import React from "react";
import { usePeople } from "./hooks";
import { Pagination, Skeleton } from "@material-ui/lab";
import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import "./App.css";

const useListStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  result: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
  },
}));

function App() {
  const { query, setPage, result } = usePeople();
  const { page } = query || {};
  const { loading, data } = result || {};
  const { results = [] } = data || {};

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const classes = useListStyles();

  return (
    <Container maxWidth="sm">
      {/**
       * Title (with loading indicator)
       */}
      <Box display="flex" className={classes.root}>
        <Box mb={2}>
          <Typography variant="h4">
            People{" "}
            {loading ? <CircularProgress size="0.5em" thickness={4} /> : ""}
          </Typography>
        </Box>
      </Box>
      <Box>
        {/**
         * Skeleton results
         */}
        {results.length === 0 &&
          loading &&
          Array.from(Array(10)).map((item, i) => {
            const randomLength = 90 - Math.floor(Math.random() * 50);
            return (
              <Box display="block" key={i} className={classes.result}>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={randomLength}
                />
              </Box>
            );
          })}
        {/**
         * Map through results
         */}
        {results.map((result) => (
          <Box key={result.uid} className={classes.result}>
            {result.name}
          </Box>
        ))}
      </Box>
      {/**
       * Pagination
       */}
      <Box display="flex" justifyContent="center">
        <Pagination
          count={10}
          color="primary"
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Container>
  );
}

export default App;
