import * as React from "react";
import { Card, CardContent } from "@mui/material";
import RoleIcon from "@mui/icons-material/TaskAlt";
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
        <FilterLiveSearch source="name" label="Name" />
        <SavedQueriesList icon={<SaveQueryIcon />} />
        <FilterList
          label="resources.effects.filters.typeOfEffect"
          icon={<RoleIcon />}
        >
          <FilterListItem
            label="resources.effects.filters.DELAYBPM"
            value={{
              typeOfEffect: "DELAYBPM",
            }}
          />
          <FilterListItem
            label="resources.effects.filters.DELAY"
            value={{
              typeOfEffect: "DELAY",
            }}
          />
          <FilterListItem
            label="resources.effects.filters.REVERB"
            value={{
              typeOfEffect: "REVERB",
            }}
          />
          <FilterListItem
            label="resources.effects.filters.EQUALIZER"
            value={{
              typeOfEffect: "EQUALIZER",
            }}
          />
          <FilterListItem
            label="resources.effects.filters.COMPRESSOR"
            value={{
              typeOfEffect: "COMPRESSOR",
            }}
          />
          <FilterListItem
            label="resources.effects.filters.COMPR_MASTERBUS"
            value={{
              typeOfEffect: "COMPRESSORMASTERBUS",
            }}
          />
          <FilterListItem
            label="resources.effects.filters.LIMITER"
            value={{
              typeOfEffect: "LIMITER",
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default GenresListAside;
