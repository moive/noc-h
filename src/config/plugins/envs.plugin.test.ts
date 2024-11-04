import { envs } from "./envs.plugin";

describe("envs.plugins.ts", () => {
	test("Should return env options", () => {
		expect(envs).toEqual({
			PORT: 3000,
			MAILER_SERVICE: "gmail",
			MAILER_EMAIL: "moises007@gmail.com",
			MAILER_SECRET_KEY: "qdemdqphcgnbozxp",
			PROD: false,
			MONGO_URL: "mongodb://moises:123456789@localhost:27019/",
			MONGO_DB_NAME: "NOC-TEST",
			MONGO_USER: "moises",
			MONGO_PASS: "123456789",
		});
	});

	test("Should return error if not found env", async () => {
		jest.resetModules();
		process.env.PORT = "ABC";
		try {
			await import("./envs.plugin");
			expect(true).toBe(false);
		} catch (error) {
			// console.log(error);
			expect(`${error}`).toContain('"PORT" should be a valid integer');
		}
	});
});
