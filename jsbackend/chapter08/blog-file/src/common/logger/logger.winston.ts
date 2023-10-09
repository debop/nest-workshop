import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as winston from 'winston';

const env = process.env.NODE_ENV;

export const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: env === 'prod' ? 'info' : 'silly',
            format: winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike('BlogApp', { prettyPrint: true, colors: true }),
            ),
        }),
    ],
});
