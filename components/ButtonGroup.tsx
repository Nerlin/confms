export interface ButtonGroupProps {
  direction: "row" | "col" | "row-reverse" | "col-reverse";
  children?: React.ReactNode;
}

export default function ButtonGroup({ direction = "row", children }: ButtonGroupProps) {
  return (
    <div className={`flex flex-${direction} space-1`}>
      {children}
    </div>
  )
}