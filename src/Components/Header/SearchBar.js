import React, { Component } from 'react';
import { Paper, IconButton, InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog';


const styleAddButton = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};


export default class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            apiUrl: 'https://trackapi.nutritionix.com/v2/search/instant',
            appKey: '5255da8cc843f889628014699e8f02f9',
            appId: '09bdfb62',
            commonFoods: [],
            brandedFoods: [],
            open: false,
            addItemIndex: 0,
            item: []
        };
        this.textInput = React.createRef();
        this.focus = this.focus.bind(this);
        this.handleClose = this.handleClose.bind(this)

    }

    focus() {
        this.textInput.current.focus();
    }

    handleClose(input) {
        this.setState({
        open: input,
        searchText: ''
        })
    }

    onTextChange = (event) =>  {

        let headers = {
            'x-app-id': this.state.appId,
            'x-app-key': this.state.appKey
        }

        this.setState({[event.target.name]: event.target.value}, () => {
            axios.get(`${this.state.apiUrl}/?query=${this.state.searchText}`, {"headers": headers})
            .then((response) => {
                this.setState({
                    commonFoods: response.data.common,
                    brandedFoods: response.data.branded
                })
            })
            .catch((error) => {
                console.log(error);
            })
        })

    }

    addItem = (item) => {
        this.setState({
            open: true,
            item: [...this.state.item, item]
        })
    }


    render() {
        return (
            <div>
                <Paper>
                <IconButton  aria-label="search">
                    <SearchIcon />
                </IconButton>
                {/* Plus Icon Button */}
                <Fab size="large" color="secondary" aria-label="add" style={styleAddButton} onClick={this.focus}>
                <AddIcon/>
                </Fab>
                {/* Search Input Field */}
                <InputBase
                    placeholder="Search foods..."
                    onChange={this.onTextChange}
                    name="searchText"
                    value={this.state.searchText}
                    inputRef={this.textInput}                 />
                </Paper>
                {/* Search Results Overlay Section  */}
                {this.state.searchText.length > 0 ?  (
                    <Paper className="results-overlay">
                    {/* Common Foods List */}
                    <p className="search-heading">COMMON</p>
                    {this.state.commonFoods.slice(0,5).map((item, index) => {
                        return (
                            <div className="search-result-box" key={index} onClick={()=> {this.addItem(item)}}>
                            <img src={item.photo.thumb} alt={item.food_name} width="40px" height="40px"/>
                            <p key={item.food_name} className="search-result-food-name">
                                    {item.food_name}
                            </p>
                            </div>
                        );
                    })}

                {this.state.item.length > 0 ? 
                <AddDialog item={this.state.item} open={this.state.open} handleClose={this.handleClose} data_points={this.props.data_points} userProps={this.props.userProps}/>
                : ''}

                {/* Branded Foods List */}
                    <p className="search-heading">BRANDED</p>
                    {this.state.brandedFoods.slice(0,5).map((item, index) => {
                            return (
                                <div className="search-result-box" key={index} onClick={()=> {this.addItem(item)}}>
                                <img src={item.photo.thumb} alt={item.food_name} width="40px" height="40px"/>
                                <span key={item.food_name} className="search-result-food-name">
                                        {item.food_name}<br></br>
                                        <span className="col-gr-font">{item.brand_name}</span>
                                </span>
                                </div>
                            );
                    })}
                    </Paper>
                ): ''}
            </div>
        )
    }
}

