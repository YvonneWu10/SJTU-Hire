import React, { useEffect, useRef } from 'react';
import { List, Progress } from 'antd';
import '../css/Statistics.css';
import {BulbTwoTone, DollarTwoTone, FireTwoTone, IdcardTwoTone} from "@ant-design/icons";
import {DualAxes, Liquid, Pie} from '@ant-design/charts';
import {blue} from "@ant-design/colors";
import { Scene } from '@antv/l7';
// @ts-ignore
import { LineLayer, PointLayer, PolygonLayer, Source } from '@antv/l7';
// @ts-ignore
import { Map } from '@antv/l7-maps';


export const JobRankingList = ({ data }) => {
    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}><FireTwoTone /> 岗位热度排行</div>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        title={
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                <span style={{ marginRight: '16px', width: '30px', textAlign: 'center' }}>
                                    #{index + 1}
                                </span>
                                <span style={{ flex: 1, marginRight: '16px' }}>
                                    {item.title}
                                </span>
                                <Progress
                                    percent={item.percent}
                                    showInfo={false}
                                    style={{ flex: 1, marginRight: '2px' }}
                                    trailColor={blue[0]}
                                    strokeColor={blue[2]}
                                />
                                <span style={{ width: '50px', textAlign: 'right' }} className="small-text">
                                    {item.percent}%
                                </span>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
        </div>
    );
};

export const AgeGraph = ({ data }) => {
    const config = {
        data: data,
        height: 250,
        angleField: 'value',
        colorField: 'name',
        legend: false,
        innerRadius: 0.5,
        // 自定义颜色
        color: ['#6395f9', '#62daaa', '#657798', '#f6c022', '#7262fd'],
        labels: [
            { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
            {
                text: (d, i, data) => (i < data.length ? d.value : ''),
                style: {
                    fontSize: 9,
                    dy: 12,
                    position: "outside",
                },

            },
        ],
        style: {
            stroke: '#ffffff',
            inset: 1,
            radius: 10,
        },
    };
    return (
        <div>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}><IdcardTwoTone /> 应聘者年龄段 </div>
            <Pie {...config} />
        </div>

    );
};

export const DegreeGraph = ({ data }) => {
    const config = {
        data: data,
        height: 250,
        angleField: 'value',
        colorField: 'name',
        legend: false,
        innerRadius: 0.5,
        // 自定义颜色
        color: ['#6395f9', '#62daaa', '#f6c022'],
        labels: [
            { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
            {
                text: (d, i, data) => (i < data.length ? d.value : ''),
                style: {
                    fontSize: 9,
                    dy: 12,
                    position: "outside",
                },

            },
        ],
        style: {
            stroke: '#ffffff',
            inset: 1,
            radius: 10,
        },
    };
    return (
        <div>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}><BulbTwoTone /> 应聘者学历分布 </div>
            <Pie {...config} />
        </div>

    );
};

export const SalaryGraph = ({ data1, data2 }) => {
    const config = {
        xField: 'name',
        height: 250,
        children:[
            {
                data: data1,
                type: 'interval',
                yField: 'value',
                colorField: 'type',
                group: true,
                style: { maxWidth: 80 },
                interaction: { elementHighlightByColor: { background: true } },
            },
            {
                data: data2,
                type: 'line',
                yField: 'value',
                colorField: 'type',
                style: { lineWidth: 2 },
                axis: { y: { position: 'right' } },
                scale: { series: { independent: true } },
                interaction: {
                    tooltip: {
                        crosshairs: false,
                        marker: false,
                    },
                },
            },
        ],
    }
    return (
        <div>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}><DollarTwoTone /> 岗位工资供需分布 </div>
            <DualAxes {...config} />
        </div>
    );
};


export const PostMap = ({ data }) => {
    const mapContainer = useRef(null);
    const GDPSpeed = data;

    useEffect(() => {
        if (!mapContainer.current) return;

        const colors = {};

        const getColorByDGP = function (adcode) {
            if (!colors[adcode]) {
                const gdp = GDPSpeed[adcode]?.value;
                if (!gdp) {
                    colors[adcode] = 'rgb(227,227,227)';
                } else {
                    const rg = 255 - Math.floor(((gdp - 5) / 5) * 255);
                    colors[adcode] = 'rgb(' + rg + ',' + rg + ',255)';
                }
            }
            return colors[adcode];
        };

        const scene = new Scene({
            id: mapContainer.current,
            map: new Map({
                center: [112, 30],
                zoom: 3,
                //zoomControl: false, // 禁止缩放控件
                dragPan: true,
                //scrollZoom: false, // 禁止滚轮缩放
            }),
        });

        const url =
            'https://mvt.amap.com/district/CHN2/{z}/{x}/{y}/4096?key=309f07ac6bc48160e80b480ae511e1e9&version=';
        const source = new Source(url, {
            parser: {
                type: 'mvt',
                tileSize: 256,
                warp: false,
            },
        });

        scene.on('loaded', () => {
            const fill = new PolygonLayer({
                sourceLayer: 'CHN_Cities',
            })
                .source(source)
                .shape('fill')
                .color('adcode_pro', getColorByDGP);

            const line = new LineLayer({
                sourceLayer: 'CHN_Cities_L',
            })
                .source(source)
                .shape('line')
                .color('#FFFFFF')
                .size(0.2);  // 白色

            const line2 = new LineLayer({
                sourceLayer: 'CHN_L',
            })
                .source(source)
                .shape('line')
                .size(0.6)
                .color('#053061');

            const provinceLabels = Object.keys(GDPSpeed).map(adcode => ({
                coordinates: GDPSpeed[adcode].center,
                name: GDPSpeed[adcode].name
            }));

            const provinceNames = new PointLayer()
                .source(provinceLabels, {
                    parser: {
                        type: 'json',
                        coordinates: 'coordinates'
                    }
                })
                .shape('name')
                .size(12)
                .color('#000')
                .style({
                    textAnchor: 'center',
                    textOffset: [0, 0],
                    spacing: 1,
                    padding: [2, 2],
                    stroke: '#fff',
                    strokeWidth: 2,
                    textAllowOverlap: false,
                });

            scene.addLayer(fill);
            scene.addLayer(line);
            scene.addLayer(line2);
            scene.addLayer(provinceNames);

            // 添加图例
            const legend = document.createElement('div');
            legend.innerHTML = `
                <div style="position: absolute; bottom: 10px; left: 10px; background: white; padding: 10px; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.3);">
                    <div><strong>GDP Speed Legend</strong></div>
                    <div><span style="display:inline-block; width: 20px; height: 20px; background: rgb(0,0,255);"></span> High GDP</div>
                    <div><span style="display:inline-block; width: 20px; height: 20px; background: rgb(178,184,232);"></span> Low GDP</div>
                </div>
            `;
            mapContainer.current.appendChild(legend);
        });

        return () => {
            scene.destroy();
        };
    }, [GDPSpeed]);

    return (
        <div>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}>
                <FireTwoTone /> 省市岗位供应热力图
            </div>
            <div ref={mapContainer} style={{height: '380px', width: '100%'}} />
        </div>
    );
};

export const PostProgress = ({data}) => {
    const config = {
        percent: data,
        style: {
            textFill: '#fff',
            fontSize: 10, // 设置字体大小为12px
            outlineBorder: 4,
            outlineDistance: 4,
            waveLength: 32,
        },
        height: 100,
    };

    return <Liquid {...config} />;
};










