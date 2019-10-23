import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

export default function MainContent({
  userProps: { daily_goal },
  data_points,
  currIndex
}) {
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [calPercentage, setCalPercentage] = useState(0);
  const [breakfastCount, setBreakfastCount] = useState(0);
  const [lunchCount, setLunchCount] = useState(0);
  const [dinnerCount, setDinnerCount] = useState(0);
  const [snackCount, setSnackCount] = useState(0);

  const styleTopLine = {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    textTransform: "capitalize",
    fontWeight: "450"
  };

  const styleBottomLine = {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    color: "#686868"
  };

  useEffect(() => {
    calculateRealTimeStats(currIndex);
  }, [currIndex, data_points, daily_goal]);

  const calculateRealTimeStats = currIndex => {
    let lunchCounter = 0;
    let breakfastCounter = 0;
    let dinnerCounter = 0;
    let snackCounter = 0;
    let caloriesTotal = 0;

    data_points[currIndex].intake_list.map(item => {
      let itemCalories = 0;
      itemCalories = (item.serving_size / item.serving_qty) * item.nf_calories;
      caloriesTotal += itemCalories;

      if (item.meal_type.toLowerCase() === "breakfast") {
        breakfastCounter++;
      }
      if (item.meal_type.toLowerCase() === "lunch") {
        lunchCounter++;
      }
      if (item.meal_type.toLowerCase() === "dinner") {
        dinnerCounter++;
      }
      if (item.meal_type.toLowerCase() === "snack") {
        snackCounter++;
      }

      return item;
    });

    setCaloriesConsumed(Math.round(caloriesTotal));
    setBreakfastCount(breakfastCounter);
    setLunchCount(lunchCounter);
    setDinnerCount(dinnerCounter);
    setSnackCount(snackCounter);
    setCalPercentage(Math.round((caloriesTotal / daily_goal) * 100));
  };

  useEffect(() => {
    udpateCalorieCount();
  });

  const udpateCalorieCount = () => {
    let caloriesTotal = 0;

    data_points[currIndex].intake_list.map(item => {
      let itemCalories = 0;
      itemCalories = (item.serving_size / item.serving_qty) * item.nf_calories;
      caloriesTotal += itemCalories;

      return item;
    });

    if (caloriesConsumed !== Math.round(caloriesTotal)) {
      calculateRealTimeStats(currIndex);
    }
  };

  return (
    <div>
      <div>
        <div className="mobileProgressBarContainer">
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
              margin: "auto",
              paddingTop: "15px"
            }}
          >
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
          <Grid
            container
            justify="space-evenly"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
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
        <hr style={{ borderColor: "rgba(0,0,0,0.12)" }}></hr>
      </div>
      {/* Items List */}
      <div>
        <Grid item>
          <div>
            {data_points[currIndex].intake_list.map((item, index) => (
              <div className="itemCardContainer" key={index}>
                <img
                  src={item.thumb}
                  alt={item.food_name}
                  width={80}
                  height={80}
                ></img>
                <div className="content-div">
                  <div style={styleTopLine}>
                    <Typography>{item.food_name}</Typography>
                    <Typography>
                      {Math.round(
                        (item.serving_size / item.serving_qty) *
                          item.nf_calories
                      )}{" "}
                      cal
                    </Typography>
                  </div>
                  <div style={styleBottomLine}>
                    <p>
                      {item.serving_size} (
                      {Math.round(
                        (item.serving_size / item.serving_qty) *
                          item.serving_weight_grams
                      )}{" "}
                      g)
                    </p>
                    <p className="capitalize">{item.meal_type}</p>
                  </div>
                </div>
              </div>
            ))}
            <p></p>
          </div>
        </Grid>
      </div>
    </div>
  );
}
