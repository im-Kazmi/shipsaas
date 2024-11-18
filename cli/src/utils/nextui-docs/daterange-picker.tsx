export const name = "DateRangePicker";

export const importDocs = `
  import {DateRangePicker} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " DatePicker basic usage",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description:
      "Date range Picker combines two DateInputs and a RangeCalendar popover to allow users to enter or select a date and time range. This is a basic example usage of the DatePicker.",
    code: `
    <DateRangePicker
        label="Stay duration"
        className="max-w-xs"
      />
    `,
  },
  {
    name: " Date Range Picker Disabled",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description: "This is an example of Disabled Date Range Picker",
    code: `
    <DateRangePicker
      label="Stay duration"
      isDisabled
      defaultValue={{
      start: parseDate("2024-04-01"),
      end: parseDate("2024-04-08"),
      }}
      className="max-w-xs"
    />
    `,
  },
  {
    name: " Date Range Picker Readonly",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description:
      "This is an example of Readonly Date Range Picker. one can change its value.",
    code: `
    <DateRangePicker
         label="Stay duration"
         isReadOnly
         defaultValue={{
           start: parseDate("2024-04-01"),
           end: parseDate("2024-04-08"),
         }}
         className="max-w-xs"
       />
    `,
  },
  {
    name: " Date Range Picker  Required",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    import {parseDate} from "@internationalized/date";
    `,
    description:
      "This is an example of Required Date Range Picker . often used in forms where date is required field.",
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
    <DateRangePicker
         label="Stay duration"
         isRequired
         defaultValue={{
           start: parseDate("2024-04-01"),
           end: parseDate("2024-04-08"),
         }}
         className="max-w-xs"
       />
        </div>
    `,
  },
  {
    name: " DateRangePicker with different Variants.",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent Variants of the DateRangePicker component.",
    code: `
    export default function App() {
      const variants = ["flat", "bordered", "underlined", "faded"];

      return (
        <div className="w-full flex flex-col gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <DateRangePicker
                variant={variant}
                label="Stay duration"
                className="max-w-xs"
              />
            </div>
          ))}
        </div>
      );
    }
    `,
  },
  {
    name: " DateRangePicker with Error Message",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    import {parseDate} from "@internationalized/date";
    `,
    description: `You can combine the isInvalid and errorMessage properties to show an invalid input.You can also pass an error message as a function. This allows for dynamic error message handling based on the ValidationResult.`,
    code: `
    <DateRangePicker
          isInvalid
          label="Stay duration"
          variant="bordered"
          errorMessage="Please enter your stay duration"
          defaultValue={{
            start: parseDate("2024-04-01"),
            end: parseDate("2024-04-08"),
          }}
          className="max-w-xs"
        />


        <DateRangePicker
              isInvalid
              label="Stay duration"
              variant="bordered"
              errorMessage={(value) => {
                if (value.isInvalid) {
                  return "Please enter your stay duration";
                }
              }}
              defaultValue={{
                start: parseDate("2024-04-01"),
                end: parseDate("2024-04-08"),
              }}
              className="max-w-xs"
            />
    `,
  },
  {
    name: " DatePicker visible months",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description: `By default, the calendar popover displays a single month. The visibleMonths prop allows displaying up to 3 months at a time, if screen space permits.
        `,
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
         <DateRangePicker
           label="Stay duration"
           visibleMonths={2}
         />
       </div>
    `,
  },
  {
    name: " DateRangePicker page behavior",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description: `By default, when pressing the next or previous buttons, pagination will advance by the visibleMonths value. This behavior can be changed to page by single months instead, by setting pageBehavior to single.
`,
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DateRangePicker
          label="Birth date"
          visibleMonths={2}
          pageBehavior="single"
        />
      </div>
    `,
  },
  {
    name: " DateRangePicker labels placement",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    `,
    description: `You can change the position of the label by setting the labelPlacement property to inside, outside or outside-left.
.Note: If the label is not passed, the labelPlacement property will be outside by default.

`,
    code: `
    export default function App() {
      const placements = [
        "inside",
        "outside",
        "outside-left",
      ];

      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {placements.map((placement) => (
              <DateRangePicker
                key={placement}
                label="Stay duration"
                labelPlacement={placement}
                description={placement}
              />
            ))}
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: " DateRangePicker controlled with state.",
    import: `
    import React from "react";
    import {DateRangePicker} from "@nextui-org/react";
    import {parseDate, getLocalTimeZone} from "@internationalized/date";
    import {useDateFormatter} from "@react-aria/i18n";
      `,
    description: `with DateRangePicker You can use the value and onChange properties to control the input value.`,
    code: `
    export default function App() {
      const [value, setValue] = React.useState({
        start: parseDate("2024-04-01"),
        end: parseDate("2024-04-08"),
      });

      let formatter = useDateFormatter({dateStyle: "long"});

      return (
        <div className="flex flex-row gap-2">
          <div className="w-full flex flex-col gap-y-2">
            <DateRangePicker
              label="Date range (controlled)"
              value={value}
              onChange={setValue}
            />
            <p className="text-default-500 text-sm">
              Selected date:{" "}
              {value
                ? formatter.formatRange(
                    value.start.toDate(getLocalTimeZone()),
                    value.end.toDate(getLocalTimeZone()),
                  )
                : "--"}
            </p>
          </div>
          <DateRangePicker
            defaultValue={{
              start: parseDate("2024-04-01"),
              end: parseDate("2024-04-08"),
            }}
            label="Date range (uncontrolled)"
          />
        </div>
      );
    }
    `,
  },
  {
    name: " DateRangePicker Timezones.",
    import: `
    import {DateRangePicker} from "@nextui-org/react";
    import {parseZonedDateTime, parseAbsoluteToLocal} from "@internationalized/date";

      `,
    description: `DateRangePicker is time zone aware when a ZonedDateTime object is provided as the value. In this case, the time zone abbreviation is displayed, and time zone concerns such as daylight saving time are taken into account when the value is manipulated.

    @internationalized/date includes functions for parsing strings in multiple formats into ZonedDateTime objects.`,
    code: `
    export default function App() {
      return (
        <div className="w-full max-w-xl flex flex-col items-start gap-4">
          <DateRangePicker
            defaultValue={{
              start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
              end: parseZonedDateTime("2024-04-14T11:15[America/Los_Angeles]"),
            }}
            label="Stay duration"
            labelPlacement="outside"
          />
          <DateRangePicker
            defaultValue={{
              start: parseAbsoluteToLocal("2024-04-01T07:45:00Z"),
              end: parseAbsoluteToLocal("2024-04-14T19:15:00Z"),
            }}
            label="Stay duration"
            labelPlacement="outside"
          />
        </div>
      );
    }
    `,
  },
  {
    name: " DateRangePicker Granularity.",
    import: `
    import React from "react";
    import {DateRangePicker} from "@nextui-org/react";
    import {parseAbsoluteToLocal} from "@internationalized/date";

      `,
    description: `the DateRangePicker granularity prop allows you to control the smallest unit that is displayed by DatePicker By default, the value is displayed with "day" granularity (year, month, and day), and CalendarDateTime and ZonedDateTime values are displayed with "minute" granularity.

    @internationalized/date includes functions for parsing strings in multiple formats into ZonedDateTime objects.`,
    code: `
    export default function App() {
      let [date, setDate] = React.useState({
        start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
        end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
      });

      return (
        <div className="w-full max-w-xl flex flex-col items-start gap-4">
          <DateRangePicker
            fullWidth
            granularity="second"
            label="Date and time range"
            value={date}
            onChange={setDate}
          />
          <DateRangePicker
            fullWidth
            granularity="day"
            label="Date range"
            value={date}
            onChange={setDate}
          />
        </div>
      );
    }

    `,
  },
];

export const usageDocs = `


`;
