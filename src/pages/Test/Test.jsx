import React from 'react';
import Cookies from 'js-cookie';

function Test() {
    const downloadFile = async () => {
        try {
            const response = await fetch('http://localhost:8080/financas/download-csv ', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `Bearer ${ Cookies.get('token') }`,
                },
            });

            if (response.ok) {
                // Converte o byte[] em um Blob
                const blob = await response.blob();

                // Cria uma URL para o Blob e simula o clique para download
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'seuarquivo.csv'); // Nome do arquivo
                document.body.appendChild(link);
                link.click();

                // Limpa a URL e remove o link criado
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                console.error("Erro ao baixar o arquivo");
            }
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    };

    return (
        <div>
            <button onClick={downloadFile}>Baixar Documento</button>
        </div>
    );
}
export default Test;
