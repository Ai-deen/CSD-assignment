import bcrypt from "bcryptjs"

export const users =[
    {
        name: "Laharisreeja",
        email: "laharisreejatallapaka@gmail.com",
        password: bcrypt.hashSync('1234',8),
        isAdmin: true,
    },
    {
        name: "AnkitaKumari",
        email: "akankitakumari009@gmail.com",
        password: bcrypt.hashSync('1234',8),
        isAdmin: true,
    },
]