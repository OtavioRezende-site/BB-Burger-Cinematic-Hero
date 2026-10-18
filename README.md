# 🍔 BB Burger — Hamburgueria Artesanal & Cardápio Digital

Aplicação web moderna para a hamburgueria artesanal **BB Burger** (Maricá - RJ), construída com React 19, TypeScript, Tailwind CSS, Vite e Hero cinematográfico com vídeo em tela cheia.

---

## 🚀 Como Publicar no GitHub Pages (Sem Tela Branca)

O projeto usa **React + Vite** (que precisa ser compilado antes de ir para o ar). Você tem duas maneiras simples e definitivas de rodar no GitHub Pages:

### 🌟 Método 1: GitHub Actions (Recomendado — 100% Automático)
Já criamos o arquivo `.github/workflows/deploy.yml` no projeto. Tudo é automático:

1. No seu repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Onde está escrito **Source**, clique no menu suspenso e escolha **GitHub Actions**.
4. Pronto! O GitHub vai rodar o build sozinho e publicar o site. Qualquer alteração futura que você enviar (`git push`) atualizará o site automaticamente.

---

### 📁 Método 2: Usando a pasta `/docs`
Se você preferir manter a opção padrão "Deploy from a branch":

1. Vá em **Settings** > **Pages**.
2. Deixe **Source** como **Deploy from a branch**.
3. Em **Branch**, selecione `main` (ou `master`).
4. **IMPORTANTE:** No seletor de pasta ao lado (que vem como `/ (root)`), mude para **`/docs`**!
5. Clique em **Save**.
6. O GitHub Pages passará a carregar os arquivos prontos e compilados da pasta `docs/`.

---

## 🛠️ Comandos Disponíveis

- `npm run dev`: Inicia o servidor local de desenvolvimento.
- `npm run build`: Compila o projeto para a pasta `dist/`.
- `npm run build:docs`: Compila o projeto diretamente para a pasta `docs/`.
