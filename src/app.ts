import "dotenv/config";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { PrismaClient } from "@prisma/client";

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

	/* const logs = await LogModel.find({}, { _id: 0, message: 1 });
	console.log(logs); */
	// const prisma = new PrismaClient();
	/*const newLog = await prisma.logModel.create({
		data: {
			level: "HIGH",
			message: "Test message",
			origin: "App.ts",
		},
	});

	console.log({ newLog }); */

	// const logs = await prisma.logModel.findMany({
	// 	where: {
	// 		level: "LOW",
	// 	},
	// });
	// console.log(logs);

	Server.start();
	// console.log(envs);
}
