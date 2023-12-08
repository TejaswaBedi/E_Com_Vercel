const { Category } = require("../modal/Category");

exports.fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const response = await category.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(err);
  }
};
