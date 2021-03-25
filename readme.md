# Desafio Mestres da Web

Para rodar as aplicações que foram desenvolvidas para esse aplicativo pode ser usado o Docker ou a instalaçã manual.

[Há uma seção mostrando como testar os endpoints no insomnia ou outro app.](#Insomnia-ou-outro-app)
## Rodando com o docker (recomendado)

### Aplicação backend e frontend
Em primeiro lugar é necessário ter o docker instalado juntamente com o docker compose. Pela instalação variar de sistema operacional para sistema operacional, não vai ser abordado aqui.<br>
Para isso basta seguir o tutorial do site oficial, para a correta instalação é necessário primeiramente instalar o [Docker](https://docs.docker.com/engine/install/) e depois o [Docker Compose](https://docs.docker.com/compose/install/). Você pode optar por instalar o [Docker Desktop](https://docs.docker.com/desktop/) que já traz os dois instalados juntamente com uma interface visual.<br>
Com o docker devidamente install é só abrir um terminal ou powershell na raiz desse projeto e digitar o comando:
```
docker-compose -f ./docker-compose.yaml up -d --build
```
Após executar esse comando será feito o build da aplicação e irá iniciar o servidor com todas dependências necessárias. Você pode remover o parâmetro "build" caso já tenha executado a linha acima alguma vez.<br>
Toda vez que quiser para a aplicação basta rodar:
```
docker-compose -f ./docker-compose.yaml down
```
As rotas da aplicação poderão ser testadas tanto pelo insomnia ou postman, quanto pelo frontend.<br> 
O servidor backend por padrão roda no localhost na posta 2503.<br>
O servidor frontend por padrão roda no localhost na porta 5000<br>

### Rodando os testes
Para rodar os testes basta executar:
```
docker-compose -f ./docker-compose-test.yaml up --build
```
E para remover o container de teste:
```
docker-compose -f ./docker-compose-test.yaml down
```

## Rodando localmente
### Aplicação backend e frontend
Para instalar localmente será necessário ter o NodeJS instalado, a versão que utilizei para o desenvolvimento foi a v10.16.3. Mas o código é compatível com as novas versões também. A instalação do NodeJS vai depender do sistema operacional e você pode encontrar instruções [aqui](https://nodejs.org/en/download/).<br>
Também será mecessário ter o PostgresSQL instalado, eu particularmente rodo ele em Docker, mas pode ser encontrado o tutorial para instalação [aqui](https://www.postgresql.org/download/)<br>
Com o NodeJS e PostgresSQL instalado vamos criar o arquivo development.env na raiz da pasta do backend, o arquivo deve ter o seguinte formato:
```
POSTGRES_PASSWORD="beribo"
POSTGRES_DB="delivery"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_USER="postgres"

HOST="0.0.0.0"
PORT=2503
```
Altere o  arquivo de configuração da maneira que preferir.<br>
Agora será necessário rodar o SQL para criar o banco de dados, abra o terminal dentro do PostgresSQL ou pelo PgAdmin e execute o SQL que está dentro do arquivo <i>init.sql</i>. É importante que esse SQL seja executado na database com o nome POSTGRES_DB definido no arquivo development.env, e que a porta, usuário e senha esteja em coformidadee com o arquivo para a correta execução.<br>
Abra as pastas frontend e backend e execute dentro de cada uma delas:
```
npm install
```
Dentro da pasta backend instale globalmente:
```
npm install -g @nestjs/cli
```
Agora pronto, abra um terminal cada um dentro de uma pasta e execute:
```
npm run start
```
O servidor backend por padrão roda no localhost na posta 2503.<br>
O servidor frontend por padrão roda no localhost na porta 3000<br>

### Rodando os testes
Para rodar os testes basta executar:
```
npm run test
```
Na raiz da pasta backend.

## Insomnia ou outro app
Para aproveitar os endpoints já criados no insomnia, basta baixar o arquivo que está na raiz desse projeto <i>insomnia.json</i> e importar ele no insomnia. Para toda requisição no banco de dados <strong>sem ser a rota de registrar registrar</strong> será necessário gerar um token JWT e enviar como Bearer. Para gerar o token tem uma rota <i>Utils->generateAdminToken</i> é só executar a rota com o email e a senha da sua conta já criada e copiar o campo "idToken" da resposta.<br>
Caso não utilize o insomnia e queira gerar esse token, basta fazer uma requisição no seguinte formato:
```
curl --request POST \
  --url 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC21S5mRNneDH1X_ZVFRT6b5Hl4ztAt8Go' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data email=<seu_email> \
  --data password=<sua_senha> \
  --data returnSecureToken=true
```