import * as React from 'react';
import {
   Card,
   CardHeader,
   CardContent,
   Box,
   Chip,
   Badge,
   FormControl,
   Select,
   MenuItem,
   SelectChangeEvent,
} from '@mui/material';
import {
   ResponsiveContainer,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Bar,
   BarChart,
} from 'recharts';
import { LinearProgress } from 'react-admin';
import { TooltipProps } from 'recharts';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import { gql, useQuery } from '@apollo/client';
import {
   NameType,
   ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const GET_ACTIVE_USER = gql`
   query GetActiveUsersGraphData(
      $type: ACTIVEUSERTYPE!
      $initialDate: DateTime!
   ) {
      getActiveUsersGraphData(type: $type, initialDate: $initialDate) {
         date
         count
      }
   }
`;

const WeeklyActiveUsersChart = () => {
   const [option, setOption] = React.useState<any>(28);

   const initialDate = new Date(
      new Date().setDate(new Date().getDate() - option)
   ).setHours(0, 0, 0, 0);

   const { data, error, loading } = useQuery(GET_ACTIVE_USER, {
      variables: {
         type: 'WAU',
         initialDate: new Date(initialDate),
      },
   });

   const handleChange = (event: SelectChangeEvent) => {
      setOption(event.target.value as any);
   };

   return (
      <Card elevation={5}>
         <CardHeader></CardHeader>
         <Box
            alignSelf={'center'}
            display={{ xs: 'block', sm: 'flex', width: '100%' }}
            sx={{
               justifyContent: 'center',
               alignItems: 'center',
            }}
            gap={1}
         >
            <Chip
               label="Weekly active users"
               variant="outlined"
               color="success"
               sx={{ ml: 5, fontSize: 18, fontWeight: '400' }}
               icon={
                  <Badge color="warning">
                     <SupervisedUserCircleTwoToneIcon color="success" />
                  </Badge>
               }
            />
            <FormControl>
               <Select
                  id="demo-simple-select"
                  value={option}
                  onChange={handleChange}
                  autoWidth
                  defaultValue={option}
               >
                  <MenuItem value={21}>Past 3 weeks</MenuItem>
                  <MenuItem value={28}>Past 5 weeks</MenuItem>
                  <MenuItem value={49}>Past 7 weeks</MenuItem>
               </Select>
            </FormControl>
         </Box>
         <CardContent>
            <div style={{ width: '100%', height: 300 }}>
               {loading ? (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                     }}
                  >
                     <LinearProgress />
                  </Box>
               ) : (
                  <ResponsiveContainer>
                     <BarChart
                        width={730}
                        height={250}
                        data={data?.getActiveUsersGraphData}
                        margin={{
                           top: 10,
                           right: 30,
                           left: 0,
                           bottom: 0,
                        }}
                     >
                        <defs>
                           <linearGradient
                              id="color"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                           >
                              <stop
                                 offset="0%"
                                 stopColor="#fb5eb5"
                                 stopOpacity={0.7}
                              />
                              <stop
                                 offset="75%"
                                 stopColor="#fb5eb5"
                                 stopOpacity={0.1}
                              />
                           </linearGradient>
                        </defs>
                        <XAxis
                           dataKey="date"
                           axisLine={false}
                           tickLine={false}
                        />
                        <YAxis axisLine={false} tickLine={false} />
                        <CartesianGrid opacity={0.5} vertical={false} />
                        <Tooltip
                           cursor={{ fill: '#fb5eb507' }}
                           content={<CustomTooltip />}
                        />
                        <Bar
                           type="monotone"
                           dataKey="count"
                           stroke="#fb5eb5"
                           fill="url(#color)"
                           strokeOpacity={0}
                        />
                     </BarChart>
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
      //console.log(payload);
      return (
         <Box
            className="custom-tooltip"
            sx={{
               color: (theme) =>
                  theme.palette.mode === 'dark' ? '#fff' : '#fff',
            }}
            style={{
               borderRadius: '0.55rem',
               background: '#fb5eb5',
               padding: '1rem',
               paddingTop: '0.01rem',
               paddingBottom: '0.01rem',
               boxShadow: '5px 5px 10px 5px rgba(0,0,0,0.2)',
               textAlign: 'center',
               width: 'auto',
               alignItems: 'center',
               justifyContent: 'center',
               opacity: 0.9,
            }}
         >
            <h1
               className="label"
               style={{
                  fontSize: 15,
                  background: '#fff',
                  borderRadius: 10,
                  paddingTop: 4,
                  paddingBottom: 4,
                  color: '#000',
               }}
            >
               Total Users
            </h1>
            <p className="label">{`${label} : ${payload?.[0].value} Active Users`}</p>
         </Box>
      );
   }

   return null;
};

export default WeeklyActiveUsersChart;
