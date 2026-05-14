// Validate required fields in request body
export const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || String(value).trim() === '';
    });

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`,
      });
    }
    next();
  };
};

// Validate that a numeric field is positive
export const validatePositiveNumber = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      const value = Number(req.body[field]);
      if (isNaN(value) || value <= 0) {
        return res.status(400).json({
          success: false,
          message: `Field "${field}" must be a positive number`,
        });
      }
    }
    next();
  };
};
