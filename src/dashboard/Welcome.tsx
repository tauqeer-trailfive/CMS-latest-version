import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  Button,
  Typography,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import { useTranslate } from "react-admin";

import djaminnlogo from "../images/logo.png";
import cover from "../images/login_image.png";
import playstore from "../images/playstore.png";
import appstore from "../images/appstore.png";

const Welcome = () => {
  const translate = useTranslate();

  return (
    <Card
      sx={{
        backgroundImage: `url("${cover}")`,
        color: "#fff",
        padding: "50px",
        marginTop: 2,
        marginBottom: "1em",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 20,
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
            <Link
              href="https://play.google.com/store/apps/details?id=com.djamin"
              target="_blank"
            >
              <img src={playstore} width={"160px"} height={"53px"} />
            </Link>
            <Link
              href="https://apps.apple.com/tt/app/djaminn-create-songs-together/id1634589883"
              target="_blank"
            >
              <img src={appstore} width={"160px"} height={"53px"} />
            </Link>
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
