export function UserSchema(name, email, password) {
    return [
      {
        name: {
          value: name,
          type: "string",
          empty: false,
          min: 4,
          max: 20
        },
        email: {
          value: email,
          type: "email",
          empty: false,
        },
        password: {
          value: password,
          type: "password",
          empty: false
        }
      }
    ];
  }