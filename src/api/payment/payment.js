// payment.js
import {
  useState
} from 'react';
import axios from 'axios';


let paymentUrl = "";

export const setPaymentUrl = (url) => {
  paymentUrl = url;
};

export const getPaymentUrl = () => {
  return paymentUrl;
};

export const generatePaymentLink = async (product, quantity) => {
  try {
    const secret = process.env.SECRET;
    const encodedSecret = Buffer.from(secret).toString('base64');
    const basicAuth = `Basic ${encodedSecret}`;

    const data = {
      items_details: [{
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      }],
      transaction_details: {
        order_id: product.id,
        gross_amount: product.price * quantity
      }
    };

    const response = await axios.post(`${process.env.PUBLIC_API}/v1/payment-links`, data, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": basicAuth
      }
    });

    const responLink = response.data;
    console.log(responLink.payment_url);
    setPaymentUrl(responLink.payment_url);
  }catch (error) {
    console.error("Error generating payment link:", error);
    // Handle error appropriately
  }
};