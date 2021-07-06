import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  padding: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [engName, setEngName] = useState("");
  const [chineseName, setChineseName] = useState("");
  const [malayName, setMalayName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [ssmId, setSsmId] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankOwnerName, setBankOwnerName] = useState("");
  const [bankAccNo, setBankAccNo] = useState();
  const [pic, setPic] = useState("");
  const [ic, setIC] = useState("");
  const [team, setTeam] = useState("");
  const [icon, setIcon] = useState();
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingC, setLoadingC] = useState(true);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      localStorage.getItem("vUsername") != null
        ? `${process.env.REACT_APP_API_KEY}/volunteer/${localStorage.getItem(
            "vUsername"
          )}`
        : localStorage.getItem("tUsername") != null
        ? `${process.env.REACT_APP_API_KEY}/team/${localStorage.getItem(
            "tUsername"
          )}`
        : localStorage.getItem("role") === "team"
        ? `${process.env.REACT_APP_API_KEY}/team/${localStorage.getItem(
            "username"
          )}`
        : `${process.env.REACT_APP_API_KEY}/volunteer/${localStorage.getItem(
            "username"
          )}`,

      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["success"] === true) {
            // setProfileData(result["data"]);
            setUsername(result["data"]["username"]);
            setPassword(result["data"]["password"]);
            setEngName(result["data"]["english_name"]);
            setChineseName(result["data"]["chinese_name"]);
            setEngName(result["data"]["malay_name"]);
            setMalayName(result["data"]["username"]);
            setAddress(result["data"]["address"]);
            setPhoneNo(result["data"]["phone_no"]);
            setSsmId(result["data"]["team_ssm_id"]);
            setBankName(result["data"]["bank_name"]);
            setBankOwnerName(result["data"]["bank_owner_name"]);
            setBankAccNo(result["data"]["bank_account_number"]);
            setPic(result["data"]["pic"]);
            setIC(result["data"]["ic"]);
            setTeam(result["data"]["team"]);
          }
        },
        (error) => {
          console.log(error);
        }
      );

    fetch(`${process.env.REACT_APP_API_KEY}/user-list`, {
      method: "GET",
    })
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
    setLoadingC(false);
    setLoading(false);
  }, []);

  const handleEdit = () => {
    setEdit(false);
    localStorage.setItem("edit", edit);
  };

  const cancelEdit = () => {
    setEdit(true);
  };

  const onEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    let URL = "";
    formData.append("username", username);
    formData.append("password", password);
    formData.append("english_name", engName);
    formData.append("address", address);
    formData.append("phone_no", phoneNo);
    // formData.append("logo_file", icon);
    if (localStorage.getItem("role") === "team") {
      formData.append("chinese_name", chineseName);
      formData.append("malay_name", malayName);
      formData.append("pic", pic);
      formData.append("team_ssm_id", ssmId);
      formData.append("logo_file", icon);
      formData.append("bank_name", bankName);
      formData.append("bank_owner_name", bankOwnerName);
      formData.append("bank_account_number", bankAccNo);
      URL = `${process.env.REACT_APP_API_KEY}/team/edit`;
    } else if (localStorage.getItem("role") === "volunteer") {
      formData.append("team", team);
      formData.append("ic", ic);
      URL = `${process.env.REACT_APP_API_KEY}/volunteer/edit`;
    }

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["success"] === true) {
            alert(result["msg"]);
            setEdit(true);
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
  };

  return (
    <React.Fragment>
      {loading == false ? (
        <div className={classes.padding}>
          {loadingC === false ? (
            <form onSubmit={onEdit}>
              {localStorage.getItem("vUsername") === null &&
              localStorage.getItem("tUsername") === null
                ? edit && (
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      onClick={handleEdit}
                    >
                      编辑
                    </Button>
                  )
                : null}
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  label="用户名"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={username}
                  helperText={edit === false ? "不可编辑" : null}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                />
              </div>
              <TextField
                fullWidth
                margin="normal"
                label="英语名字"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: edit,
                }}
                value={engName}
                required
                onChange={(e) => setEngName(e.target.value)}
                variant="outlined"
              />
              {localStorage.getItem("role") === "volunteer" ||
              localStorage.getItem("vUsername") != null ? (
                <div>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="身份证号码"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    value={ic}
                    helperText={edit === false ? "不可编辑" : null}
                    required
                    onChange={(e) => setIC(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="所属团队"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText={edit === false ? "不可编辑" : null}
                    value={team}
                    required
                    onChange={(e) => setTeam(e.target.value)}
                    variant="outlined"
                  />
                </div>
              ) : null}
              {localStorage.getItem("role") === "admin" ||
              (localStorage.getItem("role") === "team" &&
                localStorage.getItem("vUsername") === null) ? (
                <div>
                  {" "}
                  <TextField
                    fullWidth
                    margin="normal"
                    label="华语名字"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: edit,
                    }}
                    value={chineseName}
                    required
                    onChange={(e) => setChineseName(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="国语名字"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: edit,
                    }}
                    value={malayName}
                    required
                    onChange={(e) => setMalayName(e.target.value)}
                    variant="outlined"
                  />
                </div>
              ) : null}
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  label="地址"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: edit,
                  }}
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="联络号码"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: edit,
                  }}
                  value={phoneNo}
                  required
                  onChange={(e) => setPhoneNo(e.target.value)}
                  variant="outlined"
                />
              </div>
              {localStorage.getItem("role") === "admin" ||
              (localStorage.getItem("role") === "team" &&
                localStorage.getItem("vUsername") === null) ? (
                <div>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="SSM号码"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: edit,
                    }}
                    value={ssmId}
                    required
                    onChange={(e) => setSsmId(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="银行名字"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: edit,
                    }}
                    value={bankName}
                    required
                    onChange={(e) => setBankName(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="银行账号拥有者"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: edit,
                    }}
                    value={bankOwnerName}
                    required
                    onChange={(e) => setBankOwnerName(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="银行账号号码"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: edit,
                    }}
                    value={bankAccNo}
                    required
                    onChange={(e) => setBankAccNo(e.target.value)}
                    variant="outlined"
                  />
                </div>
              ) : null}
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  className={classes.submit}
                  label="密码"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: edit,
                  }}
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
              </div>
              {edit === false ? (
                loading === false ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={cancelEdit}
                      >
                        取消
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        提交
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <LinearProgress />
                )
              ) : null}
            </form>
          ) : (
            <LinearProgress />
          )}
        </div>
      ) : (
        <LinearProgress className={classes.submit} />
      )}
    </React.Fragment>
  );
}
