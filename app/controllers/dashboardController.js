const { Project, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const usuario = await User.findById(req.session.user.id);

      const projects = await Project.findAll({
        where: {
          UserId: req.session.user.id,
        },
      });
      return res.render('dashboard/index', { projects, usuario });
    } catch (err) {
      return next(err);
    }
  },
};
