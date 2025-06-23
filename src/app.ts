import dotenv from "dotenv";
import express, { json, urlencoded, ErrorRequestHandler } from "express";
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";
import { RegisterRoutes } from "./routes/routes";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import rateLimit from "express-rate-limit";
// import cors from "cors";

dotenv.config();

const app = express();

// middleware for json parsing of request body
app.use(urlencoded({ extended: true }));
app.use(json());

// serve Swagger UI
app.use(
	["/openapi", "/docs", "/swagger"],
	swaggerUI.serve,
	swaggerUI.setup(swaggerJson)
);

// serve swagger JSON
app.get("/swagger.json", (_, res) => {
	res.setHeader("Content-Type", "application/json");
	res.sendFile(__dirname + "/tsoa/tsoa.json");
});

const rateLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 25, // lower it for easy testing
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res, _next) => {
		const ip = req.ip;
		console.warn(`⚠️ Rate limit hit for IP: ${ip}`);
		res.status(429).json({ error: "Too many requests, chill for a bit." });
	},
});

// const allowedOrigins = [
// 	"https://btc.j3g.dev",   // production
// 	"http://localhost:3000", // local dev
// ];

// const corsOptions: cors.CorsOptions = {
// 	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
// 		console.log(`🔍 CORS check - Origin: "${origin}"`);

// 		// Allow undefined origin for local development (same-origin requests)
// 		if (!origin || allowedOrigins.includes(origin)) {
// 			callback(null, true);
// 		} else {
// 			console.warn(`❌ Blocked CORS request from: ${origin}`);
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// 	optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(rateLimiter);

// tsoa routes
RegisterRoutes(app);

// error handler
app.use(errorHandlerMiddleware as ErrorRequestHandler);

const port = process.env.PORT || 8080;

const start = async () => {
	try {
		console.log("🚀 Starting server...");

		app.listen(port, "0.0.0.0", () => {
			console.log(`✨ Server is running on port ${port}...`);
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error("❌ Error during startup:", e.message);
		} else {
			console.error("❌ Error during startup:", e);
		}
		process.exit(1);
	}
};

start();

export default app;
