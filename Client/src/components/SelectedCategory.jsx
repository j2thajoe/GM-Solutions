import React from "react";

const SelectedCategory = (select) => {
  return (
    <select>
      <option value="all-categories">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="electricals">Electricals</option>
      <option value="computers">Computers</option>
      <option value="phone-accessories">Phone Accessories</option>
      <option value="laptop-accessories">Laptop Accessories</option>
      <option value="stationaries">Stationaries</option>
      <option value="clothing">Clothing</option> 
      <option value="general-goods">General Goods</option>
      <option value="cyber-services">Cyber Services</option>
      <option value="printing-n-binding">Printing and Binding</option>
      <option value="art-services">ART Services</option>
      <option value="lectures">Lectures</option>
    </select>
  );
};

export default SelectedCategory;
