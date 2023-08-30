import * as React from "react";
import { useTranslate, useRefresh, useNotify } from "react-admin";
import { Box, Button, CircularProgress } from "@mui/material";

import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const POLICY = gql`
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

const UPDATE_MIXDOWN_SCREEN = gql`
  mutation UpdateProject(
    $data: ProjectUpdateInput!
    $where: ProjectWhereUniqueInput!
  ) {
    updateProject(data: $data, where: $where) {
      id
      mixdownScreen
      name
    }
  }
`;

let mixdown_screen_config_data = {
  "x-goog-meta-test": "",
  key: "",
  "x-goog-algorithm": "",
  "x-goog-credential": "",
  "x-goog-date": "",
  "x-goog-signature": "",
  policy: "",
};

type Props = {
  ProjectId: any;
};

const PEMixdownscreenUploader = (props: Props) => {
  const refresh = useRefresh();
  const notify = useNotify();

  const [mixdownuploaded, setmixdownuploaded] = React.useState<boolean>(false);
  const [mixdownscreen, setmixdownscreen] = React.useState<any>();

  const [
    UpdateMixdownScreen,
    {
      data: updatemixdownscreenData,
      loading: updatemixdownscreenLoading,
      error: updatemixdownscreenError,
    },
  ] = useMutation(UPDATE_MIXDOWN_SCREEN);

  const [uploadMDScreenImage, { data, loading, error }] = useMutation(POLICY);

  const saveavatarURLMutaiton = () => {
    UpdateMixdownScreen({
      variables: {
        data: {
          mixdownScreen: data?.singleImageUpload.download_url,
        },
        where: {
          id: props.ProjectId,
        },
      },
    });
    notify("Mixdownscreen Image Updated");
    refresh();
  };

  useEffect(() => {
    const uploadMDSImage = () => {
      const filename_data = new Date().getTime() + "-" + mixdownscreen.name;
      const filename =
        "projects" + "/" + "original_covers" + "/" + filename_data;
      uploadMDScreenImage({
        variables: {
          imageName: filename,
          bType: "djam_rn",
        },
      });
    };
    mixdownscreen && uploadMDSImage();
  }, [mixdownscreen]);

  if (data !== undefined) {
    mixdown_screen_config_data = {
      "x-goog-meta-test": "data",
      key: data?.singleImageUpload.key,
      "x-goog-algorithm": data?.singleImageUpload.x_goog_algorithm,
      "x-goog-credential": data?.singleImageUpload.x_goog_credential,
      "x-goog-date": data?.singleImageUpload.x_goog_date,
      "x-goog-signature": data?.singleImageUpload.x_goog_signature,
      policy: data?.singleImageUpload.policy,
    };
  }
  return (
    <>
      <Box
        display={{ xs: "block", sm: "flex" }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "70%",
        }}
      >
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <div>
            <form
              action="https://storage.googleapis.com/djam_rn/"
              method="POST"
              encType="multipart/form-data"
              id="mixdown_screen"
            >
              {Object.keys(mixdown_screen_config_data).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={mixdown_screen_config_data[key]}
                  type="hidden"
                  id="urlmixdownscreenid"
                />
              ))}
              <p>
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  color="primary"
                  sx={{ borderRadius: 0.8 }}
                  startIcon={
                    loading ? (
                      <CircularProgress size={10} color="secondary" />
                    ) : (
                      <CloudUploadIcon />
                    )
                  }
                >
                  Choose Image for Mixdown
                  <input
                    type="file"
                    name="file"
                    accept="*"
                    hidden={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files != null) {
                        setmixdownscreen(e.target.files[0]);

                        const form: any =
                          document.querySelector("#mixdown_screen");
                        const input: any = document.querySelector(
                          "#urlmixdownscreenid"
                        );
                        setTimeout(() => {
                          form.submit();
                          setmixdownuploaded(true);
                        }, 1000);
                      }
                      1;
                    }}
                  />
                </Button>
              </p>
            </form>
          </div>
        </Box>
        <Button
          variant="outlined"
          component="label"
          size="small"
          color="primary"
          onClick={() => {
            saveavatarURLMutaiton();
          }}
          sx={{ borderRadius: 0.8 }}
        >
          Upload
        </Button>
      </Box>

      {mixdownuploaded ? (
        <p style={{ color: "green" }}>MixDownScreen Uploaded Successfully!</p>
      ) : (
        <>{/* <p style={{ color: "red" }}>MixDownScreen Not Uploaded!</p> */}</>
      )}
    </>
  );
};

export default PEMixdownscreenUploader;
