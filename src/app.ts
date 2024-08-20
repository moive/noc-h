import "dotenv/config";
import { Server } from "./presentation/server";

(() => {
	main();
})();

function main() {
	// Server.start();
	console.log({ email: process.env.MAILER_EMAIL });
}
