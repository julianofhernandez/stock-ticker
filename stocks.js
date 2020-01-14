var apikey = "BYMNX5T5A8BD5U1T";
var stockList = ["AMZN","AAPL","MSFT","VTI","VPL"]

function createStockDiv(ticker, price, change) {
    //Create new ticker div
    var stockDiv = document.createElement("div");
    stockDiv.id = ticker;
    if (parseInt(change) >= 0) {
        stockDiv.className = "stock-up"
    } else {
        stockDiv.className = "stock-down"
    }
    stockDiv.innerText = ticker+" "+price+" "+change;

    //Append ticker to list
    var currentDiv = document.getElementById("ticker-text");
    currentDiv.appendChild(stockDiv);
}

function getStockData(ticker) {
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ticker+"&apikey="+apikey
    $.getJSON(url, "", function(data) {
        console.log(data)
        price = data["Global Quote"]["05. price"]
        change = data["Global Quote"]["09. change"]
        createStockDiv(ticker, price, change);
    })
}

stockList.forEach(element => {getStockData(element)})

