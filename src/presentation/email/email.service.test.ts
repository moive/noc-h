import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email.service";

describe("EmailService", () => {
	const mockSendMail = jest.fn();

	nodemailer.createTransport = jest.fn().mockReturnValue({
		sendMail: mockSendMail,
	});

	const emailService = new EmailService();

	test("Should send email", async () => {
		const options: SendMailOptions = {
			to: "mtest@google.com",
			subject: "Test",
			htmlBody: "<h1>Test</h1>",
		};

		await emailService.sendMail(options);

		expect(mockSendMail).toHaveBeenCalledWith({
			attachments: expect.any(Array),
			html: "<h1>Test</h1>",
			subject: "Test",
			to: "mtest@google.com",
		});
	});

	test("Should send email with attachments", async () => {
		const email = "mtest@google.com";
		await emailService.sendEmailWithFilesSystemLogs(email);

		expect(mockSendMail).toHaveBeenCalledWith({
			to: email,
			subject: "Logs server 🚩",
			html: expect.any(String),
			attachments: expect.arrayContaining([
				{ filename: "logs-all.log", path: "./logs/logs-all.log" },
				{ filename: "logs-medium.log", path: "./logs/logs-medium.log" },
				{ filename: "logs-high.log", path: "./logs/logs-high.log" },
			]),
		});
	});
});
