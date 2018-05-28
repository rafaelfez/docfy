const { Section, Project, User } = require('../models');

module.exports = {
  async view(req, res, next) {
    try {
      const usuario = await User.findById(req.session.user.id);

      const project = await Project.findById(req.params.projectId);

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('sections/new', { project, sections, usuario });
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      const { projectId } = req.params;

      const section = await Section.create({
        ...req.body,
        ProjectId: projectId,
      });

      req.flash('Success', 'Seção criada com sucesso');
      return res.redirect(`app/projects/${projectId}/sections/${section.id}`);
    } catch (err) {
      next(err);
    }
  },
};
