const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formulários

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/lanches', (req, res) => {
    res.send([
    {
        "id": 1,
        "nome": "DevBurger Clássico",
        "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
    },
    {
        "id": 2,
        "nome": "Burger de Bacon",
        "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
    },
    {
        "id": 3,
        "nome": "Commit Veggie",
        "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
    },
    {
        "id": 4,
        "nome": "Pull Request Picante",
        "ingredientes": "Pão de gergelim, Carne 200g, Queijo pepper jack, Jalapeños, Cebola roxa, Molho chipotle"
    },
    {
        "id": 5,
        "nome": "Merge de Frango",
        "ingredientes": "Pão ciabatta, Peito de frango grelhado, Queijo suíço, Alface romana, Maionese de mostarda e mel"
    },
    {
        "id": 6,
        "nome": "Fork de Peixe",
        "ingredientes": "Pão de batata, Filé de peixe empanado, Molho tártaro, Alface, Rodelas de limão"
    }
    ]);
});

app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Sugestão Recebida</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <h1>Obrigado pela sugestão, ${nome}!</h1>
      <p>Recebemos sua sugestão de lanche com os ingredientes: <strong>${ingredientes}</strong>.</p>
      <a href="/">Voltar ao cardápio</a>
    </body>
    </html>
  `);
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Contato Recebido!</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <h1>Obrigado pela sua mensagem!</h1>
      <div class="dados">
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
      </div>
      <a href="/">Voltar para a página inicial</a>
    </body>
    </html>
  `);
});


app.get('/contato-recebido', (req, res) => {
    const {nome, email, assunto, mensagem} = req.query;

    res.send(`
        <h1>Contato Recebido</h1>
        <p>Obrigado, ${nome}! Sua mensagem foi recebida.</p>
        <p>Email: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});
