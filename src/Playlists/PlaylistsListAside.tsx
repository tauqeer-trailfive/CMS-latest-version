import * as React from "react";
import { Card, CardContent } from "@mui/material";
import PublicIcon from "@mui/icons-material/PublicRounded";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
} from "react-admin";
import SaveQueryIcon from "@mui/icons-material/BookmarkAddedRounded";

const PlaylistsListAside = () => {
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
        <FilterLiveSearch source="name" placeholder="Name" />
        <SavedQueriesList icon={<SaveQueryIcon />} />
        <FilterList
          label="resources.playlists.filters.public"
          icon={<PublicIcon />}
        >
          <FilterListItem
            label="ra.boolean.true"
            value={{
              public: true,
            }}
          />
          <FilterListItem
            label="ra.boolean.false"
            value={{
              public: false,
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default PlaylistsListAside;
