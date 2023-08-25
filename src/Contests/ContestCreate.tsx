import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  DateInput,
  BooleanInput,
} from "react-admin";
import { Box, Button, Grid, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

let config_data_contestMedia: any = {
  "x-goog-meta-test": "",
  key: "",
  "x-goog-algorithm": "",
  "x-goog-credential": "",
  "x-goog-date": "",
  "x-goog-signature": "",
  policy: "",
};

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.title) {
    errors.title = "ra.validation.required";
  }
  // if (!values.baseProject) {
  //   errors.baseProject = "ra.validation.required";
  // }
  return errors;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ContestCreate = () => {
  const translate = useTranslate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [contestMediaFiles1, setContestMediaFiles1] = React.useState<any>([
    {
      startDate: null,
      stage: "DURINGCONTEST",
      description: "",
      image: "",
      bannerImage: "",
      contestVideo: "",
      bannerVideo: "",
      carouselBanner1: "",
      carouselBanner2: "",
      carouselBanner3: "",
    },
    {
      stage: "PRECONTEST",
      description: "",
      image: "",
      bannerImage: "",
      contestVideo: "",
      bannerVideo: "",
      carouselBanner1: "",
      carouselBanner2: "",
      carouselBanner3: "",
    },
    {
      stage: "START",
      description: "",
      image: "",
      bannerImage: "",
      contestVideo: "",
      bannerVideo: "",
      carouselBanner1: "",
      carouselBanner2: "",
      carouselBanner3: "",
    },
    {
      startDate: null,
      stage: "VOTINGCOUNTDOWN",
      description: "",
      image: "",
      bannerImage: "",
      contestVideo: "",
      bannerVideo: "",
      carouselBanner1: "",
      carouselBanner2: "",
      carouselBanner3: "",
    },
    {
      startDate: null,
      stage: "VOTING",
      description: "",
      image: "",
      bannerImage: "",
      contestVideo: "",
      bannerVideo: "",
      carouselBanner1: "",
      carouselBanner2: "",
      carouselBanner3: "",
    },
    {
      stage: "FINISH",
      description: "",
      image: "",
      bannerImage: "",
      contestVideo: "",
      bannerVideo: "",
      carouselBanner1: "",
      carouselBanner2: "",
      carouselBanner3: "",
    },
  ]);

  const [uploadedContestImage, setContestImage] =
    React.useState<boolean>(false);
  const [uploadedBannerImage, setUploadedBannerImage] =
    React.useState<boolean>(false);
  const [uploadedContestVideo, setUploadedContestVideo] =
    React.useState<boolean>(false);
  const [uploadedBannerVideo, setUploadedBannerVideo] =
    React.useState<boolean>(false);
  const [uploadedcarouselBanner1, setUploadedcarouselBanner1] =
    React.useState<boolean>(false);
  const [uploadedcarouselBanner2, setUploadedcarouselBanner2] =
    React.useState<boolean>(false);
  const [uploadedcarouselBanner3, setUploadedcarouselBanner3] =
    React.useState<boolean>(false);

  const UPLOAD_POLICY = gql`
    mutation singleImageUpload($imageName: String!, $bType: String!) {
      singleImageUpload(imageName: $imageName, b_type: $bType) {
        url
        x_goog_meta_test
        key
        x_goog_date
        x_goog_credential
        x_goog_algorithm
        policy
        x_goog_signature
        download_url
        mp3download_url
      }
    }
  `;

  const [uploadSampleImage, { data, loading, error }] =
    useMutation(UPLOAD_POLICY);

  React.useEffect(() => {}, [contestMediaFiles1]);
  let stateData;

  const uploadFile = async (
    index: number,
    key: string,
    filename: string,
    form: any
  ) => {
    const finalFilename = new Date().getTime() + "-" + filename;
    const response = await uploadSampleImage({
      variables: {
        imageName: finalFilename,
        bType: "contest_image",
      },
    });

    form.submit();

    const url = response?.data?.singleImageUpload?.mp3download_url;
    stateData = JSON.parse(JSON.stringify(contestMediaFiles1));
    stateData[index][key] = url;
    //console.log(stateData);
    setContestMediaFiles1(stateData);
  };

  const setDateForStage = (date: any, key: string, index: number) => {
    stateData = JSON.parse(JSON.stringify(contestMediaFiles1));
    //console.log("date set", stateData[index][key]);
    stateData[index][key] = date;
    //console.log(stateData);
    setContestMediaFiles1(stateData);
  };

  const setDescriptionForStage = (
    description: string,
    key: string,
    index: number
  ) => {
    stateData = JSON.parse(JSON.stringify(contestMediaFiles1));
    stateData[index][key] = description;
    //console.log(stateData);
    setContestMediaFiles1(stateData);
  };

  React.useEffect(() => {
    localStorage.removeItem("CONTEST_MEDIA_DATA");
    localStorage.setItem(
      "CONTEST_MEDIA_DATA",
      JSON.stringify(contestMediaFiles1)
    );
  }, [contestMediaFiles1]);

  if (data !== null) {
    config_data_contestMedia = {
      "x-goog-meta-test": "data",
      key: data?.singleImageUpload.key,
      "x-goog-algorithm": data?.singleImageUpload.x_goog_algorithm,
      "x-goog-credential": data?.singleImageUpload.x_goog_credential,
      "x-goog-date": data?.singleImageUpload.x_goog_date,
      "x-goog-signature": data?.singleImageUpload.x_goog_signature,
      policy: data?.singleImageUpload.policy,
    };
  }
  //console.log("contestMediaFiles1", contestMediaFiles1);
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500 }}
        // Here for the GQL provider
        defaultValues={{
          title: "",
          description: "",
          prize: "",
        }}
        validate={validateForm}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"800"}
        >
          {translate("resources.contests.fieldGroups.CreateContest")}
        </Typography>
        <TextInput source="title" isRequired fullWidth />
        <TextInput source="termsAndConds" multiline isRequired fullWidth />
        <TextInput source="prize" multiline isRequired fullWidth />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <DateInput
              source="startDate"
              type="date"
              defaultValue={new Date()}
            />
          </Grid>
          <Grid item xs={6}>
            <DateInput source="endDate" type="date" defaultValue={new Date()} />
          </Grid>
        </Grid>
        <TextInput source="baseProject" fullWidth />
        <BooleanInput label="Allow Track Upload" source="allowTrackUpload" />
        <SectionTitle label="resources.contests.fields.contestMedia" />
        <Box sx={{ width: "auto" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {contestMediaFiles1.map((field: any, index: any) => {
                return <Tab label={field.stage} {...a11yProps(index)} />;
              })}
            </Tabs>
          </Box>
          {contestMediaFiles1.map((field: any, index: any) => {
            return (
              <TabPanel value={value} index={index}>
                {(field.stage === "DURINGCONTEST" ||
                  field.stage === "VOTINGCOUNTDOWN" ||
                  field.stage === "VOTING") && (
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <DateInput
                      key={`${field.stage}-${index}`}
                      source={`${field.stage}-Date`}
                      type="date"
                      // defaultValue={new Date().toISOString()}
                      value={field.startDate}
                      fullWidth
                      variant="outlined"
                      onChange={(e: any) => {
                        const dateValue = e.target.value;
                        let afterFormatting = new Date(dateValue).toISOString();
                        //console.log("afterFormatting", afterFormatting);
                        setDateForStage(afterFormatting, "startDate", index);
                      }}
                    />
                  </Box>
                )}
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput
                    source={`${field.stage}-description`}
                    multiline
                    isRequired
                    rows={5}
                    fullWidth
                    variant="outlined"
                    helperText={
                      field.stage === "DURINGCONTEST" ? (
                        <p style={{ color: "red" }}>
                          (Required field): This is Default Description for all
                          stages.
                        </p>
                      ) : (
                        ""
                      )
                    }
                    onChange={(e: any) => {
                      //console.log("value of sec", e.target.value);
                      let description = e.target.value;
                      setDescriptionForStage(description, "description", index);
                    }}
                  />
                </Box>
                <SectionTitle label="resources.contests.fields.image" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`ImageUrlField${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlcontestImagefileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedContestImage ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Contest Image
                      <input
                        type="file"
                        name="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#ImageUrlField${index}`
                            );
                            uploadFile(
                              index,
                              "image",
                              e.target.files[0]?.name,
                              form
                            );

                            // setTimeout(() => {
                            //   form.submit();
                            //   // setContestImage(true);
                            // }, 1000);
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.image && (
                    <>
                      <TextInput
                        // type="hidden"
                        source={`image`}
                        defaultValue={contestMediaFiles1[index]?.image}
                        fullWidth
                        hidden={true}
                        inputProps={{
                          value: contestMediaFiles1[index]?.image,
                        }}
                        value={contestMediaFiles1[index]?.image}
                        variant="outlined"
                      />

                      <p style={{ color: "green" }}>
                        {" "}
                        File Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
                <SectionTitle label="resources.contests.fields.bannerimmage" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`bannerImageUrlFeild${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlbannerImagefileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedBannerImage ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Banner Image
                      <input
                        type="file"
                        name="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //console.log("JUST RUN");
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#bannerImageUrlFeild${index}`
                            );
                            uploadFile(
                              index,
                              "bannerImage",
                              e.target.files[0]?.name,
                              form
                            );

                            // setTimeout(() => {
                            //   form.submit();
                            //   // setUploadedBannerImage(true);
                            // }, 1000);
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.bannerImage && (
                    <>
                      {" "}
                      <TextInput
                        // type="hidden"
                        source={`bannerImage`}
                        defaultValue={contestMediaFiles1[index]?.bannerImage}
                        fullWidth
                        inputProps={{
                          value: contestMediaFiles1[index]?.bannerImage,
                        }}
                        value={contestMediaFiles1[index]?.bannerImage}
                        variant="outlined"
                      />
                      <p style={{ color: "green" }}>
                        {" "}
                        File Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
                <SectionTitle label="resources.contests.fields.contestvideo" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`contestVideoUrlFeild${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlcontestVideofileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedContestVideo ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Contest Video
                      <input
                        type="file"
                        name="file"
                        accept="video/mp4, video/webm, video/ogg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //console.log("JUST RUN");
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#contestVideoUrlFeild${index}`
                            );
                            uploadFile(
                              index,
                              "contestVideo",
                              e.target.files[0]?.name,
                              form
                            );

                            // setTimeout(() => {
                            //   form.submit();
                            //   // setUploadedContestVideo(true);
                            // }, 1000);
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.contestVideo && (
                    <>
                      {" "}
                      <TextInput
                        // type="hidden"
                        source={`contestVideo`}
                        defaultValue={contestMediaFiles1[index]?.contestVideo}
                        fullWidth
                        inputProps={{
                          value: contestMediaFiles1[index]?.contestVideo,
                        }}
                        value={contestMediaFiles1[index]?.contestVideo}
                        variant="outlined"
                      />
                      <p style={{ color: "green" }}>
                        {" "}
                        File Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
                <SectionTitle label="resources.contests.fields.bannervideo" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`bannerVideoUrlFeild${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlbannerVideofileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedBannerVideo ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Banner Video
                      <input
                        type="file"
                        name="file"
                        accept="video/mp4, video/webm, video/ogg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //console.log("JUST RUN");
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#bannerVideoUrlFeild${index}`
                            );
                            uploadFile(
                              index,
                              "bannerVideo",
                              e.target.files[0]?.name,
                              form
                            );

                            // setTimeout(() => {
                            //   form.submit();
                            //   // setUploadedBannerVideo(true);
                            // }, 1000);
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.bannerVideo && (
                    <>
                      {" "}
                      <TextInput
                        // type="hidden"
                        source={`bannerVideo`}
                        defaultValue={contestMediaFiles1[index]?.bannerVideo}
                        fullWidth
                        inputProps={{
                          value: contestMediaFiles1[index]?.bannerVideo,
                        }}
                        value={contestMediaFiles1[index]?.bannerVideo}
                        variant="outlined"
                      />
                      <p style={{ color: "green" }}>
                        {" "}
                        File Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
                <SectionTitle label="resources.contests.fields.carouselBanner1" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`carouselBanner1UrlFeild${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlCarouselBanner1fileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedcarouselBanner1 ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Carousel Banner
                      <input
                        type="file"
                        name="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //console.log("JUST RUN");
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#carouselBanner1UrlFeild${index}`
                            );
                            uploadFile(
                              index,
                              "carouselBanner1",
                              e.target.files[0]?.name,
                              form
                            );
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.carouselBanner1 && (
                    <>
                      <TextInput
                        // type="hidden"
                        source={`carouselBanner1`}
                        defaultValue={
                          contestMediaFiles1[index]?.carouselBanner1
                        }
                        fullWidth
                        inputProps={{
                          value: contestMediaFiles1[index]?.carouselBanner1,
                        }}
                        value={contestMediaFiles1[index]?.carouselBanner1}
                        variant="outlined"
                      />
                      <p style={{ color: "green" }}>
                        {" "}
                        Carousel Banner Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
                <SectionTitle label="resources.contests.fields.carouselBanner2" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`carouselBanner2UrlFeild${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlCarouselBanner2fileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedcarouselBanner2 ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Carousel Banner
                      <input
                        type="file"
                        name="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //console.log("JUST RUN");
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#carouselBanner2UrlFeild${index}`
                            );
                            uploadFile(
                              index,
                              "carouselBanner2",
                              e.target.files[0]?.name,
                              form
                            );
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.carouselBanner2 && (
                    <>
                      <TextInput
                        // type="hidden"
                        source={`carouselBanner2`}
                        defaultValue={
                          contestMediaFiles1[index]?.carouselBanner2
                        }
                        fullWidth
                        inputProps={{
                          value: contestMediaFiles1[index]?.carouselBanner2,
                        }}
                        value={contestMediaFiles1[index]?.carouselBanner2}
                        variant="outlined"
                      />
                      <p style={{ color: "green" }}>
                        {" "}
                        Carousel Banner Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
                <SectionTitle label="resources.contests.fields.carouselBanner3" />
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                  <form
                    action="https://storage.googleapis.com/contest_image/"
                    method="POST"
                    encType="multipart/form-data"
                    id={`carouselBanner3UrlFeild${index}`}
                  >
                    {Object.keys(config_data_contestMedia).map((key) => (
                      <input
                        key={key}
                        name={key}
                        value={config_data_contestMedia[key]}
                        type="hidden"
                        id="urlCarouselBanner3fileid"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      color="primary"
                      sx={{ borderRadius: 0.8 }}
                      startIcon={
                        uploadedcarouselBanner3 ? (
                          <CloudDoneIcon color="success" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                    >
                      Upload Carousel Banner
                      <input
                        type="file"
                        name="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //console.log("JUST RUN");
                          if (e.target.files != null) {
                            const form: any = document.querySelector(
                              `#carouselBanner3UrlFeild${index}`
                            );
                            uploadFile(
                              index,
                              "carouselBanner3",
                              e.target.files[0]?.name,
                              form
                            );
                          }
                          1;
                        }}
                      />
                    </Button>
                  </form>
                  {contestMediaFiles1[index]?.carouselBanner3 && (
                    <>
                      <TextInput
                        // type="hidden"
                        source={`carouselBanner3`}
                        defaultValue={
                          contestMediaFiles1[index]?.carouselBanner3
                        }
                        fullWidth
                        inputProps={{
                          value: contestMediaFiles1[index]?.carouselBanner3,
                        }}
                        value={contestMediaFiles1[index]?.carouselBanner3}
                        variant="outlined"
                      />
                      <p style={{ color: "green" }}>
                        {" "}
                        Carousel Banner Uploaded Successfully!
                      </p>
                    </>
                  )}
                </Box>
              </TabPanel>
            );
          })}
        </Box>
      </SimpleForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="button" gutterBottom color={"lightpink"}>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => <Box pt="1em" />;

export default ContestCreate;
