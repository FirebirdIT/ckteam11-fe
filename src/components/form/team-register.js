import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, LinearProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Title from "../title/title";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
}));

export default function RegisterForm() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [ic, setIC] = useState("");
  const [team, setTeam] = useState("");
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
          console.log("data");
          if (
            result["success"] === true &&
            result["msg"] === "Data Retrieve Successfully"
          ) {
            setTeamList(result["data"]);
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

  // const onRegister = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // console.log(JSON.stringify({ username: username, password: password }));
  //   fetch(`${process.env.REACT_APP_API_KEY}/donation`, {
  //     // fetch(`${process.env.REACT_APP_API_KEY}/login`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       customer_name: customerName,
  //       amount: amount,
  //       description: description,
  //       username: localStorage.getItem("username"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (
  //           result["msg"] == "Record Successfully" &&
  //           result["success"] == true
  //         ) {
  //           setLoading(false);
  //           alert(result["msg"]);
  //           setCustomerName("");
  //           setAmount("");
  //           setDescription("");
  //         } else {
  //           setLoading(false);
  //           alert(result["msg"]);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         setLoading(false);
  //         alert("Record failed. Please try again.");
  //       }
  //     );
  // };
  // onSubmit={onRegister}
  return (
    <div className={classes.paper}>
      <Title>Register Form</Title>
      <form className={classes.form}>
        <Autocomplete
          options={teamList}
          getOptionLabel={(option) => option.username}
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
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="English Name"
          value={englishName}
          onChange={(e) => setEnglishName(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Chinese Name"
          value={chineseName}
          onChange={(e) => setChineseName(e.target.value)}
          autoFocus
        />
                <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Malay Name"
          value={malayName}
          onChange={(e) => setMalayName(e.target.value)}
          autoFocus
        />
                        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="SSM ID"
          value={teamSSMID}
          onChange={(e) => setTeamSSMID(e.target.value)}
          autoFocus
        /> */}
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
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        ) : (
          <LinearProgress className={classes.submit} />
        )}
      </form>
    </div>
  );
}
