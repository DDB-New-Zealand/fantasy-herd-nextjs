import {
  BLACK,
  DEEP_GREEN,
  DEW_GREEN,
  GREY,
  MEADOW_FRESH_FOREST_GREEN,
  MEADOW_FRESH_PRIMARY_GREEN,
  MOSS_GREEN,
  WHITE,
} from "./colors";

const Page = () => {
  return (
    <div className="grid grid-cols-12 h-svh">
      <div className="col-span-4 p-4">
        <h1>Colors</h1>
      </div>
      <div className="col-span-8 grid grid-cols-6 grid-rows-3">
        <div className="flex flex-col items-start justify-end col-span-1 bg-grey p-2">
          <div>GREY</div>
          <div>{GREY}</div>
        </div>
        <div className="flex flex-col items-start justify-end col-span-1 bg-white p-2">
          <div>WHITE</div>
          <div>{WHITE}</div>
        </div>
        <div className="flex flex-col items-start justify-end row-start-2 col-span-2 bg-black text-white p-2">
          <div>BLACK</div>
          <div>{BLACK}</div>
        </div>
        <div className="flex flex-col items-start justify-end row-start-1 row-end-3 col-start-3 col-end-5 bg-dew-green text-black p-2">
          <div>DEW GREEN</div>
          <div>{DEW_GREEN}</div>
        </div>
        <div className="flex flex-col items-start justify-end row-start-1 row-end-3 col-start-5 col-end-7 bg-meadow-fresh-primary text-black p-2">
          <div>
            MEADOW FRESH
            <br />
            PRIMARY GREEN
          </div>
          <div>{MEADOW_FRESH_PRIMARY_GREEN}</div>
        </div>
        <div className="flex flex-col items-start justify-end row-start-3 row-end-4 col-start-1 col-end-3 bg-deep-green text-white p-2">
          <div>DEEP GREEN</div>
          <div>{DEEP_GREEN}</div>
        </div>
        <div className="flex flex-col items-start justify-end row-start-3 row-end-4 col-start-3 col-end-5 bg-moss-green text-white p-2">
          <div>MOSS GREEN</div>
          <div>{MOSS_GREEN}</div>
        </div>
        <div className="flex flex-col items-start justify-end row-start-3 row-end-4 col-start-5 col-end-7 bg-meadow-fresh-forest-green text-white p-2">
          <div>
            MEADOW FRESH
            <br />
            FOREST GREEN
          </div>
          <div>{MEADOW_FRESH_FOREST_GREEN}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
