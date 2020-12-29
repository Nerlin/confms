export default function ButtonGroup({ direction = "row", children }) {
  return (
    <div className={`flex flex-${direction} space-1`}>
      {children}
    </div>
  )
}