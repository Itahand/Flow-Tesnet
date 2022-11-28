import './App.css';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect, useState } from 'react';

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn")
  // .put("accessNode.api", "https://mainnet.onflow.org")
  // .put("discovery.wallet", "https://flow-wallet.blocto.app/authn")
  .put("0xSimpleTest", "0x6c0d53c676256e8c")

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  const readNumber = async () => {
    const result = await fcl.send([
      fcl.script(`
      import SimpleTest from 0xSimpleTest
      pub fun main(): Int {
        return SimpleTest.number
      }
      `),
      fcl.args([])
    ]).then(fcl.decode);

    console.log(result);
  }

  const updateNumber = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(`
      import SimpleTest from 0xSimpleTest
      transaction(newNumber: Int) {
        prepare(signer: AuthAccount) {

        }

        execute {
          SimpleTest.updateNumber(newNumber: newNumber)
        }
      }
      `),
      fcl.args([
        fcl.arg("6", t.Int)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(999)
    ]).then(fcl.decode);

    let txnDetails = await fcl.tx(transactionId).onceSealed()
    console.log(txnDetails)
  }

  return (
    <div className="App">
      <h1>User's Address: {user?.addr}</h1>
      <button onClick={() => fcl.authenticate()}>Connect</button>
      <button onClick={() => fcl.unauthenticate()}>Disconnect</button>
      <div>
        <button onClick={readNumber}>Read</button>
        <button onClick={updateNumber}>Update</button>
      </div>
    </div>
  );
}

export default App;
