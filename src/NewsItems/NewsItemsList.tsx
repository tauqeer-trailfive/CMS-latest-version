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
import NewsItemsListAside from "./NewsItemsListAside";
import NewsItemLinkField from "./NewsItemLinkField";
import EmptyListPage from "./EmptyListPage";

const userFilters = [<SearchInput source="name" alwaysOn />];

const NewsItemListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const NewsItemsList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <List
      filters={isSmall ? userFilters : undefined}
      sort={{ field: "createdAt", order: "DESC" }}
      perPage={10}
      aside={<NewsItemsListAside />}
      actions={<NewsItemListActions />}
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
          <NewsItemLinkField />
          <TextField source="title" label="resources.newsitems.fields.title" />

          <DateField
            source="publicationStart"
            label="Publication Start"
            showTime
          />
          <DateField source="publicationEnd" label="Publication End" showTime />
          <DateField source="createdAt" label="Created At" showTime />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default NewsItemsList;
