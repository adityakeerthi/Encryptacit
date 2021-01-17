import React, { Component } from "react";
import { Typography, Card, Input, Button, Spin } from "antd";
import {searchBlockchain} from "../../api";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";


const { Title, Text } = Typography;
const { Meta } = Card;

const SearchCard = (props) => {
  return (
    <Card>
    </Card>
  )
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        search: "",
        data: {},
        loaded: false
    };
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch(){
    // 0x93a0edebe4d3a8637a3450f67a3bce817c39de1a9c5b6e8463961a8d69439f11
    this.setState({loading: true})
    searchBlockchain(this.state.search)
      .then(response => {
        console.log(response)
        this.setState({data: response, loading: false, loaded: true})
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false})
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
        {
          this.state.loading ? <Spin style={{margin: "auto", marginTop: "50px"}}/> :
          this.state.loaded ?  
          <Card 
          style={{width: "100%", marginTop: '30px'}} 
          headStyle={{display: "flex"}} 
          bodyStyle={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}
          title={<>Owner: <Text code>{this.state.data.owner}</Text> (${this.state.data.value})</>} 
          >
            {this.state.data.consensous == true ? (
            <span style={{display: "flex", alignItems: "center", marginBottom: "20px"}}> <Text strong style={{marginRight: '10px'}}>Consensous: </Text> <CheckCircleOutlined></CheckCircleOutlined></span>
          ) : this.state.data.consensous == false ? (
            <span style={{display: "flex", alignItems: "center", marginBottom: "20px"}}> <Text strong style={{marginRight: '10px'}}>Consensous: </Text> <StopOutlined></StopOutlined></span>
          ) : <span style={{display: "flex", alignItems: "center", marginBottom: "20px"}}> <Text strong style={{marginRight: '10px'}}>Consensous: </Text> pending...</span>
          }
          <Text strong style={{marginRight: '10px'}}>Validators: </Text>
          {
            this.state.data.validators.map(val => {
              return <Text code style={{marginBottom: "10px"}}>{val}</Text>
            })
          }

          </Card> : null
        }
        
      </div>
    );
  }
}

export default Search;
