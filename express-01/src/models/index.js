import Sequelize from "sequelize";
import pg from "pg";
import env from "../config/env.js";

import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import getTarefaModel from "./tarefa.js";

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Tarefa: getTarefaModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
