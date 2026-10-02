# EBC — Site Principal (Quartel General)

Site principal do jogo **Exército Brasileiro de Combate**, com identidade exclusiva em azul-marinho, azul elétrico e prata e layout para computador e celular.

## Abrir no computador

1. Extraia o ZIP.
2. Abra o arquivo `index.html` no navegador. Funciona sem instalar nada.
3. Para publicar, envie **todos os quatro arquivos** (`index.html`, `style.css`, `app.js`, `config.js`) para um novo repositório do GitHub.

## Personalizar seus links

Abra `config.js` e configure:

```js
window.EBC_CONFIG = {
  gameName: "Exército Brasileiro de Combate",
  gameUrl: "https://www.roblox.com/games/SEU_ID/SEU_JOGO",
  discordUrl: "https://discord.gg/SEU_CONVITE",
  verificationUrl: "https://eb-verificacao.onrender.com",
  news: [
    { tag: "AVISO", title: "Treinamento", description: "Veja os canais oficiais para saber os horários." }
  ]
};
```

**Não coloque senhas, tokens ou Client Secret em `config.js`**: ele é público no navegador.

Sem `gameUrl` e `discordUrl`, os botões são exibidos, mas avisam que o link ainda precisa ser configurado.

## Publicar gratuitamente com GitHub Pages

1. Crie um **repositório novo**, como `ebc-site-principal` (não substitua o repositório `eb-verificacao`).
2. Envie os quatro arquivos para a **raiz** do novo repositório e faça o commit.
3. Em `Settings` → `Pages`, escolha `Deploy from a branch` → `main` → `/ (root)` e salve.
4. O GitHub exibirá o endereço publicado quando terminar.

**Alternativa — Render:** crie um novo serviço do tipo **Static Site**, aponte para o repositório novo, deixe Build Command vazio e configure Publish Directory como `.` se o Render aceitar essa configuração. Não altere seu Web Service `eb-verificacao`.

## Funcionalidades disponíveis

- Página inicial, menu responsivo, cartões, divisões e orientações de patentes.
- Perfil local: nome salvo somente no próprio navegador, **sem autenticação**.
- Verificação: botão leva ao site existente `eb-verificacao.onrender.com`.
- Conteúdo inicial de CDP, ranking e histórico identificado como **em desenvolvimento**.

## Funcionalidades que ainda exigem integração

Login real do Roblox ou do Discord, sincronização de patente, CDP, histórico, ranking, loja e promoções **não foram implementados** nesta primeira versão. Precisarão de um backend, autorizações adequadas e uma fonte de dados confiável. Não use o `localStorage` como prova de identidade nem para cargos/pontos.

Projeto de comunidade de roleplay, não oficial do Exército Brasileiro ou do Roblox.

## Identidade visual

Esta edição usa azul-marinho, azul elétrico e prata; o site de verificação permanece separado e inalterado.
