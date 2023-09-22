import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  NumberInput,
  SelectInput,
  AutocompleteInput,
  ReferenceInput,
  useInput,
  useNotify,
  ArrayInput,
  SimpleFormIterator,
  Toolbar,
  SaveButton,
  DeleteButton,
} from "react-admin";
import {
  Grid,
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Button,
} from "@mui/material";

import Aside from "./Aside";
import FullNameField from "./IdField";
import { validateForm } from "./SampleCreate";
import { useParams } from "react-router-dom";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import DriveFolderUploadTwoToneIcon from "@mui/icons-material/DriveFolderUploadTwoTone";
import SamplesUploaded from "./SamplesUploaded";
import axios from "axios";

const typesofEffects = [
  { id: "DELAYBPM", name: "DELAYBPM" },
  { id: "DELAY", name: "DELAY" },
  { id: "REVERB", name: "REVERB" },
  { id: "EQUALIZER", name: "EQUALIZER" },
  { id: "COMPRESSOR", name: "COMPRESSOR" },
  {
    id: "COMPRESSORMASTERBUS",
    name: "COMPRESSORMASTERBUS",
  },
  { id: "LIMITER", name: "LIMITER" },
];
const EffectEdit = () => {
  const translate = useTranslate();
  const { id } = useParams();
  const notify = useNotify();

  const [filesSuccess, setFilesSuccess] = React.useState<any>();
  const [ShowLoaders, setShowLoaders] = React.useState(false);
  const [filesSelected, setFilesSelected] = React.useState<any>();

  //console.log(id);

  const AudioInput = ({ source, label }) => {
    const { id, field, fieldState } = useInput({ source });
    return (
      <label htmlFor={id}>
        {label}
        {/* <input id={id} {...field}/> */}
        <audio id={id} {...field} src={field.value} controls />
        {fieldState.error && <span>{fieldState.error.message}</span>}
      </label>
    );
  };

  React.useEffect(() => {
    localStorage.removeItem("BPM_DATA_FOR_EDIT");
    localStorage.setItem("BPM_DATA_FOR_EDIT", JSON.stringify(filesSuccess));
  }, [filesSuccess]);
  return (
    <Edit title={<SampleTitle />} mutationMode="pessimistic">
      <SimpleForm
        validate={validateForm}
        toolbar={
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <SaveButton alwaysEnable />
            <DeleteButton />
          </Toolbar>
        }
        sx={{ mx: 2, my: 2 }}
      >
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
                {translate("resources.samples.fieldGroups.editSample")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" fullWidth isRequired />
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <SelectInput
                    source="format"
                    fullWidth
                    isRequired
                    choices={[
                      { id: "WAV", name: "WAV" },
                      { id: "FLAC", name: "FLAC" },
                      { id: "MP3_128", name: "MP3_128" },
                      { id: "MP3_256", name: "MP3_256" },
                      { id: "MP3_512", name: "MP3_512" },
                      { id: "OGG", name: "OGG" },
                    ]}
                  />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <ReferenceInput
                    label="User"
                    source="createdBy.id"
                    reference="users"
                    filter={{ role: ["SUPERADMIN", "ADMIN", "USER", "ANON"] }}
                  >
                    <AutocompleteInput
                      optionText={(choice) =>
                        `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                      }
                      optionValue="id"
                      fullWidth
                      label="Select User"
                    />
                  </ReferenceInput>
                </Box>
              </Box>

              <Separator />
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <NumberInput source="samplerate" fullWidth isRequired />
                </Box>
              </Box>

              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <SelectInput
                    source="instrument"
                    label="Select Instrument"
                    fullWidth
                    isRequired
                    choices={[
                      { id: "DRUMS", name: "DRUMS" },
                      { id: "BEATS", name: "BEATS" },
                      { id: "BASS", name: "BASS" },
                      { id: "CHORDS", name: "CHORDS" },
                    ]}
                  />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <ReferenceInput
                    label="Genre"
                    source="genre.id"
                    reference="genres"
                  >
                    <AutocompleteInput
                      optionText="name"
                      fullWidth
                      label="Genre"
                    />
                  </ReferenceInput>
                </Box>
              </Box>
              <SectionTitle label="resources.bpms.fields.name" />
              <Box
                display={{ xs: "block", sm: "flex", width: "100%" }}
                sx={{
                  boxShadow: 4,
                  padding: 5,
                  marginBottom: 5,
                  borderRadius: 0.4,
                  // border: "1px solid #909090",
                }}
              >
                <ArrayInput source="bpmTemp" label="">
                  <SimpleFormIterator
                    disableClear
                    addButton={<Button>Add New BPM/Tempo</Button>}
                    disableReordering={true}
                    disableAdd={true}
                  >
                    <NumberInput source="value" helperText={false} />
                    <Box sx={{ mt: "0.5em" }} />
                    <AudioInput source={"audioUrl"} label="" />
                    {/* <AudioInput source={"audioUrl"} label="" />
                    <AudioInput source={"mp3Url"} label="" /> */}
                  </SimpleFormIterator>
                </ArrayInput>
              </Box>
              <Box mt="1em" />

              <Box
                display={{ xs: "block", sm: "flex", width: "100%" }}
                sx={{
                  // boxShadow: 4,
                  padding: 2,
                  marginBottom: 3,
                  borderRadius: 0.4,
                  border: "",
                }}
              >
                <div className="form-group files">
                  <SectionTitle label="ADD More Samples BPM's" />
                  {/* <label>Upload Your OGGS </label> */}
                  <br />
                  <Button
                    variant="text"
                    component="label"
                    size="small"
                    color="primary"
                    sx={{ borderRadius: 0, px: 3 }}
                    startIcon={<CloudDoneIcon color="primary" />}
                  >
                    <input
                      type="file"
                      hidden={true}
                      accept="audio/ogg, audio/*"
                      className="form-control"
                      multiple={true}
                      onChange={(e: any) => {
                        //console.log(e.target?.files);
                        setFilesSelected(e.target?.files);
                      }}
                    />
                    Choose OGGs
                  </Button>
                  <IconButton
                    color="primary"
                    aria-label="Upload"
                    size="large"
                    title="Upload"
                    onClick={() => {
                      const data = new FormData();
                      for (var x = 0; x < filesSelected.length; x++) {
                        data.append("file", filesSelected[x]);
                      }
                      setShowLoaders(false);
                      setShowLoaders(true);
                      axios
                        .put("https://play.djaminn.com/uploadFiles", data)
                        .then((res) => {
                          const finalArray = res?.data?.map((item, index) => {
                            let initalFileName = item.filename;
                            const match = initalFileName.match(/\d+/);
                            const firstThreeNumbers = match
                              ? match[0].slice(0, 3)
                              : null;
                            return {
                              value: parseInt(firstThreeNumbers),
                              audioUrl: item.fileUrl,
                              originalName: item.filename,
                            };
                          });

                          setFilesSuccess(finalArray);
                          if (filesSuccess) {
                            setShowLoaders(false);
                          }
                        })
                        .catch((error) => {
                          notify(`${error.message}`);
                        });
                    }}
                  >
                    <DriveFolderUploadTwoToneIcon />
                  </IconButton>
                </div>
              </Box>

              {filesSuccess
                ? filesSuccess.map(
                    ({ value, audioUrl, originalName }, index) => {
                      return (
                        <Box
                          display={{ xs: "block", sm: "flex", width: "100%" }}
                          sx={{
                            flexDirection: "column",
                            boxShadow: 4,
                            padding: 2,
                            marginBottom: 3,
                            borderRadius: 0.4,
                            border: "",
                            justifyContent: "center",
                          }}
                        >
                          <SamplesUploaded
                            key={index}
                            audioUrl={audioUrl}
                            fileName={originalName}
                            value={value}
                            BPMNO={index + 1}
                          />
                        </Box>
                      );
                    }
                  )
                : ShowLoaders && (
                    <Box
                      display={{ xs: "block", sm: "flex", width: "100%" }}
                      sx={{
                        flexDirection: "column",
                        boxShadow: 4,
                        padding: 2,
                        marginBottom: 3,
                        borderRadius: 0.4,
                        border: "",
                      }}
                    >
                      <LinearProgress color="primary" />
                    </Box>
                  )}
              <Box mt="1em" />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const SampleTitle = () => <FullNameField size="32" sx={{ margin: "5px 0" }} />;
const Separator = () => <Box pt="1em" />;
const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="button" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

export default EffectEdit;
