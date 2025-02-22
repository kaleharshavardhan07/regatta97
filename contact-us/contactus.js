function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Define the order of columns in the sheet
    const headers = ['timestamp', 'name', 'email', 'phone', 'subject', 'message'];
    
    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare row data in the same order as headers
    const rowData = headers.map(header => data[header] || '');
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  }