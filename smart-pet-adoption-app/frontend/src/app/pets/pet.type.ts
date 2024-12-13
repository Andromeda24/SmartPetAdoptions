export type Pet = {
    _id: string,
    name : string,
    kind: string,
    breed: string ,    
    age: number,
    gender:Gender,
    description: string,
    image_path: string,
    sterilized: boolean,
};

export enum Gender {
    Male = 'Male',
    Female = 'Female',
  }