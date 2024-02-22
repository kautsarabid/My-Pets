const mongoose = require("mongoose");

// Membuat Schema
const dataHewanSchema = new mongoose.Schema({
	nama: {
		type: String,
	},
	jenis: {
		type: String,
	},
	umur: {
		type: String,
	},
	beratBadan: {
		type: String,
	},
	vaksin: {
		type: String,
	},
	jadwalMakan: [
		{
			hariMakan: {
				type: String,
			},
			waktuMakan: {
				type: String,
			},
			tanggalMakan: {
				type: String,
			},
		},
	],
	tiketVaksin: [
		{
			waktuVaksin: {
				type: String,
			},
			tanggalVaksin: {
				type: String,
			},
		},
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const DataHewan = mongoose.model("DataHewan", dataHewanSchema);

module.exports = DataHewan;
