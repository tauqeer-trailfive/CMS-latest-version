import * as React from "react";
import { Admin, CustomRoutes, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";

import authProvider from "./Auth/Auth";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme, darkTheme } from "./layout/themes";

import visitors from "./visitors";
import orders from "./orders";
import products from "./products";
import invoices from "./invoices";
import categories from "./categories";
import reviews from "./reviews";
import users from "./Users";
import instruments from "./Instruments";
import genres from "./Genres";
import effects from "./Effects";
import dataProviderFactory from "./dataProvider";
import Segments from "./segments/Segments";
import presets from "./Presets";
import bpms from "./Bpms";
import projectCategories from "./ProjectCategories";

const i18nProvider = polyglotI18nProvider(
  (locale) => {
    if (locale === "nl") {
      return import("./i18n/nl").then((messages) => messages.default);
    }

    // Always fallback on english
    return englishMessages;
  },
  "en",
  [
    { locale: "en", name: "English" },
    // { locale: "nl", name: "Dutch" },
  ]
);

const App = () => (
  <Admin
    title=""
    dataProvider={dataProviderFactory(
      process.env.REACT_APP_DATA_PROVIDER || ""
    )}
    authProvider={authProvider}
    dashboard={Dashboard}
    loginPage={Login}
    layout={Layout}
    i18nProvider={i18nProvider}
    disableTelemetry
    theme={lightTheme}
    darkTheme={darkTheme}
    defaultTheme="dark"
  >
    {/* <CustomRoutes>
      <Route path="/segments" element={<Segments />} />
    </CustomRoutes> */}
    {/* <Resource name="customers" {...visitors} />
    <Resource name="commands" {...orders} options={{ label: "Orders" }} />
    <Resource name="invoices" {...invoices} />
    <Resource name="products" {...products} />
    <Resource name="categories" {...categories} />
    <Resource name="reviews" {...reviews} /> */}
    <Resource name="users" {...users} />
    <Resource name="musicalInstruments" {...instruments} />
    <Resource name="genres" {...genres} />
    <Resource name="effects" {...effects} />
    <Resource name="presets" {...presets} />
    <Resource name="presets" {...presets} />
    <Resource name="bpmTemp" {...bpms} />
    <Resource name="projectcategories" {...projectCategories} />
  </Admin>
);

export default App;
