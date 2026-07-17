<div align="center">

# gen-QrCode

### Transforme links, textos e redes Wi-Fi em QR Codes de forma rápida, privada e intuitiva.

<br />

<img
src="https://skillicons.dev/icons?i=react,ts,nodejs,vite,tauri,rust,html,css&theme=dark"
alt="Tecnologias utilizadas no projeto"
/>

<br />
<br />



\

</div>

---

## 📌 Sobre o projeto

O **gen-QrCode** é uma aplicação desktop desenvolvida para transformar diferentes tipos de conteúdo em QR Codes.

A aplicação permite gerar códigos a partir de:

* Links
* Textos
* Mensagens
* Credenciais de redes Wi-Fi
* Informações personalizadas
* Qualquer outro conteúdo compatível com QR Code

Todo o processamento acontece localmente no dispositivo do usuário. Nenhuma informação inserida na aplicação é enviada para servidores externos.

O projeto foi desenvolvido utilizando **React**, **TypeScript**, **Vite** e **Tauri**, permitindo que a aplicação possua uma interface moderna, responsiva e leve, além de funcionar como um programa desktop nativo.

---

## ✨ Funcionalidades

* Geração de QR Codes a partir de textos e links
* Suporte para credenciais de redes Wi-Fi
* Visualização instantânea do código gerado
* Contador de caracteres
* Exemplos rápidos de conteúdo
* Cópia do conteúdo codificado
* Exportação do QR Code em SVG
* Tema claro e escuro
* Preferência de tema salva no dispositivo
* Interface inspirada na identidade visual do Notion
* Layout completamente responsivo
* Processamento totalmente local
* Aplicação desktop desenvolvida com Tauri
* Compatibilidade com janelas pequenas, tablets e dispositivos móveis

---

## 🔐 Privacidade

O **gen-QrCode** foi desenvolvido com foco em privacidade.

Todos os dados utilizados para gerar os QR Codes permanecem no dispositivo do usuário.

A aplicação:

* Não envia textos para servidores externos
* Não armazena senhas de Wi-Fi remotamente
* Não utiliza serviços de geração de QR Code online
* Não coleta dados pessoais
* Não exige cadastro
* Não depende de conexão com a internet para gerar os códigos

> Seus dados permanecem no seu dispositivo.

---

## 🌓 Tema claro e escuro

A aplicação possui dois temas visuais:

* Tema claro
* Tema escuro

A preferência selecionada é armazenada no `localStorage` e restaurada automaticamente quando a aplicação for aberta novamente.

A paleta de cores foi inspirada no estilo visual do **Notion**, utilizando superfícies neutras, contraste suave e destaques em azul.

---

## 🛠️ Tecnologias utilizadas

<div align="center">

<a href="https://skillicons.dev">
  <img
    src="https://skillicons.dev/icons?i=react,ts,nodejs,vite,tauri,rust,html,css,npm,git,github,vscode&theme=dark&perline=6"
    alt="Tecnologias e ferramentas utilizadas"
  />
</a>

</div>

### Front-end

* React
* TypeScript
* HTML5
* CSS3
* Vite
* Lucide React
* React QR Code

### Aplicação desktop

* Tauri 2
* Rust
* WebView2

### Ambiente e ferramentas

* Node.js
* npm
* Git
* GitHub
* Visual Studio Code

---

## 🧱 Arquitetura do projeto

```text
gen-QrCode/
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   │
│   │   ├── QrForm/
│   │   │   ├── QrForm.tsx
│   │   │   └── QrForm.css
│   │   │
│   │   ├── QrPreview/
│   │   │   ├── QrPreview.tsx
│   │   │   └── QrPreview.css
│   │   │
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.tsx
│   │       └── ThemeToggle.css
│   │
│   ├── hooks/
│   │   └── useTheme.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── src-tauri/
│   ├── capabilities/
│   ├── icons/
│   ├── src/
│   │   ├── lib.rs
│   │   └── main.rs
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, é necessário possuir:

* Node.js
* npm
* Rust
* Cargo
* Microsoft C++ Build Tools
* WebView2
* Git

Para conferir as instalações:

```bash
node --version
npm --version
rustc --version
cargo --version
git --version
```

---

### 1. Clone o repositório

```bash
git clone https://github.com/WKMcode-dev/gen-QrCode.git
```

### 2. Entre na pasta do projeto

```bash
cd gen-QrCode
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute apenas a versão web

```bash
npm run dev
```

A aplicação estará disponível normalmente em:

```text
http://localhost:5173
```

---

## 🖥️ Executando como aplicação desktop

Para iniciar o projeto com o Tauri:

```bash
npm run tauri dev
```

Esse comando:

1. Inicia o servidor do Vite
2. Compila a camada Rust
3. Abre a aplicação em uma janela desktop
4. Atualiza a interface durante o desenvolvimento

Na primeira execução, a compilação pode demorar mais devido ao download e processamento das dependências do Rust.

---

## 📦 Gerando o aplicativo

Para criar uma versão de produção:

```bash
npm run tauri build
```

