import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  CircularProgress,
  Chip,
  Badge,
} from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { LinearProgress, useTranslate } from "react-admin";
import { TooltipProps } from "recharts";

import QueryStatsTwoToneIcon from "@mui/icons-material/QueryStatsTwoTone";

import { format, parseISO } from "date-fns";

import { Order } from "../types";
import { gql, useQuery } from "@apollo/client";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const UsersChart = (props: { orders?: Order[] }) => {
  const GET_USERS_GRAPH_DATA = gql`
    query GetUsersGraphData($initialDate: DateTime!) {
      getUsersGraphData(initialDate: $initialDate) {
        date
        count
      }
    }
  `;

  const initialDate = new Date(
    new Date().setDate(new Date().getDate() - 30)
  ).setHours(0, 0, 0, 0);
  const { data, error, loading } = useQuery(GET_USERS_GRAPH_DATA, {
    variables: {
      initialDate: new Date(initialDate),
    },
  });

  return (
    <Card elevation={5}>
      <CardHeader></CardHeader>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }} gap={1}>
        <Chip
          label="New Users Per day - (Past 30 days)."
          color="primary"
          variant="outlined"
          sx={{ ml: 5, fontSize: 18, fontWeight: "400" }}
          icon={
            <Badge color="warning">
              <QueryStatsTwoToneIcon color="primary" />
            </Badge>
          }
        />
      </Box>

      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <LinearProgress />
            </Box>
          ) : (
            <ResponsiveContainer>
              <AreaChart
                width={730}
                height={250}
                data={data?.getUsersGraphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb5eb5" stopOpacity={0.7} />
                    <stop offset="75%" stopColor="#fb5eb5" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid opacity={0.5} vertical={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#fb5eb5"
                  fill="url(#color)"
                  strokeOpacity={0.5}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <Box
        className="custom-tooltip"
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#fff"),
        }}
        style={{
          borderRadius: "0.55rem",
          background: "#fb5eb5",
          padding: "1rem",
          paddingTop: "0.01rem",
          paddingBottom: "0.01rem",
          boxShadow: "5px 5px 10px 5px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "auto",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.9,
        }}
      >
        <h1
          className="label"
          style={{
            fontSize: 15,
            background: "#fff",
            borderRadius: 10,
            paddingTop: 4,
            paddingBottom: 4,
            color: "#000",
          }}
        >
          Total Users
        </h1>
        <p className="label">{`${label} : ${payload?.[0].value} Users Created`}</p>
      </Box>
    );
  }

  return null;
};

export default UsersChart;
