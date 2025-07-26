const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

let rates = {};

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    rates = data;
    const currencies = Object.keys(data);
    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      const optionTo = document.createElement('option');
      optionFrom.value = optionTo.value = currency;
      optionFrom.text = optionTo.text = currency;
      fromSelect.appendChild(optionFrom);
      toSelect.appendChild(optionTo);
    });
    fromSelect.value = 'USD'; // Por defecto USD
    toSelect.value = 'EUR';
  })
  .catch(() => {
    Swal.fire('Error', 'No se pudo cargar la información de tasas.', 'error');
  });

convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    Swal.fire('Oops', 'Por favor ingresa un monto válido.', 'warning');
    return;
  }

  if (from === to) {
    resultDiv.textContent = `${amount} ${from} = ${amount.toFixed(2)} ${to}`;
    return;
  }

  const rate = rates[from]?.[to];

  if (!rate) {
    Swal.fire('Oops', 'No se encontró la tasa de conversión seleccionada.', 'error');
    return;
  }

  const converted = amount * rate;
  resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
});
