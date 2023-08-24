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

const PresetsListAside = () => {
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
          label="resources.presets.filters.category"
          icon={<RoleIcon />}
        >
          <FilterListItem
            label="resources.presets.filters.GUITAR"
            value={{
              category: "GUITAR",
            }}
          />
          <FilterListItem
            label="resources.presets.filters.BASS"
            value={{
              category: "BASS",
            }}
          />
          <FilterListItem
            label="resources.presets.filters.DRAMM"
            value={{
              category: "DRAMM",
            }}
          />
          <FilterListItem
            label="resources.presets.filters.UKULELE"
            value={{
              category: "UKULELE",
            }}
          />
          <FilterListItem
            label="resources.presets.filters.MASTERBUS"
            value={{
              category: "MASTERBUS",
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default PresetsListAside;
