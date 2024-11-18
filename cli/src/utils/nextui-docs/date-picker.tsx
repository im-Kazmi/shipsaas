export const name = "DatePicker";

export const importDocs = `
  import {DatePicker} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " DatePicker basic usage",
    import: `
        import {DatePicker} from "@nextui-org/react";    `,
    description: "This is a basic example usage of the DatePicker.",
    code: `
    <DatePicker label="Birth date" className="max-w-[284px]" />
    `,
  },
  {
    name: " DatePicker Disabled",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description: "This is an example of Disabled DatePicker",
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Birth date"
        className="max-w-[284px]"
        isDisabled
      />
        </div>
    `,
  },
  {
    name: " DatePicker Readonly",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description:
      "This is an example of Readonly DatePicker. one can change its value.",
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Birth date"
        className="max-w-[284px]"
        isReadOnly
      />
       </div>
    `,
  },
  {
    name: " DatePicker Required",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description:
      "This is an example of Required DatePicker. often used in forms where date is required field.",
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Birth date"
        className="max-w-[284px]"
        isRequired
      />
        </div>
    `,
  },
  {
    name: " DatePicker with different Variants.",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent Variants of the DatePicker component.",
    code: `
    export default function App() {
      const variants = ["flat", "bordered", "underlined", "faded"];

      return (
        <div className="w-full flex flex-col gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <DatePicker label={"Birth date"} variant={variant} />
            </div>
          ))}
        </div>
      );
    }
    `,
  },
  {
    name: " DatePicker with Error Message",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description: `You can combine the isInvalid and errorMessage properties to show an invalid input.
        `,
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Birth date"
        className="max-w-[284px]"
        isInvalid
        errorMessage="Please enter a valid date."
      />
        </div>
    `,
  },
  {
    name: " DatePicker with Description",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description: `You can add a description to the date-picker by passing the description property.
        `,
    code: `
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Birth date"
        className="max-w-[284px]"
        description={"Thiis is my birth date."}
      />
    </div>
    `,
  },
  {
    name: " DatePicker with Month and Year pickers",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description: `DatePicker with Month and Year pickers. it looks better in forms.`,
    code: `
    <div className="w-full max-w-xl flex flex-row gap-4">
         <DatePicker
           label="Birth Date"
           variant="bordered"
           showMonthAndYearPickers
         />
       </div>
    `,
  },
  {
    name: " DatePicker with Time fields",
    import: `
    import {DatePicker} from "@nextui-org/react";
    `,
    description: `DatePicker with DatePicker with Time fields.`,
    code: `
    <div className="w-full max-w-xl flex flex-row gap-4">
          <DatePicker
            label="Event Date"
            variant="bordered"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
        </div>
    `,
  },
  {
    name: " DatePicker controlled with state.",
    import: `
      import React from "react";
      import {DatePicker} from "@nextui-org/react";
      import {parseDate, getLocalTimeZone} from "@internationalized/date";
      import {useDateFormatter} from "@react-aria/i18n";
      `,
    description: `with DatePicker You can use the value and onChange properties to control the input value.`,
    code: `
      export default function App() {
      const [value, setValue] = React.useState(parseDate("2024-04-04"));

      let formatter = useDateFormatter({dateStyle: "full"});

      return (
        <div className="flex flex-row gap-2">
          <div className="w-full flex flex-col gap-y-2">
            <DatePicker className="max-w-[284px]" label="Date (controlled)" value={value} onChange={setValue} />
            <p className="text-default-500 text-sm">
              Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
            </p>
          </div>
          <DatePicker className="max-w-[284px]" defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" />
        </div>
      );
    }
    `,
  },
  {
    name: " DatePicker Timezones.",
    import: `
    import {DatePicker} from "@nextui-org/react";
    import {parseZonedDateTime, parseAbsoluteToLocal} from "@internationalized/date";
      `,
    description: `DatePicker is time zone aware when a ZonedDateTime object is provided as the value. In this case, the time zone abbreviation is displayed, and time zone concerns such as daylight saving time are taken into account when the value is manipulated.

    @internationalized/date includes functions for parsing strings in multiple formats into ZonedDateTime objects.`,
    code: `
    export default function App() {
      return (
         <div className="w-full max-w-xl flex flex-col items-start gap-4">
          <DatePicker
            label="Zoned Date Time"
            className="max-w-xs"
            defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
            labelPlacement="outside"
          />
          <DatePicker
            label="Zoned Date Time"
            className="max-w-xs"
            defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
            labelPlacement="outside"
          />
      </div>
      );
    }
    `,
  },
  {
    name: " DatePicker Granularity.",
    import: `
    import React from "react";
    import {DatePicker} from "@nextui-org/react";
    import {now, parseAbsoluteToLocal} from "@internationalized/date";
      `,
    description: `the DatePicker granularity prop allows you to control the smallest unit that is displayed by DatePicker By default, the value is displayed with "day" granularity (year, month, and day), and CalendarDateTime and ZonedDateTime values are displayed with "minute" granularity.

    @internationalized/date includes functions for parsing strings in multiple formats into ZonedDateTime objects.`,
    code: `
    export default function App() {
      let [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

      return (
        <div className="w-full max-w-xl flex flex-col items-start gap-4">
          <DatePicker
            className="max-w-md"
            granularity="second"
            label="Date and time"
            value={date}
            onChange={setDate}
          />
          <DatePicker
            className="max-w-md"
            granularity="day"
            label="Date"
            value={date}
            onChange={setDate}
          />
          <DatePicker className="max-w-md" granularity="second" label="Event date" />
          <DatePicker
            className="max-w-md"
            granularity="second"
            label="Event date"
            placeholderValue={now("America/New_York")}
          />
        </div>
      );
    }
    `,
  },
];

export const usageDocs = `


`;
