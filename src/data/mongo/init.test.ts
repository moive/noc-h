import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("Init Mongodb", () => {
	afterAll(() => {
		mongoose.connection.close();
	});

	test("Should connect to Mongodb", async () => {
		const connected = await MongoDatabase.connect({
			mongoUrl: process.env.MONGO_URL!,
			dbName: process.env.MONGO_DB_NAME!,
		});

		expect(connected).toBe(true);
	});

	test("Should throw an error", async () => {
		try {
			const connected = await MongoDatabase.connect({
				mongoUrl: "mongodb://moises:123456789@localhostmoi:27019/",
				dbName: process.env.MONGO_DB_NAME!,
			});
			expect(true).toBe(false);
		} catch (error) {}
	});
});
