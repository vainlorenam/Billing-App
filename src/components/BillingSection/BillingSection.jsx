import { useState } from "react";
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg'

const tipOptions = [5, 10, 15, 25, 50];

const BillingSection = () => {

    const [selectedOption, setSelectedOption] = useState(-1);
    const [tipAmount, setTipAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const bill = parseInt(data.get('bill-input'));
        const numberOfPeople = parseInt(data.get('number-of-people-input'));

        const tipAmount = bill * (tipOptions[selectedOption] / 100);
        const tipTotalPerPerson = tipAmount / numberOfPeople;

        const orderTotal = bill + tipAmount;
        const orderTotalPerPerson = orderTotal / numberOfPeople;
        
        setTipAmount(tipTotalPerPerson);
        setTotalAmount(orderTotalPerPerson);
    };

    const handleClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    return (
        <section>
            <h1 className="billing-section-title">SPLI TTER</h1>
            <div className="billing-container">
                <form onSubmit={handleSubmit} className="billing-form">
                    <div className="input-container">
                        <label className="standard-label" htmlFor="bill-input">Bill</label>
                        <input className="standard-input" id='bill-input' name='bill-input' type="number" defaultValue={0} />
                        <p className="standard-input-indicator"> $ </p>
                    </div>
                    <div className="tip-options-container">
                        <p className="standard-label"> Select Tip % </p>
                        <div className="tip-options">
                            {tipOptions.map((option, index) => (
                                <button type="button" className={index === selectedOption ? 'selected' : ''} onClick={() => handleClick(index)} key={option}> {option}% </button>
                            ))}
                        </div>
                    </div>
                    <div className="input-container">
                        <label className="standard-label" htmlFor="number-of-people-input">Number of People</label>
                        <input className="standard-input" id='number-of-people-input' name='number-of-people-input' type="number" defaultValue={0} />
                        <img className="standard-input-indicator" src={userIcon} />
                    </div>
                    <button className="calculate-billing" type="submit"> Calculate </button>
                </form>

                <div className="billing-result-container">
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Tip Amount </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-total"> ${tipAmount} </p>
                    </div>
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Tip Amount </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-total"> ${totalAmount} </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BillingSection;