import React, { Component } from "react";
import { Typography, Card, Input, Button } from "antd";

const { Title } = Typography;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false
    };
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
          <Button type="primary" style={{marginLeft: '20px'}}>Search</Button>
        </Card>
      </div>
    );
  }
}

export default Search;
