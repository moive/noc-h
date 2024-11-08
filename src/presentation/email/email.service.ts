import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

export interface Attachment {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	constructor() {}

	async sendMail(options: SendMailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			const sentInformation = await this.transporter.sendMail({
				to: to,
				subject: subject,
				html: htmlBody,
				attachments,
			});

			console.log(sentInformation);

			const log = new LogEntity({
				level: LogSeverityLevel.low,
				message: "Email sent",
				origin: "email.service.ts",
			});
			// this.logRepository.saveLog(log);

			return true;
		} catch (error) {
			// console.log(error);
			const log = new LogEntity({
				level: LogSeverityLevel.high,
				message: "Email not sent",
				origin: "email.service.ts",
			});
			// this.logRepository.saveLog(log);
			return false;
		}
	}

	async sendEmailWithFilesSystemLogs(to: string | string[]) {
		const subject = "Logs server 🚩";
		const htmlBody = `
    <h2>Logs System - NOC</h2>
    <p>This is a email test 😀</p>
    <p>See logs attach 👇</p>
    `;

		const attachments: Attachment[] = [
			{ filename: "logs-all.log", path: "./logs/logs-all.log" },
			{ filename: "logs-medium.log", path: "./logs/logs-medium.log" },
			{ filename: "logs-high.log", path: "./logs/logs-high.log" },
		];

		return this.sendMail({ to, subject, attachments, htmlBody });
	}
}
