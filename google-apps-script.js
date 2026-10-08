/**
 * =======================================================================
 * GOOGLE APPS SCRIPT - PERSISTÊNCIA DA LISTA DE ESPERA (@pamquasepsi)
 * =======================================================================
 * 
 * Como configurar:
 * 1. Acesse https://sheets.google.com no Google Drive da Pamela e crie uma nova planilha
 *    (ex.: "Lista de Espera 2027 - Pamela Psicologia").
 * 2. No menu superior da planilha, clique em: Extensões > Apps Script.
 * 3. Apague qualquer código existente no editor e cole todo o conteúdo deste arquivo.
 * 4. Clique no ícone de salvar (💾) ou pressione Ctrl+S / Cmd+S.
 * 5. Clique no botão azul "Implantar" (topo direito) > "Nova implantação".
 * 6. Na engrenagem ao lado de "Selecionar tipo", escolha: "Aplicativo da Web".
 * 7. Preencha as opções exatamente assim:
 *    - Descrição: "API Lista de Espera"
 *    - Executar como: "Eu (seu email do Google)"
 *    - Quem pode acessar: "Qualquer pessoa" (ou "Anyone")
 * 8. Clique em "Implantar" e autorize as permissões da sua conta Google quando solicitado.
 * 9. Copie o link gerado ("URL do aplicativo da Web", termina com /exec).
 * 10. Abra o arquivo `index.html` do site e cole essa URL na constante GOOGLE_SCRIPT_URL:
 *     const GOOGLE_SCRIPT_URL = "SUA_URL_AQUI";
 * =======================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Aguarda até 15 segundos para evitar conflito se várias pessoas enviarem juntas
  lock.tryLock(15000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se a planilha estiver vazia, cria os cabeçalhos com formatação profissional
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data e Hora", "Nome Completo", "WhatsApp", "Observações / Mensagem"]);
      var headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f8f1e7");
      headerRange.setFontColor("#5f3b1f");
      sheet.setFrozenRows(1);
    }

    var nome = "";
    var zap = "";
    var obs = "";

    // 1. Tenta obter via parâmetros diretos (FormData / urlencoded)
    if (e && e.parameter && (e.parameter.nome || e.parameter.zap)) {
      nome = (e.parameter.nome || "").trim();
      zap = (e.parameter.zap || "").trim();
      obs = (e.parameter.obs || "").trim();
    }
    // 2. Fallback: tenta obter via corpo da requisição JSON
    else if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        nome = (json.nome || "").trim();
        zap = (json.zap || "").trim();
        obs = (json.obs || "").trim();
      } catch (errJson) {
        // Fallback para form-urlencoded em raw
        var params = parseQueryString(e.postData.contents);
        nome = (params.nome || "").trim();
        zap = (params.zap || "").trim();
        obs = (params.obs || "").trim();
      }
    }

    // Se não tiver nome ou zap, rejeita
    if (!nome && !zap) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Nome e WhatsApp são obrigatórios."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Formata data e hora no fuso horário oficial de Brasília
    var dataHora = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    // Adiciona uma nova linha com os dados
    sheet.appendRow([dataHora, nome, zap, obs]);

    // Resposta de sucesso em JSON
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Inscrição registrada com sucesso!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Suporte para requisições GET (útil para testar no navegador se a URL está ativa)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "A API da lista de espera está funcionando corretamente."
  })).setMimeType(ContentService.MimeType.JSON);
}

// Função auxiliar para interpretar dados caso venha como querystring raw
function parseQueryString(str) {
  var result = {};
  if (!str) return result;
  var pairs = str.split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    var key = decodeURIComponent(pair[0] || "");
    var value = decodeURIComponent((pair[1] || "").replace(/\+/g, " "));
    if (key) result[key] = value;
  }
  return result;
}
