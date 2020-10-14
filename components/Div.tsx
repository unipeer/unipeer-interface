type Props = {
  children: React.ReactNode;
  label: string
}

export default function Div({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
