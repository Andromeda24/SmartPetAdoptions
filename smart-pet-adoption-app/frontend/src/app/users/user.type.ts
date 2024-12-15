export type User = {
  name: string,
  email: string,
  password: string,
  address: string,
  phone: string,
  // profile_picture?: string;
  role : Role;
};

export type Token = {
  _id: string,
  email: string,
  name: string;
};


export enum Role {
  Admin = 'ShelterAdmin',
  Seeker = 'PetSeeker',
}