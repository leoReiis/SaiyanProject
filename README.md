# Saiya Gym - Documentação do Projeto

## Visão Geral

O **Saiya Gym** é uma solução para o gerenciamento de treinos em redes de academias. Ele oferece recursos para cadastrar usuários, diferentes tipos de exercícios e controlar as rotinas de treinamento. O projeto foi desenvolvido utilizando o framework Vue.js e a biblioteca Vuetify para a interface do usuário, e uma API previamente montada para o gerenciamento dos dados.

## Tecnologias Utilizadas

- **Vue.js**: Um framework progressivo para a construção de interfaces de usuário.
- **Vuetify**: Uma biblioteca de componentes Vue.js com um design consistente e moderno.
- **API**: Uma API RESTful para fornecer funcionalidades de gerenciamento de dados.
- **Node.js**: Ambiente de tempo de execução JavaScript usado para executar a API.
- **Banco de Dados**: Um sistema de gerenciamento de banco de dados (por exemplo, MySQL, PostgreSQL, MongoDB) para armazenar informações de usuários, exercícios e treinamentos.

## Executando o Sistema

Para executar o **Saiya Gym** em seu ambiente local, siga as etapas abaixo:

1. **Clone o repositório**: Faça o clone deste repositório para sua máquina local usando o comando:

    ```
    git clone https://github.com/leoReiis/saiya-gym.git
    ```

2. **Instale as dependências**: Abra um terminal na pasta do projeto e execute o seguinte comando para instalar as dependências do projeto:

    ```
    npm install
    ```

3. **Inicie o servidor da API**: Abra um terminal na pasta da API e execute o seguinte comando para iniciar o servidor:

    ```
    cd api
    npm run server
    ```

4. **Inicie o aplicativo Vue.js**: Em outro terminal, volte para a pasta principal do projeto e execute o seguinte comando para iniciar o aplicativo:

    ```
    npm run dev
    ```

5. **Acesse o aplicativo**: Abra seu navegador e acesse `http://localhost:5173/login` para interagir com o **Saiya Gym**.

## Sugestões de Melhoria

Algumas sugestões para melhorar o projeto incluem:

- Desenvolver novos métodos na API para adicionar funcionalidades adicionais, como a criação de rotinas personalizadas.
- Estruturar o banco de dados de forma a vincular cada aluno ao professor ou usuário logado.
- Adicionar dados fictícios ou de exemplo para facilitar a compreensão e teste do sistema.

Fique à vontade para contribuir com melhorias ou novos recursos para o projeto. Sua colaboração é bem-vinda!

---
Sinta-se à vontade para adicionar mais informações à documentação, conforme necessário, e personalizá-la de acordo com as necessidades do seu projeto. Lembre-se de manter a documentação atualizada à medida que o projeto evolui.
