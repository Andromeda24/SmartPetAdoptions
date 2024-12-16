import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../common.ts";
import { Pet, PetModel} from "./PetModel.ts";

const PAGE_SIZE = 5;
export const newPet: RequestHandler<unknown, StandardResponse<Pet>
            , Pet, unknown> = async (req, res, next) => {
    try { 
            const new_pet = req.body;
    
            if (!new_pet.name) throw new ErrorWithStatus('Name is required',403);
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

export const updatePet: RequestHandler<{petid:string}, StandardResponse<{ updated_documents:Number}>
            , Pet, unknown> = async (req, res, next) => {
    try {
        if (!req.file) {
            // update data
            if (Number(!req.params.petid)){
                 new ErrorWithStatus('Id is required',403)
            } 
            const results = await PetModel.updateOne({_id: req.params.petid}
                , {$set: {...req.body }}
            )
        
            return res.status(200).json({success: true, 
                data: { updated_documents:results.modifiedCount}});
        
            } else {
            // update Image
            const results = await PetModel.updateOne({_id: req.params.id}
                , {$set: {image_path:req.file?.path }}
            )
        
            return res.status(200).json({success: true, 
                data: { updated_documents:results.modifiedCount}});
        }
    } catch (err) {
        next(err);
    }
    
};

export const deletePet: RequestHandler<{petid:string}, StandardResponse<number>
            , unknown, unknown> = async (req, res, next) => {
    try { 
        let query = {} 
        let page = 0
        
        if (Number(!req.params.petid)){
            new ErrorWithStatus('Id is required',403)
        } 
        const results = await PetModel
            .deleteOne({_id:req.params.petid});
        res.status(200).json({ success: true, data: results.deletedCount });

    } catch (err) {
        next(err);
    }
            
    
};

export const listPets: RequestHandler<{page: number, ownerId:string} , StandardResponse<Pet[]>
            , Pet, unknown> = async (req, res, next) => {

   try { 
        let query = {} 
        let page = 0
        
        if (req.params.ownerId){
            query  = {... query, ownerId: req.params.ownerId} ;
        } else {
            query  = {... query, ownerId:""} ; 
        } 
        if (Number(req.params.page)){
            page=Number(req.params.page)-1;
        } 
        console.log(query) ;
        console.log(req.params ) ;
        const results = await PetModel
            .find(query
                ,{_id: 1, name:1,kind:1,breed:1,age:1,gender:1,
                    description:1,sterilized:1,image_path:1})
            .skip(page*PAGE_SIZE)
            .limit(PAGE_SIZE);
        res.status(201).json({ success: true, data: results });

    } catch (err) {
        next(err);
    }

                     
};