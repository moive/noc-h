import { CronService } from "./cron.service";

describe("CronService", () => {
	const mockTick = jest.fn();

	test("Should create a job", (done) => {
		const job = CronService.createJob("* * * * * *", mockTick);

		setTimeout(() => {
			expect(mockTick).toHaveBeenCalledTimes(2);
			job.stop();
		}, 2000);
		done();
	});
});
