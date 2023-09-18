import * as React from "react";
import {
  List,
  DatagridConfigurable,
  TopToolbar,
  SelectColumnsButton,
  CreateButton,
  ExportButton,
  TextField,
  DateField,
  SearchInput,
  NumberField,
  ChipField,
  UrlField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import MobileGrid from "./MobileGrid";
import BpmsListAside from "./BpmsListAside";
import BpmLinkField from "./BpmLinkField";
import EmptyListPage from "./EmptyListPage";

const BpmFilters = [<SearchInput source="value" alwaysOn />];

const BpmListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const BpmsList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? BpmFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<BpmsListAside />}
      actions={<BpmListActions />}
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
        >
          <BpmLinkField />
          <TextField source="value" label="resources.bpms.fields.value" />
          <UrlField source="audioUrl" target="_blank" />
          <DateField source="createdAt" label="Created At" showTime />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default BpmsList;
