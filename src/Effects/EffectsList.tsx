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
import EffectsListAside from "./EffectsListAside";
import EffectLinkField from "./EffectLinkField";
import EmptyListPage from "./EmptyListPage";

const userFilters = [<SearchInput source="name" alwaysOn />];

const EffectListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const EffectsList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<EffectsListAside />}
      actions={<EffectListActions />}
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
          <EffectLinkField />
          <TextField source="name" label="resources.effects.fields.name" />
          <TextField
            source="effectValues"
            label="resources.effects.fields.effectValues"
          />
          <ChipField source="typeOfEffect" />
          <DateField source="createdAt" label="Created At" showTime />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default EffectsList;
