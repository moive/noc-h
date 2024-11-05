import { LogDatasource } from "../../datasources/log.datasource";
import { LogEntity } from "../../entities/log.entity";
import { CheckMultipleService } from "./checkMultiple.service";

describe("CheckMultipleService UseCase", () => {
	const mockRepo1 = { saveLog: jest.fn(), getLogs: jest.fn() };
	const mockRepo2 = { saveLog: jest.fn(), getLogs: jest.fn() };
	const mockRepo3 = { saveLog: jest.fn(), getLogs: jest.fn() };
	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkMultipleService = new CheckMultipleService(
		[mockRepo1, mockRepo2, mockRepo3],
		successCallback,
		errorCallback
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("Should call sucessCallback when fetch return true", async () => {
		const wasOk = await checkMultipleService.execute("https://google.com");

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();

		expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});

	test("Should call errorCallback when fetch return false", async () => {
		const wasOk = await checkMultipleService.execute(
			"https://gogoogle.com"
		);

		expect(wasOk).toBe(false);
		expect(successCallback).not.toHaveBeenCalled();
		expect(errorCallback).toHaveBeenCalled();

		expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
});
