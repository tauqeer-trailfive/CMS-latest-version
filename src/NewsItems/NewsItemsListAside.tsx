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

const NewsItemsListAside = () => {
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
        <FilterLiveSearch source="title" placeholder="Title" />
        <SavedQueriesList />
      </CardContent>
    </Card>
  );
};

export default NewsItemsListAside;
