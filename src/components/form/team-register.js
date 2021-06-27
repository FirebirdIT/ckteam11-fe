import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  const [engName, setEngName] = useState("");
  const [chineseName, setChineseName] = useState("");
  const [malayName, setMalayName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [ssmId, setSsmId] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankOwnerName, setBankOwnerName] = useState("");
  const [bankAccNo, setBankAccNo] = useState();
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);

  const clearInput = () => {
    window.location.reload();
  };

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmedPassword) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("english_name", engName);
      formData.append("address", address);
      formData.append("phone_no", phoneNo);
      formData.append("chinese_name", chineseName);
      formData.append("malay_name", malayName);
      formData.append("pic", pic);
      formData.append("team_ssm_id", ssmId);
      formData.append("logo_file", icon);
      formData.append("bank_name", bankName);
      formData.append("bank_owner_name", bankOwnerName);
      formData.append("bank_account_number", bankAccNo);

      fetch(`${process.env.REACT_APP_API_KEY}/team/register`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (
              result["msg"] === `${username} registered successfully` ||
              result["success"] === true
            ) {
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
      setLoading(false);
    } else {
      alert("The confirmed password is not the same as the password entered.");
    }
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
        label="English Name"
        value={engName}
        onChange={(e) => setEngName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Chinese Name"
        value={chineseName}
        onChange={(e) => setChineseName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Malay Name"
        value={malayName}
        onChange={(e) => setMalayName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Person in Charge"
        value={pic}
        onChange={(e) => setPic(e.target.value)}
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
        label="SSM ID"
        value={ssmId}
        onChange={(e) => setSsmId(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Bank Name"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Bank Owner"
        value={bankOwnerName}
        onChange={(e) => setBankOwnerName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Bank Account Number"
        type="number"
        value={bankAccNo}
        onChange={(e) => setBankAccNo(e.target.value)}
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
