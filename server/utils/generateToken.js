import JWT from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days only
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

export default generateTokenAndSetCookie;
