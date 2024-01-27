export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="min-h-screen mx-auto p-4">
      <>
        <div className="flex w-full gap-5 justify-center items-center mx-auto p-4">
          <input
            placeholder="Search"
            className="input input-bordered w-full max-w-xs "
          />
          <select
            defaultValue=""
            className="select select-bordered w-full max-w-xs "
          >
            <option value="" disabled>
              Filter by Element
            </option>
          </select>

          <button className="btn btn-primary w-32" disabled>
            Clear
          </button>
        </div>
        <div className="flex flex-wrap min-h-screen flex-row justify-center items-center mx-auto p-4 gap-1">
          {Array.from({ length: 21 }).map((e, i) => (
            <div
              key={i}
              className="w-full lg:w-1/4 xl:w-1/5 sm:w-1/4 xs:w-1/3
                        h-96
                        flex flex-col gap-2 items-center justify-between border-2 border-gray-200 rounded-lg 
                        m-4 p-4 skeleton"
            />
          ))}
        </div>
      </>
    </main>
  );
}
