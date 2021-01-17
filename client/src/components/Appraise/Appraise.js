import React, { Component } from "react";
import { Typography, Card, Input, Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
          <Button style={{ marginRight: "10px" }} type="primary">
            Appraise
          </Button>
          <Input placeholder="Amount..." style={{ width: "150px" }}/>
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
      tickets: [
        {
          owner: {
            tickets: ["lcnyQFfHvrGVR9CvTftR"],
            tags: ["Vehicles", "Property"],
            stake: true,
            reputation: 50,
            tickets_to_validate: {},
            username: "DAnie842",
            region: "Waterloo, Ontario, Canada",
          },
          tags: ["Vehicles", "Automotive", "Car"],
          blockhash:
            "0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962",
          contact: "daniel2004yu@gmail.com",
          appraisers: {
            "0x7A427198d68Cf92CfE1b1E1D6bEeB46D84b50807": false,
            "0x520884C561C01296C99F52A2839004bEaCDc3C80": true,
            "0x9C3Df261E050A0241ACFf7CC2cDa07b65d9e359d": true,
            "0x437bb59e889e3a98fB44a48E0fb9177a71c658B1": true,
            "0xa9b00221877d469831440d6554374Cc0E9714801": false,
          },
          value: 10000,
          consensus: true,
          ongoing: true,
          description:
            "It is a Lamborghini Italian Car. I like it, but I want to sell it, please buy or I will make you.",
        },
        {
          owner: {
            tickets: ["lcnyQFfHvrGVR9CvTftR"],
            tags: ["Vehicles", "Property"],
            stake: true,
            reputation: 50,
            tickets_to_validate: {},
            username: "DAnie842",
            region: "Waterloo, Ontario, Canada",
          },
          tags: ["Vehicles"],
          blockhash:
            "0x517ee3a23e683c9d23646d998abcf06eda18121d0edc79c8a1deddd5ed9d5962",
          contact: "daniel2004yu@gmail.com",
          appraisers: {
            "0x7A427198d68Cf92CfE1b1E1D6bEeB46D84b50807": false,
            "0x520884C561C01296C99F52A2839004bEaCDc3C80": true,
            "0x9C3Df261E050A0241ACFf7CC2cDa07b65d9e359d": true,
            "0x437bb59e889e3a98fB44a48E0fb9177a71c658B1": true,
            "0xa9b00221877d469831440d6554374Cc0E9714801": false,
          },
          value: 10000,
          consensus: true,
          ongoing: true,
          description:
            "It is a Lamborghini Italian Car. I like it, but I want to sell it, please buy or I will make you.",
        },
      ],
    };
  }
  render() {
    return (
      <div className="site-content-container">
        <Title level={2}>Pending Tickets</Title>
        {this.state.tickets.map((val) => {
          if (val.ongoing === true) {
            return <TicketCard {...val}></TicketCard>;
          }
        })}
      </div>
    );
  }
}

export default Appraise;
