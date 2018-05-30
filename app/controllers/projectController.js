const { Project, User, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('Success', 'Projeto criado com sucesso');
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const user = await User.findById(req.session.user.id);

      const project = await Project.findById(req.params.id);

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('projects/show', {
        user,
        sections,
        project,
        activeProject: req.params.id,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Projeto deletado com sucesso');
      return res.redirect('/app/dashboard/');
    } catch (err) {
      return next(err);
    }
  },
};
