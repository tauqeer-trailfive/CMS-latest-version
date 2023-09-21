import * as React from "react";
import { Card, CardContent } from "@mui/material";
import StatusIcon from "@mui/icons-material/DynamicFormRounded";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
} from "react-admin";
import SaveQueryIcon from "@mui/icons-material/BookmarkAddedRounded";

const GenresListAside = () => {
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
        <FilterLiveSearch source="title" label="Title" />
        <SavedQueriesList icon={<SaveQueryIcon />} />
        <FilterList
          label="resources.homescreens.filters.status"
          icon={<StatusIcon />}
        >
          <FilterListItem
            label="ra.boolean.true"
            value={{
              status: true,
            }}
          />
          <FilterListItem
            label="ra.boolean.false"
            value={{
              status: false,
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default GenresListAside;
