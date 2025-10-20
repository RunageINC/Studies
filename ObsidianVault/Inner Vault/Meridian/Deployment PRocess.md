
## Front End

For main -> Squash and merge

For deploys (staging/prod) -> ![[Pasted image 20250523095623.png]]

## Back End

criar a versão no E2E & Release.

No arquivo yml banking/Chart e user/Chart adicionar o nome da versão nas respectivas linhas.

helm upgrade banking 

### Por Github Actions:

Dentro do flow de single https://github.com/meridian-software/meridian-backend/actions/workflows/helm-deploy-single.yml

![[Pasted image 20250904205001.png]]

Release version: n. da versão gerada
Chart name: nome da app