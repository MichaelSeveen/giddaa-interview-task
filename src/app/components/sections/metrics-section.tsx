import { METRICS_DATA } from "../../data";

export function MetricsSection() {
  return (
    <section>
      <div className="container mx-auto w-full h-37.5 flex">
        {METRICS_DATA.map((metric) => (
          <div
            key={metric.label}
            className={`grid place-content-center ${metric.width} ${metric.bgColor} text-white text-center`}
          >
            <p className="text-[1.5rem] lg:text-[3.75rem] leading-10 font-semibold">
              {metric.value}
            </p>
            <p className="text-[1rem] leading-10">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
