'use server'

import { prisma } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const onBoardUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return {
                sucess: false,
                error: "No authenticated user found"
            }
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user;
        
        const newUser = await prisma.user.upsert({
          where: {
            cleakId: id,
          },
          update: {
            firstName: firstName || null,
            lastName: lastName || null,
            imageUrl: imageUrl || null,
            email: emailAddresses[0].emailAddress || "",
          },
          create: {
            cleakId: id,
            firstName: firstName || null,
            lastName: lastName || null,
            imageUrl: imageUrl || null,
            email: emailAddresses[0].emailAddress || "",
          },
        });

        return newUser
    } catch (error) {
        console.log("Failed to onBoard the user");
    }
}

export const currentUserRole = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return {
                sucess: false,
                error: "No authenticated user found"
            }
        }
        
        const userRole = await prisma.user.findUnique({
            where: {
                cleakId: user.id
            },
            select: {
                role: true
            }
        })

        return userRole?.role
    } catch (error) {
        console.log("Failed to fetch user role")
    }
}

// export const getCurrentUserData = async () => {
//     try {
//         const user = await currentUser();
//         if (!user) {
//           return {
//             sucess: false,
//             error: "No authenticated user found",
//           };
//         }
//         const data = await prisma.user.findUnique({
//             where: {
//                 cleakId: user.id
//             },
//         })
//     } catch (error) {
        
//     }
// }