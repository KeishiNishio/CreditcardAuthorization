import React, { useState } from 'react';

function App() {
  const [id, setId] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');
  const [availableAmount, setAvailableAmount] = useState('');
  const [billedAmount, setBilledAmount] = useState('');
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, expirationDate, paymentAmount }),
      });
      const data = await response.json();
      setMessage(data.message);
      setShowConfirmButton(response.ok);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error sending data');
      setShowConfirmButton(false);
    }
  };

  const confirmPayment = async () => {
    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, paymentAmount }),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        setMessage(data.message);
        setShowConfirmButton(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkAmounts = async () => {
    try {
      const response = await fetch('/api/check-amounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, expirationDate }),
      });
      const data = await response.json();
      setAvailableAmount(data.availableAmount);
      setBilledAmount(data.billedAmount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <input type="text" placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
      <input type="text" placeholder="Expiration Date (YY/MM)" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
      <input type="number" placeholder="Payment Amount" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} />
      {}
      {!showConfirmButton && (
        <button onClick={handleSubmit} disabled={!id || !expirationDate || !paymentAmount}>Pay (authorization process)</button>
      )}
      {}
      {showConfirmButton && (
        <button onClick={confirmPayment}>Confirm Payment</button>
      )}
      <button onClick={checkAmounts}>Check Available & Billed Amounts (next month)</button>
      <p>{message}</p>
      <div>Available Amount: {availableAmount}</div>
      <div>Billed Amount(next month): {billedAmount}</div>
    </div>
  );
}

export default App;