O Tauri irá:

* Compilar o React e o TypeScript
* Gerar os arquivos de produção do Vite
* Compilar a aplicação Rust
* Criar o executável
* Gerar o instalador correspondente ao sistema operacional

Os arquivos normalmente serão criados em:

```text
src-tauri/target/release/
```

Os instaladores podem ser encontrados em:

```text
src-tauri/target/release/bundle/
```

---

## 📜 Scripts disponíveis

| Comando               | Descrição                                      |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Inicia o projeto React com Vite                |
| `npm run build`       | Compila o front-end para produção              |
| `npm run preview`     | Visualiza localmente a build do Vite           |
| `npm run lint`        | Executa a análise do ESLint                    |
| `npm run tauri dev`   | Executa a aplicação desktop em desenvolvimento |
| `npm run tauri build` | Gera o executável e o instalador               |

---

## 📱 Responsividade

A interface foi desenvolvida para se adaptar a diferentes dimensões de tela e janela.

O layout oferece suporte para:

* Monitores ultrawide
* Desktops
* Notebooks
* Tablets
* Celulares
* Janelas reduzidas do Tauri

Os principais pontos de adaptação incluem:

* Reorganização dos painéis em uma única coluna
* Botões que ocupam toda a largura em telas pequenas
* Textos com tamanhos fluidos
* QR Code com tamanho adaptável
* Header compacto
* Footer responsivo
* Toggle de tema reduzido em dispositivos menores

---

## 📡 Formato para redes Wi-Fi

Credenciais de Wi-Fi podem ser convertidas em QR Code utilizando o seguinte formato:

```text
WIFI:T:WPA;S:NomeDaRede;P:SenhaDaRede;;
```

Exemplo:

```text
WIFI:T:WPA;S:MinhaInternet;P:minhasenha123;;
```

Onde:

| Campo | Significado               |
| ----- | ------------------------- |
| `T`   | Tipo de segurança         |
| `S`   | Nome da rede              |
| `P`   | Senha                     |
| `H`   | Indica se a rede é oculta |

Exemplo de rede oculta:

```text
WIFI:T:WPA;S:MinhaInternet;P:minhasenha123;H:true;;
```

---

## 🗺️ Roadmap

### Versão inicial

* [x] Gerador de texto
* [x] Gerador de links
* [x] Visualização do QR Code
* [x] Tema claro e escuro
* [x] Preferência de tema persistente
* [x] Cópia do conteúdo
* [x] Exportação em SVG
* [x] Interface responsiva
* [x] Integração com Tauri

### Próximas funcionalidades

* [ ] Formulário dedicado para redes Wi-Fi
* [ ] Exportação em PNG
* [ ] Exportação em JPEG
* [ ] Alteração da cor do QR Code
* [ ] Alteração da cor de fundo
* [ ] Controle de tamanho
* [ ] Controle de margem
* [ ] Seleção do nível de correção
* [ ] Inserção de logotipo central
* [ ] Histórico local
* [ ] Favoritos
* [ ] Gerador de e-mail
* [ ] Gerador de telefone
* [ ] Gerador de SMS
* [ ] Gerador de contato
* [ ] Gerador de localização
* [ ] Compartilhamento nativo
* [ ] Atualizações automáticas
* [ ] Instaladores para Windows, Linux e macOS

---

## 🎨 Personalização planejada

Futuramente, o usuário poderá alterar:

* Cor principal do QR Code
* Cor de fundo
* Tamanho da imagem
* Margem interna
* Nível de correção de erros
* Formato dos módulos
* Formato dos marcadores
* Logotipo central
* Qualidade da exportação
* Formato do arquivo

---

## 🤝 Contribuição

Contribuições são bem-vindas.

Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua alteração

```bash
git checkout -b feature/minha-funcionalidade
```

3. Realize as alterações
4. Faça o commit

```bash
git commit -m "feat: adiciona nova funcionalidade"
```

5. Envie a branch

```bash
git push origin feature/minha-funcionalidade
```

6. Abra um Pull Request

---

## 🐛 Relatando problemas

Caso encontre algum erro, abra uma issue contendo:

* Descrição do problema
* Passos para reproduzir
* Comportamento esperado
* Comportamento apresentado
* Sistema operacional
* Versão da aplicação
* Capturas de tela, quando possível

---

## 📄 Licença

Este projeto está distribuído sob a licença MIT.

Isso permite que o código seja utilizado, estudado, modificado e distribuído, desde que os termos da licença sejam respeitados.

Consulte o arquivo `LICENSE` para mais informações.

---

## 👨‍💻 Autor

<div align="center">

### WKMcode-dev

Desenvolvido por **Kenneth Kitsune**.

<br />

<a href="https://github.com/WKMcode-dev">
  <img
    src="https://skillicons.dev/icons?i=github&theme=dark"
    alt="GitHub WKMcode-dev"
  />
</a>

<br />
<br />

**WKMcode-dev | gen-QrCode · Todos os direitos reservados.**

Seus dados permanecem no seu dispositivo.

</div>
