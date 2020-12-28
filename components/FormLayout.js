import Footer from "./Footer";

export default function FormLayout({ children }) {
  return (
    <main className={"mx-auto py-8 bg-gray-100 h-screen"}>
      {children}
      <Footer />
    </main>
  )
}