import mongoose from "mongoose";
//Genrated by chatGPT
// Patient Schema
const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String, required: true },
    },
    medicalRecords: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" },
    ],
  },
  { timestamps: true }
);

// Doctor Schema
const doctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    specialization: { type: String, required: true },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);

// Department Schema
const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  },
  { timestamps: true }
);

// Appointment Schema
const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      required: true,
    },
  },
  { timestamps: true }
);

// Room Schema
const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: Number, required: true },
    type: { type: String, enum: ["ICU", "General", "Private"], required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Medical Record Schema
const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    dateOfRecord: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Exporting Models
export const Patient = mongoose.model("Patient", patientSchema);
export const Doctor = mongoose.model("Doctor", doctorSchema);
export const Department = mongoose.model("Department", departmentSchema);
export const Appointment = mongoose.model("Appointment", appointmentSchema);
export const Room = mongoose.model("Room", roomSchema);
export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);
