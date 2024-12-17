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
};

export enum Gender {
    Male = 'Male',
    Female = 'Female',
  }


export enum Kind{
    Dog = 'Dog',
    Cat = 'Cat',
    Puppy ='Puppy',
    Doggy = 'Doggy'
}

export enum AgeLevel{
    Junior = 'Junior',
    Middle = 'Middle',
    Senior = 'Senior'
}
