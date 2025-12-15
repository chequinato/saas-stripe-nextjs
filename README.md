SaaS Stripe Next.js – Assinatura de Ebook 📚💳

Aplicação SaaS desenvolvida com Next.js que implementa um sistema completo de assinatura recorrente utilizando o Stripe como provedor de pagamentos. O projeto permite que usuários autenticados assinem um plano mensal e tenham acesso exclusivo ao “Ebook do Mês”, disponível para download apenas enquanto a assinatura estiver ativa.

Este projeto faz parte da série Criando um SaaS com Next.js e representa o terceiro mini projeto da sequência, focado em pagamentos, assinaturas e regras de acesso a conteúdo premium.

────────────────────

Visão Geral

O SaaS Stripe Next.js é uma aplicação web completa que simula um produto digital real baseado em assinatura.

O fluxo é simples e realista:

o usuário cria uma conta e faz login

realiza a assinatura mensal via Stripe

após a confirmação do pagamento, o ebook é liberado no dashboard

o usuário pode gerenciar sua assinatura, alterar o método de pagamento ou cancelar

ao cancelar, o acesso ao ebook é automaticamente removido

Todo o controle de pagamentos e assinaturas é feito pelo Stripe, enquanto a aplicação gerencia autenticação, autorização e experiência do usuário.

────────────────────

Contexto do Projeto

Este projeto faz parte da série “Criando um SaaS com Next.js”:

Mini Projeto 1: SaaS Landing Page com Next.js e Shadcn UI
Mini Projeto 2: SaaS – Autenticação com NextAuth, Prisma e Next.js 15
Mini Projeto 3: SaaS com Next.js e Stripe (este projeto)

O foco deste mini projeto é integrar o Stripe como meio de pagamento e gerenciador de assinaturas, aplicando regras reais de negócio e proteção de rotas.

────────────────────

Problema que o projeto resolve

Criar um sistema de assinatura envolve desafios técnicos e de negócio, como:

autenticação segura

controle de acesso a conteúdo premium

pagamentos recorrentes

cancelamento de assinaturas

atualização de método de pagamento

sincronização entre backend e gateway de pagamento

Este projeto resolve esses problemas ao:

integrar Stripe Billing para assinaturas recorrentes

proteger rotas e conteúdos com base no status da assinatura

liberar ou bloquear o ebook automaticamente

centralizar o gerenciamento de pagamento no Stripe

Na prática, o projeto entrega uma base sólida para qualquer produto digital por assinatura.

────────────────────

Funcionalidades

Cadastro e autenticação de usuários
Login e logout
Assinatura mensal via Stripe
Pagamentos recorrentes
Liberação do ebook apenas para assinantes ativos
Dashboard do usuário
Download do Ebook do Mês
Cancelamento de assinatura
Troca de método de pagamento
Integração com Stripe Customer Portal
Proteção de rotas
Remoção de chamadas de assinatura para usuários já assinantes

────────────────────

Como o Stripe funciona no projeto

Fluxo de assinatura:

O usuário cria uma conta ou faz login.
Acessa a página de assinatura.
É redirecionado para o Stripe Checkout.
Realiza o pagamento recorrente.
O Stripe confirma a assinatura.
A aplicação libera automaticamente o acesso ao ebook no dashboard.

Fluxo de gerenciamento da assinatura:

O usuário acessa o dashboard.
Pode cancelar a assinatura.
Pode alterar o método de pagamento.
Essas ações são feitas via Stripe API ou Stripe Customer Portal.

Quando a assinatura é cancelada ou expira, o acesso ao ebook é removido automaticamente.

────────────────────

Banco de Dados

O projeto utiliza um banco de dados hospedado no Turso, baseado em SQLite distribuído.

O banco é utilizado principalmente para:

armazenar usuários

gerenciar autenticação

relacionar usuários com IDs do Stripe

controlar permissões de acesso

A autenticação e persistência são feitas utilizando Prisma ORM, garantindo consistência e facilidade de manutenção.

────────────────────

Autenticação

A autenticação é implementada com NextAuth, integrada ao Prisma e ao banco de dados Turso.

O sistema garante que:

apenas usuários logados possam assinar

apenas assinantes ativos acessem o ebook

apenas assinantes acessem a tela de gerenciamento de assinatura

────────────────────

Tecnologias Utilizadas

Frontend:
Next.js 15
React
TypeScript
Shadcn UI
CSS moderno e componentes reutilizáveis

Backend:
API Routes do Next.js
Node.js
Stripe SDK
NextAuth

Banco de Dados:
Turso (SQLite distribuído)
Prisma ORM

Pagamentos:
Stripe Checkout
Stripe Billing (assinaturas)
Stripe Webhooks
Stripe Customer Portal

Outras ferramentas:
dotenv
Variáveis de ambiente
Ambiente serverless

────────────────────

Arquitetura do Projeto

O projeto segue a arquitetura padrão do Next.js, separando claramente frontend, backend e integrações externas.

Pages e App Router para navegação
API Routes para autenticação e Stripe
Dashboard protegido por autenticação
Integração centralizada com Stripe
Banco de dados para persistência de usuários

Essa arquitetura facilita a escalabilidade e a adição de novos produtos ou planos.

────────────────────

Pré-requisitos

Node.js versão 18 ou superior
Conta no Stripe
Conta no Turso
Gerenciador de pacotes npm ou yarn
Conhecimentos básicos de Next.js e React

────────────────────

Instalação

Clonar o repositório
Instalar dependências (pode ser necessário usar --force devido ao Next 15)
Configurar variáveis de ambiente
Rodar o projeto em modo desenvolvimento

────────────────────

Variáveis de Ambiente

TURSO_DATABASE_URL
TURSO_AUTH_TOKEN

AUTH_SECRET
AUTH_URL

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET

NEXT_PUBLIC_APP_URL

────────────────────

Execução do Projeto

Após iniciar o projeto, o usuário pode acessar a aplicação pelo navegador, criar uma conta e realizar a assinatura. O Stripe gerencia os pagamentos e a aplicação controla o acesso ao conteúdo com base no status da assinatura.

────────────────────

Casos de Uso

Venda de ebooks por assinatura
Plataformas de conteúdo premium
Produtos digitais recorrentes
Base para SaaS educacional
Assinaturas mensais de conteúdo

────────────────────

O que este projeto pratica

Next.js e App Router
Rotas dinâmicas e proteção de páginas
Integração completa com Stripe
Pagamentos recorrentes
Autenticação com NextAuth
Integração de banco de dados com Prisma
Regras reais de negócio em SaaS

────────────────────

Roadmap e Evoluções Futuras

Múltiplos planos de assinatura
Mais de um ebook por mês
Assinaturas anuais
Cupons de desconto
Dashboard administrativo
Relatórios de faturamento

────────────────────

Contribuição

O projeto aceita contribuições. Basta criar um fork, desenvolver em uma branch separada e abrir um Pull Request.

────────────────────

Licença

MIT License
Projeto desenvolvido por Chequinato
