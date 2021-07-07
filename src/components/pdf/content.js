import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import moment from "moment";

const chineseTheme = createMuiTheme({
  typography: {
    fontFamily: "Noto Serif SC",
  },
});

const englishTheme = createMuiTheme({
  typography: {
    fontFamily: "Crimson Text",
  },
});

const signTheme = createMuiTheme({
  typography: {
    fontFamily: "Alex Brush",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/mintGreen-bg.jpg"})`,
    backgroundPosition: "stretch",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  contentPadding: {
    padding: theme.spacing(2, 3),
  },
  imageSize: {
    width: "35mm",
    height: "50mm",
    overflow: "hidden",
  },
  teamImage: {
    padding: theme.spacing(4),
  },
  space: {
    paddingTop: theme.spacing(5),
  },
  signPadding: {
    padding: theme.spacing(1, 0),
  },
  paperContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(2, 3),
    opacity: 0.8,
  },
  submit: {
    marginTop: theme.spacing(5),
  },
}));

export default function PdfContent() {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  var profilePic = `${
    process.env.REACT_APP_API_KEY
  }/icon/volunteer/${localStorage.getItem("username")}`;

  var now = moment().tz("Asia/Kuala_Lumpur").format("Do MMMM YYYY");

  var after = moment()
    .tz("Asia/Kuala_Lumpur")
    .add(4, "months")
    .format("Do MMMM YYYY");

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_KEY}/certificate/${localStorage.getItem(
        "username"
      )}`,
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
          if (result["success"] === true) {
            setContent(result["data"]);
            console.log(result["data"]);
          } else {
            console.log("error printing");
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
        <Paper className={classes.bg} elevation={0}>
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.contentPadding}
            >
              <Grid item xs={3}>
                <div>
                  <img
                    src={`${process.env.REACT_APP_API_KEY}/icon/team/${content.team_username}`}
                    style={{ width: "100%" }}
                    alt="null"
                  />
                </div>
              </Grid>
              <Grid item xs={7}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  className={classes.teamImage}
                >
                  <ThemeProvider theme={chineseTheme}>
                    <Grid item xs={12}>
                      <Typography variant="h3" fullwidth>
                        {content.team_chinese_name}
                      </Typography>
                    </Grid>
                  </ThemeProvider>
                  <ThemeProvider theme={englishTheme}>
                    <Grid item xs={12}>
                      <Typography variant="h4" style={{ fontWeight: 700 }}>
                        {content.team_english_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" style={{ fontWeight: 700 }}>
                        {content.team_malay_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5" style={{ fontWeight: 700 }}>
                        {content.team_address}
                      </Typography>
                    </Grid>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <ThemeProvider theme={englishTheme}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 700 }}
                    gutterBottom
                  >
                    TO WHOM IT MAY CONCERN
                  </Typography>
                </Grid>
              </ThemeProvider>
              <Grid item xs={12}>
                <div className={classes.imageSize}>
                  <img src={profilePic} style={{ width: "100%" }} alt="null" />
                </div>
              </Grid>
            </Grid>

            <Paper elevation={0} className={classes.paperContent}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Dear Sir/Mnpm install html2canvaadam,
                  </Typography>
                  <Typography variant="subtitle2" style={{ fontWeight: 800 }}>
                    Sub: Letter of Authorization
                  </Typography>
                  <Typography variant="subtitle2" paragraph>
                    Valid for Four Month, from {now} to {after}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    This letter is to authorize
                  </Typography>
                  <Typography variant="subtitle2" style={{ fontWeight: 800 }}>
                    Name： {content.volunteer_english_name}
                  </Typography>
                  <Typography variant="subtitle2" style={{ fontWeight: 800 }}>
                    NRIC： {content.volunteer_ic}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontWeight: 800 }}
                    paragraph
                  >
                    Designation： Volunteer
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" paragraph component="div">
                    This letter is to{" "}
                    <Box fontWeight="fontWeightBold" display="inline">
                      {content.volunteer_english_name}
                    </Box>{" "}
                    on behalf of our organisation,{" "}
                    <Box fontWeight="fontWeightBold" display="inline">
                      "{content.team_english_name}"
                    </Box>
                    , to handle the following duties and responsibilities.
                  </Typography>
                  <Typography variant="subtitle2" paragraph component="div">
                    To go around: advertise, promote, and consolidate on behalf
                    of{" "}
                    <Box fontWeight="fontWeightBold" display="inline">
                      "{content.team_english_name}"
                    </Box>{" "}
                    in order to promote and publicise at public to meet the
                    organization's high monthly operational expenses.
                  </Typography>
                  <Typography variant="subtitle2" paragraph>
                    We would like to take this opportunity to thank you for your
                    kindness, cooperation, and support.
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2">Yours truly,</Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: 800 }}
                    gutterBottom
                  >
                    {content.team_english_name}
                  </Typography>

                  <ThemeProvider theme={signTheme}>
                    <Typography variant="h5" className={classes.signPadding}>
                      LK
                    </Typography>
                  </ThemeProvider>

                  <Typography variant="subtitle2" component="div">
                    <Box fontWeight="fontWeightBold" display="inline">
                      LK,
                    </Box>{" "}
                    Incharge
                  </Typography>
                  <Typography variant="subtitle2" style={{ fontWeight: 800 }}>
                    H/P: {content.team_contact_number}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Paper>
      ) : (
        <LinearProgress className={classes.submit} />
      )}
    </React.Fragment>
  );
}
