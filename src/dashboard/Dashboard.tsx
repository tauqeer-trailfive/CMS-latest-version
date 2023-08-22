import React, { useMemo, CSSProperties } from "react";
import { useGetList } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";
import { subDays, startOfDay } from "date-fns";

import Welcome from "./Welcome";

import { Order } from "../types";
import TotalProjects from "./TotalProjects";
import TotalTracks from "./TotalTracks";
import TotalUsers from "./TotalUsers";
import TotalGenres from "./TotalGenres";
import ProjectsChart from "./ProjectsChart";
import UsersChart from "./UsersChart";
import DailyActiveUsersChart from "./DailyActiveUsersChart";
import WeeklyActiveUsersChart from "./WeeklyActiveUsersChart";
import MonthlyActiveUsersChart from "./MonthlyActiveUsersChart";

interface OrderStats {
  revenue: number;
  nbNewOrders: number;
  pendingOrders: Order[];
}

interface State {
  nbNewOrders?: number;
  pendingOrders?: Order[];
  recentOrders?: Order[];
  revenue?: string;
}

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <Welcome />
        {/* <MonthlyRevenue value={revenue} /> */}
        <VerticalSpacer />
        {/* <NbNewOrders value={nbNewOrders} /> */}
        <VerticalSpacer />
        {/* <PendingOrders orders={pendingOrders} /> */}
      </div>
      <div style={styles.flexColumn as CSSProperties}>
        <Spacer />
        <TotalTracks />
        <VerticalSpacer />
      </div>
      <div style={styles.flexColumn as CSSProperties}>
        <Spacer />
        <TotalTracks />
        <VerticalSpacer />
      </div>
      <VerticalSpacer />
      <div style={styles.flexColumn as CSSProperties}>
        <Spacer />
        <TotalGenres />
        <VerticalSpacer />
      </div>
      <div style={styles.flexColumn as CSSProperties}>
        <TotalUsers />
        <Spacer />
      </div>
      <div style={styles.singleCol}>
        <UsersChart />
      </div>
      <div style={styles.singleCol}>
        <ProjectsChart />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}>
        <Welcome />
      </div>
      <div style={styles.flex}>
        <TotalProjects />
        <Spacer />
        <TotalTracks />
      </div>
      <div style={styles.singleCol} />
      <div style={styles.flex}>
        <TotalUsers />
        <Spacer />
        <TotalGenres />
      </div>
      <div style={styles.singleCol}>
        <UsersChart />
      </div>
      <div style={styles.singleCol}>
        <ProjectsChart />
      </div>
    </div>
  ) : (
    <>
      <Welcome />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <TotalProjects />
            <Spacer />
            <TotalTracks />
          </div>
          <div style={styles.singleCol}>
            <UsersChart />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <TotalUsers />
            <Spacer />
            <TotalGenres />
          </div>
          <div style={styles.singleCol}>
            <ProjectsChart />
          </div>
        </div>
      </div>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <DailyActiveUsersChart />
        </div>
        <div style={styles.rightCol}>
          <WeeklyActiveUsersChart />
        </div>
      </div>
      <div style={styles.singleCol}>
        <MonthlyActiveUsersChart />
      </div>
    </>
  );
};

export default Dashboard;
