import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    marginBottom: theme.spacing(5),
  },
}));

export default function DonationForm() {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onDonate = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(JSON.stringify({ username: username, password: password }));
    fetch(`${process.env.REACT_APP_API_KEY}/donation`, {
      // fetch(`${process.env.REACT_APP_API_KEY}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        amount: amount,
        description: description,
        username: localStorage.getItem("username"),
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (
            result["msg"] === "Record Successfully" &&
            result["success"] === true
          ) {
            setLoading(false);
            alert(result["msg"]);
            setCustomerName("");
            setAmount("");
            setDescription("");
          } else {
            setLoading(false);
            alert(result["msg"]);
          }
        },
        (error) => {
          console.log(error);
          setLoading(false);
          alert("Record failed. Please try again.");
        }
      );
  };

  const clearInput = () => {
    setCustomerName("");
    setAmount("");
    setDescription("");
  };

  return (
    <form className={classes.form} onSubmit={onDonate}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Amount (RM)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Description"
        value={description}
        className={classes.submit}
        onChange={(e) => setDescription(e.target.value)}
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
              Cancel
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
