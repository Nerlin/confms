import React from "react";

export type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export default function Form(props: FormProps) {
  return (
    <form
      {...props}
      className={
        "container mx-auto shadow px-12 py-8 rounded-md max-w-md bg-white"
      }
    />
  );
}
