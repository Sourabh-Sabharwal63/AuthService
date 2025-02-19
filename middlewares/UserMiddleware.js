const inputValidation = async (req, res, next) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res.status(500).json({
      message: "Inputs are not valid both email and password require",
      success: false,
    });
  }
  next();
};

const tokenValidation = async (req, res, next) => {
  try {
    if (!req.headers["x-access-token"]) {
      return res.status(500).json({
        data: {},
        success: false,
        message: "Invalid token",
        error: "Token not available",
      });
    }
    next();
  } catch (error) {
    throw error;
  }
};

const isAdminValidation = async (req, res, next) => {
  if (!req.body.id) {
    return res.status(500).json({
      error: "Invalid credentials",
      success: false,
    });
  }
  next();
};
module.exports = { inputValidation, tokenValidation,isAdminValidation };
