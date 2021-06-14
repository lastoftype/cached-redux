import React from "react";
import "./App.css";
import { usePeople } from "./hooks";
import { Pagination, Skeleton } from "@material-ui/lab";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

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

  const { loading } = result || {};

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data } = result || {};
  const { results = [] } = data || {};

  const classes = useListStyles();

  return (
    <Container maxWidth="sm">
      <Box display="flex" className={classes.root}>
        <Box mb={2}>
          <Typography variant="h4">
            People{" "}
            {loading ? <CircularProgress size="0.5em" thickness={4} /> : ""}
          </Typography>
        </Box>
      </Box>
      <Box>
        {results.length === 0 &&
          loading &&
          Array.from(Array(10)).map((item, i) => {
            const randomLength = 160 - Math.floor(Math.random() * 50);
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
        {results.map((result) => (
          <Box key={result.uid} className={classes.result}>
            {result.name}
          </Box>
        ))}
      </Box>
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
