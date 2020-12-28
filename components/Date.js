export default function Date({ dateString }) {
  return (
    <time className={"block  my-2 text-gray-500"} dateTime={dateString}>
      {dateString}
    </time>
  );
}