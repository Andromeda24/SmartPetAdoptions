import { Schema, model, InferSchemaType, pluralize } from 'mongoose';


const userSchema = new Schema({
    name: { type: String, required:true },
    email: { type: String, unique: true, required:true },
    password: String,
    role: { type: String, enum : ['ShelterAdmin','PetSeeker'], default:'PetSeeket'},
    address: String ,
    phone: String,
}, { timestamps: true, versionKey: false });

type fullUser = InferSchemaType<typeof userSchema>;
export type User = Partial<fullUser>;
export const UserModel = model<User>('user', userSchema);
