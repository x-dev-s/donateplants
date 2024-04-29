
export default function Loading({ state }) {
  return (
    <div className="loading">
        <img className={state + " mix-blend-darken m-auto h-[80%]"} src="/images/loading2.gif" alt="loading" />
    </div>
  );
}