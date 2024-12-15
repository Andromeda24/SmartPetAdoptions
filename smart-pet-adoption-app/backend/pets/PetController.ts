import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../common.ts";
import { Pet, PetModel} from "./PetModel.ts";

export const newPet: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {
    try { 
            const new_pet = req.body;
    
            if (!new_pet.name) throw new Error('Name is required');
                const results = await PetModel.create(req.body);
            const pet: Pet = {
                            _id: results._id,
                            name: results.name,
                            kind: results.kind,
                            breed: results.breed,
                            age: results.age,
                            gender: results.gender,
                            description: results.description,
                            sterilized: results.sterilized,
                            image_path: results.image_path,
            }
            res.status(201).json({ success: true, data: pet });
    
        } catch (err) {
            next(err);
        }

                    
};

export const updatePet: RequestHandler<{id:string}, StandardResponse<{ updated_documents:Number}>
            , Pet, unknown> = async (req, res, next) => {

                if (!req.file) {
                    // update data
                    console.log(req.body);
                    const results = await PetModel.updateOne({_id: req.params.id}
                        , {$set: {...req.body }}
                    )
                
                    return res.status(200).json({success: true, 
                        data: { updated_documents:results.modifiedCount}});
                
                  } else {
                    // update Immage
                    const results = await PetModel.updateOne({_id: req.params.id}
                        , {$set: {image_url:req.file?.path }}
                    )
                
                    return res.status(200).json({success: true, 
                        data: { updated_documents:results.modifiedCount}});
                  }
    
};

export const deletePet: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {
    
};

export const listPets: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {
    
};