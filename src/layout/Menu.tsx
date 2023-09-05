import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/SpaceDashboardRounded";
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";
import UsersList from "../Users";
import Instruments from "../Instruments";
import Genres from "../Genres";
import Effects from "../Effects";
import Presets from "../Presets";
import Bpms from "../Bpms";
import ProjectCategories from "../ProjectCategories";
import Contests from "../Contests";
import Codes from "../ReferralCodes";
import Samples from "../Samples";
import Tracks from "../Tracks";
import Projects from "../Projects";
import Comments from "../Comments";
import NewsItems from "../NewsItems";
import SampleSets from "../SampleSets";
import TimelineItems from "../TimelineItems";
import PushNotifications from "../PushNotification";
import Playlists from "../Playlists";
import Homesreens from "../Homesreens";

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
      <DashboardMenuItem leftIcon={<DashboardIcon />} />
      <MenuItemLink
        to="/notification/create"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.notification.name`, {
          smart_count: 2,
        })}
        leftIcon={<PushNotifications.icon />}
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
        to="/newsitems"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.newsitems.name`, {
          smart_count: 2,
        })}
        leftIcon={<NewsItems.icon />}
        dense={dense}
      />
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
        to="/referralcode"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.referralcode.name`, {
          smart_count: 2,
        })}
        leftIcon={<Codes.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/tracks"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.tracks.name`, {
          smart_count: 2,
        })}
        leftIcon={<Tracks.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/projects"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.projects.name`, {
          smart_count: 2,
        })}
        leftIcon={<Projects.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/homescreens"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.homescreens.name`, {
          smart_count: 2,
        })}
        leftIcon={<Homesreens.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/comments"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.comments.name`, {
          smart_count: 2,
        })}
        leftIcon={<Comments.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/timelineitems"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.timelineitems.name`, {
          smart_count: 2,
        })}
        leftIcon={<TimelineItems.icon />}
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
        to="/samples"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.samples.name`, {
          smart_count: 2,
        })}
        leftIcon={<Samples.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/samplesets"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.samplesets.name`, {
          smart_count: 2,
        })}
        leftIcon={<SampleSets.icon />}
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
        to="/playlists"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.playlists.name`, {
          smart_count: 2,
        })}
        leftIcon={<Playlists.icon />}
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
        to="/bpmTemp"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.bpms.name`, {
          smart_count: 2,
        })}
        leftIcon={<Bpms.icon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
