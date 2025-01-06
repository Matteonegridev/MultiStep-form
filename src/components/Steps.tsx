function Steps({ data }: { data: string[] }) {
  return (
    <div className="flex justify-center gap-10">
      <p>{data}</p>
    </div>
  );
}

export default Steps;
