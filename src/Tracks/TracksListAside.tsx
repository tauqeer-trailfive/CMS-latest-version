import * as React from "react";
import { Card, CardContent } from "@mui/material";
import VolumeIcon from "@mui/icons-material/VolumeOffRounded";
import MusicIcon from "@mui/icons-material/MusicNoteRounded";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
} from "react-admin";
import SaveQueryIcon from "@mui/icons-material/BookmarkAddedRounded";

const TracksListAside = () => {
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
        <FilterLiveSearch source="id" label="Search by Track Id" />
        <SavedQueriesList icon={<SaveQueryIcon />} />
        <FilterList
          label="resources.tracks.filters.is_muted"
          icon={<VolumeIcon />}
        >
          <FilterListItem
            label="ra.boolean.true"
            value={{
              isMuted: true,
            }}
          />
          <FilterListItem
            label="ra.boolean.false"
            value={{
              isMuted: false,
            }}
          />
        </FilterList>

        <FilterList
          label="resources.tracks.filters.is_solo"
          icon={<MusicIcon />}
        >
          <FilterListItem
            label="ra.boolean.true"
            value={{
              isSolo: true,
            }}
          />
          <FilterListItem
            label="ra.boolean.false"
            value={{
              isSolo: false,
            }}
          />
        </FilterList>

        {/* To show Users instruments below */}
        {/* <FilterList
          label="resources.customers.filters.group"
          icon={<LocalOfferIcon />}
        >
          {segments.map((segment) => (
            <FilterListItem
              label={segment.name}
              key={segment.id}
              value={{ groups: segment.id }}
            />
          ))}
        </FilterList> */}
      </CardContent>
    </Card>
  );
};

export default TracksListAside;
