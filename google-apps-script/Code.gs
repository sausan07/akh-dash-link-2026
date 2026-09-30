/**
 * Akhwat Student Hub — Google Apps Script REST API
 * Deploy as: Web App (Execute as: Me, Who has access: Anyone)
 *
 * Ganti SPREADSHEET_ID dengan ID spreadsheet Anda.
 * ID spreadsheet ada di URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 */

var SPREADSHEET_ID = "1Zlh0yb6E-eVf8fR87LGM8TJFNKDZ4ZiVQlF8k1GNCRA";
var SHEET_NAME = "Links";

/**
 * Handler utama untuk GET request
 */
function doGet(e) {
  try {
    var result = getLinksData();
    return buildResponse(result);
  } catch (err) {
    return buildErrorResponse(err.toString());
  }
}

/**
 * Membaca dan memfilter data dari sheet Links
 */
function getLinksData() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error("Sheet '" + SHEET_NAME + "' tidak ditemukan di spreadsheet.");
  }

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    // Hanya ada header atau kosong
    return {
      success: true,
      timestamp: new Date().toISOString(),
      total: 0,
      categories: [],
      data: []
    };
  }

  // Ambil semua data termasuk header
  var range = sheet.getRange(1, 1, lastRow, lastCol);
  var values = range.getValues();

  // Baris pertama = header
  var headers = values[0].map(function(h) {
    return String(h).trim();
  });

  // Mapping header ke index (case-insensitive)
  var headerMap = {};
  headers.forEach(function(h, i) {
    headerMap[h.toLowerCase()] = i;
  });

  // Validasi kolom wajib
  var requiredColumns = ["id", "kategori", "nama link", "url", "status"];
  requiredColumns.forEach(function(col) {
    if (typeof headerMap[col] === "undefined") {
      throw new Error("Kolom wajib '" + col + "' tidak ditemukan di header sheet.");
    }
  });

  var idIdx        = headerMap["id"];
  var kategoriIdx  = headerMap["kategori"];
  var namaIdx      = headerMap["nama link"];
  var deskripsiIdx = headerMap["deskripsi"] !== undefined ? headerMap["deskripsi"] : -1;
  var urlIdx       = headerMap["url"];
  var jenisIdx     = headerMap["jenis"] !== undefined ? headerMap["jenis"] : -1;
  var tenggalIdx   = headerMap["tenggat"] !== undefined ? headerMap["tenggat"] : -1;
  var statusIdx    = headerMap["status"];
  var urutanIdx    = headerMap["urutan"] !== undefined ? headerMap["urutan"] : -1;

  var filteredData = [];
  var categoriesSet = {};

  for (var i = 1; i < values.length; i++) {
    var row = values[i];

    var status   = String(row[statusIdx] || "").trim();
    var namaLink = String(row[namaIdx] || "").trim();
    var url      = String(row[urlIdx] || "").trim();

    // Hanya tampilkan: Status=Aktif, URL valid, Nama tidak kosong
    if (status !== "Aktif") continue;
    if (!namaLink) continue;
    if (!isValidUrl(url)) continue;

    var id       = String(row[idIdx] || "").trim() || String(i);
    var kategori = String(row[kategoriIdx] || "").trim();
    var deskripsi = deskripsiIdx >= 0 ? String(row[deskripsiIdx] || "").trim() : "";
    var jenis     = jenisIdx >= 0 ? String(row[jenisIdx] || "").trim() : "";
    var tenggat   = tenggalIdx >= 0 ? formatTenggat(row[tenggalIdx]) : "";
    var urutan    = urutanIdx >= 0 ? (parseInt(row[urutanIdx]) || 9999) : 9999;

    if (kategori) {
      categoriesSet[kategori] = true;
    }

    filteredData.push({
      id: id,
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

  // Sort berdasarkan urutan
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

/**
 * Validasi URL — hanya http:// dan https://
 */
function isValidUrl(url) {
  if (!url || typeof url !== "string") return false;
  var trimmed = url.trim();
  return trimmed.indexOf("http://") === 0 || trimmed.indexOf("https://") === 0;
}

/**
 * Format tanggal tenggat ke YYYY-MM-DD
 */
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

/**
 * Membangun ContentService response JSON dengan CORS header
 */
function buildResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Membangun error response JSON
 */
function buildErrorResponse(errorMessage) {
  var data = {
    success: false,
    error: errorMessage
  };
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
