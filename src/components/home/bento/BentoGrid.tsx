import Collaboration from "./Collaboration";
import TechImpact from "./TechImpact";
import TimeZone from "./TimeZone";
import Contact from "./Contact";
import InsideScoop from "./InsideScoop";

export default function BentoGrid() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[360px]">
          {/* Top Row */}
          <div className="md:col-span-2">
            <Collaboration />
          </div>
          <div className="md:col-span-1 md:row-span-2">
            <TimeZone />
          </div>

          {/* Middle Row */}
          <div className="md:col-span-2 md:row-span-2">
            <TechImpact />
          </div>
          <div className="md:col-span-1">
            <Contact />
          </div>

          {/* Bottom Row */}
          <div className="md:col-span-1">
            <InsideScoop />
          </div>
        </div>
      </div>
    </section>
  );
}
