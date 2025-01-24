## LAB 001

- RFC01: Criando um Microsserviço Serverless para Validação de CPF

## Introdução

A proposta deste código é ser executada em um ambiente serverless, então sua implementação deve ser bem simples.

### O que foi feito?

#### Pré-requisitos

Para configurar o service no portal AZURE é necessário fazer algumas configurações.

* Configurar **Resource Group**
* Configurar **Azure API Gateway** para o endpoint `POST /cpf/validate`
* Configurar **Azure Account Integration** 
* Criar uma instância do **APP Logic**, e alterar a configuração para utilizar o **Account Integration**.

### Workflow

* **Step Trigger**: "When an HTTP request is received"
* **Step**: "Execute JavaScript Code" (o código deste repositório deve ser usado aqui)
* **Step**: Response
