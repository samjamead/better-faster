import { getWedgeTests, getPuttingTests } from "@/components/tests/actions";

export type TestType = "wedge" | "putting";

export const testsConfig = {
  wedge: {
    href: "/tests/wedge",
    name: "Wedge",
    queryKey: ["wedge_tests"],
    queryFn: getWedgeTests,
  },
  putting: {
    href: "/tests/putting",
    name: "Putting",
    queryKey: ["putting_tests"],
    queryFn: getPuttingTests,
  },
};
