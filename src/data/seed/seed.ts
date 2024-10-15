import mongoose from "mongoose";
import { envs } from "../../config";
import AccountsModel from "../models/AccountsModel";
import  AccountsDefault from "../accounts_validated";

async function seedDatabase() {
	try {
		await mongoose.connect(envs.MONGO_URL, {
			dbName: envs.MONGO_DB_NAME,

		});
		console.log("Connected to MongoDB");

		// Eliminar todos los documentos en las colecciones
		await AccountsModel.deleteMany({});
		console.log("Collections cleared");

		// Insertar nuevos documentos en la colección 'regions'
		await AccountsModel.insertMany(AccountsDefault);
		console.log("Regions database seeded!");
	} finally {
		await mongoose.disconnect();
	}
}

seedDatabase().catch(console.dir);
