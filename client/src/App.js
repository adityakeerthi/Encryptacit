import React, { Component } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import getWeb3 from "./getWeb3";
import { Layout, Menu } from "antd";
import { SearchOutlined, HomeOutlined, FormOutlined } from "@ant-design/icons";
import { Home, Search, Submit, Appraise, NoAccount } from "./components";

import "./App.css";

const { Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    hasAccount: true,
  };

  componentDidMount = async () => {
    try {
      // Route (shouldn't do it this way but whatever)
      var route = window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const account = accounts[0];
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();

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
      });

      // Catch any errors for any of the above operations.
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(err);
    }
  };

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
                          <Search></Search>
                        </Route>
                        <Route path="/submit">
                          <Submit></Submit>
                        </Route>
                        <Route path="/appraise">
                          <Appraise></Appraise>
                        </Route>
                        <Route exact path="/">
                          <Home></Home>
                        </Route>
                      </>
                    ) : (
                      <NoAccount></NoAccount>
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
