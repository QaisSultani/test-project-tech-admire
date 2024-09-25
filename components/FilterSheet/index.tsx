import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

type Applications = {
  id: number;
  name: string;
  university: string;
  country: string;
  duration: number;
  cost: number;
  deadline: string;
  language: string;
};

type Props = {
  applications: Applications[];
  setFilteredApplications: React.Dispatch<React.SetStateAction<Applications[]>>;
};

type Filter = {
  countries: string[];
  universities: string[];
  duration: number[];
  cost: number[];
  languages: string[];
};

type FilterKey = keyof Filter;

const getUniqueCountries = (data: Applications[]): string[] => {
  const uniqueCountries = Array.from(new Set(data.map((item) => item.country)));
  return uniqueCountries;
};
const getUniqueUniversities = (data: Applications[]): string[] => {
  const uniqueUniversities = Array.from(
    new Set(data.map((item) => item.university))
  );
  return uniqueUniversities;
};

const FilterSheet = ({ applications, setFilteredApplications }: Props) => {
  const [countries] = useState<string[]>(getUniqueCountries(applications));
  const [universities] = useState<string[]>(
    getUniqueUniversities(applications)
  );

  const [filters, setFilters] = useState<Filter>({
    countries: [],
    universities: [],
    duration: [1, 8],
    cost: [0, 10000000],
    languages: [],
  });

  const handleFilterChange = (
    filterType: FilterKey,
    value: string[] | number[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleCheckboxChange = (
    filterType: FilterKey,
    item: string | number
  ) => {
    setFilters((prevFilters) => {
      const currentFilterValue = prevFilters[filterType];

      if (Array.isArray(currentFilterValue)) {
        if (
          typeof item === "string" &&
          currentFilterValue.every((i) => typeof i === "string")
        ) {
          return {
            ...prevFilters,
            [filterType]: currentFilterValue.includes(item)
              ? currentFilterValue.filter((i) => i !== item)
              : [...currentFilterValue, item],
          };
        } else if (
          typeof item === "number" &&
          currentFilterValue.every((i) => typeof i === "number")
        ) {
          return {
            ...prevFilters,
            [filterType]: currentFilterValue.includes(item)
              ? currentFilterValue.filter((i) => i !== item)
              : [...currentFilterValue, item],
          };
        }
      }
      return prevFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      countries: [],
      universities: [],
      duration: [1, 8],
      cost: [0, 10000000],
      languages: [],
    });
    console.log("Reset filters:", filters);
  };

  useEffect(() => {
    const applyFilter = (data: Applications[], filter: Filter) => {
      return data.filter((entry) => {
        const countryMatches =
          filter.countries.length === 0 ||
          filter.countries.includes(entry.country);

        const universityMatches =
          filter.universities.length === 0 ||
          filter.universities.includes(entry.university);

        const durationMatches =
          entry.duration >= filter.duration[0] &&
          entry.duration <= filter.duration[1];

        const costMatches =
          entry.cost >= filter.cost[0] && entry.cost <= filter.cost[1];

        const languageMatches =
          filter.languages.length === 0 ||
          filter.languages.includes(entry.language);

        return (
          countryMatches &&
          universityMatches &&
          durationMatches &&
          costMatches &&
          languageMatches
        );
      });
    };

    const filteredData = applyFilter(applications, filters);
    setFilteredApplications(filteredData);

    console.log("Applied filters:", filters);
  }, [filters, applications, setFilteredApplications]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Filters</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Application Filters</SheetTitle>
          <SheetDescription>
            Set your preferences to filter the applications.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="countries">Countries</Label>
            <div className="grid grid-cols-1 mb:grid-cols-2 gap-2">
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={filters.countries.includes(country)}
                    onCheckedChange={() =>
                      handleCheckboxChange("countries", country)
                    }
                  />
                  <label htmlFor={`country-${country}`}>{country}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="universities">Universities</Label>
            <div className="grid grid-cols-1 mb:grid-cols-2 gap-2">
              {universities.map((university) => (
                <div key={university} className="flex items-center space-x-2">
                  <Checkbox
                    id={`university-${university}`}
                    checked={filters.universities.includes(university)}
                    onCheckedChange={() =>
                      handleCheckboxChange("universities", university)
                    }
                  />
                  <label htmlFor={`university-${university}`}>
                    {university}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (years)</Label>
            <Slider
              id="duration"
              min={1}
              max={8}
              step={1}
              value={filters.duration}
              onValueChange={(value) => handleFilterChange("duration", value)}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{filters.duration[0]} year</span>
              <span>{filters.duration[1]} years</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost Range ($)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="cost-min"
                type="number"
                placeholder="Min"
                value={filters.cost[0]}
                onChange={(e) =>
                  handleFilterChange("cost", [
                    parseInt(e.target.value),
                    filters.cost[1],
                  ])
                }
                className="w-full"
              />
              <span>to</span>
              <Input
                id="cost-max"
                type="number"
                placeholder="Max"
                value={filters.cost[1]}
                onChange={(e) =>
                  handleFilterChange("cost", [
                    filters.cost[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="languages">Languages</Label>
            <div className="grid grid-cols-1 mb:grid-cols-3 gap-2">
              {["English", "French", "Turkish"].map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={filters.languages.includes(language)}
                    onCheckedChange={() =>
                      handleCheckboxChange("languages", language)
                    }
                  />
                  <label htmlFor={`language-${language}`}>{language}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
