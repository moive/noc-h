import { CheckService } from "../domain/use-cases/checks/check.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImplementation(
	// new FileSystemDatasource()
	new MongoLogDatasource()
);

const emailService = new EmailService();
export class Server {
	public static start() {
		console.log("Server started...");

		// Send email
		// new SendEmailLogs(emailService, logRepository).execute(
		// 	"mvelasquezdeveloper@gmail.com"
		// );
		// emailService.sendEmailWithFilesSystemLogs(
		// 	"mvelasquezdeveloper@gmail.com"
		// );

		CronService.createJon("*/5 * * * * *", () => {
			// const date = new Date();
			// console.log("5 second", date);
			// const url = "https://localhost:3000";
			const url = "https://google.com";
			new CheckService(
				logRepository,
				() => console.log(`${url} is ok`),
				(error) => console.log(error)
			).execute(url);
		});
	}
}
