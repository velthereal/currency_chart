async function fetchData() {
	try {
		let response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
		let data = await response.json();
	  
		let currencies = data.map(entry => entry.cc);
		let exchangeRates = data.map(entry => parseFloat(entry.rate));

		let canvas = document.getElementById("exchangeRateChart");
		let ctx = canvas.getContext("2d");

		canvas.width = 1500;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let barWidth = 40;
		let spacing = 10;
		let startX = 50;

		for (let i = 0; i < currencies.length; i++) {
			let x = startX + i * (barWidth + spacing);
			let y = canvas.height - exchangeRates[i] * 10;

			ctx.fillStyle = "blue";
			ctx.fillRect(x, y, barWidth, exchangeRates[i] * 10); 

			ctx.fillStyle = "black";
			ctx.fillText(currencies[i], x + barWidth / 2 - 10, canvas.height - 10);
		}
	} catch (error) {
		console.error("Помилка завантаження даних:", error);
	}
}

fetchData();