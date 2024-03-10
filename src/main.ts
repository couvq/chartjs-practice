import Chart from "chart.js/auto";

const getAmazonIncomeByYearAndQuarter = async (): Promise<any[]> => {
  try {
    const API_ENDPOINT =
      "https://real-time-finance-data.p.rapidapi.com/company-cash-flow?symbol=AMZN:NASDAQ&period=ANNUAL&language=en";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_HOST,
      },
    };
    const res = await fetch(API_ENDPOINT, options);
    const data = await res.json();
    return data?.data?.cash_flow?.reverse();
  } catch (e) {
    console.error(e);
    return [];
  }
};

const amznData = await getAmazonIncomeByYearAndQuarter();

new Chart(document.getElementById("chart"), {
  type: "bar",
  data: {
    labels: amznData.map((data) => data.year),
    datasets: [
      {
        label: "Amazon income by year",
        data: amznData.map((data) => data.net_income),
      },
    ],
  },
});
