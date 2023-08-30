import * as React from "react";
import { Card, CardContent } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOnOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import RoleIcon from "@mui/icons-material/TaskAlt";

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

import segments from "../segments/data";

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
        mt: 8,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch source="name" placeholder="Name" />
        <SavedQueriesList />
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
