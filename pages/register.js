import Button from "../components/Button"
import ButtonGroup from "../components/ButtonGroup"
import FormLayout from "../components/FormLayout"
import Input from "../components/Input"
import Label from "../components/Label"
import Link from "next/link"

export default function Register() {
  return (
    <FormLayout>
      <form className={"container mx-auto shadow p-8 rounded-md max-w-xl bg-white"}>
        <h1 className={"font-serif text-3xl"}>Конф.ру - Зарегистрироваться</h1>

        <Label>
          Email
          <Input type={"email"} name={"email"} placeholder={"test@email.com"} />
        </Label>

        <Label>
          Пароль
          <Input type={"password"} name={"password"} />
        </Label>

        <Label>
          Имя
          <Input name={"firstName"} />
        </Label>

        <Label>
          Фамилия
          <Input name={"lastName"} />
        </Label>

        <ButtonGroup>
          <Button kind={"attention"}>Зарегистрироваться</Button>
          
          <Link href={"/"}>
            <a href={"/"}>
              <Button kind={"default"}>Назад</Button>
            </a>
          </Link>
        </ButtonGroup>
      </form>
    </FormLayout>
  )
}