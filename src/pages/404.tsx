import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import NotFound from "@/components/NotFound/NotFound";

const NotFoundPage = () => {
  return (
    <>
      <div className="sm:hidden">
        <Header></Header>
      </div>
      <Navbar />
      <HorizontalLine />
      <NotFound></NotFound>
    </>
  )
}

export default NotFoundPage;
