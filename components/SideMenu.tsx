export interface SideMenuProps {
  header?: string;
  children?: React.ReactNode;
}

export default function SideMenu({ header = "", children }: SideMenuProps) {
  return (
    <aside className={"bg-white sm:ml-0 md:ml-auto mt-4 min-w-max"}>
      <header>
        <ul className={"flex sm:flex-row sm:flex-wrap md:flex-col sm:space-x-1 md:space-x-0 md:space-y-1 sm:items-center md:items-stretch"}>
          {header && <li className={"font-semibold font-serif uppercase px-4 py-2 text-center"}>{header}</li>}
          {children}
        </ul>
      </header>
    </aside>
  )
}