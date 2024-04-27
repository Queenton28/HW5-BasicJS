// Class for handling registration
class Registration {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }

    async validate() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.nama.length < 10 || this.umur < 25 || this.uangSangu < 100000 || this.uangSangu > 1000000) {
                    reject('Data tidak valid');
                } else {
                    resolve('Data valid');
                }
            }, 1000); // Simulate async validation with setTimeout
        });
    }
}

// Function to add a row to the table
function addRowToTable(nama, umur, uangSangu) {
    const tableBody = document.getElementById('pendaftarTableBody');
    const newRow = `<tr><td>${nama}</td><td>${umur}</td><td>${uangSangu}</td></tr>`;
    tableBody.innerHTML += newRow;
}

// Function to calculate and display average
function displayAverage(data) {
    if (data.length === 0) {
        document.getElementById('resumeText').innerText = `Belum ada data pendaftar.`;
        return;
    }

    const totalUangSangu = data.reduce((acc, curr) => acc + curr.uangSangu, 0);
    const totalUmur = data.reduce((acc, curr) => acc + curr.umur, 0);
    const averageUangSangu = totalUangSangu / data.length || 0; // Handle division by zero
    const averageUmur = totalUmur / data.length || 0; // Handle division by zero

    const resumeText = document.getElementById('resumeText');
    resumeText.innerText = `Rata-rata pendaftar memiliki uang sangu sebesar Rp${averageUangSangu.toFixed(2)} dengan rata-rata umur ${averageUmur.toFixed(2)} tahun.`;
}

// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const uangSangu = parseInt(document.getElementById('uangSangu').value);

    const registration = new Registration(nama, umur, uangSangu);
    try {
        await registration.validate();
        addRowToTable(nama, umur, uangSangu);
        const tableRows = Array.from(document.querySelectorAll('#pendaftarTableBody tr'));
        if (tableRows.length > 0) {
            const data = tableRows.map(row => {
                const columns = row.querySelectorAll('td');
                return {
                    nama: columns[0].innerText,
                    umur: parseInt(columns[1].innerText),
                    uangSangu: parseInt(columns[2].innerText)
                };
            });
            displayAverage(data);
        }
        // Clear form fields after successful submission
        document.getElementById('nama').value = '';
        document.getElementById('umur').value = '';
        document.getElementById('uangSangu').value = '';
    } catch (error) {
        alert(error);
    }
});
