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
  const [uploadImg, setUploadImg] = useState("");
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
    setUploadImg(`${process.env.PUBLIC_URL + "/default-img.jpg"}`);
  }, []);

  const clearInput = () => {
    window.location.reload();
  };

  const onImgChg = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUploadImg(URL.createObjectURL(event.target.files[0]));
      setIcon(event.target.files[0]);
    }
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
      // for (let [key, value] of formData) {
      //   console.log(`${key}: ${value}`);
      // }

      fetch(`${process.env.REACT_APP_API_KEY}/volunteer/register`, {
        method: "POST",
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
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={3}>
          <div>
            <img src={uploadImg} style={{ width: "100%" }} alt="null" />
          </div>
          <Button
            fullWidth
            variant="contained"
            component="label"
            color="primary"
          >
            上传志愿者图标
            <input type="file" name={"icon"} onChange={onImgChg} hidden />
          </Button>
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="姓名"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="身份证号码"
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
            label="所属团队"
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
        label="联络号码"
        type="number"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="地址"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="密码"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="确认密码"
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
              清除
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              提交
            </Button>
          </Grid>
        </Grid>
      ) : (
        <LinearProgress className={classes.submit} />
      )}
    </form>
  );
}
