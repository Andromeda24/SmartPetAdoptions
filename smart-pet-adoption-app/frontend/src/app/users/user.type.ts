export type User = {
  name: string,
  email: string,
  password: string,
  address: string,
  phonenumber: string,
  profile_picture?: string;
  role : Role;
};

export type Token = {
  _id: string,
  email: string,
  name: string;
};


export enum Role {
  Admin = 'Admin',
  Seeker = 'Seeker',
}