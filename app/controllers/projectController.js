const { Project, User, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('Success', 'Projeto criada com sucesso');
      res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const usuario = await User.findById(req.session.user.id);

      const projeto = await Project.findById(req.params.id);

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('projects/show', {
        usuario,
        sections,
        projeto,
        activeProject: req.params.id,
      });
    } catch (err) {
      return next(err);
    }
  },
};
