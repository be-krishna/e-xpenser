// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radial-bar
import { ResponsiveRadialBar } from '@nivo/radial-bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveRadialBar = () => {
  const data = [
    {
      "id": "Week",
      "data": [
        {
          "x": "Vegetables",
          "y": 122
        },
        {
          "x": "Fruits",
          "y": 28
        },
        {
          "x": "Meat",
          "y": 244
        },
        {
          "x": "Fish",
          "y": 243
        }
      ]
    },
    {
      "id": "Month",
      "data": [
        {
          "x": "Vegetables",
          "y": 141
        },
        {
          "x": "Fruits",
          "y": 274
        },
        {
          "x": "Meat",
          "y": 266
        },
        {
          "x": "Fish",
          "y": 55
        }
      ]
    },
    {
      "id": "Year",
      "data": [
        {
          "x": "Vegetables",
          "y": 113
        },
        {
          "x": "Fruits",
          "y": 141
        },
        {
          "x": "Meat",
          "y": 129
        },
        {
          "x": "Fish",
          "y": 82
        }
      ]
    }
  ]
  return (
    <ResponsiveRadialBar
      data={data}
      valueFormat=">-.2f"
      padding={0.4}
      cornerRadius={2}
      margin={{ top: 40, bottom: 40, }}
      radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: 60,
          translateY: 0,
          itemsSpacing: 6,
          itemDirection: 'left-to-right',
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )
}
