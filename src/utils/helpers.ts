export const formDownloadBlob = (blob: Blob, filename: string) => {
  const windowUrlObj = window.URL || window.webkitURL
  const dnEle = document.createElement('a')
  const href = windowUrlObj.createObjectURL(blob)
  dnEle.href = href
  dnEle.download = filename
  document.body.appendChild(dnEle)
  dnEle.click()
  document.body.removeChild(dnEle)
  windowUrlObj.revokeObjectURL(href)
}
