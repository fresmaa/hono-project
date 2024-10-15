import { Client } from "pg";

export type DBClientType = Client;

export class DbInstance {
  private static instance: DbInstance;
  private static CacheClient: DBClientType;
  private isConnected = false;

  //Database Credentials
  private host = process.env.DB_HOST;
  private port = Number.parseInt(process.env.DB_PORT as string);
  private user = process.env.DB_USERNAME;
  private password = process.env.DB_PASSWORD;
  private database = process.env.DB_DATABASE;

  private DbClient = new Client({
    host: this.host,
    port: this.port,
    user: this.user,
    password: this.password,
    database: this.database,
  });

  // Constructor
  private constructor() {
    console.warn("🔺 New Database Client Instance Created!!");
  }

  private async initialize() {
    try {
      DbInstance.CacheClient = this.DbClient;
      console.info(`Tesint`, this.user);

      await this.DbClient.connect();
      this.isConnected = true;
      console.info(`✅ Connected to Database`);
    } catch (err) {
      this.isConnected = false;
      console.error("❌ Could not connect to Database\n%o", err);
      throw err;
    }
  }

  //Singleton Function Implement
  public static getInstance = async (): Promise<DbInstance> => {
    if (!DbInstance.instance || !DbInstance.instance.isConnected) {
      DbInstance.instance = new DbInstance();
      await DbInstance.instance.initialize();
      return DbInstance.instance;
    }
    console.info(`🔁 Old DB instance Called again :)`);
    return DbInstance.instance;
  };

  //Usable Function Component to get client
  public getClient = async (): Promise<DBClientType> => {
    return DbInstance.CacheClient;
  };
}
