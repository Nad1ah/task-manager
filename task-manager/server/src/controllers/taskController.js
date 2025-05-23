const Task = require('../models/taskModel');

// Obter todas as tarefas do usuário
exports.getTasks = async (req, res) => {
  try {
    // Construir a query
    const queryObj = { owner: req.user.id };
    
    // Filtrar por status
    if (req.query.status) {
      queryObj.status = req.query.status;
    }
    
    // Filtrar por projeto
    if (req.query.project) {
      queryObj.project = req.query.project;
    }
    
    // Filtrar por prioridade
    if (req.query.priority) {
      queryObj.priority = req.query.priority;
    }
    
    // Filtrar por tags
    if (req.query.tag) {
      queryObj.tags = { $in: [req.query.tag] };
    }
    
    // Buscar tarefas com filtros
    const tasks = await Task.find(queryObj)
      .populate('project', 'name color')
      .sort({ createdAt: -1 });
    
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

// Obter uma tarefa específica
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id
    }).populate('project', 'name color');
    
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Tarefa não encontrada'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    // Adicionar o ID do usuário como proprietário
    req.body.owner = req.user.id;
    
    const task = await Task.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('project', 'name color');
    
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Tarefa não encontrada'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Excluir uma tarefa
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });
    
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Tarefa não encontrada'
      });
    }
    
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
