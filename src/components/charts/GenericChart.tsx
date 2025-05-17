"use client";

import { ApexOptions } from "apexcharts";
import { ChevronDown, BarChart2, LineChart } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type TimePeriod = "Yearly" | "Monthly" | "Weekly";
type ChartType = "line" | "bar" | "area";

interface DataPoint {
  name: string;
  data: number[];
  color: string;
}

interface TimePeriodData {
  categories: string[];
  series: DataPoint[];
}

interface ChartData {
  yearly: TimePeriodData;
  monthly: TimePeriodData;
  weekly: TimePeriodData;
}

interface CardData {
  title: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}

interface Props {
  data: ChartData;
  cards?: CardData[];
  chartTitle?: string;
  defaultSelected?: string;
}

const GenericChart = ({
  data,
  chartTitle = "Data Overview",
  cards = [],
  defaultSelected = "",
}: Props) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("Yearly");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [selectedSeries, setSelectedSeries] = useState<string>(
    defaultSelected || (cards.length > 0 ? cards[0].title : ""),
  );

  // Get data based on selected time period
  const getChartData = (): TimePeriodData => {
    const periodData = data[timePeriod.toLowerCase() as keyof typeof data];
    return periodData || { categories: [], series: [] };
  };

  // Filter series based on selected card (if cards are provided)
  const getFilteredSeries = () => {
    const { series } = getChartData();
    if (!selectedSeries || !cards.length) return series;
    return series.filter((s) => s.name === selectedSeries);
  };

  const { categories } = getChartData();
  const filteredSeries = getFilteredSeries();

  const chartOptions: ApexOptions = {
    chart: {
      id: "generic-chart",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    stroke: {
      width: chartType === "line" ? [3] : [0],
      curve: "smooth",
    },
    markers: {
      size: chartType === "line" ? 5 : 0,
      hover: {
        size: chartType === "line" ? 7 : 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
      tickAmount: 4,
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: filteredSeries.map((s) => s.color),
    tooltip: {
      y: {
        formatter: (val: number) => {
          return val.toString();
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "45%",
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      {/* Header of Chart */}
      <div className="flex flex-col items-start justify-between gap-3 md:mt-3 md:flex-row md:items-center">
        <h1 className="max-w-[250px] text-xl font-bold">{chartTitle}</h1>
        <div className="flex w-full justify-between gap-4 md:w-fit">
          {filteredSeries.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex space-x-4">
                {filteredSeries.map((s) => (
                  <div key={s.name} className="flex items-center">
                    <div
                      className="mr-2 h-4 w-4 rounded-md"
                      style={{ backgroundColor: s.color }}
                    ></div>
                    <span className="text-xs">{s.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setChartType("line")}
                  className={`rounded-md p-2 ${
                    chartType === "line" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  title="Line Chart"
                >
                  <LineChart size={16} />
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`rounded-md p-2 ${
                    chartType === "bar" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  title="Bar Chart"
                >
                  <BarChart2 size={16} />
                </button>
              </div>
            </div>
          )}
          <div className="relative">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
              className="appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-8 leading-tight text-gray-700 focus:outline-none"
            >
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {cards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-secondary mb-6 text-sm">
            {timePeriod} data overview
          </h2>

          <div className="flex flex-col justify-center gap-4 md:flex-row">
            {cards.map((card) => (
              <div
                key={card.title}
                onClick={() => setSelectedSeries(card.title)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2 shadow-sm transition ${
                  selectedSeries === card.title
                    ? "border-gray-400"
                    : "border-gray-100"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    selectedSeries === card.title
                      ? "bg-primary text-white"
                      : "text-secondary bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      selectedSeries === card.title ? card.color : undefined,
                  }}
                >
                  {card.icon || card.title.charAt(0)}
                </div>
                <div>
                  <span className="text-secondary mb-2 text-xs">
                    {card.title}
                  </span>
                  <p className="font-semibold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chart content */}
      <div className="pt-6">
        <div className="h-72 w-full">
          {filteredSeries.length > 0 ? (
            <Chart
              options={chartOptions}
              series={filteredSeries}
              type={chartType}
              height="100%"
              width="100%"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericChart;
