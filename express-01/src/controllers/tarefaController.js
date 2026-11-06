
import { z } from "zod";
import { tarefaService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const criarSchema = z.object({
  descricao: z.string().trim().min(1, "Descrição obrigatória."),
  concluida: z.boolean().default(false),
});

const atualizarSchema = z.object({
  descricao: z.string().trim().min(1).optional(),
  concluida: z.boolean().optional(),
}).refine(
  (dados) => Object.keys(dados).length > 0,
  "Informe pelo menos um campo para atualizar."
);

const idSchema = z.string().uuid();

const validar = (schema, dados) => {
  const resultado = schema.safeParse(dados);

  if (!resultado.success) {
    const mensagem = resultado.error.issues
      .map((erro) => erro.message)
      .join("; ");

    throw new AppError(mensagem, 400);
  }

  return resultado.data;
};

const getTarefas = async (req, res) => {
  const tarefas = await tarefaService.getAllTarefas();
  return res.status(200).send(tarefas);
};

const getTarefa = async (req, res) => {
  const id = validar(idSchema, req.params.objectId);
  const tarefa = await tarefaService.getTarefaById(id);

  if (!tarefa) {
    throw new AppError("Tarefa não encontrada.", 404);
  }

  return res.status(200).send(tarefa);
};

const createTarefa = async (req, res) => {
  const dados = validar(criarSchema, req.body);
  const tarefa = await tarefaService.createTarefa(dados);

  return res.status(201).send(tarefa);
};

const updateTarefa = async (req, res) => {
  const id = validar(idSchema, req.params.objectId);
  const dados = validar(atualizarSchema, req.body);

  const tarefa = await tarefaService.updateTarefa(id, dados);

  if (!tarefa) {
    throw new AppError("Tarefa não encontrada.", 404);
  }

  return res.status(200).send(tarefa);
};

const deleteTarefa = async (req, res) => {
  const id = validar(idSchema, req.params.objectId);
  const excluida = await tarefaService.deleteTarefa(id);

  if (!excluida) {
    throw new AppError("Tarefa não encontrada.", 404);
  }

  return res.status(204).send();
};

export default {
  getTarefas,
  getTarefa,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
