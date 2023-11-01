import React from 'react';
import { Typography } from '@mui/material';
import { useInput } from 'react-admin';

type Props = {
   audioUrl?: string;
   fileName?: string;
   value?: number;
   BPMNO?: number;
};

const SamplesUploaded = (props: Props) => {
   const AudioInput = ({ source, label }) => {
      const { id, field, fieldState } = useInput({ source });
      return (
         <label htmlFor={id}>
            {label}
            {/* <input id={id} {...field}/> */}
            <audio id={id} {...field} src={field.name} controls />
            {fieldState.error && <span>{fieldState.error.message}</span>}
         </label>
      );
   };
   return (
      <>
         <Typography variant="h5" color={'primary'} fontWeight={'900'} my={2}>
            {`BPM: ${props.BPMNO}`}
         </Typography>
         <Typography variant="body1" color={'primary'} mb={1}>
            {`Value: ${props.value}`}
         </Typography>
         <Typography variant="body1" color={'bisque'} mb={1}>
            {`File Name: ${props.fileName}`}
         </Typography>
         <AudioInput source={props.audioUrl} label={''} />
      </>
   );
};

export default SamplesUploaded;
