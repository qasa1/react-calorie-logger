import React, { Component } from "react";
import diet from "../store.js";
const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_points: diet.data_points,
      addNewItem: (item, weight_grams, calories, serving_size, category) => {
        let data = item.pop();
        const newItem = {
          food_name: data.food_name,
          serving_unit: data.serving_unit,
          serving_weight_grams: weight_grams,
          serving_qty: data.serving_qty,
          nf_calories:  calories,
          serving_size: serving_size,
          meal_type: category,
          thumb: data.photo.thumb
        };

        console.log('new', newItem);
        this.state.data_points[0].intake_list.push(newItem);

        this.setState({
          data_points: this.state.data_points
        });
      }
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

export const AppConsumer = AppContext.Consumer;
