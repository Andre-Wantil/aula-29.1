const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer(locaisDePassagem);
server.listen(5000, () => console.log('Servidor Rodando Receba'));

function locaisDePassagem(req, res) {
    const URL = url.parse(req.url, true);
    const filePath = path.join(__dirname, '..', 'mock', 'alunos.json');

    function retorno(statusCode, contentType, resposta) {
        res.writeHead(statusCode, contentType);
        return res.end(resposta);
    }

    if (req.method === 'GET') {
        if (URL.pathname === '/') {
            return res.end('Olá Mundo');
        }

        if (req.method === 'GET' && URL.pathname === '/alunos') {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    retorno(400, { 'Content-Type': 'text/plain' }, JSON.stringify({ error: 'Erro ao ler arquivo' }))
                }

                retorno(200, { 'Content-Type': 'text/plain' }, data)
            });
        }
    }
}
