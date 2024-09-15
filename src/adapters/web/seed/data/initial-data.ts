
interface SeedUser {
    email: string;
    password: string;
    roles: string[];
    firstName?: string;
    lastName?: string;
}


interface SeedData {
    users: SeedUser[];
}


export const initialData: SeedData = {
    users: [
        {
            email: "admin@momentu.co",
            password: "$2b$12$KxAfUXZaA80pg8brzVVULexJ8e.0DknyIW4EHwvwPjpPHSZrROoCe", // Test123
            roles: ["superadmin"],
            firstName: "Admin",
            lastName: "Prior Auth",
        },
    ],
}