export interface DateProps {
  dateString: string;
}

export default function Date({ dateString }: DateProps) {
  return (
    <time className={"block  my-2 text-gray-500"} dateTime={dateString}>
      {dateString}
    </time>
  );
}