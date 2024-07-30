interface ICheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

export class CheckService implements ICheckServiceUseCase {
	async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);
			if (!req.ok) throw new Error(`Error on check service ${url}`);

			console.log(`${url} is ok`);
		} catch (err) {
			console.error(err);
			return false;
		}

		return true;
	}
}
