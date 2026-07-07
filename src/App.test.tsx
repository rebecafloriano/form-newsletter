import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Teste de renderização App', () => {

    it('Deve renderizar a página principal sem erros', () => {
        render(<App />)
        
        const title = screen.getByRole('heading', { level: 1, name: /Inscreva-se/i })
        expect(title).toBeInTheDocument()
   

        const subtitle = screen.getByText(/Newsletter/i)
        expect(subtitle).toBeInTheDocument()
     

        const aviso = screen.getByText(/Ao se inscrever/i)
        expect(aviso).toBeInTheDocument()


        const formButton = screen.getByRole('button')
        expect(formButton).toBeInTheDocument()

        const inputName = screen.getByPlaceholderText(/Escreva seu nome/i)
        expect(inputName).toBeInTheDocument()
    })

})