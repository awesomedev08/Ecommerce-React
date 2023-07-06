import React from "react";
import Filter from "./Filter";
import { memo } from "react";

function FilterTow({
  Mydata,
  SearchParams,
  setParamsToUrl,
  useFilter,
  SetUseFilter,
}) {
  return (
    <Filter
      Mydata={Mydata}
      SearchParams={SearchParams}
      setParamsToUrl={setParamsToUrl}
      useFilter={useFilter}
      SetUseFilter={SetUseFilter}
    />
  );
}

export default memo(FilterTow);
