import * as React from "react";
import {
  List,
  DatagridConfigurable,
  TopToolbar,
  SelectColumnsButton,
  CreateButton,
  EmailField,
  ChipField,
  TextField,
  DateField,
  ArrayField,
  SingleFieldList,
  SearchInput,
  BooleanField,
  Button,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import UserLinkField from "./UserLinkField";
import MobileGrid from "./MobileGrid";
import UsersListAside from "./UsersListAside";
import CheckCircle from "@mui/icons-material/CheckCircleTwoTone";
import CancelCircle from "@mui/icons-material/CancelTwoTone";
import DownloadCSVIcon from "@mui/icons-material/DownloadForOfflineTwoTone";
import { gql, useQuery } from "@apollo/client";
import EmptyListPage from "./EmptyListPage";
import NotFoundRecord from "./NotFoundRecord";

const userFilters = [<SearchInput source="artistName" alwaysOn />];

const EXPORT_PROJECTS_QUERY = gql`
  query Query($model: ModelNames!) {
    getCsvUrl(model: $model)
  }
`;

const UsersList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const { data, loading, error } = useQuery(EXPORT_PROJECTS_QUERY, {
    variables: {
      model: "user",
    },
  });

  const UsersListActions = () => (
    <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <Button
        href={!loading ? data?.getCsvUrl : "#"}
        disabled={loading}
        title="Export Users List"
        label="Export Entire Users List"
        startIcon={
          <React.Fragment>
            <DownloadCSVIcon />
          </React.Fragment>
        }
      />
    </TopToolbar>
  );

  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<UsersListAside />}
      actions={<UsersListActions />}
      empty={<EmptyListPage />}
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
          omit={["email"]}
          empty={<NotFoundRecord />}
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
          <BooleanField
            source="isCustomArtistName"
            label="Custom Artist Name"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
          />
          <DateField source="createdAt" showTime label="Created At" />
          <ArrayField source="musicalInstruments">
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
