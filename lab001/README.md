## LAB 001

### RFC01: Criando um Microsserviço Serverless para Validação de CPF

## Introdução

A proposta deste código é ser executada em um ambiente serverless, então sua implementação deve ser bem simples.

### O que foi feito?

#### Pré-requisitos

* Configurado **Resource Group**
* Configurado **Azure API Gateway** para o endpoint `POST /cpf/validate`
* Configurado **Azure Account Integration** (demorei um pouco para encontrar como fazer isso)
* Foi criada uma instância do **APP Logic**, e suas configurações foram alteradas para utilizar a **Account Integration**.

### Implementação

* **Step Trigger**: "When an HTTP request is received"
* **Step**: "Execute JavaScript Code" (o código deste repositório deve ser usado aqui)
* **Step**: Response
