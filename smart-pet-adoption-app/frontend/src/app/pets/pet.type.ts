export type Pet = {
    _id: string,
    name : string,
    kind: Kind,
    breed: string ,    
    age: number,
    gender:Gender,
    description: string,
    image_path: string,
    sterilized: boolean,
    ownerId : string,
};

export enum Gender {
    Male = 'Male',
    Female = 'Female',
  }


export enum Kind{
    Dog = 'Dog',
    Cat = 'Cat',
    Hamster ='Hamster',   
}

export enum AgeLevel{
    Junior = 'Junior',
    Middle = 'Middle',
    Senior = 'Senior'
}

export type SearchData ={
    kind : string,
    age : string,
    preferences : string,
    userId? : string 
}