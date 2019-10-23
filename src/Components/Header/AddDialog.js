import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { AppConsumer } from "../AppProvider";

export default class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: "https://trackapi.nutritionix.com/v2/natural/nutrients",
      appKey: "5255da8cc843f889628014699e8f02f9",
      appId: "09bdfb62",
      itemWeightGrams: 0,
      itemCalories: 0
    };
  }

  componentDidMount() {
    if (!this.props.item[this.props.item.length - 1].nix_item_id) {
      this.makeCommonFoodsApiRequest();
    } else {
      this.makeBrandedFoodsApiRequest(
        this.props.item[this.props.item.length - 1].nix_item_id
      );
    }

    this.setState({
      serving_size: this.props.item[this.props.item.length - 1].serving_qty,
      category: "Breakfast"
    });
  }

  makeCommonFoodsApiRequest = () => {
    let headers = {
      "x-app-id": this.state.appId,
      "x-app-key": this.state.appKey
    };

    axios
      .post(
        `${this.state.apiUrl}`,
        { query: this.props.item[this.props.item.length - 1].food_name },
        { headers: headers }
      )
      .then(res => {
        this.setState({
          itemWeightGrams: Math.round(res.data.foods[0].serving_weight_grams),
          itemCalories: Math.round(res.data.foods[0].nf_calories)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  makeBrandedFoodsApiRequest = nix => {
    let headers = {
      "x-app-id": this.state.appId,
      "x-app-key": this.state.appKey
    };

    axios
      .get(
        `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${nix}`,
        { headers: headers }
      )
      .then(res => {
        this.setState({
          itemWeightGrams: Math.round(res.data.foods[0].serving_weight_grams),
          itemCalories: Math.round(res.data.foods[0].nf_calories)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        {/* Add Dialog Section Start */}
        <Dialog
          onClose={() => this.props.handleClose(false)}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogContent dividers>
            <Grid container alignItems="center" spacing={2} style={{justifyContent: 'space-between'}}>
              <Grid item>
                <img style={{width: '80px'}}
                  src={this.props.item[this.props.item.length - 1].photo.thumb}
                  alt={this.props.item[this.props.item.length - 1].food_name}
                ></img>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="close"
                  color="primary"
                  onClick={() => this.props.handleClose(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogContent dividers>
            <Grid container alignItems="center">
              <Grid item>
                <TextField
                  id="filled-number"
                  label="Servings"
                  value={this.state.serving_size}
                  type="number"
                  onChange={this.handleChange}
                  name="serving_size"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />

              </Grid>

              <Grid item>
                <Typography>
                {(this.state.serving_size /
                    this.props.item[this.props.item.length - 1].serving_qty) *
                    this.state.itemWeightGrams}{" "}
                  <br></br>grams
                </Typography>
                
              </Grid>
              <Grid item>
                <Typography>
                {(this.state.serving_size /
                    this.props.item[this.props.item.length - 1].serving_qty) *
                    this.state.itemCalories}{" "}
                  <br></br>calories
                </Typography>

              </Grid>
            </Grid>
            {this.props.item[this.props.item.length - 1].serving_unit}

          </DialogContent>
          <DialogContent dividers>
            <Typography gutterBottom>ADD TO TODAY</Typography>
            <Select
              native
              value={this.state.category}
              onChange={this.handleChange}
              inputProps={{
                name: "category"
              }}
            >
              <option value={"Breakfast"} defaultValue>
                Breakfast
              </option>
              <option value={"Lunch"}>Lunch</option>
              <option value={"Dinner"}>Dinner</option>
            </Select>
          </DialogContent>
          <DialogActions>
            <AppConsumer>
              {context => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    context.addNewItem(
                      this.props.item,
                      this.state.itemWeightGrams,
                      this.state.itemCalories,
                      this.state.serving_size,
                      this.state.category
                    );
                    this.props.handleClose(false);
                  }}
                >
                  ADD
                </Button>
              )}
            </AppConsumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
