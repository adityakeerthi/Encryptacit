import React, { Component } from "react";

import {
  Typography,
  Breadcrumb,
  Card,
  Tag,
  Button,
  InputNumber,
  Input,
  Alert,
} from "antd";

import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import {getAllTickets} from "../../api";

const { Title, Text, Paragraph, Link } = Typography;
const { Meta } = Card;

const OutgoingCard = (props) => {
  return (
    <Card
      style={{ width: "100%" }}
      bordered
      headStyle={{ display: "flex", width: "100%" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "450px"
      }}
      style={{ marginBottom: "14px" }}
    >
      {
        props.consensus === true ? <Text code style={{ marginBottom: "10px", fontSize: "12px" }}>
        {props.blockhash}
      </Text> : null
      }
      
      <Text strong>
        Consensus:{" "}
        {props.consensus === true ? (
          <CheckCircleOutlined></CheckCircleOutlined>
        ) : (
          "pending..."
        )}
      </Text>
      <Text type="secondary" style={{ textAlign: "left" }}>
        {props.description}
      </Text>

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
        description={"$ " + props.value}
        avatar={
          <Link href={"mailto:" + props.contact} target="_blank">
            {props.contact}
          </Link>
        }
      ></Meta>
    </Card>
  );
};

const CompletedCard = (props) => {
  return (
    <Card
      style={{ width: "450px" }}
      bordered
      //   title={<Text style={{ fontSize: "12px" }}>{props.owner}</Text>}
      headStyle={{ display: "flex" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      style={{ marginBottom: "14px" }}
    >
      {
        props.blockhash ? <Text code style={{ marginBottom: "10px", fontSize: "12px" }}>
        {props.blockhash}
      </Text> : null
      }
      
      <Text strong>
        Consensus:{" "}
        {props.consensus === true ? (
          <CheckCircleOutlined></CheckCircleOutlined>
        ) : (
          "pending..."
        )}
      </Text>
      <Text type="secondary" style={{ textAlign: "left" }}>
        {props.description}
      </Text>

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
        description={"$ " + props.value}
        avatar={
          <Link href={"mailto:" + props.contact} target="_blank">
            {props.contact}
          </Link>
        }
      ></Meta>
    </Card>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outgoing: {
        pending: [],
        resolved: [
        ],
      },
      completed: [
      ],
    };
  }

  componentDidMount(){
    getAllTickets(this.props.account)
      .then(response => {
        console.log(response)
        // var t = response.tickets_to_validate
        // var tickets = []
        // for (let key in t){
        //   if (t[key].appraisers[this.props.account] == null){
        //     t[key].ticketId = key
        //     tickets.push(t[key]);
        //   }
        // }
        // this.setState({tickets})
        var tt = response.tickets
        var outgoing = {
          pending: [],
          resolved: []
        }
        for (let key in tt){
          tt[key].ticketId = key;
          if (tt[key].ongoing == true){
            outgoing.pending.push(tt[key]);
          } else{
            outgoing.resolved.push(tt[key]);
          }
        }

        var tc = response.tickets_to_validate
        var completed = []
        for (let key in tc){
          if (tc[key].appraisers[this.props.account] != null){
            tc[key].ticketId = key
            completed.push(tc[key]);
          }
        }

        this.setState({outgoing, completed})
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="site-content-container">
        <Title level={2}>Home</Title>
        <div style={{ display: "flex" }}>
          <Card
            className="site-content-half-container"
            title="Outgoing Tickets"
            headStyle={{ display: "flex" }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Title level={5}>Pending</Title>
            {this.state.outgoing.pending.map((val) => {
              return <OutgoingCard {...val}></OutgoingCard>;
            })}
            <Title level={5}>Resolved</Title>
            {this.state.outgoing.resolved.map((val) => {
              return <OutgoingCard {...val}></OutgoingCard>;
            })}
          </Card>
          <Card
            className="site-content-half-container"
            title="Completed Tickets"
            headStyle={{ display: "flex" }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {this.state.completed.map((val) => {
              return <CompletedCard {...val}></CompletedCard>;
            })}
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
