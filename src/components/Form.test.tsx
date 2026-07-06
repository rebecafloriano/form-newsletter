import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Form from './Form'

describe('Teste Renderização', () => {

    it('Deve renderizar os subcomponentes input, checkbox e button corretamente', () => {
        render(<Form />)

        const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i)
        const emailInputElement = screen.getByPlaceholderText(/exemplo@exemplo.com/i)
        const termosCheckboxElement = screen.getByLabelText(/Concordo com os termos/i)
        const buttonElement = screen.getByRole('button')
        
        expect(nameInputElement).toBeInTheDocument()
        expect(emailInputElement).toBeInTheDocument()
        expect(termosCheckboxElement).toBeInTheDocument()
        expect(buttonElement).toBeInTheDocument()
    })
})  

describe('validação dos campos e botao', () => {

    it('Botão enviar deve estar bloqueado caso os campos estão em branco', () => {
        render(<Form />)
        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeDisabled()
    })

    it('Falta email e os termos, apenas nome preenchido', () => {
        render(<Form />)
        
        const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i)

        const buttonElement = screen.getByRole('button')
        fireEvent.change(nameInputElement, { target: { value: 'Rebeca' } })
        
        expect(buttonElement).toBeDisabled()

    })

    it('Falta aceitar os termos. Nome e email preenchidos', () => {
        render(<Form/>)

        const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i)
        const emailInputElement = screen.getByPlaceholderText(/exemplo@exemplo.com/i)
        const buttonElement = screen.getByRole('button')

        fireEvent.change(nameInputElement, { target: { value: 'Rebeca' } })
        fireEvent.change(emailInputElement, { target: { value: 'rebeca@gmail.com' } })
        
        expect(buttonElement).toBeDisabled()
    })

    it('Tudo preenchido, o botao deve ficar disponível', () => {
        render(<Form />)

        const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i)
        const emailInputElement = screen.getByPlaceholderText(/exemplo@exemplo.com/i)
        const termosCheckboxElement = screen.getByLabelText(/Concordo com os termos/i)
        const buttonElement = screen.getByRole('button')

        fireEvent.change(nameInputElement, { target: { value: 'Rebeca' } })
        fireEvent.change(emailInputElement, { target: { value: 'rebeca@gmail.com' } })
        fireEvent.click(termosCheckboxElement)

        expect(buttonElement).not.toBeDisabled()
        
    })
})

