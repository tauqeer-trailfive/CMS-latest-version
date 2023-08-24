import * as React from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  NumberInput,
} from "react-admin";
import { Box, Button, Typography } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect } from "react";

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

let config_data_audio: any = {
  "x-goog-meta-test": "",
  key: "",
  "x-goog-algorithm": "",
  "x-goog-credential": "",
  "x-goog-date": "",
  "x-goog-signature": "",
  policy: "",
};

type Props = {};

const BPMCAUDIOUploader = (props: Props) => {
  const translate = useTranslate();

  const [mp3audiofileurl, setaudiofileurl] = React.useState<any>();
  const [mp3audioupload, setaudiofileupload] = React.useState<any>(false);
  const [uploadedaudio, setuploadedaudio] = React.useState<boolean>(false);
  const [
    uploadBPMAudioFile,
    { data: audio_data, loading: audio_loading, error: audio_error },
  ] = useMutation(POLICY);

  useEffect(() => {
    const uploadaudioFile = () => {
      const filename = new Date().getTime() + "-" + mp3audiofileurl.name;
      uploadBPMAudioFile({
        variables: {
          imageName: filename,
          bType: "image-compression",
        },
      });
    };
    mp3audiofileurl && uploadaudioFile();
  }, [mp3audiofileurl]);

  if (audio_data !== null) {
    config_data_audio = {
      "x-goog-meta-test": "data",
      key: audio_data?.singleImageUpload.key,
      "x-goog-algorithm": audio_data?.singleImageUpload.x_goog_algorithm,
      "x-goog-credential": audio_data?.singleImageUpload.x_goog_credential,
      "x-goog-date": audio_data?.singleImageUpload.x_goog_date,
      "x-goog-signature": audio_data?.singleImageUpload.x_goog_signature,
      policy: audio_data?.singleImageUpload.policy,
    };

    if (mp3audioupload) {
      localStorage.setItem(
        "bpmaudiofile",
        audio_data?.singleImageUpload.mp3download_url
      );
    }
  }

  return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <div>
            <form
              action="https://storage.googleapis.com/image-compression/"
              method="POST"
              encType="multipart/form-data"
              id="audio_file"
            >
              {Object.keys(config_data_audio).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={config_data_audio[key]}
                  type="hidden"
                  id="urlaudiofileid"
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
                    uploadedaudio ? (
                      <CloudDoneIcon color="success" />
                    ) : (
                      <CloudUploadIcon />
                    )
                  }
                >
                  BPM Audio File
                  <input
                    type="file"
                    name="file"
                    accept="audio/mp3,audio/*;capture=microphone"
                    hidden={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files != null) {
                        setaudiofileurl(e.target.files[0]);
                        setaudiofileupload(true);
                        const form: any = document.querySelector("#audio_file");
                        const input: any =
                          document.querySelector("#urlaudiofileid");
                        setTimeout(() => {
                          form.submit();
                          setuploadedaudio(true);
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
      </Box>

      {uploadedaudio ? (
        <p style={{ color: "green" }}>Audio File Uploaded Successfully!</p>
      ) : (
        <>{/* <p style={{ color: "red" }}>Audio File Not Uploaded!</p> */}</>
      )}
    </>
  );
};

export default BPMCAUDIOUploader;
