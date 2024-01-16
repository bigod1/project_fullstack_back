#Sobre o projeto
Esse é o backend do meu projeto fullstack da kenzie academy, ele foi desenvolvido para ter as funcionalidades basicas de um crud

#Como instalar e rodar a aplicação

1. clonar o projeto
2. mudar para a pasta back com o comando: cd back
3. rodar npm install
4. criar um arquivo .env e preencher seguindo o .env.example como base
5. rodar npm run typeorm migration:run -- -d src/data-source
6. rodar npm run dev

#Rotas

POST /login -> login usuario

POST - /clients -> criar usuario
GET - /clients -> listar todos usuarios
GET - /clients/{client_id} -> listar usuario especifico
PATCH - /clients/{client_id} -> atulizar informaçoes do usuario
DELTE - /clients/{client_id} -> deletear usuario

POST - /contacts -> criar contato
GET - /contacts -> listar todos contatos
PATCH - /contacts/{contact_id} -> atulizar informaçoes do contato
DELTE - /contacts/{contact_id} -> deletear contato