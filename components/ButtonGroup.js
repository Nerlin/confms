export default function ButtonGroup({ children }) {
  return (
    <div className={"flex flex-row space-x-1"}>
      {children}
    </div>
  )
}