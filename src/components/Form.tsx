import { useState, type BaseSyntheticEvent } from 'react';
import { Input } from './ui/Input';
import { Checkbox } from './ui/Checkbox';
import { Button } from './ui/Button';
import type { User } from '../types/User';
import { validate } from '../utils/validate';


const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [agree, setAgree] = useState(false);

    const [errors, setErrors] = useState<User | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [apiError, setApiError] = useState<string | null>(null)

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        setErrors(null)
        setApiError(null)

        const data: User = {
            name,
            email,
            agree
        }

        const validateErrors = validate(data)

        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors)

            return
        }

        // API
        setIsLoading(true)
        try {
            // Simulando uma chamada de API (POST) para o site httpbin
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            // Caso 1: O servidor respondeu, mas com erro (ex: 404, 500)
            if (!response.ok) {
                setApiError(`Erro do servidor: Código ${response.status}`);
                return;
            }

            // Caso de Sucesso
            setIsSuccess(true);

        } catch (error) {
            // Caso 2: O fetch falhou totalmente (Internet caiu, URL errada, etc)
            setApiError("Falha na rede. Não foi possível contatar o servidor.");
        } finally {
            setIsLoading(false)
        }

    }

    const handleReset = () => {
        setName("")
        setEmail("")
        setAgree(false)
        setErrors(null)
        setApiError(null)
        setIsSuccess(false)
    }

    if (isSuccess) {
        return (
            <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
                <h2 className="text-2xl font-bold text-green-700">🎉 Sucesso!</h2>
                <p className="text-green-600">{name}, seu cadastro foi realizado com êxito.</p>
                <button
                    onClick={handleReset}
                    className="mt-4 text-sm underline"
                >
                    Voltar
                </button>
            </div>
        )
    }

    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <Input
                id='name'
                label='Nome'
                placeholder='Escreva seu nome'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors?.name}
            />

            <Input
                id='email'
                label='Email'
                placeholder='exemplo@exemplo.com'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors?.email}

            />

            <div className="flex flex-col gap-2 py-2">
                <a className="text-xs underline text-blue-600 hover:text-blue-800" href="#">Leia os termos</a>

                <Checkbox
                    id='agree'
                    label='Concordo com os termos'
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    error={errors?.agree}
                />

            </div>
            {apiError && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm'>
                    {apiError}
                </div>
            )}
            <Button
                type='submit'
                disabled={isLoading}
            >
                {isLoading ? "Enviando..." : "Cadastrar"}
            </Button>
        </form>
    )
}

export default Form