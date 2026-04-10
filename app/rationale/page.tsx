const Block = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-lg space-y-2">
      <h3 className="text-muted-foreground tracking-wide uppercase">
        {heading}
      </h3>
      {children}
    </div>
  );
};

export default function RationalePage() {
  return (
    <div className="space-y-6 py-12">
      <Block heading="Graphics for golf">
        <p>
          Graphics are visual images or designs used to inform, illustrate, or
          entertain. In contemporary usage, it includes a pictorial
          representation of data.
        </p>
      </Block>
      <Block heading="Approach shots">
        <p>
          When to log an approach shot: use for full shots to a green, i.e. tee
          shot on par 3 (automated), second shot on par 4, third shot on par
          5... or if you ended up hitting a full shot in to a green after
          chipping out sideways... idk you figure it out!
        </p>
      </Block>
      <Block heading="Software Engineering: Golf Data for Amateurs">
        <p>
          Is surprisingly complicated! When you can play different tee boxes
          with different course ratings at the same course, the logic behind
          calculating almost everything becomes highly conditional.
        </p>
      </Block>
    </div>
  );
}
