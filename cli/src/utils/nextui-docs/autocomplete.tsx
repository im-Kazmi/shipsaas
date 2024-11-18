export const name = "AutoComplete";

export const importDocs = `
  import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
  import {animals} from "./data";
`;

export const usageDocs = `
  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        label="Favorite Animal"
        placeholder="Search an animal"
        className="max-w-xs"
        defaultItems={animals}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </div>
`;
