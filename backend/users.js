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
    {
        name: "kiran",
        email: "admin1@gmail.com",
        password: bcrypt.hashSync('12345',8),
        isAdmin: true,
    },
    {
        name: "Srinidhi",
        email: "admin2@gmail.com",
        password: bcrypt.hashSync('12345',8),
        isAdmin: true,
    },
]