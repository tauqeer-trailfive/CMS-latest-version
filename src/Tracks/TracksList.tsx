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
  NumberField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import TrackLinkField from "./TrackLinkField";
import MobileGrid from "./MobileGrid";
import TracksListAside from "./TracksListAside";
import CheckCircle from "@mui/icons-material/CheckCircleTwoTone";
import CancelCircle from "@mui/icons-material/CancelTwoTone";
import DownloadCSVIcon from "@mui/icons-material/DownloadForOfflineTwoTone";
import { gql, useQuery } from "@apollo/client";

const userFilters = [<SearchInput source="artistName" alwaysOn />];

const EXPORT_PROJECTS_QUERY = gql`
  query Query($model: ModelNames!) {
    getCsvUrl(model: $model)
  }
`;

const TracksList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const { data, loading, error } = useQuery(EXPORT_PROJECTS_QUERY, {
    variables: {
      model: "track",
    },
  });

  const TracksListActions = () => (
    <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <Button
        href={!loading ? data?.getCsvUrl : "#"}
        disabled={loading}
        title="Export Tracks List"
        label="Export Entire Tracks List"
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
      aside={<TracksListAside />}
      actions={<TracksListActions />}
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
          omit={["project"]}
        >
          <TrackLinkField label="Id" />
          <NumberField source="order" label="Order" />
          <NumberField source="Pan" />
          <NumberField source="volume" />
          <BooleanField
            source="isMuted"
            label="Is Muted?"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
          />
          <BooleanField
            source="isSolo"
            label="Is Solo?"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
          />
          <DateField source="createdAt" showTime label="Created At" />
          <ChipField source="project.name" size="small" />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default TracksList;
