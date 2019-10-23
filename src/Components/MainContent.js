import React, { useState, useEffect} from "react";
import UserStats from "./Body/UserStats";
import Grid from "@material-ui/core/Grid";


export default function MainContent({
  userProps: { first_name, last_name, height_cm, weight_kg, daily_goal },
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

  const userStatsProps = {
    first_name,
    last_name,
    height_cm,
    weight_kg,
    daily_goal
  };

  const calculateRealTimeStats = (currIndex) => {
    let lunchCounter = 0;
    let breakfastCounter = 0;
    let dinnerCounter = 0;
    let snackCounter = 0;
    let caloriesTotal = 0;

    data_points[currIndex].intake_list.map(item => {
      let itemCalories = 0;
      itemCalories =
        (item.serving_size / item.serving_qty) * item.nf_calories;
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
    udpateCalorieCount()
  })

  const udpateCalorieCount = () => {
    let caloriesTotal = 0;
    
    data_points[currIndex].intake_list.map(item => {
      let itemCalories = 0;
      itemCalories =
        (item.serving_size / item.serving_qty) * item.nf_calories;
      caloriesTotal += itemCalories;

      return item;
    });

    if (caloriesConsumed !== Math.round(caloriesTotal)) {
      calculateRealTimeStats(currIndex);
    }
  }

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={4}>
          <UserStats
            {...userStatsProps}
            caloriesConsumed={caloriesConsumed}
            breakfastCount={breakfastCount}
            lunchCount={lunchCount}
            dinnerCount={dinnerCount}
            snackCount={snackCount}
            calPercentage={calPercentage}
          />
        </Grid>

        <Grid item xs={8}>
          <div>
            {data_points[currIndex].intake_list.map((item, index) => (
              <div className="itemCardContainer" key={index}>
                <img
                  src={item.thumb}
                  alt={item.food_name}
                  width={100}
                  height={100}
                ></img>
                <div className="content-div">
                  <div style={styleTopLine}>
                    <p>{item.food_name}</p>
                    <p>
                      {Math.round(
                        (item.serving_size / item.serving_qty) *
                          item.nf_calories
                      )}{" "}
                      cal
                    </p>
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
      </Grid>
    </div>
  );
}
