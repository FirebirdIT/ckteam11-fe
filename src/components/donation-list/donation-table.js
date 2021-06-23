import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import { FormControlLabel, IconButton } from "@material-ui/core";

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
  { field: "datetime", headerName: "DateTime", width: 200 },
  { field: "customer_name", headerName: "Customer Name", width: 200 },
  {
    field: "amount",
    headerName: "Amount (RM)",
    width: 170,
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 250,
  },
  {
    field: "actions",
    headerName: "Receipt",
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

              if (localStorage.getItem("vUsername") != null) {
                for (let i = 0; i < result["data"].length; i++) {
                  if (
                    result["data"][i]["username"] ===
                    localStorage.getItem("vUsername")
                  ) {
                    temp.push(result["data"][i]);
                  }
                }
                setDonation(temp);
              } else if (localStorage.getItem("tUsername") != null) {
                for (let i = 0; i < result["data"].length; i++) {
                  if (
                    result["data"][i]["username"] ===
                    localStorage.getItem("tUsername")
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
  }, []);

  return (
    <div style={{ height: 500, width: "100%" }} className={classes.submit}>
      <DataGrid rows={newData} columns={columns} pageSize={10} />
    </div>
  );
}
