const { User } = require("../modal/User");

exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).send({
      id: user.id,
      addresses: user.addresses,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json(err);
  }
};
