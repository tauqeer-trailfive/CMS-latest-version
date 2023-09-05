import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  SelectInput,
  NumberInput,
  AutocompleteArrayInput,
  BooleanInput,
  ReferenceArrayInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const GET_REGIONS = gql`
  query GetAllRegions($orderBy: MetricsFEOrderByInput) {
    getAllRegions(orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.title) {
    errors.title = "ra.validation.required";
  }
  if (!values.type) {
    errors.type = "ra.validation.required";
  }
  if (!values.priority) {
    errors.priority = "ra.validation.required";
  }
  if (!values.limit) {
    errors.limit = "ra.validation.required";
  }
  return errors;
};

const EffectCreate = () => {
  const [Regions, setRegions] = React.useState<{ id: string; name: string }[]>(
    []
  );
  const { data, loading, error } = useQuery(GET_REGIONS);
  const translate = useTranslate();
  React.useEffect(() => {
    if (data?.getAllRegions) {
      const extractingRegions = data?.getAllRegions.map((item) => {
        return { id: item.id, name: item.name };
      });
      setRegions(extractingRegions);
    }
  }, [data]);
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500 }}
        defaultValues={{
          title: "",
          type: "",
          status: true,
          priority: 0,
          limit: 0,
          user: "",
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
          {translate("resources.homescreens.fieldGroups.createHomescreen")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="title" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput
              source="description"
              multiline
              isRequired
              fullWidth
              rows={5}
            />
          </Box>
        </Box>

        <AutocompleteArrayInput
          source="region"
          isRequired
          fullWidth
          optionText="name"
          optionValue="id"
          choices={Regions}
        />
        <NumberInput fullWidth source="offset" />
        <SelectInput
          source="visibility"
          isRequired
          fullWidth
          choices={[
            { id: "PUBLIC", name: "PUBLIC" },
            { id: "PRIVATE", name: "PRIVATE" },
            { id: "HIDDEN", name: "HIDDEN" },
          ]}
        />
        <TextInput
          source="type"
          multiline
          isRequired
          fullWidth
          helperText={false}
        />
        <Separator />
        <TextInput source="contestId" multiline fullWidth helperText={false} />
        <BooleanInput source="status" fullWidth color="primary" />
        <NumberInput source="limit" isRequired fullWidth />
        <Separator />
        <NumberInput
          source="priority"
          multiline
          isRequired
          fullWidth
          helperText={false}
        />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <ReferenceArrayInput
              label="Playlists"
              source="playlists"
              reference="playlists"
              allowEmpty
            >
              <AutocompleteArrayInput
                optionText={(choice) => `${choice.name} / (${choice.id})`}
                optionValue="id"
              />
            </ReferenceArrayInput>
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

export default EffectCreate;
