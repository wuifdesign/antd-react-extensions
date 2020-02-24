export type MenuElement = {
  name: string,
  key?: string,
  url?: string,
  exact?: boolean,
  activeBy?: string[],
  icon?: JSX.Element,
  elements?: MenuElement[]
}
