
import models from "../models/index.js";

const getAllTarefas = async () => {
  return await models.Tarefa.findAll();
};

const getTarefaById = async (id) => {
  return await models.Tarefa.findByPk(id);
};

const createTarefa = async ({ descricao, concluida = false }) => {
  return await models.Tarefa.create({
    descricao,
    concluida,
  });
};

const updateTarefa = async (id, { descricao, concluida }) => {
  const tarefa = await getTarefaById(id);

  if (!tarefa) {
    return null;
  }

  return await tarefa.update({
    ...(descricao !== undefined && { descricao }),
    ...(concluida !== undefined && { concluida }),
  });
};

const deleteTarefa = async (id) => {
  const count = await models.Tarefa.destroy({
    where: { id },
  });

  return count > 0;
};

export default {
  getAllTarefas,
  getTarefaById,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
