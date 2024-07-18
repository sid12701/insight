import z from "zod";

export const registerInput = z.object({
    email: z.string().email(),
    password: z.string(),  
});


export const signInInput = z.object({
    email:z.string().email(),
    password:z.string()
});


