import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [bill, setBill] = useState(0)
  const [tipPercent, setTipPercent] = useState(0)
  const [people, setPeople] = useState(0)
  //for final result
  const [tip, setTip] = useState(0)
  const [totalBill, setTotalBill] = useState(0)
  //input references to reset them on reset btn click
  const billRef = useRef(null)
  const customRef = useRef(null)    //for custom btn input
  const pplRef = useRef(null)
  //to reset placeholder from custom to empty on user click
  const customBtn = () => {
    customRef.current.placeholder = "";
  }

  let calculation = () => {     //for tip
    if (bill <= 0 || people <= 0) {    //if values are invalid stop execution here
      setTip(0)
      return;
    }
    else {
      let tipAmount = tipPercent / 100;    //tip percentage is converted to a number
      let result = tipAmount * bill;       //tip number is multiplied with bill
      if (people <= 0) {   //if people not entered yet or invalid wait here
        setTip(0)
        return;
      }
      else {
        let tipp = result / people;      //bill is divided to total people
        setTip(tipp)
      }

    }
  }
  const handlePeopleInput = (e) => {
    let ppl = parseInt(e.target.value)
    const num = Number(ppl)
    if (!Number.isInteger(num)) {
      setPeople(0)
      setTotalBill(0)
    }
    else {

      setPeople(num)
      console.log(ppl)
    }

  }

  useEffect(() => calculation(), [bill, tipPercent, people])


  let totalBillCalculation = () => {
    if (bill !== 0 && people !== 0) {
      let tbill = bill / people;
      let finalBill = tbill + tip;
      if (finalBill) {
        setTotalBill(finalBill)
      }
    }
  }
  useEffect(() => totalBillCalculation(), [tipPercent, people, tip])

  const resetAll = () => {
    billRef.current.value = 0
    customRef.current.value = ""
    customRef.current.placeholder = "Custom"
    pplRef.current.value = 0
    setBill(0)
    setPeople(0)
    setTipPercent(0)
    setTotalBill(0)
  }


  return (
    <>

      <header>

      </header>
      <main>
        <section className='leftSection'>
          <div className='leftDiv'>
            <label htmlFor="billInput">Bill</label><br />
            <input type="number" name="billInput" id="billInput" ref={billRef} placeholder='0'
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {  // also block exponential input like 1e5
                  e.preventDefault();
                }
              }}
              onChange={(e) => { setBill(parseFloat(e.target.value) || 0) }}
            />
          </div>

          <div className='leftBtnDiv'>
            <p>Select Tip %</p>
            <div className='btnDiv'>
              <button value={5} onClick={() => setTipPercent(5)} className={tipPercent === 5 ? 'active' : ""} >5%</button>
              <button value={10} onClick={() => setTipPercent(10)} className={tipPercent === 10 ? 'active' : ""} >10%</button>
              <button value={15} onClick={() => setTipPercent(15)} className={tipPercent === 15 ? 'active' : ""} >15%</button>
              <button value={25} onClick={() => setTipPercent(25)} className={tipPercent === 25 ? 'active' : ""} >25%</button>
              <button value={50} onClick={() => setTipPercent(50)} className={tipPercent === 50 ? 'active' : ""} >50%</button>
              <input type="text" name="customBtn" id="customBtn" placeholder='Custom' onClick={customBtn} ref={customRef}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") {  // also block exponential input like 1e5
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)} />
            </div>
          </div>

          <div className='leftDiv'>
            <label htmlFor="people">Number of People</label><br />
            <input type="number" name='people' id='people' ref={pplRef} placeholder='0'
              //  onChange={(e) => { setPeople(parseInt(e.target.value) || 0) }}
           onKeyDown={(e)=>{
            if(e.key === "-" || e.key ==="e")
            {
              e.preventDefault();
            }
           }}
              onChange={handlePeopleInput}
            />
          </div>

        </section>
        <section className='rightSection'>
          <div className='rightDiv'>
            <div>
              <h3>Tip Amount</h3>
              <p>/ person</p>
            </div>
            <div>
              <h2>${parseFloat(tip.toFixed(2))}</h2>
            </div>
          </div>

          <div className='rightDiv'>
            <div>
              <h3>Total   </h3>
              <p>/ person</p>
            </div>
            <div>
              <h2>${parseFloat(totalBill.toFixed(2))}</h2>
            </div>
          </div>

          <div className='rightBtnDiv'>
            <button id="reset" onClick={resetAll}>RESET</button>
          </div>
        </section>
      </main>

    </>
  )
}

export default App

// ## Primary

// - Strong cyan: hsl(172, 67%, 45%)

// ### Neutral

// - Very dark cyan: hsl(183, 100%, 15%)
// - Dark grayish cyan: hsl(186, 14%, 43%)
// - Grayish cyan: hsl(184, 14%, 56%)
// - Light grayish cyan: hsl(185, 41%, 84%)
// - Very light grayish cyan: hsl(185, 41%, 84%)
// - White: hsl(0, 0%, 100%)

// ## Typography

// ### Body Copy

// - Font size (form inputs): 24px
