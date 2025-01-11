
É um módulo principal do [[Hibernate]] para lidar com [[Auditoria]]. Fornece uma solução fácil de auditoria ao usar o Hibernate ou JPA, mas não é compatível com NoSQL.

Orientado a tabela, para cada tabela auditável é criada uma nova tabela de auditoria responsável por armazenar os dados.

Existem duas formas de se fazer auditoria com o Envers:

### V1

Nesse modelo, a tabela auditável é a mesma tabela de onde se guardam os registros. Apenas alguns campos são adicionados na tabela principal para manter o registro atualizado e controlado.

![[envers v1.png]]

### V2

No modelo v2 existe a criação de tabelas com sufixo `_aud`, que são tabelas de auditoria que contém informações sobre modificação, criação, entre outras operações feitas com o dado. Ainda que o número de tabelas seja duplicado, esse modelo tende a crescer menos do que o modelo do [[JaVers]].

![[envers v2.png]]

Para iniciar com a lib, é necessário adicionar a dependência do hibernate envers no projeto: 

```xml
<groupId>org.hibernate.orm</groupId>
<artifactId>hibernate-envers</artifactId>
<version>{versão do envers}</version>
```

#### TODO adicionar a dependencia pra gradle

Para o primeiro modelo do envers, basta adicionar alguns novos campos de auditoria dentro da entidade. Seguindo a v1, temos a seguinte estrutura dentro da entidade:

```java
@Entity
@Table
@EntityListeners(AuditingEntityListener.class)
public class TabelaTeste {

    //... code

    @Column(name = "created_at", updatable = false, nullable = false)
    @CreatedDate
    private long createdDate;

    @Column(name = "modified_date", nullable = false, updatable = true)
    @LastModifiedDate
    private long modifiedDate;

    @Column(name = "created_by", updatable = false, nullable = false)
    @CreatedBy
    private String createdBy;

    @Column(name = "modified_by", nullable = false, updatable = true)
    @LastModifiedBy
    private String modifiedBy;
}
```

O entity listener é importante para conseguir acessar as informações de persistência já com o hibernate controlando esses dados.

Quando utilizamos o spring security também podemos criar um Bean para inserir as informações de contexto de modificação do dado em si:

```java
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public String getCurrentAuditor() {
        return Optional.of("Nome da App").orElse(null); // Trocar a lógica para conseguir capturar o nome do usuário que está performando a operação
    }
}

```

E para configurar esse bean de acordo com o spring, podemos montar um bean de configuração que automaticamente injeta o nosso aware.

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditingConfig {

    @Bean
    AudtiorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }
}
```



Já utilizando o Envers com a v2, temos um controle ainda maior de o que e como foi alterado. O código com o Envers fica muito mais simples, visto que eliminamos os campos que não fazem parte da entidade, e trocamos uma das anotações de listeners para uma única anotação de audit:

```java
@Entity
@Table
@Audited
public class TabelaTeste {

    //... code
}
```

É possível modificar alguns comportamentos do Envers através do arquivo de properties como por exemplo o nome da coluna de revisão (sendo default o nome _REV_) ou até mesmo o sufixo das tabelas de auditoria (default **`_aud`**):

```yml
org:
	hibernate:
		envers:
			revision_field_name: revision #nome da coluna de revisão
			audit_table_suffix: _aud_table #nome da tabela de audit
```

Para controlar o usuário que alterou a entidade com o spring security context, seguimos o mesmo princípio do código anterior:

```java
@Entity
@RevisionEntity(UserRevListener.class)
public class UserRevEntity extends DefaultRevisionEntity {

    @Getter @Setter
    private String username;
}

```

```java
public class UserRevListener implements RevisionListener {

    private final static Strign USERNAME = "runageinc";

    @Override
    public void onRevision(Object revisionEvent) {
        UserRevEntity revisionEntity = (UserRevEntity) revisionEntity;

        revisionEntity.setUsername(USERNAME);
    }
}
```