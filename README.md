# POPPLOY

Popploy é um script para automatizar o deploy do bff já que o mesmo necessita ser enviado para um repositório da SEAC para rodar uma pipeline e ser enviado para o servidor, porém já utilizamos um repositório da Popcode que tem uma estrutura de branch diferente, daí surgiu a ideia da criação do script, ele consegue ser usado em qualquer projeto que tenha o mesmo problema sitado acima.

# Getting Started

Para adicionar o script no projeto basta rodar:

```cmd
yarn add popploy@https://github.com/isaac-oliveira/popploy.git
```

Caso queria usar em um projeto que ainda não tem o popploy, basta executar:

```cmd
yarn popploy init
```

# Configuração

Quando você já estiver com o script inicializado, você pode configurar ele utilizando o `popploy.json` na raíz do seu projeto, nele temos as propriedade `gitUrl` e `branchEnv`.

- `gitUrl` é a url do repositório onda vamos subi a versão para o deploy.

- `branchEnv`, é um objeto onde podemos adicionar novos ambiente e relacionar com as branchs, a estrutra é a seguinte:

```json
"branchEnv" : {
    "[nome do ambiente]": "[nome da branch relacionada ao ambiente]"
}
```

# Realizando Deploy

## Estrutura

```cmd
yarn popploy [env] [...args]
```

O `env` é obrigatório, já os `args` são opicionais

- No `env` você pode usar os valores que você colocou como chaves no `branchEnv`

- No `args` temos apenas o `version`, que você deve usar para alterar a versão do projeto, vale lembrar que é opicional.

# Subindo para o repositório

Para subi uma versão em produção alterando a versão, abasta rodar:

```cmd
yarn popploy production version:1.0.0
```

Sem alterar a versão:

```cmd
yarn popploy production
```

Em algum ambiente adicionado no branchEnv

```cmd
yarn popploy development
```
