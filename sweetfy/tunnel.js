const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

const PORTA_DO_SERVIDOR = 5190;
const CAMINHO_ARQUIVO_API = './api/pathVariables.ts';

function pegarUrlDoNgrok() {
    return new Promise((resolve, reject) => {
        const req = http.get('http://127.0.0.1:4040/api/tunnels', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    const tunnel = result.tunnels.find(t => t.proto === 'https');
                    if (tunnel) resolve(tunnel.public_url);
                    else reject('Túnel ainda não está pronto...');
                } catch (e) {
                    reject('Erro ao ler JSON');
                }
            });
        });
        req.on('error', (e) => reject(e.message));
    });
}

(async function () {
    console.log('🔄 Iniciando Ngrok do Windows...');

    const ngrokProcess = spawn('ngrok', ['http', PORTA_DO_SERVIDOR], { shell: true });

    let url = null;
    for (let i = 0; i < 10; i++) {
        try {
            await new Promise(r => setTimeout(r, 1000));
            url = await pegarUrlDoNgrok();
            if (url) break;
        } catch (e) {
            console.log(`⏳ Tentando conectar... (${i + 1}/10)`);
        }
    }

    if (url) {
        console.log(`✅ SUCESSO! Túnel Online: ${url}`);

        const conteudoArquivo = `export const API_URL = '${url}';`;
        fs.writeFileSync(CAMINHO_ARQUIVO_API, conteudoArquivo);
        console.log(`📂 Arquivo salvo em: ${CAMINHO_ARQUIVO_API}`);
        console.log('🚀 Mantenha este terminal aberto e rode o App!');
    } else {
        console.error('❌ Não consegui pegar a URL.');
        console.log('Verifique se você consegue rodar "ngrok http 5190" manualmente no terminal.');
        spawn('taskkill', ['/pid', ngrokProcess.pid, '/f', '/t']);
    }
})();