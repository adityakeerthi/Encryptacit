import React, { Component } from "react";
import { Typography, Card, Input, Button } from "antd";
import {searchBlockchain} from "../../api";


const { Title } = Typography;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false
    };
  }

  onSearch(){
    searchBlockchain("0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962")
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="site-content-container">
        <Title level={2}>Search for a Ticket</Title>
        <Card style={{width: "100%"}} bodyStyle={{display: "flex"}}>
          <Input
            placeholder="Search by ID..."
            onChange={(e) => this.setState({ search: e.target.value })}
          />
          <Button type="primary" style={{marginLeft: '20px'}} onClick={this.onSearch}>Search</Button>
        </Card>
      </div>
    );
  }
}

export default Search;
