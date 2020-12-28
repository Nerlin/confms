import Header from "../components/Header"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <main className={"container mx-auto h-screen flex flex-col"}>
      <Header />
      <div className={"flex-auto"}>{children}</div>
      <Footer />
    </main>
  )
}