import { useEffect, useState } from 'react';
import './App.css';
import SelectToken from './components/SelectToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showSelectToken, setShowSelectToken] = useState(false);
  const [checkClick, setCheckClick] = useState(null);

  const [token1, setToken1] = useState({
    currency: "BLUR", date: "2023-08-29T07:10:40.000Z", price: 0.20811525423728813
  });
  const [token2, setToken2] = useState({
    currency: "bNEO", date: "2023-08-29T07:10:50.000Z", price: 7.1282679
  });

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const [value1IsChanging, setValue1IsChanging] = useState(false);
  const [value2IsChanging, setValue2IsChanging] = useState(false);

  // Handle when text in input 1 change
  const handleChangeValue1 = (e) => {
    setValue1IsChanging(true);
    setValue2IsChanging(false);
    if ((!isNaN(e.target.value) &&
      !isNaN(parseFloat(e.target.value))) ||
      e.target.value === ""
    )
      setValue1(e.target.value);
  }

  // Handle when text in input 2 change
  const handleChangeValue2 = (e) => {
    setValue1IsChanging(false);
    setValue2IsChanging(true);
    if ((!isNaN(e.target.value) &&
      !isNaN(parseFloat(e.target.value))) ||
      e.target.value === ""
    )
      setValue2(e.target.value);
  }

  // Handle calculate when value in input change
  useEffect(() => {
    if (!value2IsChanging) {
      const priceSwap = Number(value1) * Number(token1.price) / Number(token2.price);

      setValue2(priceSwap);
      if (value1 === "") setValue2("");
    }

  }, [value1, value2IsChanging, token1, token2])

  useEffect(() => {
    if (!value1IsChanging) {
      const priceSwap = Number(value2) * Number(token2.price) / Number(token1.price);

      setValue1(priceSwap);
      if (value2 === "") setValue1("");

    }
  }, [value2, value1IsChanging, token1, token2]);

  // Handle when click reverse button
  const handleReverse = () => {
    let temp = token1;
    setToken1(token2);
    setToken2(temp);
  }

  // Handle when click swap button
  const handleSwap = () => {
    if (!value1 && !value2) {
      toast.error("Please enter amount to send!");
    }
    else {
      toast.success("Swap success!");
      setValue1('');
      setValue2('');
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='swapToolContainer'>
          <p className='header'>Swap</p>
          <div className='selectTokensSection'>
            <p>Amount to send</p>
            <div className='selectTokenSection'>
              <button
                className='inputSwap--type'
                onClick={() => {
                  setShowSelectToken(true);
                  setCheckClick("token1");
                }}
              >
                <div className=''>
                  <img src={`tokens/${token1.currency}.svg`} alt="coinIcon" />
                  {token1.currency}
                </div>
                <span className='arrowDown'>
                  ▼
                </span>
              </button>
              <input
                className='inputSwap'
                placeholder='0.0'
                value={value1}
                onChange={handleChangeValue1}
              />
            </div>
            <button className='reverseBtn' onClick={handleReverse}>
              <img src='./icon/swap.png' alt='swapIcon' />
            </button>
            <p>Amount to receive</p>
            <div
              className='selectTokenSection'>
              <button
                className='inputSwap--type'
                onClick={() => {
                  setShowSelectToken(true);
                  setCheckClick("token2");
                }}
              >
                <img src={`tokens/${token2.currency}.svg`} alt="coinIcon" />
                {token2.currency}
                <span className='arrowDown'>
                  ▼
                </span>
              </button>
              <input className='inputSwap' placeholder='0.0' value={value2} onChange={handleChangeValue2} />
            </div>
          </div>
          <button className='swapBtn' onClick={handleSwap}>Confirm Swap</button>
        </div>
      </div>
      {showSelectToken &&
        <SelectToken
          setShow={setShowSelectToken}
          setToken={
            checkClick === "token1" ? setToken1 : setToken2}
        />
      }
      <ToastContainer />
    </div>
  );
}

export default App;
