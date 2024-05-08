'use client';

import React, {useState} from 'react';
import {PaystackButton} from 'react-paystack';
import styles from './paystack.module.css';

const publicKey = process.env.PAYSTACK_PUBLIC_KEY;


const App = () => {
  console.log(publicKey);
  const amount = 1000000;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const resetForm = () => {
    setEmail('');
    setName('');
    setPhone('');
  };

  // const componentProps = {
  //   email,
  //   amount,
  //   metadata: {
  //     name,
  //     phone,
  //   },
  //   publicKey,
  //   text: 'Buy Now',
  //   onSuccess: (reference: string) => {
  //     alert(
  //       `Your purchase was successful! Transaction reference: ${reference}`
  //     );
  //     resetForm();
  //   },
  //   onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  // };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.overlay_effect}></div>
          <img
            className={styles.item_image}
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="product"
          />
          <div className={styles.item_details}>
            <p className={styles.item_details__title}>Coconut Oil</p>
            <p className={styles.item_details__amount}>NGN {amount / 100}</p>
          </div>
        </div>
        <div className={styles.checkout}>
          < div className={
            styles.checkout_form}>
            <div className={styles.checkout_field
            } >
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.checkout_field}>
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.checkout_field}>
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* <PaystackButton className={styles.paystack_button} {...componentProps} /> */}
            <PaystackButton
              className={styles.paystack_button}
              text='BUY NOW'
              publicKey=''
              email='kolamaster@gmail.com'
              amount={10000000}

              onSuccess={(reference: string) => console.log(reference)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;