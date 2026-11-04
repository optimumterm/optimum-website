type Props = {
  title: string;
  text: string;
};

export function PrincipleCard({ title, text }: Props) {
  return (
    <li className="rounded-2xl border border-line bg-surface p-5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgb(154_107_255/0.6),0_18px_40px_-22px_rgb(154_107_255/0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-[22px]">
      <h3 className="m-0 font-mono text-base font-semibold">{title}</h3>
      <p className="mt-1.5 mb-0 text-sm leading-normal text-fg-3 md:mt-2">{text}</p>
    </li>
  );
}
