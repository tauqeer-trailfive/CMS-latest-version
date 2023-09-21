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
        mt: 6,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch source="name" placeholder="Name" />
        <FilterLiveSearch source="artistName" placeholder="Artist Name" />
        <FilterLiveSearch source="email" placeholder="Email" />

        <SavedQueriesList icon={<SaveQueryIcon />} />

        <FilterList label="resources.users.filters.role" icon={<RoleIcon />}>
          <FilterListItem
            label="resources.users.filters.qa"
            value={{
              role: "QA",
            }}
          />
          <FilterListItem
            label="resources.users.filters.service"
            value={{
              role: "SERVICE",
            }}
          />
          <FilterListItem
            label="resources.users.filters.contentcreator"
            value={{
              role: "CONTENTCREATOR",
            }}
          />
          <FilterListItem
            label="resources.users.filters.superadmin"
            value={{
              role: "SUPERADMIN",
            }}
          />
          <FilterListItem
            label="resources.users.filters.admin"
            value={{
              role: "ADMIN",
            }}
          />
          <FilterListItem
            label="resources.users.filters.user"
            value={{
              role: "USER",
            }}
          />
          <FilterListItem
            label="resources.users.filters.anon"
            value={{
              role: "ANON",
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
