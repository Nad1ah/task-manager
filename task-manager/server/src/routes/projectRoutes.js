const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Todas as rotas de projetos requerem autenticação
router.use(protect);

// Rotas para projetos
router.route('/')
  .get(projectController.getProjects)
  .post(projectController.createProject);

router.route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

// Rota para obter tarefas de um projeto específico
router.get('/:id/tasks', projectController.getProjectTasks);

module.exports = router;
