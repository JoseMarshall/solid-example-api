import mongoose, { Collection, Model, model, Mongoose, Query, Schema } from 'mongoose';

let client: Mongoose | undefined;

export const MongoHelper = {
  async connect(): Promise<void> {
    client = await mongoose.connect(process.env.MONGO_URL!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  },
  async disconnect(): Promise<void> {
    await client?.disconnect();
    client = undefined;
  },
  getCollection(name: string): Collection | undefined {
    return client?.connection.collection(name);
  },
  clearCollection(name: string): void {
    client?.connection.collection(name).deleteMany({});
  },
  getModel<T>(name: string, schema: Schema): Model<T> {
    return client?.models[name] ?? model<T>(name, schema, name);
  },
};

export async function queryGuard<T>(fn: Query<T, any> | Promise<T | null>): Promise<T> {
  const data = await fn;
  if (!data) throw new Error();

  return data;
}
