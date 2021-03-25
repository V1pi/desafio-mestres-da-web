# Desafio Mestres da Web

Para rodar as aplicações que foram desenvolvidas para esse aplicativo pode ser usado o Docker ou a instalaçã manual.

## Utilizando o docker

## Aplicação backend e frontend
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