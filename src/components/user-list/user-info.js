import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import { FormControlLabel, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MatEdit = ({ volunteer }) => {
  const handleEditClick = () => {
    alert(volunteer);
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
  { field: "username", headerName: "Username", width: 200, hide: true },
  { field: "english_name", headerName: "Name", width: 200 },
  {
    field: "chinese_name",
    headerName: "Chinese Name",
    width: 200,
  },
  {
    field: "malay_name",
    headerName: "Malay Name",
    width: 200,
  },
  { field: "address", headerName: "Address", width: 200 },
  {
    field: "phone_no",
    headerName: "Contact Number",
    type: "number",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Action",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <MatEdit index={params.row.volunteer} />
        </div>
      );
    },
  },
];

export default function UserTable() {
  const classes = useStyles();
  const [donation, setDonation] = useState([]);
  let newData = donation.map((d, i) => {
    return {
      id: d.id,
      amount: parseFloat(d.amount).toFixed(2),
      chinese_name: d.chinese_name,
      english_name: d.english_name,
      malay_name: d.malay_name,
      address: d.address,
      phone_no: d.phone_no,
      username: d.username,
    };
  });

  useEffect(() => {
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
