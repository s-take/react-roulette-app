import { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMembers } from "../hooks/useMembers";
import shuffle from "lodash.shuffle";

type divideTeamProps = {
  backgroundColors: string[];
};

function DivideTeam({ backgroundColors }: divideTeamProps) {
  const [members] = useMembers();
  const [teamNum, setTeamNum] = useState(1);
  const [teamUsers, setTeamUsers] = useState<string[]>([]);

  const handleIncrement = () => {
    if (teamNum === 4) return;
    setTeamNum(teamNum + 1);
  };

  const handleDecrement = () => {
    if (teamNum === 1) return;
    setTeamNum(teamNum - 1);
  };

  const shuffleList = () => {
    setTeamUsers(shuffle(members.map((v) => v.option)));
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <IconButton onClick={handleDecrement}>
                <RemoveCircleIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                id="standard-number"
                label="チーム数(最大4)"
                value={teamNum}
                type="number"
                defaultValue={1}
                inputProps={{
                  style: { textAlign: "center" },
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1, // 最小値
                  max: 4, // 最大値
                }}
                variant="standard"
                style={{ width: 100 }}
                onChange={(event) => setTeamNum(Number(event.target.value))}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleIncrement}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={shuffleList}>
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
            {teamUsers.map(
              (user: string, index) =>
                i === index % teamNum && (
                  <Grid item xs={12} key={user}>
                    <Box
                      key={user}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: backgroundColors[i % 4],
                        color: "white",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        width: 160,
                        height: 40,
                        lineHeight: "40px",
                      }}
                    >
                      {user}
                    </Box>
                  </Grid>
                )
            )}
          </Grid>
        ))}
    </>
  );
}

export default DivideTeam;
