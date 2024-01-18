exports.setcookie = (student, statusCode, res) => {
  const token = student.generateJWT();

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ content: "heylo gays", id: student._id, token: token });
};

