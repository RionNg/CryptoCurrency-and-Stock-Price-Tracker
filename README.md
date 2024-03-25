# CryptoCurrency & Stock Price Tracker

## OVERVIEW
This project is a simple web application designed to track cryptocurrency and stock prices in real-time. Users can add ticker symbols for various assets, and the application will display the current price along with the percentage change since the market opened. The application updates prices automatically at regular intervals.

## FEATURES
- **Add Tickers:** Users can add ticker symbols for cryptocurrencies or stocks to track their prices.
- **Real-time Updates:** Prices are updated automatically at regular intervals to provide real-time information.
- **Color-coded Display:** Prices are color-coded based on the percentage change, making it easy for users to identify trends at a glance.
  - Light Red = Price went down more than 2%
  - Dark Red = Price went down more than 0% but less than 1.99%
  - Gray = No changes for the price
  - Dark Green = Price went up more than 0% but less than 1.99%
  - Light Green = Price went up more than 2%

## FILE STRUCTURE
- **index.html:** HTML interface for the web application interface.
- **style.css:** CSS stylesheet for styling the HTML elements.
- **script.js:** JavaScript file containing client-side logic for interacting with the server and updating prices.
- **app.py:** Python file containing the Flask application and server-side logic.
- **templates/:** Directory containing HTML templates used by Flask for rendering.

## USAGE
1. Enter a ticker symbol in the input field and click "Add" to track its price.
2. Prices will be displayed in the grid along with the percentage change since the market opened.
3. Prices are automatically updated every 15 seconds. The timer at the top of the page indicates when the next update will occur.
4. To remove a ticker, simply click the "Remove" button.

## LIBRARIES
- **Flask**
- **yfinance**
