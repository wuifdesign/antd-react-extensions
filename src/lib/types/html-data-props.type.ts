type DataAttributeKey = `data-${string}`

export type HtmlDataProps = {
  [key: DataAttributeKey]: string | number
}
