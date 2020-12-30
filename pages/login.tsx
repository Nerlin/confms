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

export default function LogIn({ csrfToken }) {
  const router = useRouter();
  const [email, changeEmail] = useInput("");
  const [password, changePassword] = useInput("");

  const { submit, error } = useSubmit(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/session/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "same-origin"
      });

      if (response.status === 200) {
        await router.push("/");
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    }
  );

  return (
    <FormLayout>
      <Form method={"post"} action={`${process.env.NEXT_PUBLIC_API_HOST}/api/session/login`} onSubmit={submit}>
        <h1 className={"font-serif text-3xl mb-8"}>Конф.ру - Войти</h1>

        {error && <div>{error}</div>}

        <Input type={"hidden"} name={"csrfToken"} defaultValue={csrfToken} />

        <Label>
          Email
          <Input
            type={"email"}
            name={"email"}
            placeholder={"test@email.com"}
            value={email}
            onChange={changeEmail}
          />
        </Label>

        <Label>
          Пароль
          <Input
            type={"password"}
            name={"password"}
            value={password}
            onChange={changePassword}
          />
        </Label>

        <ButtonGroup direction={"col"}>
          <Button kind={"attention"}>Войти</Button>

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
