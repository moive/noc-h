import { CheckService } from "../domain/use-cases/checks/check.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(
	new FileSystemDatasource()
);

export class Server {
	public static start() {
		console.log("Server started...");

		// Send email
		const emailService = new EmailService();
		emailService.sendMail({
			to: "mvelasquezdeveloper@gmail.com",
			subject: "Logs System",
			htmlBody: `
			<h2>Logs System</h2>
			<p>This is a email test 🚩</p>
			<p>See logs attach</p>
			`,
		});

		// CronService.createJon("*/5 * * * * *", () => {
		// 	// const date = new Date();
		// 	// console.log("5 second", date);
		// 	// const url = "https://localhost:3000";
		// 	const url = "https://google.com";
		// 	new CheckService(
		// 		fileSystemLogRepository,
		// 		() => console.log(`${url} is ok`),
		// 		(error) => console.log(error)
		// 	).execute(url);
		// });
	}
}
