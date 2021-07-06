import { React, useState, useEffect } from "react";
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
  const [uploadImg, setUploadImg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      for (let [key, value] of formData) {
        console.log(`${key}: ${value}`);
      }

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
            上传团队图标
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
        label="英语名字"
        value={engName}
        onChange={(e) => setEngName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="华语名字"
        value={chineseName}
        onChange={(e) => setChineseName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="国语名字"
        value={malayName}
        onChange={(e) => setMalayName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="负责人"
        value={pic}
        onChange={(e) => setPic(e.target.value)}
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
        label="SSM号码"
        value={ssmId}
        onChange={(e) => setSsmId(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="银行名字"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="银行帐号用有者"
        value={bankOwnerName}
        onChange={(e) => setBankOwnerName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="银行帐号号码"
        type="number"
        value={bankAccNo}
        onChange={(e) => setBankAccNo(e.target.value)}
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
