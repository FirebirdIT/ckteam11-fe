import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MatEdit = ({ username, role }) => {
  const handleEditClick = () => {
    if (role == "volunteer") {
      localStorage.setItem("vUsername", username);
    } else {
      localStorage.setItem("tUsername", username);
    }
    window.location.href = `/${localStorage.getItem("role")}/user-info`;
  };

  return (
    <FormControlLabel
      control={
        <IconButton color="primary" onClick={handleEditClick}>
          <DescriptionIcon />
        </IconButton>
      }
    />
  );
};

const columns = [
  { field: "id", hide: true },
  { field: "role", hide: true },
  { field: "username", headerName: "用户名", width: 200 },
  { field: "english_name", headerName: "名字", width: 200 },
  {
    field: "address",
    headerName: "地址",
    width: 350,
  },
  {
    field: "phone_no",
    headerName: "联络号码",
    width: 200,
  },
  {
    field: "actions",
    headerName: "详细信息",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <MatEdit
            username={params.getValue(params.row.id, "username")}
            role={params.getValue(params.row.id, "role")}
          />
        </div>
      );
    },
  },
];

export default function UserTable() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [vUsers, setVUsers] = useState([]);
  const [userGroup, setUserGroup] = useState(0);

  let newData = users.map((d, i) => {
    return {
      id: i++,
      english_name: d.english_name,
      address: d.address,
      phone_no: d.phone_no,
      username: d.username,
      role: "team",
    };
  });

  let vData = vUsers.map((d, i) => {
    return {
      id: i++,
      english_name: d.english_name,
      address: d.address,
      phone_no: d.phone_no,
      username: d.username,
      role: "volunteer",
    };
  });

  useEffect(() => {
    localStorage.removeItem("vUsername");
    localStorage.removeItem("tUsername");
    fetch(`${process.env.REACT_APP_API_KEY}/user-list`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      // },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["success"] === true) {
            if (localStorage.getItem("role") === "team") {
              let temp = [];
              for (let index = 0; index < result["data"].length; index++) {
                if (
                  result["data"][index]["username"] ===
                  localStorage.getItem("username")
                ) {
                  for (
                    let j = 0;
                    j < result["data"][index]["volunteer"].length;
                    j++
                  ) {
                    temp.push(result["data"][index]["volunteer"][j]);
                  }
                }
              }
              setVUsers(temp);
            } else if (localStorage.getItem("role") === "admin") {
              let temp = [];
              for (let index = 0; index < result["data"].length; index++) {
                for (
                  let j = 0;
                  j < result["data"][index]["volunteer"].length;
                  j++
                ) {
                  temp.push(result["data"][index]["volunteer"][j]);
                }
              }
              setVUsers(temp);
              setUsers(result["data"]);
            }
          }
        },
        (error) => {
          console.log(error);
          //   setLoading(false);
        }
      );
  }, []);

  return (
    <React.Fragment>
      {/* <div style={{ width: "100%" }} className={classes.submit}>
       
      </div> */}

      <div style={{ height: 700, width: "100%" }} className={classes.submit}>
        {localStorage.getItem("role") === "admin" ? (
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ width: 250 }}
            size="small"
          >
            <InputLabel id="demo-simple-select-outlined-label">
              用户群
            </InputLabel>
            <Select
              value={userGroup}
              onChange={(e) => setUserGroup(e.target.value)}
              label="User Group"
            >
              <MenuItem value={0}>团队</MenuItem>
              <MenuItem value={1}>志愿者</MenuItem>
            </Select>
          </FormControl>
        ) : null}

        <DataGrid
          rows={
            userGroup === 1 || localStorage.getItem("role") === "team"
              ? vData
              : newData
          }
          columns={columns}
          pageSize={10}
          className={classes.submit}
        />
      </div>
    </React.Fragment>
  );
}
