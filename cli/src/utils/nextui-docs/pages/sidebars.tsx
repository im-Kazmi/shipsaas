export const name = "Sidebar";

export const importDocs = `
  "use client";

  import {
    Accordion,
    AccordionItem,
    type ListboxProps,
    type ListboxSectionProps,
    type Selection,
  } from "@nextui-org/react";
  import React from "react";
  import {Listbox, Tooltip, ListboxItem, ListboxSection} from "@nextui-org/react";
  import {Icon} from "@iconify/react";

  import {cn} from "@/lib/utils";
`;

export const usageExamples = [
  {
    name: "Basic sidebar.",
    import: `
    "use client";

    import {
      Accordion,
      AccordionItem,
      type ListboxProps,
      type ListboxSectionProps,
      type Selection,
    } from "@nextui-org/react";
    import React from "react";
    import {Listbox, Tooltip, ListboxItem, ListboxSection} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    import {Chip} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    import type {AvatarProps} from "@nextui-org/react";
    import {Avatar} from "@nextui-org/react";

    import {cn} from "@/lib/utils";
    `,
    description: "Simple sidebar. oftenly used in dashboards",
    code: `

    export enum SidebarItemType {
      Nest = "nest",
    }

    export type SidebarItem = {
      key: string;
      title: string;
      icon?: string;
      href?: string;
      type?: SidebarItemType.Nest;
      startContent?: React.ReactNode;
      endContent?: React.ReactNode;
      items?: SidebarItem[];
      className?: string;
    };

    export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
      items: SidebarItem[];
      isCompact?: boolean;
      hideEndContent?: boolean;
      iconClassName?: string;
      sectionClasses?: ListboxSectionProps["classNames"];
      classNames?: ListboxProps["classNames"];
      defaultSelectedKey: string;
      onSelect?: (key: string) => void;
    };

    const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
      (
        {
          items,
          isCompact,
          defaultSelectedKey,
          onSelect,
          hideEndContent,
          sectionClasses: sectionClassesProp = {},
          itemClasses: itemClassesProp = {},
          iconClassName,
          classNames,
          className,
          ...props
        },
        ref,
      ) => {
        const [selected, setSelected] = React.useState<React.Key>(defaultSelectedKey);

        const sectionClasses = {
          ...sectionClassesProp,
          base: cn(sectionClassesProp?.base, "w-full", {
            "p-0 max-w-[44px]": isCompact,
          }),
          group: cn(sectionClassesProp?.group, {
            "flex flex-col gap-1": isCompact,
          }),
          heading: cn(sectionClassesProp?.heading, {
            hidden: isCompact,
          }),
        };

        const itemClasses = {
          ...itemClassesProp,
          base: cn(itemClassesProp?.base, {
            "w-11 h-11 gap-0 p-0": isCompact,
          }),
        };

        const renderNestItem = React.useCallback(
          (item: SidebarItem) => {
            const isNestType =
              item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

            if (isNestType) {
              // Is a nest type item , so we need to remove the href
              delete item.href;
            }

            return (
              <ListboxItem
                {...item}
                key={item.key}
                classNames={{
                  base: cn(
                    {
                      "h-auto p-0": !isCompact && isNestType,
                    },
                    {
                      "inline-block w-11": isCompact && isNestType,
                    },
                  ),
                }}
                endContent={isCompact || isNestType || hideEndContent ? null : item.endContent ?? null}
                startContent={
                  isCompact || isNestType ? null : item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )
                }
                title={isCompact || isNestType ? null : item.title}
              >
                {isCompact ? (
                  <Tooltip content={item.title} placement="right">
                    <div className="flex w-full items-center justify-center">
                      {item.icon ? (
                        <Icon
                          className={cn(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                      ) : (
                        item.startContent ?? null
                      )}
                    </div>
                  </Tooltip>
                ) : null}
                {!isCompact && isNestType ? (
                  <Accordion className={"p-0"}>
                    <AccordionItem
                      key={item.key}
                      aria-label={item.title}
                      classNames={{
                        heading: "pr-3",
                        trigger: "p-0",
                        content: "py-0 pl-4",
                      }}
                      title={
                        item.icon ? (
                          <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                            <Icon
                              className={cn(
                                "text-default-500 group-data-[selected=true]:text-foreground",
                                iconClassName,
                              )}
                              icon={item.icon}
                              width={24}
                            />
                            <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                              {item.title}
                            </span>
                          </div>
                        ) : (
                          item.startContent ?? null
                        )
                      }
                    >
                      {item.items && item.items?.length > 0 ? (
                        <Listbox
                          className={"mt-0.5"}
                          classNames={{
                            list: cn("border-l border-default-200 pl-4"),
                          }}
                          items={item.items}
                          variant="flat"
                        >
                          {item.items.map(renderItem)}
                        </Listbox>
                      ) : (
                        renderItem(item)
                      )}
                    </AccordionItem>
                  </Accordion>
                ) : null}
              </ListboxItem>
            );
          },
          [isCompact, hideEndContent, iconClassName, items],
        );

        const renderItem = React.useCallback(
          (item: SidebarItem) => {
            const isNestType =
              item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

            if (isNestType) {
              return renderNestItem(item);
            }

            return (
              <ListboxItem
                {...item}
                key={item.key}
                endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
                startContent={
                  isCompact ? null : item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )
                }
                textValue={item.title}
                title={isCompact ? null : item.title}
              >
                {isCompact ? (
                  <Tooltip content={item.title} placement="right">
                    <div className="flex w-full items-center justify-center">
                      {item.icon ? (
                        <Icon
                          className={cn(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                      ) : (
                        item.startContent ?? null
                      )}
                    </div>
                  </Tooltip>
                ) : null}
              </ListboxItem>
            );
          },
          [isCompact, hideEndContent, iconClassName, itemClasses?.base],
        );

        return (
          <Listbox
            key={isCompact ? "compact" : "default"}
            ref={ref}
            hideSelectedIcon
            as="nav"
            className={cn("list-none", className)}
            classNames={{
              ...classNames,
              list: cn("items-center", classNames?.list),
            }}
            color="default"
            itemClasses={{
              ...itemClasses,
              base: cn(
                "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
                itemClasses?.base,
              ),
              title: cn(
                "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
                itemClasses?.title,
              ),
            }}
            items={items}
            selectedKeys={[selected] as unknown as Selection}
            selectionMode="single"
            variant="flat"
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0];

              setSelected(key as React.Key);
              onSelect?.(key as string);
            }}
            {...props}
          >
            {(item) => {
              return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
                renderNestItem(item)
              ) : item.items && item.items?.length > 0 ? (
                <ListboxSection
                  key={item.key}
                  classNames={sectionClasses}
                  showDivider={isCompact}
                  title={item.title}
                >
                  {item.items.map(renderItem)}
                </ListboxSection>
              ) : (
                renderItem(item)
              );
            }}
          </Listbox>
        );
      },
    );



    export const items: SidebarItem[] = [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip size="sm" variant="flat">
            New
          </Chip>
        ),
      },
      {
        key: "analytics",
        href: "#",
        icon: "solar:chart-outline",
        title: "Analytics",
      },
      {
        key: "perks",
        href: "#",
        icon: "solar:gift-linear",
        title: "Perks",
        endContent: (
          <Chip size="sm" variant="flat">
            3
          </Chip>
        ),
      },
      {
        key: "expenses",
        href: "#",
        icon: "solar:bill-list-outline",
        title: "Expenses",
      },
      {
        key: "settings",
        href: "#",
        icon: "solar:settings-outline",
        title: "Settings",
      },
    ];

    export const sectionItems: SidebarItem[] = [
      {
        key: "overview",
        title: "Overview",
        items: [
          {
            key: "home",
            href: "#",
            icon: "solar:home-2-linear",
            title: "Home",
          },
          {
            key: "projects",
            href: "#",
            icon: "solar:widget-2-outline",
            title: "Projects",
            endContent: (
              <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
            ),
          },
          {
            key: "tasks",
            href: "#",
            icon: "solar:checklist-minimalistic-outline",
            title: "Tasks",
            endContent: (
              <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
            ),
          },
          {
            key: "team",
            href: "#",
            icon: "solar:users-group-two-rounded-outline",
            title: "Team",
          },
          {
            key: "tracker",
            href: "#",
            icon: "solar:sort-by-time-linear",
            title: "Tracker",
            endContent: (
              <Chip size="sm" variant="flat">
                New
              </Chip>
            ),
          },
        ],
      },
      {
        key: "organization",
        title: "Organization",
        items: [
          {
            key: "cap_table",
            href: "#",
            title: "Cap Table",
            icon: "solar:pie-chart-2-outline",
            items: [
              {
                key: "shareholders",
                href: "#",
                title: "Shareholders",
              },
              {
                key: "note_holders",
                href: "#",
                title: "Note Holders",
              },
              {
                key: "transactions_log",
                href: "#",
                title: "Transactions Log",
              },
            ],
          },
          {
            key: "analytics",
            href: "#",
            icon: "solar:chart-outline",
            title: "Analytics",
          },
          {
            key: "perks",
            href: "/perks",
            icon: "solar:gift-linear",
            title: "Perks",
            endContent: (
              <Chip size="sm" variant="flat">
                3
              </Chip>
            ),
          },
          {
            key: "expenses",
            href: "#",
            icon: "solar:bill-list-outline",
            title: "Expenses",
          },
          {
            key: "settings",
            href: "/settings",
            icon: "solar:settings-outline",
            title: "Settings",
          },
        ],
      },
    ];

    export const sectionItemsWithTeams: SidebarItem[] = [
      ...sectionItems,
      {
        key: "your-teams",
        title: "Your Teams",
        items: [
          {
            key: "nextui",
            href: "#",
            title: "NextUI",
            startContent: <TeamAvatar name="Next UI" />,
          },
          {
            key: "tailwind-variants",
            href: "#",
            title: "Tailwind Variants",
            startContent: <TeamAvatar name="Tailwind Variants" />,
          },
          {
            key: "nextui-pro",
            href: "#",
            title: "NextUI Pro",
            startContent: <TeamAvatar name="NextUI Pro" />,
          },
        ],
      },
    ];

    export const brandItems: SidebarItem[] = [
      {
        key: "overview",
        title: "Overview",
        items: [
          {
            key: "home",
            href: "#",
            icon: "solar:home-2-linear",
            title: "Home",
          },
          {
            key: "projects",
            href: "#",
            icon: "solar:widget-2-outline",
            title: "Projects",
            endContent: (
              <Icon
                className="text-primary-foreground/60"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            ),
          },
          {
            key: "tasks",
            href: "#",
            icon: "solar:checklist-minimalistic-outline",
            title: "Tasks",
            endContent: (
              <Icon
                className="text-primary-foreground/60"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            ),
          },
          {
            key: "team",
            href: "#",
            icon: "solar:users-group-two-rounded-outline",
            title: "Team",
          },
          {
            key: "tracker",
            href: "#",
            icon: "solar:sort-by-time-linear",
            title: "Tracker",
            endContent: (
              <Chip className="bg-primary-foreground font-medium text-primary" size="sm" variant="flat">
                New
              </Chip>
            ),
          },
        ],
      },
      {
        key: "your-teams",
        title: "Your Teams",
        items: [
          {
            key: "nextui",
            href: "#",
            title: "NextUI",
            startContent: (
              <TeamAvatar
                classNames={{
                  base: "border-1 border-primary-foreground/20",
                  name: "text-primary-foreground/80",
                }}
                name="Next UI"
              />
            ),
          },
          {
            key: "tailwind-variants",
            href: "#",
            title: "Tailwind Variants",
            startContent: (
              <TeamAvatar
                classNames={{
                  base: "border-1 border-primary-foreground/20",
                  name: "text-primary-foreground/80",
                }}
                name="Tailwind Variants"
              />
            ),
          },
          {
            key: "nextui-pro",
            href: "#",
            title: "NextUI Pro",
            startContent: (
              <TeamAvatar
                classNames={{
                  base: "border-1 border-primary-foreground/20",
                  name: "text-primary-foreground/80",
                }}
                name="NextUI Pro"
              />
            ),
          },
        ],
      },
    ];

    export const sectionLongList: SidebarItem[] = [
      ...sectionItems,
      {
        key: "payments",
        title: "Payments",
        items: [
          {
            key: "payroll",
            href: "#",
            title: "Payroll",
            icon: "solar:dollar-minimalistic-linear",
          },
          {
            key: "invoices",
            href: "#",
            title: "Invoices",
            icon: "solar:file-text-linear",
          },
          {
            key: "billing",
            href: "#",
            title: "Billing",
            icon: "solar:card-outline",
          },
          {
            key: "payment-methods",
            href: "#",
            title: "Payment Methods",
            icon: "solar:wallet-money-outline",
          },
          {
            key: "payouts",
            href: "#",
            title: "Payouts",
            icon: "solar:card-transfer-outline",
          },
        ],
      },
      {
        key: "your-teams",
        title: "Your Teams",
        items: [
          {
            key: "nextui",
            href: "#",
            title: "NextUI",
            startContent: <TeamAvatar name="Next UI" />,
          },
          {
            key: "tailwind-variants",
            href: "#",
            title: "Tailwind Variants",
            startContent: <TeamAvatar name="Tailwind Variants" />,
          },
          {
            key: "nextui-pro",
            href: "#",
            title: "NextUI Pro",
            startContent: <TeamAvatar name="NextUI Pro" />,
          },
        ],
      },
    ];

    export const sectionNestedItems: SidebarItem[] = [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip size="sm" variant="flat">
            New
          </Chip>
        ),
      },
      {
        key: "analytics",
        href: "#",
        icon: "solar:chart-outline",
        title: "Analytics",
      },
      {
        key: "perks",
        href: "#",
        icon: "solar:gift-linear",
        title: "Perks",
        endContent: (
          <Chip size="sm" variant="flat">
            3
          </Chip>
        ),
      },
      {
        key: "cap_table",
        title: "Cap Table",
        icon: "solar:pie-chart-2-outline",
        type: SidebarItemType.Nest,
        items: [
          {
            key: "shareholders",
            icon: "solar:users-group-rounded-linear",
            href: "#",
            title: "Shareholders",
          },
          {
            key: "note_holders",
            icon: "solar:notes-outline",
            href: "#",
            title: "Note Holders",
          },
          {
            key: "transactions_log",
            icon: "solar:clipboard-list-linear",
            href: "#",
            title: "Transactions Log",
          },
        ],
      },
      {
        key: "expenses",
        href: "#",
        icon: "solar:bill-list-outline",
        title: "Expenses",
      },
    ];


    const TeamAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
      ({name, className, classNames = {}, ...props}, ref) => (
        <Avatar
          {...props}
          ref={ref}
          classNames={{
            ...classNames,
            base: cn("bg-transparent border border-divider", classNames?.base, className),
            name: cn("text-default-500 text-[0.6rem] font-semibold", classNames?.name),
          }}
          getInitials={(name) =>
            (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()
          }
          name={name}
          radius="md"
          size="sm"
        />
      ),
    );

    TeamAvatar.displayName = "TeamAvatar";

    Sidebar.displayName = "Sidebar";

    export default Sidebar;
    `,
  },
  {
    name: "sidebar with search input.",
    import: `
    "use client";

    import {
      Accordion,
      AccordionItem,
      type ListboxProps,
      type ListboxSectionProps,
      type Selection,
    } from "@nextui-org/react";
    import React from "react";
    import {Listbox, Tooltip, ListboxItem, ListboxSection} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    import type {AvatarProps} from "@nextui-org/react";
    import {Avatar} from "@nextui-org/react";
    import {cn} from "@/lib/utils";
    `,
    description: "sidebar with search input. oftenly used in dashboards",
    code: `


    export enum SidebarItemType {
      Nest = "nest",
    }

    export type SidebarItem = {
      key: string;
      title: string;
      icon?: string;
      href?: string;
      type?: SidebarItemType.Nest;
      startContent?: React.ReactNode;
      endContent?: React.ReactNode;
      items?: SidebarItem[];
      className?: string;
    };

    export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
      items: SidebarItem[];
      isCompact?: boolean;
      hideEndContent?: boolean;
      iconClassName?: string;
      sectionClasses?: ListboxSectionProps["classNames"];
      classNames?: ListboxProps["classNames"];
      defaultSelectedKey: string;
      onSelect?: (key: string) => void;
    };

    const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
      (
        {
          items,
          isCompact,
          defaultSelectedKey,
          onSelect,
          hideEndContent,
          sectionClasses: sectionClassesProp = {},
          itemClasses: itemClassesProp = {},
          iconClassName,
          classNames,
          className,
          ...props
        },
        ref,
      ) => {
        const [selected, setSelected] = React.useState<React.Key>(defaultSelectedKey);

        const sectionClasses = {
          ...sectionClassesProp,
          base: cn(sectionClassesProp?.base, "w-full", {
            "p-0 max-w-[44px]": isCompact,
          }),
          group: cn(sectionClassesProp?.group, {
            "flex flex-col gap-1": isCompact,
          }),
          heading: cn(sectionClassesProp?.heading, {
            hidden: isCompact,
          }),
        };

        const itemClasses = {
          ...itemClassesProp,
          base: cn(itemClassesProp?.base, {
            "w-11 h-11 gap-0 p-0": isCompact,
          }),
        };

        const renderNestItem = React.useCallback(
          (item: SidebarItem) => {
            const isNestType =
              item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

            if (isNestType) {
              // Is a nest type item , so we need to remove the href
              delete item.href;
            }

            return (
              <ListboxItem
                {...item}
                key={item.key}
                classNames={{
                  base: cn(
                    {
                      "h-auto p-0": !isCompact && isNestType,
                    },
                    {
                      "inline-block w-11": isCompact && isNestType,
                    },
                  ),
                }}
                endContent={isCompact || isNestType || hideEndContent ? null : item.endContent ?? null}
                startContent={
                  isCompact || isNestType ? null : item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )
                }
                title={isCompact || isNestType ? null : item.title}
              >
                {isCompact ? (
                  <Tooltip content={item.title} placement="right">
                    <div className="flex w-full items-center justify-center">
                      {item.icon ? (
                        <Icon
                          className={cn(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                      ) : (
                        item.startContent ?? null
                      )}
                    </div>
                  </Tooltip>
                ) : null}
                {!isCompact && isNestType ? (
                  <Accordion className={"p-0"}>
                    <AccordionItem
                      key={item.key}
                      aria-label={item.title}
                      classNames={{
                        heading: "pr-3",
                        trigger: "p-0",
                        content: "py-0 pl-4",
                      }}
                      title={
                        item.icon ? (
                          <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                            <Icon
                              className={cn(
                                "text-default-500 group-data-[selected=true]:text-foreground",
                                iconClassName,
                              )}
                              icon={item.icon}
                              width={24}
                            />
                            <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                              {item.title}
                            </span>
                          </div>
                        ) : (
                          item.startContent ?? null
                        )
                      }
                    >
                      {item.items && item.items?.length > 0 ? (
                        <Listbox
                          className={"mt-0.5"}
                          classNames={{
                            list: cn("border-l border-default-200 pl-4"),
                          }}
                          items={item.items}
                          variant="flat"
                        >
                          {item.items.map(renderItem)}
                        </Listbox>
                      ) : (
                        renderItem(item)
                      )}
                    </AccordionItem>
                  </Accordion>
                ) : null}
              </ListboxItem>
            );
          },
          [isCompact, hideEndContent, iconClassName, items],
        );

        const renderItem = React.useCallback(
          (item: SidebarItem) => {
            const isNestType =
              item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

            if (isNestType) {
              return renderNestItem(item);
            }

            return (
              <ListboxItem
                {...item}
                key={item.key}
                endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
                startContent={
                  isCompact ? null : item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )
                }
                textValue={item.title}
                title={isCompact ? null : item.title}
              >
                {isCompact ? (
                  <Tooltip content={item.title} placement="right">
                    <div className="flex w-full items-center justify-center">
                      {item.icon ? (
                        <Icon
                          className={cn(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                      ) : (
                        item.startContent ?? null
                      )}
                    </div>
                  </Tooltip>
                ) : null}
              </ListboxItem>
            );
          },
          [isCompact, hideEndContent, iconClassName, itemClasses?.base],
        );

        return (
          <Listbox
            key={isCompact ? "compact" : "default"}
            ref={ref}
            hideSelectedIcon
            as="nav"
            className={cn("list-none", className)}
            classNames={{
              ...classNames,
              list: cn("items-center", classNames?.list),
            }}
            color="default"
            itemClasses={{
              ...itemClasses,
              base: cn(
                "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
                itemClasses?.base,
              ),
              title: cn(
                "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
                itemClasses?.title,
              ),
            }}
            items={items}
            selectedKeys={[selected] as unknown as Selection}
            selectionMode="single"
            variant="flat"
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0];

              setSelected(key as React.Key);
              onSelect?.(key as string);
            }}
            {...props}
          >
            {(item) => {
              return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
                renderNestItem(item)
              ) : item.items && item.items?.length > 0 ? (
                <ListboxSection
                  key={item.key}
                  classNames={sectionClasses}
                  showDivider={isCompact}
                  title={item.title}
                >
                  {item.items.map(renderItem)}
                </ListboxSection>
              ) : (
                renderItem(item)
              );
            }}
          </Listbox>
        );
      },
    );

    export const items: SidebarItem[] = [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip size="sm" variant="flat">
            New
          </Chip>
        ),
      },
      {
        key: "analytics",
        href: "#",
        icon: "solar:chart-outline",
        title: "Analytics",
      },
      {
        key: "perks",
        href: "#",
        icon: "solar:gift-linear",
        title: "Perks",
        endContent: (
          <Chip size="sm" variant="flat">
            3
          </Chip>
        ),
      },
      {
        key: "expenses",
        href: "#",
        icon: "solar:bill-list-outline",
        title: "Expenses",
      },
      {
        key: "settings",
        href: "#",
        icon: "solar:settings-outline",
        title: "Settings",
      },
    ];

    export const sectionItems: SidebarItem[] = [
      {
        key: "overview",
        title: "Overview",
        items: [
          {
            key: "home",
            href: "#",
            icon: "solar:home-2-linear",
            title: "Home",
          },
          {
            key: "projects",
            href: "#",
            icon: "solar:widget-2-outline",
            title: "Projects",
            endContent: (
              <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
            ),
          },
          {
            key: "tasks",
            href: "#",
            icon: "solar:checklist-minimalistic-outline",
            title: "Tasks",
            endContent: (
              <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
            ),
          },
          {
            key: "team",
            href: "#",
            icon: "solar:users-group-two-rounded-outline",
            title: "Team",
          },
          {
            key: "tracker",
            href: "#",
            icon: "solar:sort-by-time-linear",
            title: "Tracker",
            endContent: (
              <Chip size="sm" variant="flat">
                New
              </Chip>
            ),
          },
        ],
      },
      {
        key: "organization",
        title: "Organization",
        items: [
          {
            key: "cap_table",
            href: "#",
            title: "Cap Table",
            icon: "solar:pie-chart-2-outline",
            items: [
              {
                key: "shareholders",
                href: "#",
                title: "Shareholders",
              },
              {
                key: "note_holders",
                href: "#",
                title: "Note Holders",
              },
              {
                key: "transactions_log",
                href: "#",
                title: "Transactions Log",
              },
            ],
          },
          {
            key: "analytics",
            href: "#",
            icon: "solar:chart-outline",
            title: "Analytics",
          },
          {
            key: "perks",
            href: "/perks",
            icon: "solar:gift-linear",
            title: "Perks",
            endContent: (
              <Chip size="sm" variant="flat">
                3
              </Chip>
            ),
          },
          {
            key: "expenses",
            href: "#",
            icon: "solar:bill-list-outline",
            title: "Expenses",
          },
          {
            key: "settings",
            href: "/settings",
            icon: "solar:settings-outline",
            title: "Settings",
          },
        ],
      },
    ];

    export const sectionItemsWithTeams: SidebarItem[] = [
      ...sectionItems,
      {
        key: "your-teams",
        title: "Your Teams",
        items: [
          {
            key: "nextui",
            href: "#",
            title: "NextUI",
            startContent: <TeamAvatar name="Next UI" />,
          },
          {
            key: "tailwind-variants",
            href: "#",
            title: "Tailwind Variants",
            startContent: <TeamAvatar name="Tailwind Variants" />,
          },
          {
            key: "nextui-pro",
            href: "#",
            title: "NextUI Pro",
            startContent: <TeamAvatar name="NextUI Pro" />,
          },
        ],
      },
    ];

    export const brandItems: SidebarItem[] = [
      {
        key: "overview",
        title: "Overview",
        items: [
          {
            key: "home",
            href: "#",
            icon: "solar:home-2-linear",
            title: "Home",
          },
          {
            key: "projects",
            href: "#",
            icon: "solar:widget-2-outline",
            title: "Projects",
            endContent: (
              <Icon
                className="text-primary-foreground/60"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            ),
          },
          {
            key: "tasks",
            href: "#",
            icon: "solar:checklist-minimalistic-outline",
            title: "Tasks",
            endContent: (
              <Icon
                className="text-primary-foreground/60"
                icon="solar:add-circle-line-duotone"
                width={24}
              />
            ),
          },
          {
            key: "team",
            href: "#",
            icon: "solar:users-group-two-rounded-outline",
            title: "Team",
          },
          {
            key: "tracker",
            href: "#",
            icon: "solar:sort-by-time-linear",
            title: "Tracker",
            endContent: (
              <Chip className="bg-primary-foreground font-medium text-primary" size="sm" variant="flat">
                New
              </Chip>
            ),
          },
        ],
      },
      {
        key: "your-teams",
        title: "Your Teams",
        items: [
          {
            key: "nextui",
            href: "#",
            title: "NextUI",
            startContent: (
              <TeamAvatar
                classNames={{
                  base: "border-1 border-primary-foreground/20",
                  name: "text-primary-foreground/80",
                }}
                name="Next UI"
              />
            ),
          },
          {
            key: "tailwind-variants",
            href: "#",
            title: "Tailwind Variants",
            startContent: (
              <TeamAvatar
                classNames={{
                  base: "border-1 border-primary-foreground/20",
                  name: "text-primary-foreground/80",
                }}
                name="Tailwind Variants"
              />
            ),
          },
          {
            key: "nextui-pro",
            href: "#",
            title: "NextUI Pro",
            startContent: (
              <TeamAvatar
                classNames={{
                  base: "border-1 border-primary-foreground/20",
                  name: "text-primary-foreground/80",
                }}
                name="NextUI Pro"
              />
            ),
          },
        ],
      },
    ];

    export const sectionLongList: SidebarItem[] = [
      ...sectionItems,
      {
        key: "payments",
        title: "Payments",
        items: [
          {
            key: "payroll",
            href: "#",
            title: "Payroll",
            icon: "solar:dollar-minimalistic-linear",
          },
          {
            key: "invoices",
            href: "#",
            title: "Invoices",
            icon: "solar:file-text-linear",
          },
          {
            key: "billing",
            href: "#",
            title: "Billing",
            icon: "solar:card-outline",
          },
          {
            key: "payment-methods",
            href: "#",
            title: "Payment Methods",
            icon: "solar:wallet-money-outline",
          },
          {
            key: "payouts",
            href: "#",
            title: "Payouts",
            icon: "solar:card-transfer-outline",
          },
        ],
      },
      {
        key: "your-teams",
        title: "Your Teams",
        items: [
          {
            key: "nextui",
            href: "#",
            title: "NextUI",
            startContent: <TeamAvatar name="Next UI" />,
          },
          {
            key: "tailwind-variants",
            href: "#",
            title: "Tailwind Variants",
            startContent: <TeamAvatar name="Tailwind Variants" />,
          },
          {
            key: "nextui-pro",
            href: "#",
            title: "NextUI Pro",
            startContent: <TeamAvatar name="NextUI Pro" />,
          },
        ],
      },
    ];

    export const sectionNestedItems: SidebarItem[] = [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip size="sm" variant="flat">
            New
          </Chip>
        ),
      },
      {
        key: "analytics",
        href: "#",
        icon: "solar:chart-outline",
        title: "Analytics",
      },
      {
        key: "perks",
        href: "#",
        icon: "solar:gift-linear",
        title: "Perks",
        endContent: (
          <Chip size="sm" variant="flat">
            3
          </Chip>
        ),
      },
      {
        key: "cap_table",
        title: "Cap Table",
        icon: "solar:pie-chart-2-outline",
        type: SidebarItemType.Nest,
        items: [
          {
            key: "shareholders",
            icon: "solar:users-group-rounded-linear",
            href: "#",
            title: "Shareholders",
          },
          {
            key: "note_holders",
            icon: "solar:notes-outline",
            href: "#",
            title: "Note Holders",
          },
          {
            key: "transactions_log",
            icon: "solar:clipboard-list-linear",
            href: "#",
            title: "Transactions Log",
          },
        ],
      },
      {
        key: "expenses",
        href: "#",
        icon: "solar:bill-list-outline",
        title: "Expenses",
      },
    ];

    const TeamAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
      ({name, className, classNames = {}, ...props}, ref) => (
        <Avatar
          {...props}
          ref={ref}
          classNames={{
            ...classNames,
            base: cn("bg-transparent border border-divider", classNames?.base, className),
            name: cn("text-default-500 text-[0.6rem] font-semibold", classNames?.name),
          }}
          getInitials={(name) =>
            (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()
          }
          name={name}
          radius="md"
          size="sm"
        />
      ),
    );
    Sidebar.displayName = "Sidebar";

    export default Sidebar;
    `,
  },
  {
    name: "sidebar with search input.",
    import: `
    "use client";

    import {
      Accordion,
      AccordionItem,
      type ListboxProps,
      type ListboxSectionProps,
      type Selection,
    } from "@nextui-org/react";
    import React from "react";
    import {Listbox, Tooltip, ListboxItem, ListboxSection} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    import type {AvatarProps} from "@nextui-org/react";
    import {Avatar} from "@nextui-org/react";
    import {cn} from "@/lib/utils";
    `,
    description: "sidebar with search input. oftenly used in dashboards",
    code: `

    `,
  },
];
