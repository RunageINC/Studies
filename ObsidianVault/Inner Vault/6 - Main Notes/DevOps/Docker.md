Para escalar, tudo tem que ser stateless. Não se deve guardar nada em disco, sempre armazenado fora do disco rígido.

Possui uma UI chamada **Docker Desktop**, mas pode também ser executado através do terminal.

## Comandos básicos

- `docker -v` - Versão instalada na máquina
- `docker image ls` - Lista as imagens presentes na máquina
- `docker build -t <projeto>:<versão> <local do Dockerfile>` - Faz a build da imagem do app. Caso o Dockerfile esteja no mesmo local da execução do comando, basta passar um . no `<local do Dockerfile>.`.
- `docker history -t <projeto>:<versão>` - Traz o histórico de cada execução de camada de um container. Muito útil em multistage build.