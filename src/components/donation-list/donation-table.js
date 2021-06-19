import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";

var moment = require("moment-timezone");

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const columns = [
  { field: "datetime", headerName: "DateTime", width: 200, identity: true },
  { field: "customer_name", headerName: "Customer Name", width: 200 },
  {
    field: "amount",
    headerName: "Amount (RM)",
    width: 200,
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
    width: 350,
  },
];

export default function DonationTable() {
  const classes = useStyles();
  const [donation, setDonation] = useState([]);
  let newData = donation.map((d, i) => {
    return {
      id: i++,
      amount: parseFloat(d.amount).toFixed(2),
      customer_name: d.customer_name,
      datetime: moment(moment.utc(d.datetime).valueOf())
        .tz("Asia/Kuala_Lumpur")
        .format("YYYY-MM-DD HH:mm:ss"),
      description: d.description,
      username: d.username,
    };
  });

  useEffect(() => {
    fetch(
      localStorage.getItem("role") === "admin"
        ? `${process.env.REACT_APP_API_KEY}/donation-list`
        : `${process.env.REACT_APP_API_KEY}/volunteer`,
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
          if (result["success"] === true) {
            setDonation(result["data"]);
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
