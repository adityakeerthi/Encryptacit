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
import { PlusOutlined, CloseOutlined  } from "@ant-design/icons";
import {createTicket} from "../../api";
import {ethers} from  'ethers';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      stages: ["Tags", "Estimated Value", "Contact", "Review", "Success"],
      available: [
        "Commodities",
        "Vehicles",
        "Property"
      ],
      selected: [],
      selectedd: [],
      description: "",
    };
    this.goNextStage = this.goNextStage.bind(this);
    this.goBackStage = this.goBackStage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  goNextStage() {
    this.setState((prevState) => ({ stage: prevState.stage + 1 }));
  }

  goBackStage() {
    this.setState((prevState) => ({ stage: prevState.stage - 1 }));
  }

  addTag(tag) {
    this.setState((prevState) => ({ selected: [...prevState.selected, tag], selectedd: [...prevState.selectedd, tag] }));
  }

  removeTag(tagg){
  //   this.setState((prevState) => ({ selected: prevState.selected.filter((tag) => {
  //     return tag != tagg
  //   }),
  // available: [...prevState.available, tagg] }));
    var available = [...this.state.available]
    var selectedd = [...this.state.selectedd]
    selectedd.splice(this.state.selectedd.indexOf(tagg), 1);
    available.push(tagg)
    
    this.setState({available, selectedd})
  }

  onSubmit(){
    console.log(this.state.value * 0.05)
    console.log(this.CAD_to_ETH(this.state.value * 0.05))
    const etherCost = ethers.utils.parseEther((this.CAD_to_ETH(this.state.value * 0.05)).toString())

    let tx = this.props.signer.sendTransaction({
        to: '0x004fb09be11f9c1b364eda9ac15a99cb40f5d4e7', 
        value: etherCost
    }).then (t => {
      createTicket(this.state.value, this.props.account, this.state.selectedd, this.state.description, this.state.email)
      .then(response => {
        console.log(response)
        this.goNextStage()
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  CAD_to_ETH = (cad) => {
     

    return (cad*0.00063).toString();

  }

  render() {
    return (
      <div className="site-content-container">
        <Title level={2}>Submit a Ticket</Title>
        <Breadcrumb>
          {this.state.stages.slice(0, this.state.stage).map((i) => {
            return <Breadcrumb.Item>{i}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <Card
            title={
              this.state.stage === 1
                ? "Select All Appropriate Tags"
                : this.state.stage === 2
                ? "Enter the Estimated Value"
                : this.state.stage === 3
                ? "Contact"
                : this.state.stage === 4
                ? "Review your Ticket"
                : "Success"
            }
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
            actions={
              this.state.stage === 1
                ? [
                    <Button type="primary" onClick={this.goNextStage}>
                      Next
                    </Button>,
                  ]
                : this.state.stage === 4
                ? [
                    <>
                      <Button
                        type="secondary"
                        onClick={this.goBackStage}
                        style={{ marginRight: "20px" }}
                      >
                        Back
                      </Button>
                      <Button type="primary" onClick={this.onSubmit}>
                        Submit
                      </Button>
                    </>,
                  ]
                : this.state.stage === 5 ? null :[
                    <>
                      <Button
                        type="secondary"
                        onClick={this.goBackStage}
                        style={{ marginRight: "20px" }}
                      >
                        Back
                      </Button>
                      <Button type="primary" onClick={this.goNextStage}>
                        Next
                      </Button>
                    </>,
                  ]
            }
          >
            {this.state.stage === 1 ? (
              <>
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
                        closable
                        closeIcon={<CloseOutlined ></CloseOutlined >}
                        style={{ marginBottom: "5px" }}
                        onClose={() => this.removeTag(val)}
                      >
                        {val}{" "}
                      </Tag>
                    );
                  })}
                </div>
                <Text strong>Description:</Text>
                <TextArea
                  placeholder="description..."
                  rows={4}
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                    console.log(e.target.value);
                  }}
                ></TextArea>
              </>
            ) : this.state.stage === 2 ? (
              <>
                <Text strong>Value (CAD):</Text>
                <InputNumber
                  defaultValue={""}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  //   onChange={onChange}
                  style={{ width: "200px" }}
                  onChange={(val) => {
                    this.setState({ value: val });
                  }}
                />
              </>
            ) : this.state.stage === 3 ? (
              <>
                <Text strong>Email Address:</Text>
                <Input
                  placeholder="Enter your email address for further contact"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </>
            ) : this.state.stage === 4 ? (
              <>
                <Text strong>Selected Tags</Text>
                <div className="tags-container">
                  {this.state.selectedd.map((val) => {
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
                <Text strong>Enter a Description</Text>
                <Paragraph style={{ textAlign: "left" }}>
                  {this.state.description.split("\n").map((val) => {
                    return (
                      <>
                        {val}
                        <br></br>
                      </>
                    );
                  })}
                </Paragraph>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text strong>Value (CAD)</Text>
                    <Text>${this.state.value}</Text>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text strong>Email</Text>
                    <Text>{this.state.email}</Text>
                  </span>
                </div>
                <Alert
                  message="Warning: You must accept the 5% commission fee prompted by Metamask to continue"
                  type="warning"
                  style={{ marginTop: "20px" }}
                />
              </>
            ) : (
              <div>
                <Alert type="success" style={{width: "100%"}} message="You have successfully created your ticket!"></Alert>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }
}

export default Submit;
