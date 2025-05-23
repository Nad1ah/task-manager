const Project = require('../models/projectModel');

// Obter todos os projetos do usuário
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obter um projeto específico
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Projeto não encontrado'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Criar um novo projeto
exports.createProject = async (req, res) => {
  try {
    // Adicionar o ID do usuário como proprietário
    req.body.owner = req.user.id;
    
    const project = await Project.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Atualizar um projeto
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Projeto não encontrado'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        project
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Excluir um projeto
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Projeto não encontrado'
      });
    }
    
    // Usar o método remove para acionar o middleware pre-remove
    await project.remove();
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obter tarefas de um projeto específico
exports.getProjectTasks = async (req, res) => {
  try {
    const { Task } = require('../models/taskModel');
    
    const tasks = await Task.find({
      project: req.params.id,
      owner: req.user.id
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
