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

import ContestLinkField from "./ContestLinkField";
import MobileGrid from "./MobileGrid";
import ContestsListAside from "./ContestsListAside";
import CheckCircle from "@mui/icons-material/CheckCircleTwoTone";
import CancelCircle from "@mui/icons-material/CancelTwoTone";
import ContestShow from "./ContestShow";
import EmptyListPage from "./EmptyListPage";

const ContestFilters = [<SearchInput source="artistName" alwaysOn />];

const ContestsListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const ContestsList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? ContestFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<ContestsListAside />}
      actions={<ContestsListActions />}
      empty={<EmptyListPage />}
    >
      {isXsmall ? (
        <MobileGrid />
      ) : (
        <DatagridConfigurable
          rowClick="expand"
          expand={<ContestShow />}
          sx={{
            "& .column-groups": {
              md: { display: "none" },
              lg: { display: "table-cell" },
            },
          }}
        >
          <ContestLinkField source="id" label="resources.contests.fields.id" />
          <TextField source="title" label="resources.contests.fields.title" />
          <DateField source="startDate" showTime />
          <DateField source="endDate" showTime />
          <BooleanField
            source="allowTrackUpload"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
          />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default ContestsList;
