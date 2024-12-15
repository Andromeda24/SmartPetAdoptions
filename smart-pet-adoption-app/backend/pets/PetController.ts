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
            }
            res.status(201).json({ success: true, data: pet });
    
        } catch (err) {
            next(err);
        }

                    
};

export const updatePet: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {

                if (!req.file) {
                    console.log("No file received");
                    return res.send({
                      success: false
                    });
                
                  } else {
                    console.log('file received');
                    console.log(req.file);
                    console.log(req.body);
                    console.log(req.headers);
                    return res.send({
                      success: true
                    })
                  }
    
};

export const deletePet: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {
    
};

export const listPets: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {
    
};