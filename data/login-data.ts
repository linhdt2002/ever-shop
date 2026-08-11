export const data = [
    {
        username: "",
        password: "123456",
        expected: [
            {
                field: "Email",
                message: "Email is required"
            }
        ]
    },
    {
        username: "demo@evershop.io",
        password: "",
        expected: [
            {
                field: "Password",
                message: "Password is required"
            }
        ]
    },
    {
        username: "Invalid email",
        password: "123456",
        expected: [
            {
                field: "Email",
                message: "Please enter a valid email address"
            }
        ]
    }
];