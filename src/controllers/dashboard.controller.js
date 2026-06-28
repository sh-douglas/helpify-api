import DashboardService from "../services/dashboard.service.js";

class DashboardController {
  async summary(req, res, next) {
    try {
      const summary = await DashboardService.summary(req.user);

      return res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();
