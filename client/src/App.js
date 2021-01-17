import React, { Component } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import getWeb3 from "./getWeb3";
import { Layout, Menu } from "antd";
import { SearchOutlined, HomeOutlined, FormOutlined } from "@ant-design/icons";
import { Home, Search, Submit, Appraise, NoAccount } from "./components";
import {userExists, addUser} from "./api";

import "./App.css";

const { Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      hasAccount: false,
    };
    this.onSignup = this.onSignup.bind(this);
  }
  
  

  

  componentDidMount = async () => {
    try {
      // Route (shouldn't do it this way but whatever)
      var route = window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
      var link = ["home", "search", "submit", "appraise"].indexOf(
        route
      );
      console.log(route)

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const account = accounts[0];
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();




      var exists = false;
      userExists({accountId: account})
        .then(response => {
          exists = response.exists

          // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        account,
        signer,
        defaultSelectedKeys: ["home", "search", "submit", "appraise"].indexOf(
          route
        ),
        hasAccount: exists
      });
        })
        .catch(err => {
          console.log(err);
        })










      

      // Catch any errors for any of the above operations.
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(err);
    }
  };

  onSignup(){
    this.setState({hasAccount: true})
    console.log("it worked")
  }

  render() {
    if (!this.state.account) {
      return <div>LOGIN PAGE</div>;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[`${this.state.defaultSelectedKeys}`]}
              >
                <Menu.Item key="0" icon={<HomeOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>

                <Menu.Item key="1" icon={<SearchOutlined />}>
                  <Link to="/search">Search</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<FormOutlined />}>
                  <Link to="/submit">Submit a Ticket</Link>
                </Menu.Item>

                <Menu.Item key="3" icon={<FormOutlined />}>
                  <Link to="/appraise">Appraisals</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: "24px 16px 0" }}>
                <div className="site-layout-background">
                  <Switch>
                    {this.state.hasAccount ? (
                      <>
                        <Route path="/search">
                          <Search account={this.state.account}></Search>
                        </Route>
                        <Route path="/submit">
                          <Submit account={this.state.account} signer={this.state.signer}></Submit>
                        </Route>
                        <Route path="/appraise">
                          <Appraise account={this.state.account} signer={this.state.signer}></Appraise>
                        </Route>
                        <Route exact path="/">
                          <Home account={this.state.account}></Home>
                        </Route>
                      </>
                    ) : (
                      <NoAccount account={this.state.account} onSignup={this.onSignup}></NoAccount>
                    )}
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Hack the North 2021 - Aditya, Arnav, Daniel, Markos
              </Footer>
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
