export const data = [
    {
        username: "",
        password: "password",
        expected: [
            {
                field: "Email",
                message: "This field can not be empty"
            }
        ]
    },
    {
        username: "dtlinh010202@gmail.com",
        password: "",
        expected: [
            {
                field: "Password",
                message: "This field can not be empty"
            }
        ]
    },
    {
        username: "Invalid email",
        password: "password",
        expected: [
            {
                field: "Email",
                message: "Invalid email"
            }
        ]
    }
];