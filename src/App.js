import './App.css';
import web3 from './web3';
import Lottery from './Lottery';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';



function App() {
  const [manager, setManager] = useState('')
  const [players, setPLayers] = useState('')
  const [balance, setBalance] = useState('')
  const [etherValue, setEtherValue] = useState('')
  const [status, setStatus] = useState('')
  const [winStatus, setWinStatus] = useState('')

  useEffect(async () => {
    console.log("mama", Lottery)
    let manager = await Lottery.methods.manager().call();
    let players = await Lottery.methods.getPlayers().call();
    let balance = await web3.eth.getBalance(Lottery.options.address);
    let accounts = web3.eth.getAccounts();
    console.log("aaaacaca", accounts)
    setManager(manager)
    setPLayers(players)
    setBalance(balance)
  }, [])

  //submit form
  const submitEther = async (e) => {
    e.preventDefault();
    let accounts = await web3.eth.getAccounts();
    console.log("acc", accounts)
    setStatus(<div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>)
    await Lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(etherValue, 'ether')
    })
    setStatus('You have been entered ...!')

  }


  //pick a winner function 
  const pickWinner = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts)

    setWinStatus(<div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>)

    await Lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setWinStatus('A winner has been picked ...!')

  }
  return (
    <>
      {/* <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="font-weight-bolder">Take the chance to change your life</h1>
            <p>Sorteo is online lottery platform inspired by few sorteo lover's fantasy of the ultimate lottery platfrom.</p>
            <button className="btn btn-block btn-primary rounded-pill">BUY TICKET NOW!</button>
            </div>
        <div className="col-md-6">
          <img src='/logo192.png'/>
        </div>
        </div>
      </div>
    <div className="container-fluid lottery">
      <div className="row">
        <div className="col-md-6">
          <h4>Buy Lottery Tickets Online</h4>
          <p>Buy lottery tickets online to the biggest lotteries in the world offering huge jackpot prizes that you can win when you play online lottery.</p>
        </div>
        <div className="col-md-3"> </div>
        <div className="col-md-3 ">
          <button className="btn mb-3 btn-block bg-success text-white rounded-pill">Register & Play</button>
          <p className="px-3">View all offer</p>
        </div>
      </div>
    </div> */}











      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="">Lottery Contract</h2>
            <p>This contract is managed by <span className="" style={{ color: 'red' }}> {manager}</span> <br />
              There are currently  {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!
            </p>
         
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={submitEther}>
              <h3>Want to try your luck</h3>
              <label>Amount of ether to enter</label>
              <input type="text" name="" value={etherValue} onChange={(e) => setEtherValue(e.target.value)} id="" />
              <button>Enter </button> {status}
            </form>
          </div>
        </div>
      </div>
      {/* pick a winner  */}
      <div className="container">
        <div className="row">
          <div className="col">
            <p>Ready to pick a Winner ?</p>
            <button onClick={pickWinner}>Pick a winner!</button> {winStatus}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
