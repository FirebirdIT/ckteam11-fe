import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  LinearProgress,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(5),
  },
}));

export default function DonationForm() {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [donationType, setDonationType] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [state, setState] = useState({
    cash: false,
    medicine: false,
    coffin: false,
  });
  const [loading, setLoading] = useState(false);
  var now = new Date();

  const { cash, medicine, coffin } = state;

  const onDonate = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_KEY}/donation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        amount: amount,
        description: description,
        donation_type: donationType,
        cheque_no: chequeNo,
        email: email,
        coffin: coffin === true ? 1 : 0,
        medicine: medicine === true ? 1 : 0,
        cash_donation: cash === true ? 1 : 0,
        cust_phone_no: contactNumber,
        username: localStorage.getItem("username"),
        donation_date: moment(now.getTime()).format("YYYY-MM-DD hh:mm:ss"),
        role: localStorage.getItem("role"),
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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
        label="Contact Number"
        type="number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <FormControl component="fieldset" margin="normal" required>
        <FormLabel component="legend">Donation For</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={cash} onChange={handleChange} name="cash" />
            }
            label="Donation(Cash)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={medicine}
                onChange={handleChange}
                name="medicine"
              />
            }
            label="Medicine"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={coffin}
                onChange={handleChange}
                name="coffin"
              />
            }
            label="Coffin"
          />
        </FormGroup>
      </FormControl>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl required fullWidth variant="outlined" margin="normal">
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={donationType}
          onChange={(e) => setDonationType(e.target.value)}
          // onChange={handleDonationType}
          label="Payment Method"
          fullWidth
          required
        >
          <MenuItem value={0}>Cash</MenuItem>
          <MenuItem value={1}>Cheque</MenuItem>
          <MenuItem value={2}>QR Code</MenuItem>
        </Select>
      </FormControl>

      {donationType == "1" ? (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Cheque Number"
          type="number"
          value={chequeNo}
          onChange={(e) => setChequeNo(e.target.value)}
        />
      ) : donationType == "2" ? (
        <img src="/logo192.png" alt="null" />
      ) : null}
      <div className={classes.submit}>
        {loading == false ? (
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        ) : (
          <LinearProgress className={classes.submit} />
        )}
      </div>
    </form>
  );
}
