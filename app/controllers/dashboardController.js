const { Project, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const user = await User.findById(req.session.user.id);

      const projects = await Project.findAll({
        where: {
          UserId: req.session.user.id,
        },
      });
      return res.render('dashboard/index', { projects, user });
    } catch (err) {
      return next(err);
    }
  },
};
