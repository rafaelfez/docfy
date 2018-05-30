const { Section, Project, User } = require('../models');

module.exports = {
  async view(req, res, next) {
    try {
      const user = await User.findById(req.session.user.id);

      const project = await Project.findById(req.params.projectId);

      const sections = await Section.findAll({
        where: { ProjectId: req.params.projectId },
      });

      return res.render('sections/new', { user, sections, project });
    } catch (err) {
      return next(err);
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
      return res.redirect(`/app/projects/${projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const user = await User.findById(req.session.user.id);

      const project = await Project.findById(req.params.projectId);

      const sections = await Section.findAll({
        where: { ProjectId: projectId },
      });

      const section = await Section.findById(id);

      return res.render('sections/show', {
        activeProject: projectId,
        user,
        project,
        sections,
        currentSection: section,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Section.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Seção deletada com sucesso');
      return res.redirect(`/app/projects/${req.params.projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
