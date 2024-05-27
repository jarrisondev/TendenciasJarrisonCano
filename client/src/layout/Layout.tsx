import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export const Layout: FC<Props> = ({ children }) => {
  return <div className="container mx-auto">{children}</div>
}
