# Pam | @pamquasepsi — Linktree & Lista de Espera

Página de apresentação e captura de contatos da **Pamela** ([@pamquasepsi](https://www.instagram.com/pamquasepsi)), estudante de Psicologia.

---

## 🚀 Funcionalidades

1. **Lista de Espera 2027**:
   - Formulário com validação de campos obrigatórios (*Nome* e *WhatsApp* com máscara brasileira).
   - Persistência direta em planilha no **Google Drive** da Pamela (via Google Apps Script, 100% gratuito e sem intermediários).
   - Feedback em tempo real com indicador de carregamento e mensagem de sucesso/erro.
2. **Solicitação de PDF por WhatsApp**:
   - Botão direto com redirecionamento para o telefone **+55 11 994158358**.
   - Mensagem pronta e pré-formatada: `"Olá Pamela! Gostaria de receber a PDF sobre modelo cognitivo e metacognição."`.
3. **Indicação de Profissionais**:
   - Links para os perfis dos psicólogos recomendados.
4. **Hospedagem no GitHub Pages**:
   - Estrutura estática pronta (`index.html`) para deploy imediato no GitHub Pages.

---

## 📋 Como configurar a Planilha no Google Drive

Para que as inscrições sejam salvas automaticamente em uma planilha da Pamela:

1. Acesse o [Google Sheets](https://sheets.google.com) com a conta Google da Pamela e crie uma nova planilha (ex: `Lista de Espera - Pamela`).
2. No menu superior da planilha, clique em **Extensões** > **Apps Script**.
3. Apague qualquer código existente e cole o código do arquivo [`google-apps-script.js`](./google-apps-script.js).
4. Clique em **Salvar** (ícone de disquete ou `Ctrl + S` / `Cmd + S`).
5. Clique no botão azul **Implantar** (no canto superior direito) > **Nova implantação**.
6. Na engrenagem ao lado de "Selecionar tipo", escolha **Aplicativo da Web**.
7. Preencha as configurações:
   - **Descrição**: `API Lista de Espera`
   - **Executar como**: `Eu (seu e-mail)`
   - **Quem pode acessar**: `Qualquer pessoa` (Anyone)
8. Clique em **Implantar** e autorize o acesso à sua conta Google quando solicitado.
9. Copie a **URL do aplicativo da Web** gerada (termina com `/exec`).
10. Abra o arquivo `index.html` e cole essa URL na constante `GOOGLE_SCRIPT_URL`:
    ```javascript
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
    ```

> **Dica**: Quando o primeiro formulário for enviado, a planilha criará automaticamente os cabeçalhos (`Data e Hora`, `Nome Completo`, `WhatsApp`, `Observações`) formatados!

---

## 🌐 Como ativar o GitHub Pages

1. Crie um repositório no seu GitHub (ex.: `pam-linktree` ou `pam_quase_psi`).
2. Envie o código do projeto para o repositório:
   ```bash
   git add .
   git commit -m "feat: linktree com lista de espera e whatsapp"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
3. No GitHub, acesse a aba **Settings** do repositório.
4. No menu lateral esquerdo, clique em **Pages**.
5. Em **Build and deployment** > **Source**, selecione:
   - **Deploy from a branch**
   - Branch: `main` / pasta: `/(root)`
6. Clique em **Save**.
7. Em 1 a 2 minutos, seu link público estará no ar no formato:
   `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

---

## 📱 Redirecionamento do WhatsApp

O botão de solicitar planilha aponta para:
- **Número**: `+55 11 994158358` (`5511994158358`)
- **Link**: `https://wa.me/5511994158358?text=...`
- **Mensagem**: `Olá Pamela! Gostaria de receber a PDF sobre modelo cognitivo e metacognição.`
