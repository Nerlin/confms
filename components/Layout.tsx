import Header from "./Header"
import Footer from "./Footer"

export interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={"container mx-auto h-screen flex flex-col"}>
      <Header />
      <div className={"flex-auto px-3"}>{children}</div>
      <Footer />
    </main>
  );
}