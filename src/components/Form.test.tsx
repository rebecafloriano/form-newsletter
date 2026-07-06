import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Form from './Form'

describe('Form Component', () => {
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

    it('checar se o botão fica bloqueado se o campo email ficar vazio', () => {
        render(<Form />)
        
        const nameInputElement = screen.getByPlaceholderText(/Escreva seu nome/i)
        const termosCheckboxElement = screen.getByLabelText(/Concordo com os termos/i)
        const buttonElement = screen.getByRole('button')

        fireEvent.change(nameInputElement, { target: { value: 'Rebeca' } })
        fireEvent.click(termosCheckboxElement)
        
        expect(buttonElement).toBeDisabled

    })
})  