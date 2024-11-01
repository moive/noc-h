import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImplementation(
	// new FileSystemDatasource()
	// new MongoLogDatasource()
	new PostgresLogDatasource()
);

const emailService = new EmailService();
export class Server {
	public static async start() {
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
			const url = "https://googlesdf.com";
			new CheckService(
				logRepository,
				() => console.log(`${url} is ok`),
				(error) => console.log(error)
			).execute(url);
		});

		const logs = await logRepository.getLogs(LogSeverityLevel.medium);
		console.log("👉: ", logs);
	}
}
