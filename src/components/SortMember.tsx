import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import shuffle from "lodash.shuffle";
import { Flipped, Flipper } from "react-flip-toolkit";

// hooks
import { PersonData, useMembers } from "../hooks/useMembers";

type sortMemberProps = {
  startRollAndStop: () => void;
};

function SortMember({ startRollAndStop }: sortMemberProps) {
  const [members] = useMembers();
  const [shuffledMembers, setShuffledMembers] = useState<PersonData[]>([]);

  useEffect(() => {
    setShuffledMembers(members);
  }, [members]);

  const startShuffle = async () => {
    startRollAndStop();
    for (let i = 0; i < 5; i++) {
      setShuffledMembers(shuffle(members));
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={2}>
        <Button variant="contained" onClick={startShuffle} sx={{ mr: 2 }}>
          Go!
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Flipper flipKey={shuffledMembers.map((v) => v.option).join("")}>
          {shuffledMembers.map((v: PersonData, index: number) => (
            <Flipped key={v.option} flipId={v.option}>
              <Box
                sx={{
                  width: 240,
                  height: 45,
                  backgroundColor: "#FFF",
                  color: "#6091d3",
                  fontWeight: "bold",
                  borderRadius: 2,
                  border: 3,
                  borderColor: "#6091d3",
                  // textAlign: "center",
                  paddingLeft: 2,
                  lineHeight: 2.5,
                  mt: 3,
                }}
              >
                {index + 1} : {v.option}
              </Box>
            </Flipped>
          ))}
        </Flipper>
      </Grid>
    </Grid>
  );
}

export default SortMember;
