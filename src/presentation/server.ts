import { CheckService } from "../domain/use-cases/checks/check.service";
import { CronService } from "./cron/cron.service";

export class Server {
	public static start() {
		console.log("Server started...");
		CronService.createJon("*/5 * * * * *", () => {
			// const date = new Date();
			// console.log("5 second", date);
			const url = "https://google.com";
			new CheckService(
				() => console.log(`${url} is ok`),
				(error) => console.log(error)
			).execute(url);
		});
	}
}
