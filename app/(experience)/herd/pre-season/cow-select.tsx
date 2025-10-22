import { CowRow } from "@/components/cow/row";
import { Field, FieldLabel } from "@/components/ui/field";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { PageTitle, TableListHeader } from "@/components/ui/typography";
import { COW_DATA } from "@/constants/cows";
import { cn } from "@/lib/utils";
import { useCowDetailStore } from "@/stores/cow-detail-store";
import useUserStore, { Herd } from "@/stores/user-store";

export default function CowSelect() {
  const { herd, addCowToHerd, removeCowFromHerd } = useUserStore();
  const { setCowData } = useCowDetailStore();

  const benchedCows = Object.keys(herd)
    .filter((key) => {
      if (key.startsWith("benched-")) {
        return herd[key as keyof typeof herd] !== undefined;
      }

      return false;
    })
    .map((key) => {
      return herd[key as keyof typeof herd];
    })
    .filter((key) => key !== undefined);
  const starterCows = Object.keys(herd)
    .filter((key) => {
      if (key.startsWith("starter-")) {
        return herd[key as keyof typeof herd] !== undefined;
      }

      return false;
    })
    .map((key) => {
      return herd[key as keyof typeof herd];
    })
    .filter((key) => key !== undefined);

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-6 pr-[25px]">
      <PageTitle>Cow Select</PageTitle>
      <Field className="mt-6">
        <FieldLabel>Find a cow</FieldLabel>
        <div className="relative">
          <Input placeholder="Search by name, num, price or rating" />
          <Icon
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
            type={"search"}
          />
        </div>
      </Field>
      <div className="mt-6">
        <table
          className={cn(
            "w-full",
            "[&_th:nth-child(3n-2)]:border-r [&_th:nth-child(3n-1)]:border-r [&_td:nth-child(3n-2)]:border-r [&_td:nth-child(3n-1)]:border-r",
            "[&_tr]:border-b",
          )}
        >
          <thead>
            <tr>
              <TableListHeader className="h-[26px] w-full" asChild>
                <th>Name</th>
              </TableListHeader>
              <TableListHeader className="h-[26px]" asChild>
                <th>
                  <div className="pl-3">Price</div>
                </th>
              </TableListHeader>
              <TableListHeader className="h-[26px]" asChild>
                <th>
                  <div className="pl-3">Rating</div>
                </th>
              </TableListHeader>
            </tr>
          </thead>
          <tbody>
            {COW_DATA.map((cow) => {
              const isAdded =
                benchedCows.some((c) => c.id === cow.id) ||
                starterCows.some((c) => c.id === cow.id);

              return (
                <CowRow
                  key={cow.id}
                  name={cow.name}
                  price={cow.price}
                  rating={cow.rating}
                  onClickDetail={() => {
                    setCowData(cow);
                  }}
                  onAdd={() => {
                    if (isAdded) {
                      let herdKey: keyof Herd = "starter-1";

                      for (const key in herd) {
                        // herdKey =
                        if (herd[key as keyof Herd]?.id === cow.id) {
                          herdKey = key as keyof Herd;
                        }
                        break;
                      }

                      removeCowFromHerd(herdKey);
                    } else {
                      for (const key of Object.keys(herd)) {
                        if (!herd[key as keyof Herd]) {
                          addCowToHerd(cow, key as keyof Herd);
                          break;
                        }
                      }
                    }
                  }}
                  added={isAdded}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
