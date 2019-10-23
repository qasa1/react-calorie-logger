import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchBar from "./SearchBar";
import MainContent from "../MainContent";
import Avatar from "@material-ui/core/Avatar";
import MobileMainContent from "../MobileMainContent";
import Box from "@material-ui/core/Box";
import { AppConsumer } from "../AppProvider";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    color: "black",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchBox: {
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    minHeight: "3.2em",
    minWidth: "70vh"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  timeLineContainer: {
    width: "35%",
    justifyContent: "space-between",
    marginTop: "10px",
    alignItems: "center",
    margin: "auto",
    marginBottom: "10px"
  },
  timelineButton: {
    color: "white"
  }
}));

export default function PrimarySearchAppBar({
  history: {
    data_points,
    first_name,
    last_name,
    height_cm,
    weight_kg,
    daily_goal
  }
}) {
  const classes = useStyles();
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    setupHistory(data_points);
  }, [data_points]);

  const setupHistory = data_points => {
    let date = new Date();
    let dd;
    let mm;

    for (let i = 0; i < data_points.length; i++) {
      dd = date.getDate();
      mm = date.toLocaleString("default", { month: "long" });

      data_points[i]["date"] = `${dd} ${mm}`;

      date.setDate(date.getDate() - 1);
    }

    data_points[0]["date"] = `Today`;
    data_points[1]["date"] = `Yesterday`;
  };

  const scrollBack = () => {
    if (currIndex < data_points.length - 1) {
      setCurrIndex(currIndex + 1);
    }
  };

  const scrollForward = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
    }
  };

  const userProps = {
    first_name,
    last_name,
    height_cm,
    weight_kg,
    daily_goal
  };

  const contentProps = {
    userProps,
    currIndex
  };

  const styleWeigthAndHeight = {
    width: 50,
    height: 50,
    textAlign: "center",
    backgroundColor: "#2a3eb1",
    fontWeight: 300
  };

  const stylePorfilePic = {
    width: 50,
    height: 50
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.searchBox}>
          <Grid item className="searchBox">
            <SearchBar data_points={data_points} userProps={userProps} />
          </Grid>
          <Grid item>
            <div className={classes.grow} />
          </Grid>
        </Toolbar>

        <div className={classes.sectionDesktop}>
          <Grid container className={classes.timeLineContainer}>
            <Grid item>
              <IconButton
                className={classes.timelineButton}
                aria-label="left"
                onClick={scrollBack}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h5" gutterBottom>
                {data_points[currIndex]["date"]
                  ? data_points[currIndex]["date"]
                  : "Today"}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                className={classes.timelineButton}
                aria-label="right"
                onClick={scrollForward}
              >
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>

        <Box display={{ xs: "block", md: "none" }}>
          <div
            className={classes.sectionMobile}
            display={{ xs: "none", sm: "none", md: "none" }}
          >
            <div className="mobileUserStatsSection">
              <div className="picName">
                <Avatar
                  alt="Profile Picture"
                  src="img/profile-pic.jpg"
                  style={stylePorfilePic}
                />
                <Typography style={{ marginLeft: "10px" }}>Jane</Typography>
              </div>

              <div className="mobileWandH">
                <Avatar
                  style={{
                    marginRight: "10px",
                    width: 50,
                    height: 50,
                    textAlign: "center",
                    backgroundColor: "#2a3eb1",
                    fontWeight: 300
                  }}
                >
                  <Typography>
                    57 <br />
                    kg
                  </Typography>
                </Avatar>
                <Avatar style={styleWeigthAndHeight}>
                  <Typography>
                    163
                    <br />
                    cm
                  </Typography>
                </Avatar>
              </div>
            </div>
          </div>
        </Box>
      </AppBar>

      <Box display={{ xs: "block", md: "none" }}>
        <div className={classes.sectionMobile}>
          <Grid
            container
            style={{
              justifyContent: "space-between",
              paddingTop: "20px",
              alignItems: "center"
            }}
          >
            <Grid item>
              <IconButton
                color="primary"
                aria-label="left"
                onClick={scrollBack}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h5" gutterBottom>
                {data_points[currIndex]["date"]
                  ? data_points[currIndex]["date"]
                  : "Today"}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                aria-label="right"
                onClick={scrollForward}
              >
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </Box>

      <Box display={{ xs: "none", md: "block" }}>
        {/* Main Content Component - dependencies are data points array, current index and user profile data
            - based on that, it should display all items and the stats dynamically
          */}
        <AppConsumer>
          {context => (
            <MainContent {...contentProps} data_points={context.data_points} />
          )}
        </AppConsumer>
      </Box>

      <Box display={{ xs: "block", md: "none" }}>
        <AppConsumer>
          {context => (
            <MobileMainContent
              {...contentProps}
              data_points={context.data_points}
            />
          )}
        </AppConsumer>
      </Box>
    </div>
  );
}
