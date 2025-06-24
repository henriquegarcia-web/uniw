# UNIW Marketplace

## HOW TO

### Build somente dos pacotes

`yarn build --filter="./packages/\*"`

### Adicionar lib em app específico

`yarn workspace <nome-do-app-ou-pacote> add <nome-da-lib>`

### Para rodar SOMENTE o painel de administração (Next.js)

`yarn turbo dev --filter=uniw-admin...`

### Para rodar SOMENTE o aplicativo do cliente (React Native Expo)

`yarn turbo dev --filter=uniw-app...`

Explicação: O ... no final do filtro (uniw-admin...) instrui o Turborepo a incluir não apenas o app uniw-admin, mas também todos os pacotes (packages) que são dependências dele.
