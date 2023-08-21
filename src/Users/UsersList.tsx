import * as React from "react";
import {
  List,
  DatagridConfigurable,
  TopToolbar,
  SelectColumnsButton,
  CreateButton,
  ExportButton,
  EmailField,
  ChipField,
  TextField,
  DateField,
  ArrayField,
  SingleFieldList,
  ReferenceArrayField,
  Datagrid,
  SearchInput,
  BooleanField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import UserLinkField from "./UserLinkField";
import MobileGrid from "./MobileGrid";
import UsersListAside from "./UsersListAside";
import CheckCircle from "@mui/icons-material/CheckCircleTwoTone";
import CancelCircle from "@mui/icons-material/CancelTwoTone";

const userFilters = [<SearchInput source="artistName" alwaysOn />];

const PostListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const UsersList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<UsersListAside />}
      actions={<PostListActions />}
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
        >
          <UserLinkField label="Avatar & Name" />
          <TextField source="artistName" label="Artist Name" />
          <EmailField source="email" />
          <ChipField source="role" variant="outlined" color="primary" />
          <BooleanField
            source="audioCorePluginAllowUser"
            label="Audio Core Plugin"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
          />
          <DateField source="createdAt" showTime label="Created At" />
          <ArrayField source="musicalInstruments">
            <SingleFieldList linkType={false}>
              <ChipField source="name" size="small" />
            </SingleFieldList>
          </ArrayField>
          <ArrayField source="favoriteGenres">
            <SingleFieldList linkType={false}>
              <ChipField source="name" size="small" />
            </SingleFieldList>
          </ArrayField>
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default UsersList;
