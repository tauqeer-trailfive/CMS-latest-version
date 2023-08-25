import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import LabelIcon from "@mui/icons-material/Label";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import visitors from "../visitors";
import orders from "../orders";
import invoices from "../invoices";
import products from "../products";
import categories from "../categories";
import reviews from "../reviews";
import SubMenu from "./SubMenu";
import UsersList from "../Users";
import Instruments from "../Instruments";
import Genres from "../Genres";
import Effects from "../Effects";
import Presets from "../Presets";
import Bpms from "../Bpms";
import ProjectCategories from "../ProjectCategories";
import Contests from "../Contests";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      {/* <SubMenu
                handleToggle={() => handleToggle('menuSales')}
                isOpen={state.menuSales}
                name="pos.menu.sales"
                icon={<orders.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/commands"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.commands.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<orders.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/invoices"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.invoices.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<invoices.icon />}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                name="pos.menu.catalog"
                icon={<products.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/products"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.products.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<products.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/categories"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<categories.icon />}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCustomers')}
                isOpen={state.menuCustomers}
                name="pos.menu.customers"
                icon={<visitors.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/customers"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.customers.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<visitors.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/segments"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.segments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LabelIcon />}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to="/reviews"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<reviews.icon />}
                dense={dense}
            /> */}
      <MenuItemLink
        to="/users"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.users.name`, {
          smart_count: 2,
        })}
        leftIcon={<UsersList.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/contests"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.contests.name`, {
          smart_count: 2,
        })}
        leftIcon={<Contests.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/musicalInstruments"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.musicalInstruments.name`, {
          smart_count: 2,
        })}
        leftIcon={<Instruments.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/genres"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.genres.name`, {
          smart_count: 2,
        })}
        leftIcon={<Genres.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/effects"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.effects.name`, {
          smart_count: 2,
        })}
        leftIcon={<Effects.icon />}
        dense={dense}
      />

      <MenuItemLink
        to="/presets"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.presets.name`, {
          smart_count: 2,
        })}
        leftIcon={<Presets.icon />}
        dense={dense}
      />

      <MenuItemLink
        to="/bpmTemp"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.bpms.name`, {
          smart_count: 2,
        })}
        leftIcon={<Bpms.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/projectcategories"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.projectcategories.name`, {
          smart_count: 2,
        })}
        leftIcon={<ProjectCategories.icon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
