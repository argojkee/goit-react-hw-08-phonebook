export type AuthResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = Omit<RegisterRequest, "name">;

export type CurrentUserResponse = {
  name: string;
  email: string;
};

export type Contact = {
  id: string;
  name: string;
  number: string;
};

export type ContactRequest = Omit<Contact, "id">;
