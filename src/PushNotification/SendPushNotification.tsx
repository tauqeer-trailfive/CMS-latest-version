import * as React from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  useNotify,
} from "react-admin";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import useNotificationHook from "./useNotificationHook";
import SendPushNotificationToUser from "./SendPushNotificationToUser";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.text) {
    errors.text = "ra.validation.required";
  }
  return errors;
};

const SendPushNotification = () => {
  const translate = useTranslate();

  const notify = useNotify();

  const { data, error, fetchData, loading } = useNotificationHook();

  const [topic, setTopic] = React.useState("");
  const [openon, setOpenon] = React.useState("");

  const [pnTitle, setPnTitle] = React.useState("");
  const [pnDescription, setpnDescription] = React.useState("");
  const [UserId, setUserId] = React.useState("");
  const [ProjectId, setProjectId] = React.useState("");
  const [ContestId, setContestId] = React.useState("");

  const handleTopic = (event: any) => {
    setTopic(event.target.value);
  };
  const handleOpenOn = (event: any) => {
    setOpenon(event.target.value);
  };

  const PostEditToolbar = () => (
    <Toolbar
      sx={{
        justifyContent: "space-between",
      }}
    >
      <></>
    </Toolbar>
  );
  return (
    <Create hasEdit={false} hasShow={false}>
      <SimpleForm
        toolbar={<PostEditToolbar />}
        sx={{ maxWidth: 500 }}
        // Here for the GQL provider
        // defaultValues={{
        //   text: "",
        // }}
        // validate={validateForm}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"900"}
        >
          {translate("resources.notification.fieldGroups.sendNotification")}
        </Typography>

        {/* <p>Send Notifications to All Users</p>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <InputLabel id="demo-simple-select-label">Topic:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={topic}
              label="Topic:"
              onChange={handleTopic}
              fullWidth
            >
              <MenuItem value={"DEV"}>DEV</MenuItem>
              <MenuItem value={"PROD"}>PROD</MenuItem>
              <MenuItem value={"DEFAULT"}>DEFAULT</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <InputLabel id="open">Open app on:</InputLabel>
            <Select
              labelId="open"
              id="open"
              value={openon}
              label="Open app on:"
              onChange={handleOpenOn}
              placeholder="Open app on:"
              fullWidth
            >
              <MenuItem
                value={" "}
                onClick={() => {
                  setUserId("");
                  setProjectId("");
                  setContestId("");
                }}
              >
                Home Screen
              </MenuItem>
              <MenuItem
                value={"ProfileScreen"}
                onClick={() => {
                  // setOpenon("User Screen");
                  setProjectId("");
                  setContestId("");
                }}
              >
                User Screen
              </MenuItem>
              <MenuItem
                value={"PlayJustOneProject"}
                onClick={() => {
                  // setOpenon("Song Screen");
                  setUserId("");
                  setContestId("");
                }}
              >
                Song Screen
              </MenuItem>
              <MenuItem
                value={"ContestInfo"}
                onClick={() => {
                  // setOpenon("Contest Screen");
                  setProjectId("");
                  setUserId("");
                }}
              >
                Contest Screen
              </MenuItem>
            </Select>
          </Box>
        </Box> */}

        {/* <Box display={{ width: "100%" }}>
          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
                defaultValue={pnTitle}
                onChange={(e: any) => {
                  setPnTitle(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Separator />

          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextField
                label="message"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                defaultValue={pnDescription}
                onChange={(e: any) => {
                  setpnDescription(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Separator />
          {openon === "ProfileScreen" && (
            <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <ReferenceInput
                  label="User"
                  source="name"
                  reference="users"
                  filter={{ role: ["SUPERADMIN", "ADMIN", "USER", "ANON"] }}
                >
                  <AutocompleteInput
                    optionText="name"
                    optionValue="id"
                    variant="outlined"
                    onChange={(newValue) => {
                      //console.log(newValue);
                      setUserId(newValue);
                    }}
                  />
                </ReferenceInput>
              </Box>
            </Box>
          )}
          {openon === "PlayJustOneProject" && (
            <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <ReferenceInput
                  label="Project"
                  source="project.id"
                  reference="projects"
                  filter={{ role: ["SUPERADMIN", "ADMIN", "USER", "ANON"] }}
                >
                  <AutocompleteInput
                    key="project"
                    optionText="name"
                    optionValue="id"
                    variant="outlined"
                    onChange={(newValue) => {
                      //console.log(newValue);
                      setProjectId(newValue);
                    }}
                  />
                </ReferenceInput>
              </Box>
            </Box>
          )}
          {openon === "ContestInfo" && (
            <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <ReferenceInput
                  label="Contest"
                  source="title"
                  reference="contests"
                  filter={{ role: ["SUPERADMIN", "ADMIN", "USER", "ANON"] }}
                >
                  <AutocompleteInput
                    optionText="title"
                    optionValue="id"
                    variant="outlined"
                    onChange={(newValue) => {
                      //console.log(newValue);
                      setContestId(newValue);
                    }}
                  />
                </ReferenceInput>
              </Box>
            </Box>
          )}
        </Box> */}

        {/* <Box my={2}>
          <Button
            size="large"
            variant="outlined"
            onClick={() => {
              const dataForNOti = {
                to: "/topics/" + topic,
                content_available: true,
                ["apns-priority"]: 5,
                priority: "high",
                data: {
                  body: pnDescription,
                  title: pnTitle,
                  goto: openon,
                  userId: UserId,
                  remixId: ProjectId,
                  contestId: ContestId,
                  sendedToTopic: topic,
                },
              };

              fetchData(dataForNOti);
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={15} sx={{ mx: 1 }} />
                <span>Sending</span>
              </Box>
            ) : (
              "Send Notification"
            )}
          </Button>
        </Box> */}

        <SendPushNotificationToUser />
      </SimpleForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="button" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => <Box pt="1em" />;

export default SendPushNotification;
