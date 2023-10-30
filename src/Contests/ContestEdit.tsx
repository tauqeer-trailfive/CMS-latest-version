import * as React from "react";
import {
  DateInput,
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  useRecordContext,
  useRefresh,
  useNotify,
  Toolbar,
  SaveButton,
  DeleteButton,
  BooleanInput,
  LinearProgress,
} from "react-admin";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography, Button } from "@mui/material";

import IdField from "./IdField";
import { validateForm } from "./ContestCreate";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, gql } from "@apollo/client";
import { useEffect } from "react";
import { useQuery } from "@apollo/client/react/hooks";

let config_data_contestMedia = {
  "x-goog-meta-test": "",
  key: "",
  "x-goog-algorithm": "",
  "x-goog-credential": "",
  "x-goog-date": "",
  "x-goog-signature": "",
  policy: "",
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

const GET_CONTEST_MEDIA = gql`
  query Contest($where: ContestWhereUniqueInput!) {
    contest(where: $where) {
      contestMedia {
        id
        image
        bannerImage
        bannerVideo
        contestVideo
        stage
        description
        carouselBanner1
        carouselBanner2
        carouselBanner3
        startDate
      }
      id
    }
  }
`;

const ContestEdit = () => {
  const translate = useTranslate();
  const { id } = useParams();
  const refresh = useRefresh();
  const notify = useNotify();

  const { data: getContestData, loading: singleContestLoading } = useQuery(
    GET_CONTEST_MEDIA,
    {
      variables: {
        where: {
          id: id,
        },
      },
      fetchPolicy: "network-only",
    }
  );

  // const {
  //   data: getContestData,
  //   isLoading,
  //   isSuccess,
  // } = useGetOne("contests", { id });

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [currentFile, setCurrentFile] = React.useState<any>();
  const [currentUrl, setCurrentUrl] = React.useState<any>();

  const [contestDataUpdated, setcontestDataUpdated] =
    React.useState<boolean>(false);
  const [contestMediaFiles1, setContestMediaFiles1] = React.useState<any>([]);

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

  useEffect(() => {
    if (!currentFile?.file) {
      setCurrentUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(currentFile?.file);
    setCurrentUrl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [currentFile]);

  const [uploadSampleImage, { data, loading, error }] =
    useMutation(UPLOAD_POLICY);

  useEffect(() => {}, [contestMediaFiles1]);
  let stateData;

  const uploadFile = async (
    index: number,
    key: string,
    filename: string,
    form: any,
    currentInputFile?: any
  ) => {
    setCurrentFile({
      index,
      key,
      file: currentInputFile,
    });
    const finalFilename = new Date().getTime() + "-" + filename;
    const response = await uploadSampleImage({
      variables: {
        imageName: finalFilename,
        bType: "contest_image",
      },
    });

    form.submit();

    const url = response?.data?.singleImageUpload?.mp3download_url;
    const prevData = JSON.parse(JSON.stringify(contestMediaFiles1));
    prevData[index]["data"][key] = url;
    //console.log(prevData);
    setContestMediaFiles1(prevData);
  };

  const setDateForStage = (date: any, key: string, index: number) => {
    const prevData = JSON.parse(JSON.stringify(contestMediaFiles1));
    prevData[index]["data"][key] = date;
    //console.log(prevData);
    setContestMediaFiles1(prevData);
  };

  const setDescriptionForStage = (
    description: string,
    key: string,
    index: number
  ) => {
    const prevData = JSON.parse(JSON.stringify(contestMediaFiles1));
    prevData[index]["data"][key] = description;
    //console.log(prevData);
    setContestMediaFiles1(prevData);
  };

  useEffect(() => {
    localStorage.removeItem("CONTEST_MEDIA_EDIT_DATA");
    localStorage.setItem(
      "CONTEST_MEDIA_EDIT_DATA",
      JSON.stringify(contestMediaFiles1)
    );
  }, [contestMediaFiles1]);

  useEffect(() => {
    if (!singleContestLoading) {
      if (!!!contestDataUpdated && getContestData) {
        localStorage.removeItem("CONTEST_MEDIA_EDIT_DATA");
        const formatedContestMedia = getContestData?.contest?.contestMedia?.map(
          (media) => {
            const {
              id,
              stage,
              image,
              bannerImage,
              contestVideo,
              bannerVideo,
              startDate,
              description,
              carouselBanner1,
              carouselBanner2,
              carouselBanner3,
            } = media;
            return {
              where: { id },
              data: {
                startDate,
                description,
                stage,
                image,
                bannerImage,
                contestVideo,
                bannerVideo,
                carouselBanner1,
                carouselBanner2,
                carouselBanner3,
              },
            };
          }
        );
        //console.log("formatedContestMedia", formatedContestMedia);
        setContestMediaFiles1(formatedContestMedia);
        setcontestDataUpdated(true);
      }
    }
  }, [getContestData]);

  useEffect(() => {
    return () => {
      setContestMediaFiles1([]);
      setcontestDataUpdated(false);
    };
  }, []);

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

  const ContestVideo = (props) => {
    const record = useRecordContext(props);
    return (
      <video src={`${record.contestVideo}`} controls width="220" height="140" />
    );
  };

  const BannerVideo = (props) => {
    const record = useRecordContext(props);
    return (
      <video src={`${record.bannerVideo}`} controls width="220" height="140" />
    );
  };

  const ImageMedia = ({ source }) => {
    return (
      <img
        src={source}
        width="220"
        height="140"
        style={{
          maxWidth: "100%",
          height: "auto",
          padding: 0,
          margin: 0,
          borderRadius: 10,
        }}
      />
    );
  };

  const VideoMedia = ({ source }) => {
    return (
      <video
        src={source}
        controls
        width="220"
        height="140"
        style={{
          maxWidth: "100%",
          height: "auto",
          padding: 0,
          margin: 0,
          borderRadius: 10,
        }}
      />
    );
  };

  return (
    <Edit
      title={<VisitorTitle />}
      redirect="/contests"
      mutationMode="pessimistic"
    >
      <SimpleForm
        maxWidth={500}
        sx={{ mx: 2, my: 2 }}
        validate={validateForm}
        toolbar={
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <SaveButton alwaysEnable />
            <DeleteButton />
          </Toolbar>
        }
      >
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"900"}
        >
          {translate("resources.contests.fieldGroups.EditContest")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="title" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="termsAndConds" multiline isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="prize" multiline isRequired fullWidth />
          </Box>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box
            mr={{ xs: 0, sm: "0.5em" }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DateInput
              source="startDate"
              type="date"
              defaultValue={new Date()}
            />
            <DateInput source="endDate" type="date" defaultValue={new Date()} />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "70%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <BooleanInput
              label="Allow Track Upload"
              source="allowTrackUpload"
            />
          </Box>
        </Box>
        <Box pt="3em" />
        <SectionTitle label="resources.contests.fields.contestMedia" />

        {singleContestLoading ? (
          <LinearProgress sx={{ width: "100%" }} />
        ) : (
          <Box sx={{ width: "auto" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {contestMediaFiles1?.map((field, index) => {
                  return <Tab label={field.data.stage} {...a11yProps(index)} />;
                })}
              </Tabs>
            </Box>
            {contestMediaFiles1?.map((field, index) => {
              return (
                <TabPanel value={value} index={index}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color={"primary"}
                    align="left"
                    fontWeight={"900"}
                  >
                    {field?.data?.stage}
                  </Typography>
                  {(field?.data?.stage === "DURINGCONTEST" ||
                    field?.data?.stage === "VOTINGCOUNTDOWN" ||
                    field?.data?.stage === "VOTING") && (
                    <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                      <DateInput
                        key={`${field.data.stage}-${index}`}
                        source={`${field.data.stage}-Date`}
                        type="date"
                        defaultValue={field?.data?.startDate}
                        value={field?.data?.startDate}
                        fullWidth
                        onChange={(e: any) => {
                          const dateValue = e.target.value;
                          let afterFormatting = new Date(
                            dateValue
                          ).toISOString();
                          setTimeout(() => {
                            setDateForStage(
                              afterFormatting,
                              "startDate",
                              index
                            );
                          }, 3000);
                        }}
                      />
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <TextInput
                      source={`${field.data.stage}-description`}
                      multiline
                      isRequired
                      rows={5}
                      fullWidth
                      defaultValue={field?.data?.description}
                      helperText={
                        field?.data?.stage === "DURINGCONTEST" ? (
                          <p style={{ color: "red" }}>
                            (Required field): This is Default Description for
                            all stages.
                          </p>
                        ) : (
                          ""
                        )
                      }
                      onChange={(e: any) => {
                        let description = e.target.value;
                        setTimeout(() => {
                          setDescriptionForStage(
                            description,
                            "description",
                            index
                          );
                        }, 3000);
                      }}
                    />
                  </Box>
                  <SectionTitle label="resources.contests.fields.image" />
                  {field?.data?.image && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <ImageMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "image"
                              ? currentUrl
                              : field?.data?.image
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`imageurlfield${index}`}
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
                        Update Contest Image
                        <input
                          type="file"
                          name="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#imageurlfield${index}`
                              );
                              uploadFile(
                                index,
                                "image",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.image && (
                      <>
                        <TextInput
                          source={`image`}
                          defaultValue={contestMediaFiles1[index].data?.image}
                          fullWidth
                          hidden={true}
                          inputProps={{
                            value: contestMediaFiles1[index].data?.image,
                          }}
                          value={contestMediaFiles1[index].data?.image}
                        />

                        <p style={{ color: "green" }}>
                          {" "}
                          File Uploaded Successfully!
                        </p>
                      </>
                    )}
                  </Box>
                  <SectionTitle label="resources.contests.fields.bannerimmage" />
                  {field?.data?.bannerImage && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <ImageMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "bannerImage"
                              ? currentUrl
                              : field?.data?.bannerImage
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`bannerimageurlfield${index}`}
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
                        Update Banner Image
                        <input
                          type="file"
                          name="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            //console.log("JUST RUN");
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#bannerimageurlfield${index}`
                              );
                              uploadFile(
                                index,
                                "bannerImage",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.bannerImage && (
                      <>
                        {" "}
                        <TextInput
                          source={`bannerImage`}
                          defaultValue={
                            contestMediaFiles1[index].data?.bannerImage
                          }
                          fullWidth
                          inputProps={{
                            value: contestMediaFiles1[index].data?.bannerImage,
                          }}
                          value={contestMediaFiles1[index].data?.bannerImage}
                        />
                        <p style={{ color: "green" }}>
                          {" "}
                          File Uploaded Successfully!
                        </p>
                      </>
                    )}
                  </Box>
                  <SectionTitle label="resources.contests.fields.contestvideo" />
                  {field?.data?.contestVideo && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <VideoMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "contestVideo"
                              ? currentUrl
                              : field?.data?.contestVideo
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`contestvideourlfield${index}`}
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
                        Update Contest Video
                        <input
                          type="file"
                          name="file"
                          accept="video/mp4, video/webm, video/ogg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            //console.log("JUST RUN");
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#contestvideourlfield${index}`
                              );
                              uploadFile(
                                index,
                                "contestVideo",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.contestVideo && (
                      <>
                        {" "}
                        <TextInput
                          source={`contestVideo`}
                          defaultValue={
                            contestMediaFiles1[index].data?.contestVideo
                          }
                          fullWidth
                          inputProps={{
                            value: contestMediaFiles1[index].data?.contestVideo,
                          }}
                          value={contestMediaFiles1[index].data?.contestVideo}
                        />
                        <p style={{ color: "green" }}>
                          {" "}
                          File Uploaded Successfully!
                        </p>
                      </>
                    )}
                  </Box>
                  <SectionTitle label="resources.contests.fields.bannervideo" />
                  {field?.data?.bannerVideo && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <VideoMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "bannerVideo"
                              ? currentUrl
                              : field?.data?.bannerVideo
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`bannervideourlfield${index}`}
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
                        Update Banner Video
                        <input
                          type="file"
                          name="file"
                          accept="video/mp4, video/webm, video/ogg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            //console.log("JUST RUN");
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#bannervideourlfield${index}`
                              );
                              uploadFile(
                                index,
                                "bannerVideo",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.bannerVideo && (
                      <>
                        {" "}
                        <TextInput
                          // type="hidden"
                          source={`bannerVideo`}
                          defaultValue={
                            contestMediaFiles1[index].data?.bannerVideo
                          }
                          fullWidth
                          inputProps={{
                            value: contestMediaFiles1[index].data?.bannerVideo,
                          }}
                          value={contestMediaFiles1[index].data?.bannerVideo}
                        />
                        <p style={{ color: "green" }}>
                          {" "}
                          File Uploaded Successfully!
                        </p>
                      </>
                    )}
                  </Box>

                  <SectionTitle label="resources.contests.fields.carouselBanner1" />
                  {field?.data?.carouselBanner1 && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <ImageMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "carouselBanner1"
                              ? currentUrl
                              : field?.data?.carouselBanner1
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`carouselBanner1urlfield${index}`}
                    >
                      {Object.keys(config_data_contestMedia).map((key) => (
                        <input
                          key={key}
                          name={key}
                          value={config_data_contestMedia[key]}
                          type="hidden"
                          id="urlcarouselBanner1fileid"
                        />
                      ))}
                      <Button
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
                        Update Carousel Image
                        <input
                          type="file"
                          name="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            //console.log("JUST RUN");
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#carouselBanner1urlfield${index}`
                              );
                              uploadFile(
                                index,
                                "carouselBanner1",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.carouselBanner1 && (
                      <>
                        {" "}
                        <TextInput
                          // type="hidden"
                          source={`carouselBanner1`}
                          defaultValue={
                            contestMediaFiles1[index].data?.carouselBanner1
                          }
                          fullWidth
                          inputProps={{
                            value:
                              contestMediaFiles1[index].data?.carouselBanner1,
                          }}
                          value={
                            contestMediaFiles1[index].data?.carouselBanner1
                          }
                        />
                        <p style={{ color: "green" }}>
                          {" "}
                          Carousel Banner Uploaded Successfully!
                        </p>
                      </>
                    )}
                  </Box>

                  <SectionTitle label="resources.contests.fields.carouselBanner2" />
                  {field?.data?.carouselBanner2 && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <ImageMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "carouselBanner2"
                              ? currentUrl
                              : field?.data?.carouselBanner2
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`carouselBanner2urlfield${index}`}
                    >
                      {Object.keys(config_data_contestMedia).map((key) => (
                        <input
                          key={key}
                          name={key}
                          value={config_data_contestMedia[key]}
                          type="hidden"
                          id="urlcarouselBanner2fileid"
                        />
                      ))}
                      <Button
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
                        Update Carousel Image
                        <input
                          type="file"
                          name="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            //console.log("JUST RUN");
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#carouselBanner2urlfield${index}`
                              );
                              uploadFile(
                                index,
                                "carouselBanner2",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.carouselBanner2 && (
                      <>
                        {" "}
                        <TextInput
                          // type="hidden"
                          source={`carouselBanner2`}
                          defaultValue={
                            contestMediaFiles1[index].data?.carouselBanner2
                          }
                          fullWidth
                          inputProps={{
                            value:
                              contestMediaFiles1[index].data?.carouselBanner2,
                          }}
                          value={
                            contestMediaFiles1[index].data?.carouselBanner2
                          }
                        />
                        <p style={{ color: "green" }}>
                          {" "}
                          Carousel Banner Uploaded Successfully!
                        </p>
                      </>
                    )}
                  </Box>

                  <SectionTitle label="resources.contests.fields.carouselBanner3" />
                  {field?.data?.carouselBanner3 && (
                    <Box display={{ xs: "block", sm: "flex" }}>
                      <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                        <ImageMedia
                          source={
                            currentFile?.index === index &&
                            currentFile?.key === "carouselBanner3"
                              ? currentUrl
                              : field?.data?.carouselBanner3
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }} my={2}>
                    <form
                      action="https://storage.googleapis.com/contest_image/"
                      method="POST"
                      encType="multipart/form-data"
                      id={`carouselBanner3urlfield${index}`}
                    >
                      {Object.keys(config_data_contestMedia).map((key) => (
                        <input
                          key={key}
                          name={key}
                          value={config_data_contestMedia[key]}
                          type="hidden"
                          id="urlcarouselBanner3fileid"
                        />
                      ))}
                      <Button
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
                        Update Carousel Image
                        <input
                          type="file"
                          name="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden={true}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files != null) {
                              const form: any = document.querySelector(
                                `#carouselBanner3urlfield${index}`
                              );
                              uploadFile(
                                index,
                                "carouselBanner3",
                                e.target.files[0]?.name,
                                form,
                                e.target.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                    </form>
                    {contestMediaFiles1[index].data?.carouselBanner3 && (
                      <>
                        {" "}
                        <TextInput
                          // type="hidden"
                          source={`carouselBanner3`}
                          defaultValue={
                            contestMediaFiles1[index].data?.carouselBanner3
                          }
                          fullWidth
                          inputProps={{
                            value:
                              contestMediaFiles1[index].data?.carouselBanner3,
                          }}
                          value={
                            contestMediaFiles1[index].data?.carouselBanner2
                          }
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
        )}
      </SimpleForm>
    </Edit>
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

const VisitorTitle = () => <IdField size="32" sx={{ margin: "5px 0" }} />;

export default ContestEdit;
