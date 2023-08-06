const changeUserAvatar = (req, res) => {
  console.log(req.file);
  res.json({
    message: "+++",
  });
};

module.exports = {
  changeUserAvatar,
};
