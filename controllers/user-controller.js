const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const decorator = require("../decorators/controller-decorator");
const { User } = require("../models/user");
const reqError = require("../helpers/reqError");

const changeUserAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const avatarPath = path.resolve("public", "avatars");
  const newPath = path.join(avatarPath, filename);
  const { _id: id } = req.user;

  (await Jimp.read(oldPath)).resize(250, 250).write(oldPath);
  await fs.rename(oldPath, newPath);
  const relativePath = path.join("avatars", filename);

  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL: relativePath },
    { new: true }
  );
  if (!user) throw reqError(404);

  res.json({
    avatarURL: user.avatarURL,
  });
};

module.exports = {
  changeUserAvatar: decorator(changeUserAvatar),
};
