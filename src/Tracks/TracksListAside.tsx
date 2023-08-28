import * as React from "react";
import { Card, CardContent } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOnOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import RoleIcon from "@mui/icons-material/TaskAlt";
import VolumeIcon from "@mui/icons-material/VolumeOffRounded";
import MusicIcon from "@mui/icons-material/MusicNoteRounded";

import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
  useListContext,
} from "react-admin";
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths,
} from "date-fns";

const UsersListAside = () => {
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

export default UsersListAside;
