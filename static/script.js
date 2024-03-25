var tickers = JSON.parse(localStorage.getItem("tickers")) || [];
var lastPrices = {};
var counter = 15;

function startUpdateCycle() {
    updatePrices();
    setInterval(function () {
        counter--;
        $("#counter").text(counter);
        if (counter <= 0) {
            updatePrices();
            counter = 15;
        }
    }, 1000);
}

$(document).ready(function () {
    tickers.forEach(function (ticker) {
        addTickerToGrid(ticker);
    });

    updatePrices();

    $("#add-ticker-form").submit(function (e) {
        e.preventDefault();
        var newTicker = $("#new-ticker").val().toUpperCase();
        if (!tickers.includes(newTicker)) {
            tickers.push(newTicker);
            localStorage.setItem("tickers", JSON.stringify(tickers));
            addTickerToGrid(newTicker);
        }

        $("new-ticker").val("");
        updatePrices();
    });

    $("#tickers-grid").on("click", ".remove-btn", function () {
        var tickerToRemove = $(this).data("ticker");
        tickers = tickers.filter((t) => t !== tickerToRemove);
        localStorage.setItem("tickers", JSON.stringify(tickers));
        $(`#${tickerToRemove}`).remove();
    });

    startUpdateCycle();
});

function addTickerToGrid(ticker) {
    $("#tickers-grid").append(
        `<div id="${ticker}" class="stock-box">
            <h2>${ticker}</h2>
            <p id="${ticker}-price"></p>
            <p id="${ticker}-pct"></p>
            <button class="remove-btn" data-ticker="${ticker}">Remove</button>
        </div>`
    );
}

function updatePrices() {
    tickers.forEach(function (ticker) {
        $.ajax({
            url: "/get_stock_data",
            type: "POST",
            data: JSON.stringify({ ticker: ticker }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var changePercent =
                    ((data.currentPrice - data.openPrice) / data.openPrice) *
                    100;
                var colorClass;
                if (changePercent <= -2) {
                    // Light Red = Price went down more than 2%
                    colorClass = "light-red";
                } else if (changePercent < 0) {
                    // Dark Red = Price went down more than 0% but less than 1.99%
                    colorClass = "dark-red";
                } else if (changePercent == 0) {
                    // Gray = No changes for the price
                    colorClass = "gray";
                } else if (changePercent <= 2) {
                    // Dark Green = Price went up more than 0% but less than 1.99%
                    colorClass = "dark-green";
                } else {
                    // Light Green = Price went up more than 2%
                    colorClass = "light-green";
                }

                $(`#${ticker}-price`).text(`$${data.currentPrice.toFixed(2)}`);
                $(`#${ticker}-pct`).text(`${changePercent.toFixed(2)}%`);
                $(`#${ticker}-price`)
                    .removeClass(
                        "dark-red light-red gray dark-green light-green"
                    )
                    .addClass(colorClass);
                $(`#${ticker}-pct`)
                    .removeClass(
                        "dark-red light-red gray dark-green light-green"
                    )
                    .addClass(colorClass);

                var flashClass;
                if (lastPrices[ticker] > data.currentPrice) {
                    flashClass = "red-flash";
                } else if (lastPrices[ticker] < data.currentPrice) {
                    flashClass = "green-flash";
                } else {
                    flashClass = "gray-flash";
                }
                lastPrices[ticker] = data.currentPrice;

                $(`#${ticker}`).addClass(flashClass);
                setTimeout(function () {
                    $(`#${ticker}`).removeClass(flashClass);
                }, 1000);
            },
        });
    });
}
