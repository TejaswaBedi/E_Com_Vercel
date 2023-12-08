const { Brand } = require("../modal/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).send(brands);
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const response = await brand.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(err);
  }
};
