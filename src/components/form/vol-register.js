import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, LinearProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
}));

export default function VolunteerRegister() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [ic, setIC] = useState("");
  const [team, setTeam] = useState("");
  const [icon, setIcon] = useState();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/user-list`,

      {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        // },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["success"] === true) {
            let temp = [];
            for (let index = 0; index < result["data"].length; index++) {
              temp.push(result["data"][index]["username"]);
            }
            setTeamList(temp);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const clearInput = () => {
    window.location.reload();
  };

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmedPassword) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("english_name", displayName);
      formData.append("address", address);
      formData.append("phone_no", phoneNo);
      formData.append("team", team);
      formData.append("ic", ic);
      formData.append("logo_file", icon);
      formData.append("password", password);
      //show formData values
      for (let [key, value] of formData) {
        console.log(`${key}: ${value}`);
      }

      fetch(`${process.env.REACT_APP_API_KEY}/volunteer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["success"] === true) {
              alert(result["msg"]);
              window.location.reload();
            } else {
              alert(result["msg"]);
            }
          },
          (error) => {
            console.log(error);

            alert("Record failed. Please try again.");
          }
        );
    } else {
      alert("The confirmed password is not the same as the password entered.");
    }
    setLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={onRegister}>
      <Button variant="contained" component="label" color="primary">
        Upload Logo Icon
        <input
          type="file"
          name={"icon"}
          onChange={(e) => {
            setIcon(e.target.files[0]);
          }}
          hidden
        />
      </Button>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Idenity Card Number"
        type="number"
        value={ic}
        onChange={(e) => setIC(e.target.value)}
      />
      <Autocomplete
        options={teamList}
        //   getOptionLabel={(option) => option.username}
        onChange={(event, value) => setTeam(value)}
        clearOnEscape
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Team"
            margin="normal"
            required
          />
        )}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Contact Number"
        type="number"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Confirmed Password"
        type="password"
        value={confirmedPassword}
        className={classes.submit}
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      {loading === false ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={clearInput}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      ) : (
        <LinearProgress className={classes.submit} />
      )}
    </form>
  );
}
