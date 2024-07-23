import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbProtocol = process.env.DB_PROTOCOL;
const dbCluster = process.env.DB_CLUSTER;
const dbOptions = process.env.DB_OPTIONS;

const mongoDBConnection = `${dbProtocol}${dbUser}:${encodeURIComponent(dbPassword)}@${dbCluster}${dbOptions}`;
console.log("server db connection URL " + mongoDBConnection);

const server = new App(mongoDBConnection).express;
server.listen(port || 8080, () => {
    console.log(`Server running on port ${port}`);
});
