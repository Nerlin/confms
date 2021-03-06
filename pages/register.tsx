import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";
import Form from "../components/Form";
import FormLayout from "../components/FormLayout";
import Input from "../components/Input";
import Label from "../components/Label";
import useInput from "../hooks/useInput";
import useSubmit from "../hooks/useSubmit";

export default function Register() {
  const router = useRouter();
  const [email, changeEmail] = useInput("");
  const [password, changePassword] = useInput("");
  const [firstName, changeFirstName] = useInput("");
  const [lastName, changeLastName] = useInput("");

  const { submit, error } = useSubmit(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/users/register`, {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName }),
        credentials: "same-origin"
      });

      if (response.status === 201) {
        await router.push("/");
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    }
  );

  return (
    <FormLayout>
      <Form
        method={"post"}
        action={`${process.env.NEXT_PUBLIC_API_HOST}/api/users/register`}
        onSubmit={submit}
      >
        <h1 className={"font-serif text-3xl mb-8"}>
          Конф.ру - Зарегистрироваться
        </h1>

        {error && <div>{error}</div>}

        <Label>
          Email
          <Input type={"email"} name={"email"} placeholder={"test@email.com"} value={email} onChange={changeEmail} />
        </Label>

        <Label>
          Пароль
          <Input type={"password"} name={"password"} value={password} onChange={changePassword} />
        </Label>

        <Label>
          Имя
          <Input name={"firstName"} value={firstName} onChange={changeFirstName} />
        </Label>

        <Label>
          Фамилия
          <Input name={"lastName"} value={lastName} onChange={changeLastName} />
        </Label>

        <ButtonGroup direction={"col"}>
          <Button kind={"attention"}>Зарегистрироваться</Button>

          <Link href={"/"}>
            <a
              className={"block text-sm text-center mt-3 mx-auto text-blue-600"}
              href={"/"}
            >
              Назад
            </a>
          </Link>
        </ButtonGroup>
      </Form>
    </FormLayout>
  );
}
