import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import React from "react";

const ViewProducts = () => {
  const columns = [
    {name: "#", uid: "index"},
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    {name: "PRICE", uid: "price", sortable: true},
    {name: "DISCOUNT", uid: "discount", sortable: true},
    {name: "RATING", uid: "rating", sortable: true},
    {name: "ACTIONS", uid: "actions"},
  ];

  const products = [
    {
      id: 1,
      name: "Graident Graphic T-shirt",
      price: 145,
      discount: 242,
      rating: 3.5,
      image: "/tshirt.png",
    },
    {
      id: 1,
      name: "Graident Graphic T-shirt",
      price: 145,
      discount: 242,
      rating: 3.5,
      image: "/tshirt.png",
    },
    {
      id: 1,
      name: "Graident Graphic T-shirt",
      price: 146,
      discount: 242,
      rating: 3.5,
      image: "/tshirt.png",
    },
    {
      id: 1,
      name: "Graident Graphic T-shirt",
      price: 145,
      discount: 242,
      rating: 3.5,
      image: "/tshirt.png",
    },
  ]


  const PlusIcon = ({size = 24, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M6 12h12" />
          <path d="M12 18V6" />
        </g>
      </svg>
    );
  };

  const VerticalDotsIcon = ({size = 24, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
      >
        <path
          d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          fill="currentColor"
        />
      </svg>
    );
  };

  const SearchIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  };

  const INITIAL_VISIBLE_COLUMNS = ["name", "price", "rating", "actions"];
  
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "price",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems
      .slice(start, end)
      .map((item, index) => ({ ...item, index: start + index + 1 }));
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "index":
        return (
          <span className="text-gray-500">
            {product.index}
          </span>
        );
      case "name":
        return (
          <div className="flex items-center gap-2">
            <div className="bg-[#F0EEED] w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-bold">{cellValue}</span>
          </div>
        );
      case "price":
        return (
          <div className="flex gap-2 items-center">
            <span className="font-semibold">${product.price}</span>
            <span className="opacity-40 line-through">${product.discount}</span>
            <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
              -{Math.round(((product.discount - product.price)/product.discount)*100)}%
            </span>
          </div>
        );
      case "rating":
        return (
          <div className="flex items-center gap-2">
            <img src="/3.5.png" alt="stars" className="w-20" />
            <span>{product.rating}/5</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-primary border-1 border-white rounded-2xl text-white font-satoshi">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl", "border border-gray-200 rounded-xl"],
      th: [
        "bg-gray-50",
        "text-primary",
        "border-b",
        "border-gray-200",
        "py-4",
        "px-6",
        "first:rounded-tl-xl",
        "last:rounded-tr-xl"
      ],
      td: [
        "py-4",
        "px-6",
        "border-b border-gray-200",
        "group-data-[last=true]/tr:border-none",
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
      checkboxWrapper: ["p-2 rounded-full bg-red-400"],
      checkbox: [
        "w-6 h-6 border-2 border-primary rounded-lg",
        "data-[selected=true]:bg-primary",
        "[&>svg]:text-white",
        "[&>svg]:w-4",
        "[&>svg]:h-4"
      ]
    }),
    [],
  );

  return (
    <main className="p-4 section-container h-fit font-satoshi mx-auto">
      <div className="flex flex-col gap-4">
        {/* Search and Filters Section */}
        <div className="flex justify-between gap-4 items-center">
          <Input
            isClearable
            classNames={{
              base: "w-full rounded-full",
              inputWrapper: "border-1 rounded-full py-5 px-4 text-primary border-primary",
            }}
            placeholder="Search by product name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          
          <div className="flex gap-3">
            <Button className="bg-primary rounded-xl p-5 text-white font-satoshi" endContent={<PlusIcon />} size="sm">
              Add New Product
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <Table
          isCompact
          removeWrapper
          aria-label="Product management table"
          classNames={classNames}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className="h-fit"
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          
          <TableBody emptyContent="No products found" items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    </main>
  );
};

export default ViewProducts;