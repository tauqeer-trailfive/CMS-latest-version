import * as React from "react";
import { Card, CardContent } from "@mui/material";
import { FilterLiveSearch, SavedQueriesList } from "react-admin";

const ReferralCodesListAside = () => {
  return (
    <Card
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
        order: -1,
        flex: "0 0 15em",
        mr: 2,
        mt: 8,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch source="code" placeholder="Code" />
        <SavedQueriesList />
      </CardContent>
    </Card>
  );
};

export default ReferralCodesListAside;
