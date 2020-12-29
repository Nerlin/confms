export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: InputProps) {
  return (
    <input {...props} className={"block w-full px-2 py-1 border border-gray-300 rounded text-base focus:ring-indigo-500 focus:border-indigo-500"} />
  )
}