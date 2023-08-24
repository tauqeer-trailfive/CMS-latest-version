export const RandomAvatars = [
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672730125477-Asset 3.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726137466-Asset 4.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726274184-Asset 5.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726299627-Asset 6.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726322072-Asset 7.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726343497-Asset 8.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726402670-Asset 9.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726426954-Asset 10.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726453720-Asset 11.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726490474-Asset 12.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726545720-Asset 13.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726569341-Asset 14.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726581593-Asset 15.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726605430-Asset 16.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726638299-Asset 17.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726688707-Asset 18.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726750361-Asset 19.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726773579-Asset 20.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726842744-Asset 21.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726862068-Asset 22.png",
  "https://storage.googleapis.com/djam_rn/img/users/avatars/1672726912545-Asset 23.png",
];

export const musicallnstrumentConnector = (
  curr: { id: string; name: string; rank: number }[],
  prev: { id: string; name: string; rank: number }[]
) => {
  /* Filtering out the disconnected instruments by compairing arrays */
  const disconnectedInstruments = prev.filter(
    (prevObj: { id: string; name: string; rank: number }) => {
      return !curr.some(
        (currObj: { id: string; name: string; rank: number }) =>
          currObj.name === prevObj.name
      );
    }
  );

  /* Making connect and disconnect form for query variable for createOrConnect is not working */
  const connector = curr.map(({ name, id }, index: number) => {
    return {
      id: id,
    };
  });

  const disconnector = disconnectedInstruments.map(({ id }, index: number) => {
    return { id: id };
  });

  return { connect: connector, disconnect: disconnector };
};

export const effectConnectorOnCreatePreset = (curr: string[]) => {
  const connector = curr.map((id: string) => {
    return {
      id: id,
    };
  });

  return { connect: connector };
};

export const effectConnectorOnEditPreset = (
  curr: { id: string }[],
  prev: { id: string }[]
) => {
  /* Filtering out the disconnected instruments by compairing arrays */
  const disconnectedInstruments = prev.filter((prevObj: { id: string }) => {
    return !curr.some((currObj: { id: string }) => currObj.id === prevObj.id);
  });

  /* Making connect and disconnect form for query variable for createOrConnect is not working */
  const connector = curr.map(({ id }) => {
    return {
      id: id,
    };
  });

  const disconnector = disconnectedInstruments.map(({ id }) => {
    return { id: id };
  });

  return { connect: connector, disconnect: disconnector };
};
