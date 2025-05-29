const inputs = document.getElementById("search");
let searchBox = document.getElementById("search");
// console.log(search);
let result;
const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
async function fetchData() {
  try {
    let res = await fetch(URL);
    result = await res.json();

    createElement(result);
  } catch (error) {
    tbody.innerHTML = `<div class="err_msg"  >Something went wrong</div`;
  }
}
// Script js;
fetchData();

function sortByMkt() {
  result = result.sort((a, b) => b.current_price - a.current_price);
  createElement(result);
}

searchBox.addEventListener("input", () => {
  let values = document.getElementById("search").value;
  console.log(values);
  if (values === "") {
    fetchData();
  }
  let res = result.filter((val) =>
    val.name.toLowerCase().includes(values.toLowerCase())
  );

  createElement(res);
});

function sortByPercentage() {
  result = result.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  createElement(result);
}

function createElement(data) {
  if (data.length > 0) {
    tbody.innerHTML = data?.map((val, i) => {
      const percentageClass =
        val.price_change_percentage_24h >= 0
          ? "percentage_green"
          : "percentage_red";
      return `<tr>
              <td>
                  <div style="display:flex; alignItems:center" >
                      <img src=${
                        val.image
                      } width="20" height="20"  style="marginRight:2px; padding:2px; "/>
                      <span>${val.name}</span>
                  </div>
              </td>
              <td>
                  ${val.symbol.toUpperCase()}
              </td>
              <td>
                  ${val.total_supply}
              </td>
              <td>
                  ${val.current_price}
              </td>
              <td class="${percentageClass}">
                  ${val.price_change_percentage_24h}%
              </td>
  
              <td>
                 Mct Cap ${val.market_cap}
              </td>
          </tr>`;
    });
  } else {
    tbody.innerHTML = `<div class="nodata_msg" >No Data Found</div`;
  }
}

// Script js