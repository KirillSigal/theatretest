function amountFor(aPerfomance){
    let result = 0;
    switch (playFor(aPerfomance).type) {
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
            throw new Error(`unknown type: ${playFor(aPerfomance).type}`);
            }
    return result;
    }
function playFor(aPerfomance){
    return plays[aPerfomance.playID];
}
function volumeCreditsFor(aPerfomance) {
    let result = 0;
    result += Math.max(aPerfomance.audience - 30, 0);
    if ("comedy" === playFor(aPerfomance).type)
        result += Math.floor(aPerfomance.audience / 5);
    return result;
    }
function usd(aNumber) {
    return new Inti.NumberFormat("ru-Ru",
        { style: "currency", currency: "RUB",
        minimumFractionDigits: 2 }).format(aNumber);
        }
        
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    result += ` ${playFor(perf).name}:`;
    result += `${usd(amountFor(perf) / 100)}`;
    result += ` (${perf.audience} мест)\n`;
    totalAmount += amountFor(perf);
    }
    result += `Итого с вас ${usd(totalAmount / 100)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
    }
    