export function downloadCSV(userData) {
    // Convert userData object to CSV-formatted string
    let csvContent = 'User ID,Wallet Address,Balance (USDT)\n';
  
    for (const userId in userData) {
      const [userid, walletAdyy, balance] = userData[userId];
      csvContent += `${userId},${walletAdyy},${balance}\n`;
    }
  
    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'userdata.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
  
    // Cleanup: Revoke the temporary URL
    URL.revokeObjectURL(url);
  }

  