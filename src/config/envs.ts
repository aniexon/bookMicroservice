import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironmentsVar {
    HOST: string;
    PORT: number;
    DATABASE_URL: string;
}

const envsSchema = joi.object<IEnvironmentsVar>({
    HOST: joi.string().required(),
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error)
    throw new Error(`Error de validación de variables de entorno: ${error}`)

const envVars: IEnvironmentsVar = value;

export const environmentVars = {
    HOST: envVars.HOST,
    PORT: envVars.PORT,
    DATABASE_URL: envVars.DATABASE_URL
}
