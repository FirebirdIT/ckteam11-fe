import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  FormControlLabel,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

var moment = require("moment-timezone");

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MatEdit = ({ index }) => {
  const handleEditClick = () => {
    window.location.href = `${process.env.REACT_APP_API_KEY}/pdf/${index}`;
  };

  return (
    <FormControlLabel
      control={
        <IconButton
          color="primary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <DescriptionIcon />
        </IconButton>
      }
    />
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 200, hide: true },
  { field: "datetime", headerName: "日期", width: 200 },
  { field: "customer_name", headerName: "客户姓名", width: 200 },
  {
    field: "amount",
    headerName: "数额 (RM)",
    width: 170,
  },
  {
    field: "username",
    headerName: "用户名",
    width: 200,
  },
  {
    field: "description",
    headerName: "注解",
    sortable: false,
    width: 250,
  },
  {
    field: "actions",
    headerName: "收据",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <MatEdit index={params.row.id} />
        </div>
      );
    },
  },
];

export default function DonationTable() {
  const classes = useStyles();
  const [donation, setDonation] = useState([]);
  const [loading, setLoading] = useState(false);
  let newData = donation.map((d, i) => {
    return {
      id: d.id,
      amount: parseFloat(d.amount).toFixed(2),
      customer_name: d.customer_name,
      datetime: moment(d.datetime)
        .tz("Asia/Kuala_Lumpur")
        .format("YYYY-MM-DD HH:mm:ss"),
      description: d.description,
      username: d.username,
    };
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_KEY}/donation-list`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      // },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["success"] === true) {
            if (
              localStorage.getItem("role") === "volunteer" ||
              localStorage.getItem("role") === "team"
            ) {
              let temp = [];

              for (let i = 0; i < result["data"].length; i++) {
                if (localStorage.getItem("vUsername") === null) {
                  if (
                    result["data"][i]["username"] ===
                    localStorage.getItem("username")
                  ) {
                    temp.push(result["data"][i]);
                  }
                } else {
                  if (
                    result["data"][i]["username"] ===
                    localStorage.getItem("vUsername")
                  ) {
                    temp.push(result["data"][i]);
                  }
                }
              }
              setDonation(temp);
            } else if (localStorage.getItem("role") === "admin") {
              let temp = [];

              if (localStorage.getItem("vUsername") === null) {
                for (let i = 0; i < result["data"].length; i++) {
                  if (
                    result["data"][i]["username"] ===
                    localStorage.getItem("tUsername")
                  ) {
                    temp.push(result["data"][i]);
                  }
                }
                setDonation(temp);
                console.log(temp);
              } else if (localStorage.getItem("tUsername") === null) {
                for (let i = 0; i < result["data"].length; i++) {
                  if (
                    result["data"][i]["username"] ===
                    localStorage.getItem("vUsername")
                  ) {
                    temp.push(result["data"][i]);
                  }
                  setDonation(temp);
                }
              } else {
                setDonation(result["data"]);
              }
            }
          }
        },
        (error) => {
          console.log(error);
          //   setLoading(false);
        }
      );
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      {loading == false ? (
        <div style={{ height: 500, width: "100%" }} className={classes.submit}>
          <DataGrid rows={newData} columns={columns} pageSize={10} />
        </div>
      ) : (
        <LinearProgress className={classes.submit} />
      )}
    </React.Fragment>
  );
}
