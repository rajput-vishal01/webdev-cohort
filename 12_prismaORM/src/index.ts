// npx prisma generate -> generates a auto generated client
//-- similar as in mongoose to have a access to user obj we use mongoose
//here this generated client will provide us the user class which it made form the prisma model

import { PrismaClient } from "./generated/prisma"; 
const prisma = new PrismaClient();

/*
similar as 
import mongoose form mongoose 
mongoose.connect()...
*/

// prisma.user.create suggestions by auto generate client

async function insertUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  const res = await prisma.user.create({
    data: {
      email,
      password,
      firstname,
      lastname,
    },
  });

  console.log("Created user:", res);
}

async function getUsers() {
  const res = await prisma.user.findMany();
  console.log("All users:", res);
}

async function updateUser(id: number, newName: string) {
  const res = await prisma.user.update({
    where: { id },
    data: { firstname: newName },
  });
  console.log("Updated user:", res);
}

async function deleteUser(id: number) {
  const res = await prisma.user.delete({
    where: { id },
  });
  console.log("Deleted user:", res);
}

insertUser("admin1@email.com", "123456", "vishal", "kumar");
getUsers();
updateUser(1, "Vishal K.");
deleteUser(1);