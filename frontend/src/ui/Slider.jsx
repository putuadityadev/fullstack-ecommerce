import {Slider} from "@heroui/react";

const SliderPrice = () => {
  return (
    <Slider
      classNames={{
        base: "max-w-md",
        labelWrapper: "my-2 font-satoshi opacity-60",
        thumb: [
          "transition-size",
          "bg-gradient-to-r from-secondary-400 to-primary-500",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "w-4 h-4 after:h-3 after:w-3",
          "data-[dragging=true]:w-5 data-[dragging=true]:h-5 data-[dragging=true]:after:h-4 data-[dragging=true]:after:w-4",
        ],
        track: "bg-gray-300 h-1.5",
      }}
      defaultValue={[0, 800]}
      disableThumbScale={true}
      formatOptions={{style: "currency", currency: "USD"}}
      label="Price Range"
      maxValue={1000} 
      minValue={0}
      showOutline={false}
      showSteps={false}
      showTooltip={true}
      step={100}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: [
            "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
          ],
          content: [
            "py-2 shadow-xl rounded-xl",
            "text-white font-satoshi bg-gradient-to-r from-secondary-400 to-primary-500",
          ],
        },
      }}
      tooltipValueFormatOptions={{style: "currency", currency: "USD", maximumFractionDigits: 0}}
    />
  )
}

export default SliderPrice