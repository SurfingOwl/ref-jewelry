import {CSSProperties, useEffect, useRef} from "react";
import {ECharts, EChartsOption, getInstanceByDom, init, SetOptionOpts} from "echarts";

export type ReactEChartProps = {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export const ReactECharts = ({option, style, settings, loading, theme}: ReactEChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme)
    }

    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener("resize", resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    }
  }, [theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      if (loading) chart?.showLoading()
      else chart?.hideLoading();
    }
  }, [loading]);

  return <div ref={chartRef} style={{width: "100%", height: "100px", ...style}}/>;
}