export const name = "Calender";

export const importDocs = `
  import {Calendar} from "@nextui-org/react";
  import {today, getLocalTimeZone} from "@internationalized/date";
`;

export const usageDocs = `
  // example # 1
  <Calendar aria-label="Date (No Selection)" />

// example # 2
  <Calendar aria-label="Date (Uncontrolled)" defaultValue={parseDate("2020-02-03")} />

  // example # 3
   // Disabled
   // The isDisabled boolean prop makes the Calendar disabled. Cells cannot be focused or selected. as below

  <Calendar aria-label="Date (Disabled)" isDisabled />

  // example # 4
  // Read Only
  // The isReadOnly boolean prop makes the Calendar's value immutable. Unlike isDisabled, the Calendar remains focusable. as below

  <Calendar
    aria-label="Date (Read Only)"
    value={today(getLocalTimeZone())}
    isReadOnly
  />

   // example # 5
   // Controlled
  // A Calendar has no selection by default. An initial, uncontrolled value can be provided to the Calendar using the defaultValue prop. Alternatively, a controlled value can be provided using the value prop.

// example # 6
  Date Value
  By default, Calendar allows selecting any date. The minValue can also be used to prevent the user from selecting dates outside a certain range.

  This example only accepts dates after today.
<Calendar
  aria-label="Date (Min Date Value)"
  defaultValue={today(getLocalTimeZone())}
  minValue={today(getLocalTimeZone())}
/>

<Calendar
  aria-label="Date (Max Date Value)"
  defaultValue={today(getLocalTimeZone())}
  maxValue={today(getLocalTimeZone())}
/>

<Calendar
  aria-label="Date (Show Month and Year Picker)"
  showMonthAndYearPickers
 />

`;
