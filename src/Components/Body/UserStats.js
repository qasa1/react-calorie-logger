import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

const styles = {
  background: "#F0F0F0",
  height: "100%"
};

const styleTopCard = {
  display: "flex",
  width: "70%",
  margin: "auto",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "20px"
};

const stylePorfilePic = {
  width: 100,
  height: 100,
  margin: "0 26px"
};

const styleWeigthAndHeight = {
  width: 60,
  height: 60,
  textAlign: "center",
  backgroundColor: "#808080",
  fontWeight: 300
};

const styleName = {
  fontWeight: "400",
  fontSize: "25px"
};

export default ({
  first_name,
  last_name,
  height_cm,
  weight_kg,
  daily_goal,
  caloriesConsumed,
  breakfastCount,
  lunchCount,
  dinnerCount,
  snackCount,
  calPercentage
}) => {
  return (
    <div style={styles}>
      <div style={styleTopCard}>
        <Avatar style={styleWeigthAndHeight}>
          {weight_kg} <br></br>kg
        </Avatar>
        <Avatar
          alt="Profile Picture"
          src="img/profile-pic.jpg"
          style={stylePorfilePic}
        />
        <Avatar style={styleWeigthAndHeight}>
          {height_cm} <br></br>cm
        </Avatar>
      </div>
      <Grid container justify="center">
        <p style={styleName}>
          {first_name} {last_name}
        </p>
      </Grid>
      <hr></hr>
      <div className="progressBarContainer">
        <div className="calConsumed">{caloriesConsumed}</div>
        <div className="calGoal">{daily_goal}</div>
      </div>
      <div className="calCaptions">
        <div className="col-gr-font font-13">consumed</div>
        <div className="col-gr-font font-13">daily goal</div>
      </div>
      <LinearProgress
        variant="determinate"
        value={calPercentage}
        style={{ width: "90%", margin: "auto" }}
      />
      <div className="percentage col-gr-font font-13">
        <strong>{calPercentage}%</strong>
      </div>
      <Grid container justify="space-evenly">
        <Grid item>
          <p>
            <strong>{breakfastCount}</strong>
          </p>
          <p>Breakfast</p>
        </Grid>
        <Grid item>
          <p>
            <strong>{lunchCount}</strong>
          </p>
          <p>Lunch</p>
        </Grid>
        <Grid item>
          <p>
            <strong>{dinnerCount}</strong>
          </p>
          <p>Dinner</p>
        </Grid>
        <Grid item>
          <p>
            <strong>{snackCount}</strong>
          </p>
          <p>Snack</p>
        </Grid>
      </Grid>
    </div>
  );
};
