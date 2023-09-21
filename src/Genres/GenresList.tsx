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
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import MobileGrid from "./MobileGrid";
import GenresListAside from "./GenresListAside";
import GenreLinkField from "./GenreLinkField";
import EmptyListPage from "./EmptyListPage";
import NotFoundRecord from "./NotFoundRecord";

const userFilters = [<SearchInput source="name" alwaysOn />];

const GenreListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const GenresList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<GenresListAside />}
      actions={<GenreListActions />}
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
          <GenreLinkField />
          <TextField source="name" label="resources.genres.fields.name" />
          <TextField
            source="description"
            label="resources.genres.fields.description"
          />
          <NumberField source="rank" label="resources.genres.fields.rank" />
          <DateField source="createdAt" label="Created At" showTime />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default GenresList;
