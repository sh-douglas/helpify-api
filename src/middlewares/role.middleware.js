import AppError from "../utils/app-error.js";

function checkAllowedRoles(allowedRoles) {
  return function (req, res, next) {
    const user = req.user;

    if (!user) {
      next(new AppError("Unauthorized.", 401));
      return;
    }

    if (!allowedRoles.includes(user.role.name)) {
      next(new AppError("Forbidden.", 403));
      return;
    }

    next();
  };
}

export default checkAllowedRoles;
