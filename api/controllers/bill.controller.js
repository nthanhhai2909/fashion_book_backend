"use strict";
const bill = require("../models/bill.model");
const cart = require('../models/cart.model');
const randomstring = require("randomstring");
const nodemailer = require('../utils/nodemailer');
exports.addBill = async (req, res) => {
  if (
    typeof req.body.id_user === "undefined" ||
    typeof req.body.city === "undefined" ||
    typeof req.body.district === "undefined" ||
    typeof req.body.ward === "undefined" ||
    typeof req.body.address === "undefined" ||
    typeof req.body.phone === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.email === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  const {
    id_user,
    city,
    district,
    ward,
    address,
    phone,
    name,
    email
  } = req.body;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  } catch (err) {
    console.log('error ', err)
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "user not found" });
    return;
  }
  const token = randomstring.generate();
  let sendEmail = await nodemailer.sendMailConfirmPayment(email, token);
  if (!sendEmail) {
    res.status(500).json({ msg: "Send email fail" });
    return;
  }
  const new_bill = new bill({
    id_user: id_user,
    products: cartFind.products,
    city: city,
    district: district,
    ward: ward,
    address: address,
    phone: phone,
    name: name,
    token: token
  });
  try {
    await cartFind.remove();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("cart remove fail")
    return;
  }
  try {
    new_bill.save();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("save bill fail")
    return;
  }
  res.status(201).json({ msg: "success" });
};
exports.verifyPayment = async (req, res) => {
  if (typeof req.params.token === "undefined") {
    res.status(402).json({ msg: "!invalid" });
    return;
  }
  let token = req.params.token;
  let tokenFind = null;
  try {
    tokenFind = await bill.findOne({ token: token });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (tokenFind == null) {
    res.status(404).json({ msg: "not found!!!" });
    return;
  }
  try {
    await bill.findByIdAndUpdate(
      tokenFind._id,
      { $set: { is_verify: true } },
      { new: true }
    );
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ msg: "success!" });
};
