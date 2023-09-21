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
  ArrayField,
  SingleFieldList,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import MobileGrid from "./MobileGrid";
import SampleSetsListAside from "./SampleSetsListAside";
import SampleSetLinkField from "./SampleSetLinkField";
import EmptyListPage from "./EmptyListPage";
import NotFoundRecord from "./NotFoundRecord";

const userFilters = [<SearchInput source="name" alwaysOn />];

const SampleSetListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const SampleSetsList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<SampleSetsListAside />}
      actions={<SampleSetListActions />}
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
          <SampleSetLinkField />
          <TextField source="name" label="resources.samplesets.fields.name" />
          <ChipField
            source="owner.name"
            label="resources.samplesets.fields.user"
            sortable={false}
          />
          <ChipField
            source="genre.name"
            label="resources.samplesets.fields.genre"
            sortable={false}
          />
          <DateField source="createdAt" label="Created At" showTime />
          <ArrayField source="samples" sortable={false}>
            <SingleFieldList linkType={false}>
              <ChipField source="name" size="small" />
            </SingleFieldList>
          </ArrayField>
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default SampleSetsList;
