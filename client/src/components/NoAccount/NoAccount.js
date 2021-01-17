import React, { Component } from "react";

import { Typography, Card, Tag, Input, Button, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addUser} from "../../api";

const { Title, Text, Paragraph } = Typography;

class NoAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [
        "bruh",
        "what",
        "the",
        "fuck",
        "is",
        "this",
        "unique",
        "tags",
        "i'm",
        "running",
        "out",
        "of",
        "words",
      ],
      selected: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  addTag(tag) {
    this.setState((prevState) => ({ selected: [...prevState.selected, tag] }));
  }

  onSubmit(){
    var body = {
      username: this.state.username,
      region: this.state.city + " " + this.state.province + " " + this.state.country,
      tags: this.state.selected,
      accountId: this.props.account
    }
    addUser(body)
      .then(response => {
        console.log("HELLO");
        console.log(response)
        this.props.onSignup();
      }) 
      .catch(err => {
        console.log(err);
      })
    
  }

  render() {
    return (
      <div className="site-content-container" style={{ alignItems: "center" }}>
        <Title level={2} style={{ marginBottom: "20px" }}>
          Please Create An Account
        </Title>
        <Card
          title={"Account Creation"}
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
          bodyStyle={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          headStyle={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
          actions={[
            <Button type="primary" onClick={this.onSubmit}>
              Submit
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <Text strong>Username</Text>
              <Input
                placeholder="Username..."
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                width: "calc(50% - 10px)",
                alignItems: "flex-start",
              }}
            >
              <Text strong>City</Text>
              <Input
                placeholder="City..."
                onChange={(e) => this.setState({ city: e.target.value })}
              />
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                width: "calc(50% - 10px)",
                alignItems: "flex-start",
              }}
            >
              <Text strong>State/Province</Text>
              <Input
                placeholder="State/Province..."
                onChange={(e) => this.setState({ province: e.target.value })}
              />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                width: "calc(50% - 10px)",
                alignItems: "flex-start",
              }}
            >
              <Text strong>Country</Text>
              <Input
                placeholder="Country..."
                onChange={(e) => this.setState({ country: e.target.value })}
              />
            </span>
          </div>
          <Text strong>Available Tags</Text>
          <div className="tags-container">
            {this.state.available.map((val) => {
              return (
                <Tag
                  color="geekblue"
                  closable
                  closeIcon={<PlusOutlined></PlusOutlined>}
                  style={{ marginBottom: "5px" }}
                  onClose={() => this.addTag(val)}
                >
                  {val}{" "}
                </Tag>
              );
            })}
          </div>
          <Text strong>Selected Tags</Text>
          <div className="tags-container">
            {this.state.selected.map((val) => {
              return (
                <Tag
                  color="geekblue"
                  // closable
                  // closeIcon={<PlusOutlined></PlusOutlined>}
                  style={{ marginBottom: "5px" }}
                >
                  {val}{" "}
                </Tag>
              );
            })}
          </div>
          <Alert
            message="Warning: We automatically associate your Metamask Wallet Account with your new account."
            type="warning"
            style={{ marginTop: "20px" }}
          />
        </Card>
      </div>
    );
  }
}

export default NoAccount;
