import React, { Component } from "react";
import { Typography, Card, Input, Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {userExists, setFirebaseStake, getAllTickets, voteForTicket} from "../../api";

import {ethers} from  'ethers';

const { Title, Text, Link } = Typography;
const { Meta } = Card;

const TicketCard = (props) => {
  return (
    <Card
      bordered
      style={{ width: "700px" , marginBottom: "30px"}}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      headStyle={{ display: "flex" }}
      title={props.owner.username}
      actions={[
        <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
          <Button style={{ marginRight: "10px" }} type="primary" onClick={() => props.voteTicket(props.ticketId)}>
            Appraise
          </Button>
          <Input placeholder="Amount..." style={{ width: "150px" }} onChange={(e) => props.setValue(e.target.value)}/>
          <div style={{width: "20px"}}></div>
        </div>,
      ]}
    >
      <Text type="secondary">{props.description}</Text>
      {/* CONTACT: {props.contact} */}

      <div className="tags-container">
        {props.tags.map((val) => {
          return (
            <Tag
              color="geekblue"
              style={{ marginBottom: "5px" }}
              //   onClose={() => this.addTag(val)}
            >
              {val}{" "}
            </Tag>
          );
        })}
      </div>
      <Meta
        description={props.owner.region}
        avatar={
          <Link href={"mailto:" + props.contact} target="_blank">
            {props.contact}
          </Link>
        }
      ></Meta>
    </Card>
  );
};

class Appraise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stake: false,
      value: 0,
      tickets: [
        
      ],
    };
    this.takeStake = this.takeStake.bind(this);
    this.setValue = this.setValue.bind(this);
    this.voteTicket = this.voteTicket.bind(this);
  }

  componentDidMount(){
    userExists({"accountId": this.props.account})
      .then(response => {
        console.log(response)
        if (response.data.stake === true){
          this.setState({stake: true})
          getAllTickets(this.props.account)
            .then(response => {
              console.log(response)
              var t = response.tickets_to_validate
              var tickets = []
              for (let key in t){
                if (t[key].appraisers[this.props.account] == null){
                  t[key].ticketId = key
                  tickets.push(t[key]);
                }
              }
              this.setState({tickets})
              console.log(tickets)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  setValue(value){
    this.setState({value})
  }
  voteTicket(ticketId){
    voteForTicket(this.state.value, ticketId, this.props.account)
      .then(response => {
        console.log(response)
        getAllTickets(this.props.account)
            .then(response => {
              console.log(response)
              var t = response.tickets_to_validate
              var tickets = []
              for (let key in t){
                if (t[key].appraisers[this.props.account] == null){
                  t[key].ticketId = key
                  tickets.push(t[key]);
                }
              }
              this.setState({tickets})
              console.log(tickets)
            })
            .catch(err => {
              console.log(err)
            })
      })
      .catch(err => {
        console.log(err)
      })
  }

  takeStake(){
    // const etherCost = BigInt("66000000000000000");
    const etherCost = ethers.utils.parseEther("0.067")

    let tx = this.props.signer.sendTransaction({
        to: '0xf0978c2905e0C17aBe7794d7319B0092eA13844A', 
        value: etherCost
    }).then (t => {
      setFirebaseStake(this.props.account)
        .then(response => {
          this.setState({stake: true})
          
        }) 
        .catch(err => {
          console.log(err);
        })
    })
  }

  render() {
    return (
      <div className="site-content-container">
        {
          this.state.stake ?  <><Title level={2}>Pending Tickets</Title>
          {this.state.tickets.map((val) => {
            if (val.ongoing === true) {
              return <TicketCard setValue={this.setValue} voteTicket={this.voteTicket} {...val}></TicketCard>;
            }
          })}</> : <Button onClick={this.takeStake}>Stake</Button>

        }
        
      </div>
    );
  }
}

export default Appraise;
