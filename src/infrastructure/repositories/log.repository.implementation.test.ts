import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImplementation } from "./log.repository.implementation";

describe("LogRepositoryImplementation", () => {
	const mockLogDatasource = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const logRepository = new LogRepositoryImplementation(mockLogDatasource);

	beforeEach(() => {
		jest.clearAllMocks();
	});
	test("Should saveLog call the datasource with arguments", async () => {
		const log = {
			level: LogSeverityLevel.high,
			message: "Hello",
			origin: "log.repository.implementation.ts",
		} as LogEntity;

		await logRepository.saveLog(log);
		expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
	});

	test("Should getLogs call the datasource with arguments", async () => {
		const logSeverity = LogSeverityLevel.low;
		await logRepository.getLogs(logSeverity);
		expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logSeverity);
	});
});
