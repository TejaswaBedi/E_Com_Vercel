const { Cart } = require("../modal/Cart");

exports.fetchCartByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const cartItems = await Cart.find({ user: id }).populate("product");
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = new Cart({ ...req.body, user: id });
    const response = await cart.save();
    const doc = await response.populate("product");
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const doc = await cart.populate("product");
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
