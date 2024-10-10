import Footers from "./components/Footers";
import { ProductRow } from "./components/ProductRows";

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-40">
        <div className="max-w-4xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center ">
          <h1>Find the Best Developer tools </h1>
          <h3 className="animate-pulse text-primary ">
            UI, Icons, Fonts and more
          </h3>
          <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base sm:text-xs ">
            Welcome to <b> CODECOR</b>, your all-in-one platform for developers.
            Access essential tools like UI kits, icons, fonts, and more, in one
            place. —everything you need, all in one stop!
          </p>

          <section className="madachod max-w-7xl mx-auto px-4 md:px-8 ">
            <ProductRow category="newest" />
            <ProductRow category="template" />
            <ProductRow category="icons" />
            <ProductRow category="ui" />
            <ProductRow category="fonts" />
          </section>
        </div>
      </section>
      <section className="mt-[5rem]">
        <Footers />
      </section>
    </>
  );
}
