import './index.scss';
import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadZipButton = () => {

  const handleDownload = async () => {
    // Cria uma nova instância de JSZip
    const zip = new JSZip();
    
    // Adiciona arquivos ao ZIP
    zip.file("hello.txt", "Hello World\n");
    zip.file("file1.txt", "Content of file 1");
    zip.file("file2.txt", "Content of file 2");

    // Gera o arquivo ZIP
    const blob = await zip.generateAsync({ type: "blob" });

    // Faz o download do arquivo ZIP
    saveAs(blob, "example.zip");
  };

  return (
    <div className="maeButton">
        <button onClick={handleDownload}>
            Download ZIP
        </button>
    </div>
  );
};

export default DownloadZipButton;
