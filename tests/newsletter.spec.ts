import { test, expect } from '@playwright/test';

test.describe('Fluxo da Newsletter', () => {

  test.beforeEach(async ({ page }) => {
    // 🎭 INTERCEPTA O WEB3FORMS: Evita enviar lixo para a API real e gastar créditos
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: "Mocked success!" }),
      });
    });

    await page.goto('http://localhost:5173');
  });

  test('Deve permitir a subscrição com sucesso e mostrar o ecrã de agradecimento', async ({ page }) => {
    await page.getByPlaceholder(/escreva seu nome/i).fill('Rebeca');
    await page.getByPlaceholder(/exemplo@exemplo.com/i).fill('rebeca@email.com');


    await page.getByRole('checkbox', { name: /concordo com os termos/i }).setChecked(true);

    await page.getByRole('button', { name: /cadastrar/i }).click();

   
    await expect(page.getByText(/sucesso!/i)).toBeVisible();
    await expect(page.getByText('Rebeca')).toBeVisible();
  });

  test('Deve mostrar mensagem de erro se o formato do e-mail for inválido', async ({ page }) => {
  
    await page.getByPlaceholder(/escreva seu nome/i).fill('Rebeca');

 
    const emailInput = page.getByPlaceholder(/exemplo@exemplo.com/i);
    await emailInput.fill('rebeca-invalida');

 
    await page.getByRole('checkbox', { name: /concordo com os termos/i }).setChecked(true);

    
    await page.getByRole('button', { name: /cadastrar/i }).click();

  
    const isFormValid = await emailInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isFormValid).toBe(false);

  
    await expect(page.getByText(/sucesso!/i)).not.toBeVisible();
  });

  test('Deve mostrar mensagem de erro se a API do Web3Forms falhar', async ({ page }) => {
    // 🎭 Forçamos a API a responder com Erro 500 (Server Error)
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: "Internal Server Error" }),
      });
    });

    // Preenche tudo corretamente
    await page.getByPlaceholder(/escreva seu nome/i).fill('Rebeca');
    await page.getByPlaceholder(/exemplo@exemplo.com/i).fill('rebeca@email.com');
    await page.getByRole('checkbox', { name: /concordo com os termos/i }).setChecked(true);

    await page.getByRole('button', { name: /cadastrar/i }).click();

  
    await expect(page.getByText(/algo deu errado|tente novamente|erro|falha na rede/i)).toBeVisible();
  });

  test('Deve manter o botão desativado se os termos não forem aceites', async ({ page }) => {
    await page.getByPlaceholder(/escreva seu nome/i).fill('Rebeca');
    await page.getByPlaceholder(/exemplo@exemplo.com/i).fill('rebeca@email.com');

    // Não marcamos a checkbox!

    const submitButton = page.getByRole('button', { name: /cadastrar/i });
    await expect(submitButton).toBeDisabled();
  });

  test('Deve permitir abrir e cancelar o formulário de feedback de acessibilidade do footer', async ({ page }) => {
    
    const a11yButton = page.getByRole('button', { name: /barreira de acessibilidade/i });
    await expect(a11yButton).toBeVisible();

    await a11yButton.click();

    const textarea = page.getByPlaceholder(/não consigo usar o teclado/i);
    const cancelButton = page.getByRole('button', { name: /cancelar/i });

    await expect(textarea).toBeVisible();
    await expect(cancelButton).toBeVisible();

    await textarea.fill('O contraste das cores está um pouco baixo.');

    await cancelButton.click();

   
    await expect(textarea).not.toBeVisible();
    await expect(a11yButton).toBeVisible();
  });

});