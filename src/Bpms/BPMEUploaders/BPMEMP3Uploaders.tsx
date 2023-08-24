import * as React from "react";
import {
  DateInput,
  Edit,
  NullableBooleanInput,
  TextInput,
  PasswordInput,
  SimpleForm,
  useTranslate,
  SelectInput,
  NumberInput,
  useRefresh,
  useNotify,
  useInput,
} from "react-admin";
import { Grid, Box, Typography, Button } from "@mui/material";

import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
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

const UPDATE_BPM_MP3_FILE = gql`
  mutation updateBpm($data: BpmUpdateInput, $where: BpmWhereUniqueInput) {
    updateBpm(data: $data, where: $where) {
      id
    }
  }
`;

let config_data_mp3 = {
  "x-goog-meta-test": "",
  key: "",
  "x-goog-algorithm": "",
  "x-goog-credential": "",
  "x-goog-date": "",
  "x-goog-signature": "",
  policy: "",
};

let config_data_audio = {
  "x-goog-meta-test": "",
  key: "",
  "x-goog-algorithm": "",
  "x-goog-credential": "",
  "x-goog-date": "",
  "x-goog-signature": "",
  policy: "",
};

type Props = {
  BPMId: any;
};

const BPMEMP3Uploaders = (props: Props) => {
  const translate = useTranslate();
  const { id } = useParams();
  const refresh = useRefresh();
  const notify = useNotify();

  const [mp3file, setmp3file] = React.useState<any>();

  const [mp3uploaded, setmp3uploaded] = React.useState<boolean>(false);

  const [uploadMp3File, { data, loading, error }] = useMutation(POLICY);

  const [
    updateBpmFile,
    { data: updatebpmData, loading: updatebpmLoading, error: updatebpmError },
  ] = useMutation(UPDATE_BPM_MP3_FILE);

  useEffect(() => {
    const uploadMp3 = () => {
      const filename = new Date().getTime() + "-" + mp3file.name;
      uploadMp3File({
        variables: {
          imageName: filename,
          bType: "image-compression",
        },
      });
    };
    mp3file && uploadMp3();
  }, [mp3file]);

  if (data !== undefined) {
    config_data_mp3 = {
      "x-goog-meta-test": "data",
      key: data?.singleImageUpload.key,
      "x-goog-algorithm": data?.singleImageUpload.x_goog_algorithm,
      "x-goog-credential": data?.singleImageUpload.x_goog_credential,
      "x-goog-date": data?.singleImageUpload.x_goog_date,
      "x-goog-signature": data?.singleImageUpload.x_goog_signature,
      policy: data?.singleImageUpload.policy,
    };
  }

  const savemp3Mutaiton = () => {
    updateBpmFile({
      variables: {
        data: {
          mp3Url: data?.singleImageUpload.mp3download_url,
        },
        where: {
          id: props.BPMId,
        },
      },
    });
    notify("resources.bpms.fields.mp3changed");
    refresh();
  };

  return (
    <>
      <Box>
        <Box
          display={{ xs: "block" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <div>
              <form
                action="https://storage.googleapis.com/image-compression/"
                method="POST"
                encType="multipart/form-data"
                id="mp3_file"
              >
                {Object.keys(config_data_mp3).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={config_data_mp3[key]}
                    type="hidden"
                    id="urlmp3id"
                  />
                ))}
                <p>
                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    color="primary"
                    sx={{ borderRadius: 0.2 }}
                    startIcon={
                      mp3uploaded ? (
                        <CloudDoneIcon color="success" />
                      ) : (
                        <CloudUploadIcon />
                      )
                    }
                  >
                    Choose Mp3 for BPM(Tempo)
                    <input
                      type="file"
                      name="file"
                      accept=".mp3"
                      hidden={true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files != null) {
                          setmp3file(e.target.files[0]);
                          const form: any = document.querySelector("#mp3_file");
                          const input: any =
                            document.querySelector("#urlmp3id");
                          setTimeout(() => {
                            form.submit();
                            setmp3uploaded(true);
                          }, 1000);
                        }
                        1;
                      }}
                    />
                  </Button>
                </p>

                {/* {mp3uploaded ? (
                    <p style={{ color: "green" }}>
                      Contest Image Uploaded Successfully!
                    </p>
                  ) : (
                    <>
                      <p style={{ color: "red" }}>
                        Contest Image Not Uploaded!
                      </p>
                    </>
                  )} */}
              </form>
            </div>
          </Box>
          <Button
            variant="outlined"
            component="label"
            size="small"
            color="primary"
            onClick={() => {
              savemp3Mutaiton();
            }}
            sx={{ borderRadius: 0.2 }}
          >
            Upload
          </Button>
        </Box>
        {mp3uploaded ? (
          <p style={{ color: "green" }}>Contest Image Uploaded Successfully!</p>
        ) : (
          <>
            {/* <p style={{ color: "red" }}>Contest Image Not Uploaded!</p> */}
          </>
        )}

        <Box pt="3em" />
      </Box>
    </>
  );
};

export default BPMEMP3Uploaders;
