// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { categorized } from '../lib/category'


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


export const MyResponsivePie = () => {
  const { txns, loading } = useSelector((state) => state.txns);

  const [data, setData] = useState([])

  useEffect(() => {
    setData(categorized(txns))
    return () => {
    }
  }, [loading, txns])


  return (

    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      arcLinkLabel="label"
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        },
        {
          id: "squares",
          type: "patternSquares",
          size: 4,
          padding: 4,
          stagger: false,
          background: "inherit",
          color: 'rgba(255, 255, 255, 0.3)',

        }
      ]}
      fill={data.map((cat) => {
        function getRandom(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive
        }

        let fills = ['dots', 'lines', 'squares']
        return {
          match: {
            id: cat.id
          },
          id: fills[getRandom(0, fills.length)]
        }
      })}
      // fill={[
      //   {
      //     match: {
      //       id: 'ent'
      //     },
      //     id: 'dots'
      //   },
      //   {
      //     match: {
      //       id: 'tran'
      //     },
      //     id: 'lines'
      //   },
      //   {
      //     match: {
      //       id: 'fnd'
      //     },
      //     id: 'dots'
      //   },
      //   {
      //     match: {
      //       id: 'edu'
      //     },
      //     id: 'lines'
      //   },
      //   {
      //     match: {
      //       id: 'misc'
      //     },
      //     id: 'squares'
      //   },

      // ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: -5,
          translateY: 56,
          itemsSpacing: 7,
          itemWidth: 70,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'top-to-bottom',
          itemOpacity: 1,
          symbolShape: 'circle',
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
