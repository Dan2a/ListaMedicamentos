# 🩺 ListaMedicamentos

## 📋 Descrição

O **ListaMedicamentos** é uma aplicação web desenvolvida em **Java** com **Spring Boot** no backend e **HTML/CSS/JavaScript** no frontend. A aplicação tem como objetivo principal permitir o gerenciamento de uma lista de medicamentos, com funcionalidades para cadastrar, editar, excluir e consultar medicamentos, além de uma busca rápida via barra lateral (sidebar).

---

## 🚀 Tecnologias Utilizadas

✅ **Backend:**  
- Java 23
- Spring Boot  
- Spring MVC  
- Spring Data JPA  
- Hibernate

✅ **Frontend:**  
- HTML5  
- CSS3  
- JavaScript puro  

✅ **Banco de Dados:**  
- MySQL  

---

## 🛠️ Funcionalidades

✅ Listar medicamentos  
✅ Cadastrar novos medicamentos  
✅ Editar medicamentos existentes  
✅ Excluir medicamentos  
✅ Buscar medicamentos pelo nome  
✅ Interface web com modal de cadastro/edição  
✅ Sidebar com busca rápida e simulação de medicamentos  

---

## 🖥️ Como Executar o Projeto

### ✅ Pré-requisitos
- JDK 21+  
- Maven  
- MySQL  
- IDE de sua preferência (VS Code, IntelliJ, Eclipse)

---

### ✅ Passos

1. **Clone o repositório**  
```bash
git clone https://github.com/Dan2a/ListaMedicamentos.git
```
2. **Configure o banco de dados MySQL** 
Usando Mysql, altere o `application.properties` no backend:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestaoContatos?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=senha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto=update
```
> **Nota:** Lembre-se de alterar os dados de `username` e `password` para suas credenciais do banco de dados.
3. **Rodar a Aplicação**
Para rodar a aplicação use o comando abaixo no terminal ou se estiver usando uma IDE apenas execute o `GestaodecontatosApplication.java` 
```bash
mvn spring-boot:run
```
A aplicação será executada em:
http://localhost:8080

### 📂 Estrutura do Projeto
```scss
src
├── main
│   ├── java
│   │   └── ... (código backend)
│   └── resources
│       ├── static
│       │   ├── index.html
│       │   ├── medicamentos_simulados.json
│       │   ├── script.js
│       │   └── styles.css
│       └── application.properties
└── test
```

## Endpoints da API
- GET /medicamentos — lista todos os medicamentos
- POST /medicamentos — cria um novo medicamento
- PUT /medicamentos/{id} — atualiza um medicamento existente
- DELETE /medicamentos/{id} — exclui um medicamento

## Autor
Desenvolvido por Daniel Almeida Andrade.

##💡 Observações
- O JSON medicamentos_simulados.json encontra-se dentro da pasta static e serve para simulação de medicamentos na sidebar.
- A aplicação pode ser expandida facilmente para incluir autenticação, paginação e outros recursos.
