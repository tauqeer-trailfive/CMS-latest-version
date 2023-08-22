import React, { CSSProperties, useEffect } from "react";
import { useMediaQuery, Theme, Box, CircularProgress } from "@mui/material";

import Welcome from "./Welcome";

import TotalProjects from "./TotalProjects";
import TotalTracks from "./TotalTracks";
import TotalUsers from "./TotalUsers";
import TotalGenres from "./TotalGenres";
import ProjectsChart from "./ProjectsChart";
import UsersChart from "./UsersChart";
import DailyActiveUsersChart from "./DailyActiveUsersChart";
import WeeklyActiveUsersChart from "./WeeklyActiveUsersChart";
import MonthlyActiveUsersChart from "./MonthlyActiveUsersChart";
import UserEngagementCard from "./UserEngagmentCard";
import { gql, useLazyQuery } from "@apollo/client";
import DayIcon from "@mui/icons-material/InsertInvitation";
import WeekIcon from "@mui/icons-material/DateRange";
import MonthIcon from "@mui/icons-material/CalendarMonth";

const GET_ACTIVE_USER = gql`
  query Query($where: ActiveUserWhereInput) {
    getActiveUsersCount(where: $where)
  }
`;

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
  const [
    getDailyActiveUsers,
    { data: dataDaily, loading: loadingDaily, error: errorDaily },
  ] = useLazyQuery(GET_ACTIVE_USER);

  const [
    getWeeklyActiveUsers,
    { data: dataWeekly, loading: loadingWeekly, error: errorWeekly },
  ] = useLazyQuery(GET_ACTIVE_USER);

  const [
    getMonthlyActiveUsers,
    { data: dataMonthly, loading: loadingMonthly, error: errorMonthly },
  ] = useLazyQuery(GET_ACTIVE_USER);

  const caluculateData = (days: 1 | 7 | 30) => {
    let today = new Date();

    if (days === 1) {
      let past1day = new Date(
        today.getTime() - 1 * 24 * 60 * 60 * 1000
      ).toISOString();
      if (past1day) {
        getDailyActiveUsers({
          variables: {
            where: {
              lastActive_gte: past1day,
            },
          },
        });
      }
    }
    if (days === 7) {
      let past7days = new Date(
        today.getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();
      if (past7days) {
        getWeeklyActiveUsers({
          variables: {
            where: {
              lastActive_gte: past7days,
            },
          },
        });
      }
    }
    if (days === 30) {
      let past30days = new Date(
        today.getTime() - 30 * 24 * 60 * 60 * 1000
      ).toISOString();

      if (past30days) {
        getMonthlyActiveUsers({
          variables: {
            where: {
              lastActive_gte: past30days,
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    caluculateData(1);
    caluculateData(7);
    caluculateData(30);
    return () => {};
  }, []);

  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const loader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={20} />
      </Box>
    );
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserEngagementCard
          title="Daily Active Users"
          icon={dataDaily ? DayIcon : loader}
          subtitle={dataDaily && dataDaily?.getActiveUsersCount}
        />
        <Spacer />
        <UserEngagementCard
          title="Weekly Active Users"
          icon={dataWeekly ? WeekIcon : loader}
          subtitle={dataWeekly && dataWeekly?.getActiveUsersCount}
        />
        <Spacer />
        <UserEngagementCard
          title="Monthly Active Users"
          icon={dataMonthly ? MonthIcon : loader}
          subtitle={dataMonthly && dataMonthly?.getActiveUsersCount}
        />
      </div>
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
