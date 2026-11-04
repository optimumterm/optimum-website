import { OMark } from "@/components/OMark";

export function HeroMark() {
  return (
    <div className="relative animate-float select-none motion-reduce:animate-none" aria-hidden="true">
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-violet/55 blur-[70px]" />
      <div className="relative drop-shadow-[0_30px_50px_rgb(5_3_20/0.7)]">
        <OMark decorative className="block size-28 md:size-[220px] lg:size-[280px]" />
      </div>
    </div>
  );
}
