import { useState } from "react";
import { Button, Grid, TextField, Paper, Box, Typography } from "@mui/material";
import { useMembers } from "../hooks/useMembers";
import shuffle from "lodash.shuffle";

type divideTeamProps = {
  backgroundColors: string[];
};

function DivideTeam({ backgroundColors }: divideTeamProps) {
  const [members] = useMembers();
  const [teamNum, setTeamNum] = useState(1);
  const [teamUsers, setTeamUsers] = useState<string[]>([]);

  const shuffleList = () => {
    setTeamUsers(shuffle(members.map((v) => v.option)));
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={6}>
          <TextField
            id="standard-number"
            label="チーム数(最大4)"
            type="number"
            defaultValue={1}
            inputProps={{
              max: 4,
              min: 1,
              style: { textAlign: "center" },
            }}
            variant="standard"
            style={{ width: 100 }}
            onChange={(event) => setTeamNum(Number(event.target.value))}
          />
          <Button variant="contained" onClick={shuffleList} sx={{ ml: 4 }}>
            Go!
          </Button>
        </Grid>
      </Grid>
      {teamUsers.length !== 0 &&
        [...Array(teamNum)].map((_, i) => (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={1}
            mt={2}
          >
            <Grid item xs={12} key={i}>
              <Typography variant="h6" color="inherit" noWrap>
                チーム{i + 1}
              </Typography>
            </Grid>
            <Grid container justifyContent="center" direction="row">
              {teamUsers.map(
                (user: string, index) =>
                  i === index % teamNum && (
                    <Grid item xs={4} key={user}>
                      <Box
                        key={user}
                        sx={{
                          m: 1,
                          borderRadius: 2,
                          backgroundColor: backgroundColors[i % 4],
                          color: "white",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          width: { sm: 100, lg: 120 },
                          height: { sm: 30, lg: 45 },
                          lineHeight: "40px",
                        }}
                      >
                        {user}
                      </Box>
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
        ))}
    </>
  );
}

export default DivideTeam;
