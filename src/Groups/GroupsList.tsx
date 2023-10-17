import * as React from "react";
import {
  List,
  DatagridConfigurable,
  TopToolbar,
  SelectColumnsButton,
  CreateButton,
  ExportButton,
  TextField,
  SearchInput,
  ChipField,
  BooleanField,
  DateField,
  ReferenceField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import MobileGrid from "./MobileGrid";
import GroupsListAside from "./GroupsListAside";
import GroupLinkField from "./GroupLinkField";
import EmptyListPage from "./EmptyListPage";
import NotFoundRecord from "./NotFoundRecord";
import CheckCircle from "@mui/icons-material/CheckCircleTwoTone";
import CancelCircle from "@mui/icons-material/CancelTwoTone";

const groupFilters = [<SearchInput source="name" alwaysOn />];

const GroupListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const GroupsList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? groupFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<GroupsListAside />}
      actions={<GroupListActions />}
      empty={<EmptyListPage />}
      sx={{ mt: 2 }}
    >
      {isXsmall ? (
        <MobileGrid />
      ) : (
        <DatagridConfigurable
          sx={{
            "& .column-groups": {
              md: { display: "none" },
              lg: { display: "table-cell" },
            },
          }}
          empty={<NotFoundRecord />}
        >
          <GroupLinkField />
          <TextField
            source="name"
            label="resources.groups.fields.name"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          />
          <DateField
            source="createdAt"
            label="resources.groups.fields.created_at"
            showTime
          />
          <BooleanField
            source="isPublic"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
          />
          <ReferenceField
            label="createdBy"
            source="createdBy.id"
            reference="users"
          >
            <ChipField
              source="name"
              label="resources.groups.fields.createdBy"
              sortable={false}
            />
          </ReferenceField>
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default GroupsList;
