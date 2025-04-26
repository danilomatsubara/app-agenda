# Guia de Implantação - Aplicativo de Agendamento Dani Tattoos

Este guia fornece instruções para implantar o aplicativo de agendamento Dani Tattoos em um ambiente de produção.

## Pré-requisitos

1. Conta no Google Cloud Platform
2. Conta na Vercel
3. Credenciais OAuth do Google configuradas

## Configuração do Google Cloud

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a API do Google Calendar
4. Configure as credenciais OAuth:
   - Tipo: Aplicativo Web
   - Origens JavaScript autorizadas: URL do seu aplicativo (ex: https://app-agenda.vercel.app)
   - URIs de redirecionamento: URL do seu aplicativo + /api/auth/callback/google
5. Anote o Client ID e Client Secret

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/app-agenda.git
cd app-agenda
```

2. Instale as dependências:
```bash
pnpm install
```

3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-client-secret
GOOGLE_REDIRECT_URI=https://seu-app.vercel.app/api/auth/callback/google
NEXTAUTH_URL=https://seu-app.vercel.app
NEXTAUTH_SECRET=uma-string-secreta-aleatoria
```

4. Substitua os ícones placeholder em `/public/icons/` pelos ícones reais da Dani Tattoos

## Implantação na Vercel

1. Faça login na Vercel
2. Importe o repositório do GitHub
3. Configure as variáveis de ambiente:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GOOGLE_REDIRECT_URI
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET
4. Clique em "Deploy"

## Verificação Pós-Implantação

1. Acesse a URL do aplicativo implantado
2. Verifique se a autenticação com o Google funciona corretamente
3. Teste a criação de agendamentos
4. Verifique se os eventos são criados no Google Calendar
5. Teste a geração e compartilhamento de comprovantes

## Uso em Dispositivos Móveis

1. Acesse o aplicativo em um dispositivo móvel
2. Para iOS: adicione à tela inicial através do Safari
3. Para Android: o navegador oferecerá a opção de instalar o PWA

## Solução de Problemas

- Se a autenticação falhar, verifique as credenciais OAuth e URIs de redirecionamento
- Se os eventos não aparecerem no Google Calendar, verifique as permissões da API
- Para problemas de sincronização, verifique a conexão com a internet e tente novamente

## Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [API do Google Calendar](https://developers.google.com/calendar/api/guides/overview)
