import { AlertBanner } from "./banner";
import { Button } from "./ui/button";
import { SheetHeader } from "./ui/cow-detail-sheet";
import { Field, FieldHelpText, FieldLabel } from "./ui/field";
import Icon from "./ui/icon";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetFooter } from "./ui/sheet";
import { AnnotationLabel, PageTitle } from "./ui/typography";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const EnterHerdDrawer: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <SheetContent>
        <SheetHeader>
          <PageTitle>Enter Herd</PageTitle>
        </SheetHeader>
        <div className="px-6">
          <Field>
            <FieldLabel>Pick your herd name</FieldLabel>
            <div className="relative">
              <Input placeholder="Search by name, num, price or rating" />
              <FieldHelpText>
                THis name can be changed later in settings.
              </FieldHelpText>
            </div>
            <AnnotationLabel>
              *Fantasy Herd is a family sport, no foul language.
            </AnnotationLabel>
          </Field>
        </div>
        <SheetFooter>
          <AlertBanner>
            You will be able to edit your picks an unlimited amount during the
            pre-season. Once Gameweek 1 starts, you’ll be given 1 free transfer
            per day.
          </AlertBanner>
          <Button
            variant={"secondary"}
            onClick={() => {
              onSubmit();
            }}
          >
            Enter Herd
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
