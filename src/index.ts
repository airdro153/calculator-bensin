import blessed from "blessed"
import { calculator } from "./calculate";

// Membuat layar
const screen = blessed.screen({
   smartCSR: true,
   title: 'Kalkulator Profit',
});

// Membuat kotak judul
const title = blessed.box({
   content: 'Kalkulator Profit',
   top: 0,
   left: 0,
   width: '100%',
   height: 3,
   align: 'center',
   valign: 'middle',
   style: {
      bg: 'blue',
      fg: 'white',
      bold: true,
   },
});

// Fungsi untuk membuat input
const createInputBox = (label: string, top: number) => {
   return blessed.textbox({
      label: `${label}:`,
      top,
      left: 'center',
      width: '40%',
      height: 3,
      inputOnFocus: true,
      border: { type: 'line' },
      style: { border: { fg: 'cyan' }, bg: 'black', fg: 'white' },
   });
};

// Membuat input untuk laba, harga sell, dan harga oli
const labaInput = createInputBox('Laba', 4);
const hargaSellInput = createInputBox('Harga Sell', 8);
const hargaOliInput = createInputBox('Harga Oli', 12);


// Membuat kotak untuk menampilkan hasil
const resultBox = blessed.box({
   top: 20,
   left: 'center',
   width: '80%',
   height: 12,
   border: { type: 'line' },
   style: {
      border: { fg: 'cyan' },
      bg: 'black',
      fg: 'white',
   },
});

// Menambahkan semua elemen ke layar
screen.append(title);
screen.append(labaInput);
screen.append(hargaSellInput);
screen.append(hargaOliInput);
screen.append(resultBox);

// Fungsi untuk menghitung dan menampilkan hasil
const calculateAndDisplay = () => {
   const laba = parseFloat(labaInput.value);
   const hargaSell = parseFloat(hargaSellInput.value);
   const hargaOli = parseFloat(hargaOliInput.value);

   if (isNaN(laba) || isNaN(hargaSell) || isNaN(hargaOli)) {
      resultBox.setContent('Mohon masukkan semua nilai dengan benar.');
   } else {
      const result = calculator(laba, hargaSell, hargaOli);
      resultBox.setContent(`
         Modal Bensin: ${result.modalBensin}\n
         Modal Oli: ${result.modalOil}\n
         Profit Haikal: ${result.profitHaikal}\n
         Profit Jong: ${result.profitJong}\n
         Profit Oli: ${result.profitOil}
      `);
   }
   screen.render();
};

// Menangani enter pada input
labaInput.on('submit', () => hargaSellInput.focus());
hargaSellInput.on('submit', () => hargaOliInput.focus());
hargaOliInput.on('submit', calculateAndDisplay); // Hitung saat selesai input hargaOli

// Fokus pada input laba saat dimulai
labaInput.focus();

// Keluar dengan Escape, q, atau Ctrl+C
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// Render layar
screen.render();