import { useRef, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useSound from "use-sound";
import RollSound from "../assets/roll.mp3";
import StopSound from "../assets/stop.mp3";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

// components
import { Person } from "./Person";
import Roulette from "./Roulette";
import DivideTeam from "./DivideTeam";
import SortMember from "./SortMember";

//custom hooks
import { useMembers } from "../hooks/useMembers";

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#A1341B"];

export default function Ordering() {
  // variables & hooks

  const [playRollSound] = useSound(RollSound);
  const [playStopSound] = useSound(StopSound);

  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = useState(false);

  const [value, setValue] = useState("1");

  const [members] = useMembers();

  // functions
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const startRoll = () => {
    playRollSound();
    setConfetti(false);
  };

  const stopRoll = () => {
    playStopSound();
    setConfetti(true);
  };

  const startRollAndStop = async () => {
    setConfetti(false);
    playRollSound();
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    playStopSound();
    setConfetti(true);
  };

  return (
    <>
      {/* <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={7}> */}
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered>
              <Tab value="1" label="参加者" />
              <Tab value="2" label="ルーレット" />
              <Tab value="3" label="チーム決め" />
              <Tab value="4" label="順番決め" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Person />
          </TabPanel>
          <TabPanel value="2">
            <Roulette
              // members={members}
              backgroundColors={backgroundColors}
              startRoll={startRoll}
              stopRoll={stopRoll}
            />
          </TabPanel>
          <TabPanel value="3">
            <DivideTeam backgroundColors={backgroundColors} />
          </TabPanel>
          <TabPanel value="4">
            {members.length > 0 && (
              <SortMember startRollAndStop={startRollAndStop} />
            )}
          </TabPanel>
        </TabContext>
        {/* </Grid>
      </Grid> */}
      </Box>
      {confetti && <Confetti width={width} height={height} recycle={false} />}
    </>
  );
}
