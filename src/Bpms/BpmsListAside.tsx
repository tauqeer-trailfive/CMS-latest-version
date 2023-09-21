import * as React from "react";
import { Card, CardContent } from "@mui/material";
import { FilterLiveSearch, SavedQueriesList } from "react-admin";
import SaveQueryIcon from "@mui/icons-material/BookmarkAddedRounded";

const BpmsListAside = () => {
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
        mt: 6,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch type="number" source="value" placeholder="Value" />
        <SavedQueriesList icon={<SaveQueryIcon />} />
      </CardContent>
    </Card>
  );
};

export default BpmsListAside;
