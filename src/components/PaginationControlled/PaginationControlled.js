import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import style from "./PaginationControlled.css";
export default function PaginationControlled({ Mydata, setPagination }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    setPagination(page);
  }, [page]);
  return (
    <Stack spacing={2} className="PaginationControlled">
      <Typography>Page: {page}</Typography>
      <Pagination
        count={Mydata?.meta?.pagination.pageCount}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
