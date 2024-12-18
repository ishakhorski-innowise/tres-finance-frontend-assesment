const formatMoney = (amount: number, maximumFractionDigits: number = 0): string => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(amount)
}

export default formatMoney
