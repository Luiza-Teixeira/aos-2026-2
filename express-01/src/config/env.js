
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL deve ser uma URL válida.")
    .refine(
      (valor) =>
        valor.startsWith("postgresql://") ||
        valor.startsWith("postgres://"),
      "DATABASE_URL deve utilizar PostgreSQL."
    ),

  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  SYNC_DATABASE: z.enum(["true", "false"]).default("false"),

  ERASE_DATABASE_ON_SYNC: z.enum(["true", "false"]).default("false"),
});

const env = envSchema.parse(process.env);

export default env;
