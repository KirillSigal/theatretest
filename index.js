function amountFor(aPlay, aPerfomance) {
  let result = 0;
  switch (aPlay.type) {
    case "tragedy":
      result = 40000;
      if (aPerfomance.audience > 30) {
        result += 1000 * (aPerfomance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerfomance.audience > 20) {
        result += 10000 + 500 * (aPerfomance.audience - 20);
      }
      result += 300 * aPerfomance.audience;
      break;
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
  return result;
}

function volumeCreditsFor(aPlay, aPerfomance) {
  let result = 0;
  result += Math.max(aPerfomance.audience - 30, 0);
  if ("comedy" === aPlay.type)
    result += Math.floor(aPerfomance.audience / 5);
  return result;
}

function usd(aNumber) {
  return new Inti.NumberFormat("ru-Ru", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
  }).format(aNumber);
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;

  let result = `Счет для ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    let play = plays[perf.playID];
    let thisAmount = amountFor(play, perf);
    volumeCredits += volumeCreditsFor(play, perf);
    result += `  ${play.name}: ${usd(thisAmount / 100)}`;
    result += `  (${perf.audience} мест)\n`;
    totalAmount += thisAmount;
  }

  result += `Итого с вас ${usd(totalAmount / 100)}\n`;
  result += `Вы заработали ${volumeCredits} бонусов\n`;
  return result;
}