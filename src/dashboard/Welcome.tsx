import * as React from "react";
import { Box, Card, CardActions, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import { useTranslate } from "react-admin";

import djaminnlogo from "../images/logo.png";

const Welcome = () => {
  const translate = useTranslate();

  return (
    <Card
      sx={{
        backgroundImage: `url("src/images/login_image.png")`,
        color: "#fff",
        padding: "50px",
        marginTop: 2,
        marginBottom: "1em",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex">
        <Box flex="1">
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontWeight={"800"}
          >
            {translate("pos.dashboard.welcome.title")}
          </Typography>
          <Box maxWidth="40em">
            <Typography variant="body1" component="p" gutterBottom>
              {translate("pos.dashboard.welcome.subtitle")}
            </Typography>
          </Box>
          <CardActions
            sx={{
              padding: { xs: 0, xl: null },
              flexWrap: { xs: "wrap", xl: null },
              "& a": {
                marginTop: { xs: "1em", xl: null },
                marginLeft: { xs: "0!important", xl: null },
                marginRight: { xs: "1em", xl: null },
              },
            }}
          >
            <Button
              variant="contained"
              href="https://marmelab.com/react-admin"
              startIcon={<HomeIcon />}
            >
              {translate("pos.dashboard.welcome.ra_button")}
            </Button>
            <Button
              variant="contained"
              href="https://github.com/marmelab/react-admin/tree/master/examples/demo"
              startIcon={<CodeIcon />}
            >
              {translate("pos.dashboard.welcome.demo_button")}
            </Button>
          </CardActions>
        </Box>
        <Box
          display={{ xs: "none", sm: "none", md: "block" }}
          sx={{
            background: `url(${djaminnlogo}) bottom right / contain`,
            marginLeft: "auto",
            backgroundRepeat: "no-repeat",
          }}
          width="16em"
          height="9em"
          overflow="hidden"
        />
      </Box>
    </Card>
  );
};

export default Welcome;
