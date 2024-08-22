import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
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

			return true;
		} catch (error) {
			console.log(error);
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
