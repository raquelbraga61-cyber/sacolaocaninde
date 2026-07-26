# Sacolão 🍎🥬🥦

> Uma plataforma premium, moderna e responsiva para catálogo, carrinho de compras e gestão administrativa desenvolvida com **React**, **TypeScript** e **Tailwind CSS**.

Este projeto foi construído para fornecer uma experiência fluida, limpa e elegante para os clientes fazerem seus pedidos de hortifrúti diretamente pelo site e enviá-los de forma instantânea para o WhatsApp do estabelecimento. Além do catálogo, possui uma área administrativa integrada para controlo completo de produtos e categorias.

---

## ✨ Funcionalidades Principais

### Para os Clientes:
- **Catálogo Inteligente**: Navegação fluida categorizada com ícones personalizados (Frutas, Verduras, Legumes, Grãos) e mecanismo de busca dinâmico em tempo real.
- **Venda Flexível (KG/UNI/MISTA)**: Suporte dinâmico para compras fracionadas por quilo, unidade ou ambos. 
- **Modo Negociável**: Quando o produto admite formato misto e o cliente opta por comprar por unidades soltas, o sistema exibe de forma clara o aviso **"Valor a negociar"** e as unidades adicionadas no carrinho entram como orçamento, mantendo total clareza.
- **Controle de Quantidade Simplificado**: O carrinho gerencia todas as quantidades de **1 em 1** (ex: 1 kg, 2 kg, ... ou 1 un, 2 un, ...), prevenindo confusões de frações e unificando a experiência da balança.
- **Carrinho de Compras Interativo**: Carrinho expansível com animações suaves via `motion`, permitindo ajustes rápidos e cálculo automático de subtotais.
- **Checkout com WhatsApp**: Integração perfeita de envio de pedido. Ao fechar a compra, o cliente envia uma mensagem organizada automaticamente ao atendente do WhatsApp de forma limpa, discriminando produtos, o subtotal estimado de itens pesados, e detalhando os itens cujo valor é a negociar.

### Para Administradores:
- **Painel Administrativo Separado (`/admin`)**: vive em sua própria página (`admin/index.html`), sem nenhum link, botão ou menu visível a partir do catálogo, carrinho ou favoritos. Só é acessível por quem souber o endereço direto (ex: `seusite.com/admin`). **Não há login/senha** — o acesso é apenas "por link secreto", então evite divulgar esse endereço publicamente.
- **Gerenciador de Categorias**: Criação ou remoção ágil de categorias com suporte a seleções de emojis.
- **Formulário de Produtos Completo**: Adicione ou edite produtos, definindo preços por KG ou UNI, tipos de venda autorizados, descrição do item e imagem.
- O catálogo (cliente) e o painel (`/admin`) compartilham os mesmos dados salvos no navegador (`localStorage`), então alterações feitas no painel aparecem no site normalmente após recarregar a página.

---

## 🎨 Decisão e Identidade Visual

- **Paleta de Criação**: Baseada em tons orgânicos de verde floresta (`#176c33`), suaves off-white de fundo (`#f7fbf2`) e tons refinados de terracota/laranja (`#a5521b`) para avisos e informações de itens a negociar.
- **Tipografia**: Interface construída usando fontes geométricas com excelente espaçamento tipográfico e arranjos hierárquicos para o máximo de legibilidade de nomes de frutas e preços.
- **Espaçamento e Layout**: Design móvel-primeiro balanceado com visual bento e grids expansivos em telas desktop, evitando estiramentos indesejados e mantendo o foco do usuário nos produtos.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** com **TypeScript**
- **Vite** para empacotamento rápido e servidor de desenvolvimento otimizado
- **Tailwind CSS v4** para uma folha de estilos rápida, moderna e utilitária
- **Motion (framer-motion)** para efeitos de transição refinados de visualização, animações de entrada e interações de botões
- **Lucide React** para iconografia consistente e representativa

---

## 🚀 Como Iniciar o Projeto Localmente

Siga os passos abaixo após clonar ou exportar este projeto do seu GitHub:

### 1. Pré-requisitos
Certifique-se de que tem o [Node.js](https://nodejs.org/) instalado na sua máquina (recomendado v18 ou superior).

### 2. Instalar Dependências
Navegue até a pasta do projeto e instale todos os pacotes necessários:
```bash
npm install
```

### 3. Rodar o Servidor de Desenvolvimento
Inicie o Vite localmente para testar a aplicação em seu navegador:
```bash
npm run dev
```
O console exibirá o endereço local (geralmente `http://localhost:3000` ou `http://localhost:5173`).

### 4. Compilar para Produção (Build)
Gere os arquivos estáticos altamente otimizados na pasta `dist/` para realizar o deploy em plataformas de hospedagem (como GitHub Pages, Vercel, Netlify, ou Cloud Run):
```bash
npm run build
```

---

## 📦 Como Hospedar no GitHub Pages

O projeto já está configurado com `base: './'` no `vite.config.ts`, então o build funciona corretamente independentemente do nome do repositório — não é preciso editar nada manualmente.

O `npm run build` gera duas páginas em `dist/`:
- `dist/index.html` → catálogo/carrinho/favoritos (SPA principal)
- `dist/admin/index.html` → painel administrativo

Há um workflow pronto em `.github/workflows/deploy.yml` que builda e publica automaticamente no GitHub Pages a cada push na branch `main`. Basta:
1. Criar o repositório no GitHub e subir o código (veja passos no chat).
2. Em **Settings → Pages**, em "Build and deployment", selecionar **Source: GitHub Actions**.
3. Pronto — a cada `git push` na `main`, o site é rebuildado e publicado automaticamente.

---

## 📄 Licença
Este projeto é de uso livre para estudos, personalizações e comercialização local de mercados e feirantes. Sinta-se gratuito para contribuir com commits e novas expansões!
