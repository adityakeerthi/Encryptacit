import React, { Component } from "react";
import { Typography, Card, Input, Button, Tag, Spin, Empty } from "antd";
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
      loaded: false
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
              this.setState({tickets, loaded: true})
              console.log(tickets)
            })
            .catch(err => {
              console.log(err)
            })
        } else{
          this.setState({loaded: true})
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

              var newTickets = []

              for (let a in tickets){
                if (a.ongoing === true){
                  newTickets.push(a);
                }
              }

              this.setState({tickets: newTickets, loaded: true})
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
        to: '0x004fb09be11f9c1b364eda9ac15a99cb40f5d4e7', 
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
          this.state.loaded ? 
          this.state.stake ?  

          <>
            <Title level={2}>Pending Tickets</Title>
            {this.state.tickets.length === 0 ? <Empty description="No Tickets Found" style={{marginTop: "50px", marginBottom: "50px"}}/> : this.state.tickets.map((val) => {
                return <TicketCard setValue={this.setValue} voteTicket={this.voteTicket} {...val}></TicketCard>;
            })}
          </> 
          : 
          
          <div style={{display: "flex", justifyContent: "center", alignItems: "center",
          flexDirection: "column", width: "100%", marginTop: "100px"}}>
            <Title level={2}>You must offer a stake to give Appraisals</Title>
            <Button onClick={this.takeStake} type="primary">Stake</Button>
            </div>

            : <Spin/>

        }
        
      </div>
    );
  }
}

export default Appraise;
