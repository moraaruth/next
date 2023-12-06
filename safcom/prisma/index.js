import { PrismaClient } from '@prisma/client/edge'
export const prisma = new PrismaClient();


// model user {
//     id         String  @id @default(auto()) @map("_id") @db.ObjectId
//     v          Int?    @map("__v") @default(0) 
//     email      String  @unique
//     isAdmin    Boolean
//     isVerified Boolean
//     password   String
//     username   String  @unique
//   }