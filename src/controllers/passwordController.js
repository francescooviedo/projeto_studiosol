const { passwordVerifyService } = require('../service/password');

const passwordController = (req, res) => {
    try {
  const verifiedObj = passwordVerifyService(req.body);
  return res.status(200).json(verifiedObj);
} catch (error) {
  return res.status(400).json({ message: 'please insert the correct rules' });
}
};

module.exports = passwordController;