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
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import MobileGrid from "./MobileGrid";
import SamplesListAside from "./SamplesListAside";
import SampleLinkField from "./SampleLinkField";
import BPMNumberField from "./BMPNumberField";
import SampleShow from "./SampleShow";
import EmptyListPage from "./EmptyListPage";
import NotFoundRecord from "./NotFoundRecord";

const userFilters = [<SearchInput source="name" alwaysOn />];

const EffectListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const SamplesList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<SamplesListAside />}
      actions={<EffectListActions />}
      empty={<EmptyListPage />}
    >
      {isXsmall ? (
        <MobileGrid />
      ) : (
        <DatagridConfigurable
          rowClick="expand"
          expand={<SampleShow />}
          sx={{
            "& .column-groups": {
              md: { display: "none" },
              lg: { display: "table-cell" },
            },
          }}
          empty={<NotFoundRecord />}
        >
          <SampleLinkField />
          <TextField source="name" label="resources.samples.fields.name" />
          <TextField source="format" label="resources.samples.fields.format" />
          <DateField source="createdAt" showTime />
          <NumberField source="samplerate" />
          <BPMNumberField source="bpmTemp" />
          <TextField
            source="instrument"
            label="resources.samples.fields.instrument"
          />
          <ChipField
            source="genre.name"
            label="resources.samples.fields.genre"
          />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default SamplesList;
