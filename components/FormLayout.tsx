import Footer from "./Footer";

export interface FormLayoutProps {
  children?: React.ReactNode
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <main className={"mx-auto py-8 bg-gray-100 h-screen"}>
      {children}
      <Footer />
    </main>
  )
}