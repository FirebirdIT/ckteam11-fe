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
  const [contactNumber, setContactNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState(0);
  const [chequeNo, setChequeNo] = useState("");
  const [state, setState] = useState({
    cash: false,
    medicine: false,
    coffin: false,
  });
  const [loading, setLoading] = useState(false);

  const { cash, medicine, coffin } = state;

  const onDonate = (e) => {
    e.preventDefault();
    setLoading(true);
    let URL = "";
    if (localStorage.getItem("role") == "team") {
      URL = `${process.env.REACT_APP_API_KEY}/donation/team`;
    } else {
      URL = `${process.env.REACT_APP_API_KEY}/donation/volunteer`;
    }
    alert('Sending Email, Please Wait')
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        amount: amount,
        donation_type: donationType,
        cheque_no: chequeNo,
        email: email,
        coffin: coffin === true ? 1 : 0,
        medicine: medicine === true ? 1 : 0,
        cash_donation: cash === true ? 1 : 0,
        cust_phone_no: contactNumber,
        username: localStorage.getItem("username"),
        donation_datetime: moment()
          .tz("Asia/Kuala_Lumpur")
          .format("YYYY-MM-DD hh:mm:ss"),
        role: localStorage.getItem("role"),
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["success"] === true) {
            alert(result["msg"]);
            setCustomerName("");
            setEmail("");
            setContactNumber("");
            setDonationType(0);
            setAmount("");
            setChequeNo("");
            setState({ cash: false, medicine: false, coffin: false });
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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const clearInput = () => {
    setCustomerName("");
    setEmail("");
    setContactNumber("");
    setDonationType(0);
    setAmount("");
    setChequeNo("");
    setState({ cash: false, medicine: false, coffin: false });
  };

  return (
    <form className={classes.form} onSubmit={onDonate}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="客户姓名"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="联络号码"
        type="number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="电子邮件"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="数额 (RM)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <FormControl component="fieldset" margin="normal" required>
        <FormLabel component="legend">捐赠给</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={cash} onChange={handleChange} name="cash" />
            }
            label="银额捐款"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={medicine}
                onChange={handleChange}
                name="medicine"
              />
            }
            label="施药"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={coffin}
                onChange={handleChange}
                name="coffin"
              />
            }
            label="施棺"
          />
        </FormGroup>
      </FormControl>
      <FormControl required fullWidth variant="outlined" margin="normal">
        <InputLabel>付款方式</InputLabel>
        <Select
          value={donationType}
          onChange={(e) => setDonationType(e.target.value)}
          // onChange={handleDonationType}
          label="付款方式"
          fullWidth
          required
        >
          <MenuItem value={0}>现金</MenuItem>
          <MenuItem value={1}>支票</MenuItem>
          <MenuItem value={2}>二维码</MenuItem>
          <MenuItem value={3}>銀行戶口</MenuItem>
        </Select>
      </FormControl>

      {donationType == "1" ? (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Cheque Number"
          value={chequeNo}
          onChange={(e) => setChequeNo(e.target.value)}
        />
      ) : donationType == "2" ? (
        <img src="/logo192.png" alt="null" />
      ) : donationType == "3" ? (
          <>
            <h4>Pertubuhan Kebajikan Orang Tua Xiao Xin </h4>
            <h4>8881034592429</h4>
            <h4>Ambank</h4>
          </>
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
                Clear
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
          <LinearProgress className={classes.submit} />
        )}
      </div>
    </form>
  );
}
