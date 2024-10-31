import "dotenv/config";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(() => {
	main();
})();

async function main() {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	/* const newLog = await LogModel.create({
		message: "Test message from MongoDB",
		origin: "App.ts",
		level: "low",
	});

	await newLog.save(); */

	const logs = await LogModel.find({}, { _id: 0, message: 1 });
	console.log(logs);

	// Server.start();
	// console.log(envs);
}
