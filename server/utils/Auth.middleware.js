import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Entry!" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token!",
      error: error.message,
    });
  }
};
