import React, { Component } from "react";
import { ethers } from "ethers";
import {BrowserRouter, Route} from "react-router-dom";
import getWeb3 from "./getWeb3";

import {Navbar} from "./components";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const account = accounts[0];
      const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, account, signer });
      // Catch any errors for any of the above operations.
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(err);
    }
  };

  render() {
    if (!this.state.account) {
      return <div>
        LOGIN PAGE
      </div>;
    }
    return (
      <div className="App">
        <Navbar></Navbar>
      SIGNED IN
      </div>
    );
  }
}

export default App;
