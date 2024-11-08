import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { CheckMultipleService } from "../domain/use-cases/checks/checkMultiple.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImplementation(
	new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImplementation(
	new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImplementation(
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

		// CronService.createJob("*/5 * * * * *", () => {
		// 	// const date = new Date();
		// 	// console.log("5 second", date);
		// 	// const url = "https://localhost:3000";
		// 	const url = "https://google.com";
		// 	new CheckMultipleService(
		// 		[fsLogRepository, mongoLogRepository, postgresLogRepository],
		// 		() => console.log(`${url} is ok`),
		// 		(error) => console.log(error)
		// 	).execute(url);
		// });
	}
}
