import React from 'react';

const CheckoutSteps = ({current = 0}) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal w-full">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
        <li
          key={step}
          className={`
          step font-light text-xs lg:text-sm
          ${index <= current ? 'step-neutral' : ''}`}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};

export default CheckoutSteps;