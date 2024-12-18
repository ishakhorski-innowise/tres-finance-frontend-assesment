const copyToClipboard = (text: string): void => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    alert('Your browser does not support copying to clipboard')
  }
}

export default copyToClipboard
