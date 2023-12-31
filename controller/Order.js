const { Order } = require("../modal/Order");
const { User } = require("../modal/User");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.fetchOrdersByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id });
    res.status(200).send(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const response = await order.save();
    const user = await User.findById(order.user);
    sendMail({
      to: user.email,
      html: invoiceTemplate(order),
      subject: "Order Invoice",
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    let query = Order.find({ deleted: { $ne: true } });
    let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalOrdersQuery.countDocuments().exec();
    res.set("X-Total-Count", totalDocs);

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const response = await query.exec();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
