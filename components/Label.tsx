export type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export default function Label(props: LabelProps) {
  return (
    <label
      {...props}
      className={"block my-4 text-sm font-medium text-gray-700"}
    />
  );
}