var apikey = "BYMNX5T5A8BD5U1T";
var stockList = ["AMZN","AAPL","MSFT","VTI","VPL"]

//Accepts stock data and creates a new div populated with it
function createStockDiv(ticker, price, change) {
    var stockDiv = document.createElement("div");
    stockDiv.classList.add(ticker);
    if (parseFloat(change) >= 0) {
        stockDiv.classList.add("stock-up")
    } else {
        stockDiv.classList.add("stock-down")
    }
    stockDiv.innerText = ticker+" $"+price+" "+change+"%";

    //Append ticker to list
    var tickerBar = document.getElementById("ticker-text");
    tickerBar.appendChild(stockDiv);
}



//Queries Alpha Vantage for stock data
function getStockData(ticker) {
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ticker+"&apikey="+apikey
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data)
            price = data["Global Quote"]["05. price"]
            change = data["Global Quote"]["10. change percent"].replace("%","")
            createStockDiv(ticker, price, change);
        }
    })
}

//Creates a copy of all stocks DEPRECIATED
function copyStockDivs(tickerList) {
    //Setup ticker-text
    var tickerBox = document.getElementById("ticker-box");
    var tickerText = document.getElementById("ticker-text");
    var copyOfTickerText = tickerText.cloneNode(true);
    tickerBox.appendChild(copyOfTickerText);

    //Copy all stockDivs
    tickerList.forEach(ticker => {
        var stockDiv = document.querySelector("."+ticker);
        var copyOfStockDiv = stockDiv.cloneNode(true);
        copyOfTickerText.appendChild(copyOfStockDiv);
    })
}

stockList.forEach(stock => {
    getStockData(stock)
})