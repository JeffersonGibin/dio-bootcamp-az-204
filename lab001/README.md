## LAB 001

### Requisito Funcional

| ID       | Descrição                                                                 |
|----------|---------------------------------------------------------------------------|
| RF-001   | Criando um Microsserviço Serverless para Validação de CPF                 |

### Requisito não Funcional

| ID       | Descrição                                                                 |
|----------|---------------------------------------------------------------------------|
| RNF-001   | Configurar Azure API Gateway                                             |
| RNF-002    | Configurar Azure App Logic                                               |


## Introdução

A proposta deste código é ser executada em um ambiente serverless, então sua implementação deve ser bem simples.

#### Pré-requisitos

Para configurar o service no portal AZURE é necessário fazer algumas configurações.

* Configurar **Resource Group**
* Configurar **Azure API Gateway** para o endpoint `POST /cpf/validate`.
  * O endpoint deve estar exposto para internet!
* Configurar **Azure Account Integration** 
* Criar uma instância do **APP Logic**, e alterar a configuração para utilizar o **Account Integration**.

### Workflow

* **Step Trigger**: "When an HTTP request is received"
* **Step**: "Execute JavaScript Code" (o código deste repositório deve ser usado aqui)
* **Step**: Response

### Arquitetura 
![image](https://github.com/user-attachments/assets/b77a7cfe-cbe7-46e4-8afe-14c86c621a4e)

