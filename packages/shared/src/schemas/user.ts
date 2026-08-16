import {z} from "zod";

export const UserCreateParams = z.object({
    username: z.string().min(4, "Username must be at least 4 characters").max(20, "Username must be at most 20 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(40, "Password must be at most 40 characters").refine(
        (value) => !/^\s+$/.test(value),
        "Password cannot contain only whitespace",
    )
});

export const UserRegisterParams = UserCreateParams.extend({
    passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
})

export type UserRegisterParamsType = z.infer<typeof UserRegisterParams>;

export const UserLoginParams = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export type UserLoginParamsType = z.infer<typeof UserLoginParams>;
