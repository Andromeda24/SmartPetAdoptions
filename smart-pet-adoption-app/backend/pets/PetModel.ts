import { Schema, model, InferSchemaType, pluralize } from 'mongoose';


const petSchema = new Schema({
    name:{ type: String, required:true },
    kind: { type: String, enum : ['Dog','Cat','Hamster'], required:true},
    breed: {type:String, default:'unknown' } ,
    age: Number,
    gender:{ type: String, enum : ['Male','Female']},
    description: String,
    embeddedDescription:[Number],
    image_path: String,
    sterilized: Boolean,
}, { timestamps: true, versionKey: false })  

type fullPet = InferSchemaType<typeof petSchema>;
export type Pet = Partial<fullPet>;
export const PetModel = model<Pet>('pet', petSchema);


