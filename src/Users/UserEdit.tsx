import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  SelectInput,
  useEditContext,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Modal, Button } from "@mui/material";

import Aside from "./Aside";
import FullNameField from "./NameField";
import { validateForm } from "./UserCreate";
import AvatarUrlField from "./AvatarUrlField";
import HeaderImageField from "./HeaderImageField";

const VisitorEdit = () => {
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [openheader, setOpenHeader] = React.useState(false);
  const handleOpenAvatar = () => setOpenAvatar(true);
  const handleOpenHeader = () => setOpenHeader(true);
  const handleCloseAvatarModal = () => setOpenAvatar(false);
  const handleCloseHeaderModal = () => setOpenHeader(false);
  const translate = useTranslate();
  const { id } = useParams();
  const { data } = useGetOne("users", { id });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  function AvatarModal(props: any) {
    return (
      <Modal
        open={openAvatar}
        onClose={handleCloseAvatarModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={props.url}
            width="220"
            height="140"
            style={{
              maxWidth: "100%",
              height: "auto",
              padding: 0,
              margin: 0,
              borderRadius: 10,
              marginBottom: 5,
            }}
          />
        </Box>
      </Modal>
    );
  }

  function HeaderModal(props: any) {
    return (
      <Modal
        open={openheader}
        onClose={handleCloseHeaderModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={props.url}
            width="220"
            height="140"
            style={{
              maxWidth: "100%",
              height: "auto",
              padding: 0,
              margin: 0,
              borderRadius: 10,
              marginBottom: 5,
            }}
          />
        </Box>
      </Modal>
    );
  }

  return (
    <Edit title={<VisitorTitle />} aside={<Aside />}>
      <SimpleForm validate={validateForm}>
        <div>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                gutterBottom
                color={"primary"}
                align="left"
                fontWeight={"800"}
              >
                {translate("resources.users.fieldGroups.editUser")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" label="Name" isRequired fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                  <TextInput
                    source="artistName"
                    label="Artist Name"
                    isRequired
                    fullWidth
                  />
                </Box>
              </Box>
              <TextInput type="email" source="email" isRequired fullWidth />

              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1}>
                  <SelectInput
                    source="role"
                    isRequired
                    fullWidth
                    choices={[
                      { id: "QA", name: "QA" },
                      { id: "SUPERADMIN", name: "SUPERADMIN" },
                      { id: "CONTENTCREATOR", name: "CONTENTCREATOR" },
                      { id: "SERVICE", name: "SERVICE" },
                      { id: "ADMIN", name: "ADMIN" },
                      { id: "USER", name: "USER" },
                      { id: "ANON", name: "ANON" },
                    ]}
                  />
                </Box>
              </Box>
              <Box mt="1em" />
              <Button onClick={handleOpenAvatar}>Show Avatar Image</Button>
              <AvatarModal url={data?.avatarUrl} />
              <AvatarUrlField />
              <Button onClick={handleOpenHeader}>Show Avatar Image</Button>
              <HeaderModal url={data?.headerImage} />
              <HeaderImageField />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const VisitorTitle = () => <FullNameField size="32" sx={{ margin: "5px 0" }} />;

export default VisitorEdit;
