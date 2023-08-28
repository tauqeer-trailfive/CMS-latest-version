import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  NumberInput,
} from "react-admin";
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UploadIcon from "@mui/icons-material/Upload";

const CREATE_REFCODES = gql`
  mutation createReferralCode($data: ReferralCodeCreateInput!) {
    createReferralCode(data: $data) {
      id
      createdAt
      code
      ttl
      status
    }
  }
`;

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color="primary"
        variant="determinate"
        {...props}
        // size={10}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.code) {
    errors.code = "ra.validation.required";
  }
  if (!values.email) {
    errors.email = "ra.validation.required";
  }
  return errors;
};

const ReferralCodeCreate = () => {
  const translate = useTranslate();
  const [file, setfile] = React.useState<any>("");
  const [spinnerLoading, setspinnerLoading] = React.useState(0);
  const [showLoader, setShowLoad] = React.useState(false);
  const navigate = useNavigate();
  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_REFCODES);

  function generateString(length) {
    const characters = "0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  // useEffect(() => {
  //   // file && CreateFromFile();
  //   file;
  // }, [file]) ;

  // useEffect(() => {
  //   const timer = setInterval(() => {
  // setspinnerLoading((prev) => (prev >= 100 ? 0 : prev + 10));
  //   }, 900);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [LoadStart]);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowLoad(true);
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const refcode = generateString(4);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const csvContent = (fileReader.result as string).split("\n");
      for (let i = 1; i < csvContent.length; i++) {
        const line = csvContent[i];
        const email = line.split(",");
        const refcode = generateString(4);
        setspinnerLoading((prev) => (prev >= 100 ? 0 : prev + 10));

        mutateFunction({
          variables: {
            data: {
              code: refcode,
              email: email[0],
            },
          },
        });
      }
    };

    fileReader.readAsText(file);

    setTimeout(() => {
      navigate("/referralcode");
    }, 5000);
  };
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500 }}
        defaultValues={{
          code: "",
          email: "",
        }}
        validate={validateForm}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"900"}
        >
          {translate("resources.referralcode.fieldGroups.createReferralcode")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="code" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput type="email" source="email" isRequired fullWidth />
          </Box>
        </Box>
        <Separator />
        <Typography fontSize={15} variant="inherit" gutterBottom>
          Create Many Referral Codes Via Import CSV file
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }} gap={1}>
          <Chip
            label="Make Sure First Column is Email"
            variant="outlined"
            icon={
              <Badge color="info">
                <InfoIcon color="primary" />
              </Badge>
            }
          />
        </Box>
        <Separator />
        <Box sx={{ p: 2, borderWidth: 0.4, borderColor: "grey" }}>
          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              {/* <SectionTitle label="resources.referralcode.fields.upload" /> */}
              <Typography fontSize={13} variant="inherit" gutterBottom>
                {translate("resources.referralcode.fields.upload")}
              </Typography>

              <div>
                {/* <input
                  src="url"
                  type={"file"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files != null) {
                      //console.log("Select DONE");
                      setfile(e.target.files[0]); //error
                    }
                  }}
                /> */}

                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  color="primary"
                  sx={{ borderRadius: 0.8 }}
                  startIcon={<UploadIcon />}
                >
                  Upload
                  <input
                    hidden
                    accept=".csv"
                    multiple
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files != null) {
                        setfile(e.target.files[0]); //error
                      }
                    }}
                  />
                </Button>
              </div>
            </Box>
          </Box>
          <Separator />
          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              {/* <SectionTitle label="resources.referralcode.fields.button" /> */}
              <Typography fontSize={13} variant="inherit" gutterBottom>
                {translate("resources.referralcode.fields.button")}
              </Typography>
              <div>
                {/* <button onClick={buttonHandler}>Create Referral Codes</button> */}
                <Box
                  display={{ xs: "block", sm: "flex", width: "100%" }}
                  gap={3}
                >
                  <Box
                    display={{ xs: "block", sm: "flex", width: "100%" }}
                    gap={1}
                  >
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={<AddBoxIcon />}
                      onClick={buttonHandler}
                    >
                      Create
                    </Button>
                  </Box>
                  {showLoader ? (
                    <CircularProgressWithLabel value={spinnerLoading} />
                  ) : null}
                </Box>
              </div>
              <div></div>
            </Box>
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => <Box pt="1em" />;

export default ReferralCodeCreate;
