import React, { useRef, useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// hooks
import { useMembers } from "../hooks/useMembers";

export const Person = () => {
  const [userName, setUserName] = useState("");
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");

  const [members, { addMember, deleteMember }] = useMembers();

  // functions
  const handlePersonAddEvent = () => {
    if (userName === "") {
      setInputError(true);
      setInputErrorText("入力必須です");
      return;
    } else if (members.findIndex(({ option }) => option === userName) !== -1) {
      setInputError(true);
      setInputErrorText("同じ名前が存在します");
      return;
    }
    setUserName("");
    setInputError(false);
    setInputErrorText("");
    addMember({ option: userName });
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleDeletePerson = (index: number) => {
    deleteMember(index);
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="inputPerson"
            label="参加者"
            variant="outlined"
            value={userName}
            onChange={handleUserNameChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.keyCode === 13) {
                handlePersonAddEvent();
              }
            }}
            error={inputError}
            inputRef={inputRef}
            helperText={inputErrorText}
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  size="large"
                  edge="start"
                  onClick={handlePersonAddEvent}
                >
                  <AddCircleIcon />
                </IconButton>
              ),
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <List>
          {members.map((v, i) => {
            return (
              <ListItem
                key={v.option}
                divider={true}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeletePerson(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={v.option}
                  primaryTypographyProps={{
                    width: "160px",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
