import * as React from "react";
import { Card, CardContent } from "@mui/material";
import RoleIcon from "@mui/icons-material/TaskAlt";
import SaveQueryIcon from "@mui/icons-material/BookmarkAddedRounded";

import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
} from "react-admin";

const TimelineItemsListAside = () => {
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
        <FilterLiveSearch source="text" placeholder="Text" />
        <SavedQueriesList icon={<SaveQueryIcon />} />
        <FilterList
          label="resources.timelineitems.filters.type"
          icon={<RoleIcon />}
        >
          <FilterListItem
            label="resources.timelineitems.filters.NEWRECORDING"
            value={{
              type: "NEWRECORDING",
            }}
          />
          <FilterListItem
            label="resources.timelineitems.filters.NEWPROJECT"
            value={{
              type: "NEWPROJECT",
            }}
          />
          <FilterListItem
            label="resources.timelineitems.filters.NEWUSER"
            value={{
              type: "NEWUSER",
            }}
          />
          <FilterListItem
            label="resources.timelineitems.filters.NEWFOLLOWER"
            value={{
              type: "NEWFOLLOWER",
            }}
          />
          <FilterListItem
            label="resources.timelineitems.filters.NEWDERIVATIVE"
            value={{
              type: "NEWDERIVATIVE",
            }}
          />
          <FilterListItem
            label="resources.timelineitems.filters.LISTENPROJECT"
            value={{
              type: "LISTENPROJECT",
            }}
          />
          <FilterListItem
            label="resources.timelineitems.filters.DJAMMPROJECT"
            value={{
              type: "DJAMMPROJECT",
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default TimelineItemsListAside;
