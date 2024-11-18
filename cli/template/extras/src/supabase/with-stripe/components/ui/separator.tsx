export interface SeparatorProps extends React.HTMLProps<HTMLDivElement> {
  text?: string;
}

export function Separator({ text, ...props }: SeparatorProps) {
  return (
    <div className="relative" {...props}>
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-neutral-700"></div>
        <span className="mx-3 shrink text-sm leading-8 text-neutral-500">
          {text}
        </span>
        <div className="grow border-t border-neutral-700"></div>
      </div>
    </div>
  );
}
