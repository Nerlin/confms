import { type } from "os"

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  kind: ButtonKind;
}

export type ButtonKind = "default" | "attention" | "danger";

export default function Button({ kind = "default", ...props }: ButtonProps) {
  const background = backgrounds[kind]
  const color = colors[kind]
  const border = borders[kind]
  return <button {...props} className={`rounded-md border ${border} shadow-sm px-4 py-2 text-sm ${background} ${color}`} />
}

const backgrounds = {
  "default": "bg-white",
  "attention": "bg-green-600",
  "danger": "bg-red-600",
}

const colors = {
  "default": "text-gray-700",
  "attention": "text-gray-50",
  "danger": "text-gray-50"
}

const borders = {
  "default": "border-gray-300",
  "attention": "",
  "danger": "",
}