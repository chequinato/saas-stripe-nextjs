# SaaS com Next.js e Stripe

> Este Mini Projeto faz parte da série **Criando um SaaS com Next.js**  
>  
> Mini Projeto 1: [SaaS Landing Page com Next.js e Shadcn UI](https://codante.io/mini-projetos/saas-landing-page-com-nextjs-e-shadcn-ui)  
> Mini Projeto 2: [SaaS - Autenticação com NextAuth, Prisma e Next.js 15](https://codante.io/mini-projetos/autenticacao-com-nextauth-prisma-e-nextjs-15)  
> Mini Projeto 3: SaaS com Next.js e Stripe (este projeto)

Neste mini projeto, você irá adicionar o Stripe como meio de pagamento e gerenciador de assinaturas do seu projeto. Sua aplicação deve permitir que usuários possam assinar (através de pagamentos recorrentes) bem como cancelar suas assinaturas. O produto (Ebook do mês) só deverá ser exibido para aqueles que são assinantes ativos. 


## 🤓 Antes de começar

Para este projeto, já temos o template inicial do projeto preparado no repositório. Ao fazer o fork você encontrará todos os arquivos iniciais. 

>[!CAUTION]   
> Como o Next 15 ainda é muito recente é possível que você encontre alguns erros de `peer deps` na hora de instalar suas dependências. É possível forçar uma instalação evitando esses erros usando o comando `npm install --force`.

#### Setup do Turso
Para que a autenticação funcione, é necessário que você tenha uma conta e database (gratuita) do [Turso](https://turso.tech) para a base de dados.

Pegue suas credenciais e complete o `.env` (ou `.env.local`) com as chaves 
- `TURSO_AUTH_TOKEN=`
- `TURSO_DATABASE_URL=`

Se você quiser mais informações, vide o [Mini Projeto anterior](https://codante.io/mini-projetos/autenticacao-com-nextauth-prisma-e-nextjs-15) desta série.

#### Setup do NextAuth
No Mini Projeto anterior também fizemos o Setup do NextAuth. Para tal, é necessário que você coloque qualquer string aleatória na chave `AUTH_SECRET=` e sua url (provavelmente http://localhost:3000) na chave `AUTH_URL=` todos no `.env` (ou `.env.local`).

## 🔨 Requisitos

- **Faça o cadastro e setup de uma conta no Stripe**
  - Crie uma conta e credenciais de teste no Stripe

> [!TIP]  
> Recomendamos que você use os *sandboxes* do Stripe para testes. 

- **Implemente o pagamento recorrente da assinatura**
  - Apenas usuários logados poderão assinar
  - Utilize o Stripe como provedor de assinaturas

> [!TIP]  
> Para facilitar o desenvolvimento você não precisa necessariamente utilizar a sua base de dados para gerenciar assinaturas. A escolha é sua, você deverá escolher se quer gerenciar assinante PRO pelo _Stripe_ ou pela base de dados. 

- **Implemente o cancelamento da assinatura**
  - Implemente um botão que deverá estar na dashboard para cancelar a assinatura
  - Apenas usuários logados e assinantes poderão cancelar

- **Implemente a troca de meio de pagamento**
  - Você poderá tanto implementar pela API (mais difícil) como redirecionando para o portal no-code do Stripe (mais fácil)

- **Proteger rotas**
  - O produto (Ebook do Mês) somente deverá ser acessado por aqueles que possuem assinaturas ativas
  - A tela de gerenciamento de assinatura somente deverá ser acessada por aqueles que possuem assinaturas ativas

- **Remover botoes (call to action) de assinatura caso o usuário já seja assinante**
  - Para uma UX melhor, não faz sentido mostrar botões de "Assine Agora" para quem já é assinante. 

## 🎨 Design Sugerido

O layout está no Figma e já está implementado no projeto. Você não precisará implementá-lo. 

### Figma

🔗 [Link do design](https://www.figma.com/community/file/1436880854972199964/mini-projeto-saas-com-next-js-e-stripe)

## 👉🏽 Sobre esse mini-projeto

### O que você irá praticar:

#### Next.js

- Conhecimentos sobre a configuração de páginas e rotas dinâmicas.

#### Stripe

- Integração completa com o Stripe para pagamentos e gestão de assinaturas.
- Integração do NextAuth com Prisma e base de dados. 

### Pré requisitos

- Conhecimentos em JavaScript, React e NextJs.
