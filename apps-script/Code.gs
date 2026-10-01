var SPREADSHEET_ID = "1Zlh0yb6E-eVf8fR87LGM8TJFNKDZ4ZiVQlF8k1GNCRA";
var SHEET_NAME = "Links";

function doGet(e) {
  try {
    var result = getLinksData();
    return buildResponse(result);
  } catch (err) {
    return buildErrorResponse(err.toString());
  }
}

function getLinksData() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error("Sheet '" + SHEET_NAME + "' tidak ditemukan di spreadsheet.");
  }

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    return {
      success: true,
      timestamp: new Date().toISOString(),
      total: 0,
      categories: [],
      data: []
    };
  }

  var range = sheet.getRange(1, 1, lastRow, lastCol);
  var values = range.getValues();

  var headers = values[0].map(function(h) {
    return String(h).trim();
  });

  var headerMap = {};
  headers.forEach(function(h, i) {
    headerMap[h.toLowerCase()] = i;
  });

  var requiredColumns = ["id", "halaman", "kategori", "nama link", "url", "status"];
  requiredColumns.forEach(function(col) {
    if (typeof headerMap[col] === "undefined") {
      throw new Error("Kolom wajib '" + col + "' tidak ditemukan di header sheet.");
    }
  });

  var idIdx       = headerMap["id"];
  var halamanIdx  = headerMap["halaman"];
  var kategoriIdx = headerMap["kategori"];
  var namaIdx     = headerMap["nama link"];
  var deskripsiIdx = headerMap["deskripsi"] !== undefined ? headerMap["deskripsi"] : -1;
  var urlIdx      = headerMap["url"];
  var jenisIdx    = headerMap["jenis"]    !== undefined ? headerMap["jenis"]    : -1;
  var tenggalIdx  = headerMap["tenggat"]  !== undefined ? headerMap["tenggat"]  : -1;
  var statusIdx   = headerMap["status"];
  var urutanIdx   = headerMap["urutan"]   !== undefined ? headerMap["urutan"]   : -1;

  var filteredData = [];
  var categoriesSet = {};

  for (var i = 1; i < values.length; i++) {
    var row = values[i];

    var status   = String(row[statusIdx] || "").trim();
    var namaLink = String(row[namaIdx]   || "").trim();
    var url      = String(row[urlIdx]    || "").trim();

    // Hanya proses baris yang Aktif, punya nama, dan punya URL valid
    if (status !== "Aktif") continue;
    if (!namaLink) continue;
    if (!isValidUrl(url)) continue;

    var id       = String(row[idIdx]       || "").trim() || String(i);
    var halaman  = String(row[halamanIdx]  || "").trim();
    var kategori = String(row[kategoriIdx] || "").trim();
    var deskripsi = deskripsiIdx >= 0 ? String(row[deskripsiIdx] || "").trim() : "";
    var jenis    = jenisIdx   >= 0 ? String(row[jenisIdx]   || "").trim() : "";
    var tenggat  = tenggalIdx >= 0 ? formatTenggat(row[tenggalIdx]) : "";
    var urutan   = urutanIdx  >= 0 ? (parseInt(row[urutanIdx]) || 9999) : 9999;

    if (kategori) {
      categoriesSet[kategori] = true;
    }

    filteredData.push({
      id: id,
      halaman: halaman,
      kategori: kategori,
      namaLink: namaLink,
      deskripsi: deskripsi,
      url: url,
      jenis: jenis,
      tenggat: tenggat,
      status: status,
      urutan: urutan
    });
  }

  filteredData.sort(function(a, b) {
    return a.urutan - b.urutan;
  });

  var categories = Object.keys(categoriesSet);

  return {
    success: true,
    timestamp: new Date().toISOString(),
    total: filteredData.length,
    categories: categories,
    data: filteredData
  };
}

function isValidUrl(url) {
  if (!url || typeof url !== "string") return false;
  var trimmed = url.trim();
  return trimmed.indexOf("http://") === 0 || trimmed.indexOf("https://") === 0;
}

function formatTenggat(value) {
  if (!value) return "";
  if (value instanceof Date) {
    var y = value.getFullYear();
    var m = String(value.getMonth() + 1).padStart(2, "0");
    var d = String(value.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }
  var str = String(value).trim();
  if (!str) return "";
  return str;
}

function buildResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function buildErrorResponse(errorMessage) {
  var data = {
    success: false,
    error: errorMessage
  };
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
