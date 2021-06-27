import { React, useState, useEffect } from "react";
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
  const [profileData, setProfileData] = useState([]);
  // const [username, setUsername] = useState("");

  useEffect(() => {
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
            setProfileData(result["data"]);
            console.log(result["data"]);
          }
        },
        (error) => {
          console.log(error);
          //   setLoading(false);
        }
      );
  }, []);

  return (
    <div className={classes.padding}>
      <div>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
          value={profileData.username}
          variant="outlined"
        />
      </div>
      <TextField
        fullWidth
        margin="normal"
        label={
          localStorage.getItem("role") === "admin" ||
          (localStorage.getItem("vUsername") === null &&
            localStorage.getItem("role") === "team")
            ? "English Name"
            : "Name"
        }
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
        }}
        value={profileData.english_name}
        variant="outlined"
      />
      {localStorage.getItem("role") === "volunteer" ||
      localStorage.getItem("vUsername") != null ? (
        <div>
          <TextField
            fullWidth
            margin="normal"
            label="Identity Card Number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.ic}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Team"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.team}
            variant="outlined"
          />
        </div>
      ) : null}
      {localStorage.getItem("role") === "admin" ||
      (localStorage.getItem("vUsername") === null &&
        localStorage.getItem("role") === "team") ? (
        <div>
          {" "}
          <TextField
            fullWidth
            margin="normal"
            label="Chinese Name"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.chinese_name}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Malay Name"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.malay_name}
            variant="outlined"
          />
        </div>
      ) : null}
      <div>
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
          value={profileData.address}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contact Number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
          value={profileData.phone_no}
          variant="outlined"
        />
      </div>
      {localStorage.getItem("role") === "admin" ||
      (localStorage.getItem("vUsername") === null &&
        localStorage.getItem("role") === "team") ? (
        <div>
          <TextField
            fullWidth
            margin="normal"
            label="Team SSM ID"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.team_ssm_id}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bank Name"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.bank_name}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bank Owner Name"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.bank_owner_name}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bank Account Number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            value={profileData.bank_account_number}
            variant="outlined"
          />
        </div>
      ) : null}
    </div>
  );
}
