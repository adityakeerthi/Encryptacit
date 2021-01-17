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

const { Title, Text, Paragraph, Link } = Typography;
const { Meta } = Card;

const OutgoingCard = (props) => {
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
      <Text code style={{ marginBottom: "10px", fontSize: "12px" }}>
        {props.blockhash}
      </Text>
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
      <Text code style={{ marginBottom: "10px", fontSize: "12px" }}>
        {props.blockhash}
      </Text>
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
        pending: [
          {
            tags: ["Vehicles"],
            blockhash:
              "0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962",
            owner: "0xB5F38Ab1fD869AB7193525a956BA8948Caa0BE47",
            value: 10000,
            contact: "yolo@gmail.com",
            appraisers: {
              "0x520884C561C01296C99F52A2839004bEaCDc3C80": true,
              "0x9C3Df261E050A0241ACFf7CC2cDa07b65d9e359d": true,
              "0x7A427198d68Cf92CfE1b1E1D6bEeB46D84b50807": false,
              "0xa9b00221877d469831440d6554374Cc0E9714801": false,
              "0x437bb59e889e3a98fB44a48E0fb9177a71c658B1": true,
            },
            ongoing: true,
            consensus: false,
            description:
              "It is a Lamborghini Italian Car. I like it, but I want to sell it, please buy or I will make you.",
          },
        ],
        resolved: [
          {
            tags: ["Vehicles"],
            blockhash:
              "0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962",
            owner: "0xB5F38Ab1fD869AB7193525a956BA8948Caa0BE47",
            value: 10000,
            contact: "yolo@gmail.com",
            appraisers: {
              "0x520884C561C01296C99F52A2839004bEaCDc3C80": true,
              "0x9C3Df261E050A0241ACFf7CC2cDa07b65d9e359d": true,
              "0x7A427198d68Cf92CfE1b1E1D6bEeB46D84b50807": false,
              "0xa9b00221877d469831440d6554374Cc0E9714801": false,
              "0x437bb59e889e3a98fB44a48E0fb9177a71c658B1": true,
            },
            ongoing: false,
            consensus: true,
            description:
              "It is a Lamborghini Italian Car. I like it, but I want to sell it, please buy or I will make you.",
          },
          {
            tags: ["Vehicles"],
            blockhash:
              "0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962",
            owner: "0xB5F38Ab1fD869AB7193525a956BA8948Caa0BE47",
            value: 10000,
            contact: "yolo@gmail.com",
            appraisers: {
              "0x520884C561C01296C99F52A2839004bEaCDc3C80": true,
              "0x9C3Df261E050A0241ACFf7CC2cDa07b65d9e359d": true,
              "0x7A427198d68Cf92CfE1b1E1D6bEeB46D84b50807": false,
              "0xa9b00221877d469831440d6554374Cc0E9714801": false,
              "0x437bb59e889e3a98fB44a48E0fb9177a71c658B1": true,
            },
            ongoing: false,
            consensus: true,
            description:
              "It is a Lamborghini Italian Car. I like it, but I want to sell it, please buy or I will make you.",
          },
        ],
      },
      completed: [
        {
          owner: {
            tickets: ["lcnyQFfHvrGVR9CvTftR"],
            tags: ["Vehicles", "Property"],
            stake: true,
            reputation: 50,
            tickets_to_validate: {},
            username: "Getoff Mylawn",
            region: "Waterloo, Ontario, Canada",
          },
          tags: ["Vehicles"],
          blockhash:
            "0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962",
          contact: "yolo@gmail.com",
          appraisers: {
            "0x7A427198d68Cf92CfE1b1E1D6bEeB46D84b50807": false,
            "0x520884C561C01296C99F52A2839004bEaCDc3C80": true,
            "0x9C3Df261E050A0241ACFf7CC2cDa07b65d9e359d": true,
            "0x437bb59e889e3a98fB44a48E0fb9177a71c658B1": true,
            "0xa9b00221877d469831440d6554374Cc0E9714801": false,
          },
          value: 10000,
          consensus: true,
          ongoing: false,
          description:
            "It is a Lamborghini Italian Car. I like it, but I want to sell it, please buy or I will make you.",
        },
      ],
    };
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
