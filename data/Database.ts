import "reflect-metadata";
import { Connection, ConnectionOptions, getConnectionManager } from "typeorm";
import { ConferenceSchema } from "./entities/Conferences";
import { SessionSchema } from "./entities/Session";
import { UserSchema } from "./entities/User";

const options: { [connectionName: string]: ConnectionOptions } = {
  default: {
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: process.env.NODE_ENV !== "production",
    entities: [ConferenceSchema, SessionSchema, UserSchema],
  },
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options["entities"] = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export async function ensureConnection(
  name: string = "default"
): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (process.env.NODE_ENV !== "production") {
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  return await connectionManager.create({ name, ...options[name] }).connect();
}
