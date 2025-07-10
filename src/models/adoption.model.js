import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  status: { type: String, default: "pending" }, 
}, { timestamps: true });

export const Adoption = mongoose.model("Adoption", adoptionSchema);
