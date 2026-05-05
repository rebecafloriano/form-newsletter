import type { User } from "../types/User";

type Error = {
    [key: string]: string;
}

export const validate = (data: User) => {
    const errors: Error = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/


    // name validation
    if (!data.name) {
        errors["name"] = "O nome é obrigatório!"
    } else if (data.name.length < 3) {
        errors["name"] = "O nome deve ter pelo menos 3 caracteres!"
    }

    // email validation
    if (!data.email) {
        errors["email"] = "O email é obrigatório!"
    } else if (!emailRegex.test(data.email)) {
        errors["email"] = "Formato de e-mail inválido!"
    }

    // terms validation
    if (!data.agree) {
        errors["agree"] = "É obrigatório concordar com os Termos"
    }

    return errors
}