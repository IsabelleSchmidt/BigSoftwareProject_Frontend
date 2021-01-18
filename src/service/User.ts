interface User{
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    password: string;
    gender: string;
    allAdresses: Set<Adress>;
    
}

interface UserMessage{
    email: string;
    message: string;
    type: string;
  }